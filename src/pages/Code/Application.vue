<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="showApplication">新赠成码申请</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item label="品牌名称：">
          <el-select v-model="selectBrand" multiple collapse-tags placeholder="请选择" @change="getBrandSonList">
            <el-option v-for="item in specialBrandList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="search.productSn" placeholder="请选择" @change="restrictSonBrand">
            <el-option v-for="item in specialBrandSonList" :key="item.id" :label="item.allName" :value="item.sn">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="品牌SN：">
          <el-input size="small" readonly v-model="search.productSn"></el-input>
        </el-form-item>
        <el-form-item label="印刷厂名称：" >
          <el-select size="small" v-model="search.factoryCode" placeholder="请选择">
            <el-option v-for="(item,index) in factoryList" :label="item.factoryName" :value="item.factoryCode" :key="index"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="申请时间：" >
          <el-date-picker
              v-model="search.requestTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="确认时间：" >
          <el-date-picker
              v-model="search.confirmTime"
              type="date"
              value-format="yyyy-MM-dd"
              placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button size="small" type="primary" @click="list">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center">
          <template slot-scope="scope">
            {{ (search.pageNo-1)*search.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="产品名称" align="center"></el-table-column>
        <el-table-column prop="productSn" label="产品SN" align="center"></el-table-column>
        <el-table-column prop="codeSize" label="源码数量" align="center"></el-table-column>
        <el-table-column prop="factoryName" label="印刷厂名称" align="center"></el-table-column>
        <el-table-column prop="loadFileSql" label="库文件" align="center"></el-table-column>
        <el-table-column prop="requestTime" label="申请时间" align="center"></el-table-column>
        <el-table-column prop="requestStatus" label="任务状态" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.requestStatus == 0">任务失败</span>
            <span v-if="scope.row.requestStatus == 1">待生成</span>
            <span v-if="scope.row.requestStatus == 2">处理中</span>
            <span v-if="scope.row.requestStatus == 3">已生成</span>
            <span v-if="scope.row.requestStatus == 4">已作废</span>
            <span v-if="scope.row.requestStatus == 5">确认中</span>
            <span v-if="scope.row.requestStatus == 6">已确认</span>
          </template>
        </el-table-column>
        <el-table-column prop="statusTime" label="确认时间" align="center"></el-table-column>
        <el-table-column prop="factoryFilePath" label="存放目录" align="center">
          <template slot-scope="scope">
            {{scope.row.factoryFilePath ? scope.row.factoryFilePath : ""}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="220">
          <template slot-scope="scope">
<!--            待生成-->
            <el-button v-if="scope.row.requestStatus == 1" size="mini" @click="deleteCode(scope.row.id)" type="danger"> 码源作废</el-button>
<!--            已生成-->
            <el-button v-if="scope.row.requestStatus == 3" size="mini" @click="comformData(scope.row.id, 0)">确认无误</el-button>
            <el-button v-if="scope.row.requestStatus == 3" size="mini" @click="deleteCode(scope.row.id)" type="danger"> 码源作废</el-button>
<!--            已确认-->
            <el-button v-if="scope.row.requestStatus == 6" size="mini" @click="modifyData(scope.row.id)">激活明细</el-button>
            <el-button size="mini" @click="oplog(scope.row.id)">操作日志</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="currentChange"
                     :current-page="search.pageNo" :page-size="search.pageSize"
                     :total="pagination.totalNum">
      </el-pagination>
    </el-card>

<!--    操作日志-->
    <el-dialog title="操作日志" :visible.sync="dialogTableVisible">
      <el-table :data="logData">
        <el-table-column property="optTime" align="center" label="操作时间"></el-table-column>
        <el-table-column property="optAccount" align="center" label="操作人"></el-table-column>
        <el-table-column property="optDesc" align="center" label="操作明细"></el-table-column>
      </el-table>
    </el-dialog>
<!--    码源激活明细-->
    <el-dialog title="码源激活明细" :visible.sync="dialogVisible" width="800px">
      <div class="jhmx content">
        <div class="title">
          <div>激活总数量：{{ totalNum }}个</div>
        </div>
        <ul class="content">
          <li v-for="(item,index) in activeList" :key="index">
            <span>成码批次：{{ item.batch }}</span>
            <span style="margin-left: 30px">子批次号{{ index + 1 }}：{{ item.subbatch }}</span>
            <span style="margin-left: 30px">激活数量：{{ item.cnt }}个</span></li>
        </ul>
      </div>
      <span slot="footer" class="dialog-footer">
      <el-button type="primary" @click="dialogVisible = false">关 闭</el-button>
      </span>
    </el-dialog>

<!--    新增成码申请-->
    <el-dialog title="新增成码申请" :visible.sync="dialogFormVisible" @close="cancelApplication" width="640px">
      <el-form :inline="true">
        <el-form-item label="品牌名称：">
          <el-select v-model="selectBrand2" multiple collapse-tags placeholder="请选择" @change="getBrandSonList2">
            <el-option v-for="item in specialBrandList2" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="productSn2" placeholder="请选择" value-key="sn" @change="restrictSonBrand2">
            <el-option v-for="item in specialBrandSonList2" :key="item.id" :label="item.allName" :value="item">
            </el-option>
          </el-select>
          <el-button type="primary" size="mini" :disabled="!productSn2" style="margin-left: 30px" @click="addItem(productSn2)">添加</el-button>
        </el-form-item>
      </el-form>

      <el-card v-for="(f,index) in form" :key="index" class="cmsq-card">
        <div style="line-height: 40px;margin-bottom: 10px">
          <span style="margin-left: 80px"></span>
          {{ f.name }}
          <span style="margin-left: 20px"></span>
          产品SN：{{ f.productSn }}
          <el-button type="danger" size="mini"  style="float: right" @click="deleteItem(index)">删除</el-button>
        </div>
        <el-form ref="form" :model="f" :rules="formRules">
          <el-form-item label="码源数量：" prop="codeSize" label-width="200px">
            <el-input-number style="width: 200px" v-model="f.codeSize" :controls="false" :max="50000000" :min="1"></el-input-number>个
            <span style="margin-left: 20px">（{{parseFloat((f.codeSize/10000).toPrecision(12))}}万）</span>
          </el-form-item>
          <el-form-item label="印刷厂名称：" prop="factoryCode" label-width="200px">
            <el-select v-model="f.factoryCode" placeholder="请选择">
              <el-option v-for="(item,index) in factoryList" :label="item.factoryName" :value="item.factoryCode" :key="index"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelApplication">取 消</el-button>
        <el-button type="primary" @click="addApplication">提交申请</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name:'Application',
    data() {
      return {
        brandList:[],
        brandSonList:[],
        selectBrand:[],
        specialBrandList:[],
        selectSonBrand:[],
        specialBrandSonList:[],

        brandList2:[],
        brandSonList2:[],
        selectBrand2:[],
        specialBrandList2:[],
        selectSonBrand2:[],
        specialBrandSonList2:[],
        productSn2:'',

        factoryList:[],

        search: {
          pageNo: 1,
          pageSize: 10,
          productSn: "",
          factoryCode: "",  // 工厂代码
          requestTime: "",    // 申请时间0
          confirmTime: ""     // 确认时间
        },
        pagination: { // 分页
          totalNum: 0
        },
        tableList: [],

        form: [],
        dialogTableVisible:false,
        logData:[],
        dialogVisible:false,
        dialogFormVisible:false,
        formRules: {
          codeSize: [{ required: true, message: '请输入码源数量',trigger:'blur' }],
          factoryCode: [{ required: true, message: '请选择印刷厂',trigger:'change' }],
        },

        activeList:[],
        totalNum:0
      }
    },
    created() {
      this.list();
      this.getBrandList()
      this.getFactoryList()
    },
    methods: {
      aaaa(num){
        console.log(num)
      },
      getFactoryList() {
        this.$request.get('/codesrc/saas/factory/list', {}, res => {
          if (res.code === '200') {
            this.factoryList = res.data
            return
          }
          this.$message.error(res.msg)
        })
      },
      // 获取品牌列表
      getBrandList() {
        this.$request.post('/api/wiseqr/prod/listBrand', {
          pageSize: '-1'
        }, true, res => {
          if (res.ret === '200000') {
            this.brandList = res.data.list
            this.restrictBrand()
            this.brandList2 = res.data.list
            this.restrictBrand2()
            return
          }
          this.$message.error(res.message)
        })
      },
      // 获取子品牌列表
      getBrandSonList() {
        // 定投限制品牌
        this.restrictBrand()
        this.$request.post(
          '/api/wiseqr/prod/list', {
            brandCodeArr: this.selectBrand,
            pageSize: '-1'
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandSonList = res.data.list
              this.restrictSonBrand()
              return
            }
            this.$message.error(res.message)
          }
        )
      },
      getBrandSonList2() {
        // 定投限制品牌
        this.restrictBrand2()
        this.$request.post(
          '/api/wiseqr/prod/list', {
            brandCodeArr: this.selectBrand2,
            pageSize: '-1'
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandSonList2 = res.data.list
              this.restrictSonBrand2()
              return
            }
            this.$message.error(res.message)
          }
        )
      },
      restrictSonBrand() {
        this.specialBrandSonList = JSON.parse(JSON.stringify(this.brandSonList))

      },
      restrictSonBrand2(item) {
        this.specialBrandSonList2 = JSON.parse(JSON.stringify(this.brandSonList2))
        console.log(item)
      },
      // 定点投放品牌限制
      restrictBrand() {
        // console.log(this.selectBrand)
        this.search.productSn = ""
        this.specialBrandList = JSON.parse(JSON.stringify(this.brandList))
        this.specialBrandList.forEach(speciaItem => {
          speciaItem['disabled'] = true
          this.selectBrand.forEach(item => {
            if (speciaItem.brandCode == item) {
              speciaItem['disabled'] = false
            }
          })
        })
        // console.log(this.specialBrandList)
      },
      restrictBrand2() {
        // console.log(this.selectBrand)
        this.productSn2 = ""
        this.specialBrandList2 = JSON.parse(JSON.stringify(this.brandList2))
        this.specialBrandList2.forEach(speciaItem => {
          speciaItem['disabled'] = true
          this.selectBrand2.forEach(item => {
            if (speciaItem.brandCode == item) {
              speciaItem['disabled'] = false
            }
          })
        })
        // console.log(this.specialBrandList)
      },
      currentChange(pageNo) {
        // 分页pageNo变更监听
        this.list(event, pageNo);
      },
      sizeChange(pageSize) {
        // 分页pageNo变更监听
        this.list(event, null, pageSize);
      },
      // page = {"pageCount":总页数, "count":总数据条数}
      initPagination(pageInfo) {
        if(pageInfo) {
          this.pagination.totalNum = pageInfo.totalNum;
        }
      },
      // 重置查询
      reset() {
        this.selectBrand = []
        this.search.confirmTime = ""
        this.search.requestTime = ""
        this.search.factoryCode = ""
        this.search.productSn = ""
        this.search.pageNo = 1
        this.search.pageSize = 10
        this.list();
      },
      // 查询礼品库列表数据
      list(_event, pageNo, pageSize) {
        let _pageNo = 1;
        if(pageNo) _pageNo = pageNo;
        this.search.pageNo = _pageNo;
        let _pageSize = 10;
        if(pageSize) _pageSize = pageSize;
        this.search.pageSize = _pageSize;

        this.$request.post('/codesrc/saas/cgRequest/reqList', this.search, true, (res)=>{
          if (res.code == '200') {
            this.tableList = res.data || [];
            this.initPagination(res.pageInfo||{});
          }
        });
      },
      showApplication(){
        this.dialogFormVisible = true
      },
      addApplication() {
        if(!this.form.length){
          this.$message({
            message: '成码申请不能为空！',
            type: 'warning'
          });
          return
        }
        let flag = true
        this.$refs.form.forEach(item => {
          item.validate(valid => {
            if(valid){

            }else {
              flag = false
            }
          })
        })
        if(flag){
          let params = this.form.map(item => {
            return {
              productSn: item.productSn,
              factoryCode: item.factoryCode,
              codeSize: item.codeSize
            }
          })
          this.$request.post('/codesrc/saas/cgRequest/reqAdd', params, true, (res)=>{
            if (res.code == '200') {
              this.$message({
                type: 'success',
                message: '操作成功!'
              });
              this.cancelApplication()
              this.reset()
            }else {
              this.$message({
                type: 'error',
                message: res.msg
              });
            }
          });
        }
      },
      cancelApplication(){
        if(!this.form.length){
          this.dialogFormVisible = false
          this.selectBrand2 = []
          this.specialBrandSonList2 = []
          this.productSn2 = ''
          return
        }
        this.$refs.form.forEach(item => {
          item.resetFields()
        })
        this.dialogFormVisible = false
        this.form = []
        this.selectBrand2 = []
        this.specialBrandSonList2 = []
        this.productSn2 = ''
      },

      // 修改数据状态：status=1启用；status=0停用
      modifyData(requestId) {
        this.$request.get('/codesrc/saas/cgBackBatchInfo/list', {requestId}, (res)=>{
          if (res.code == '200') {
            this.activeList = res.data.activeList
            this.totalNum = res.data.totalNum
            this.dialogVisible = true
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      oplog(requestId){
        this.$request.get('/codesrc/saas/cgRequestLog/list', { requestId }, (res)=>{
          if (res.code == '200') {
            this.logData = res.data
            this.dialogTableVisible = true
          } else {
            this.$message.error(res.msg);
          }
        });
      },
      comformData(requestId){
        this.$confirm('请核对当前成码申请没有问题？码源确认后，请邮件告知数据人员成码已完成及需入库产品规格明细，由数据人员对码源手工入库?', '码源确认', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/codesrc/saas/cgRequest/opt/confirm', { requestId }, false, (res)=>{
            if (res.code == '200') {
              this.$message({
                type: 'success',
                message: '已申请!'
              });
              this.list(event,this.search.pageNo,this.search.pageSize)
            } else {
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      deleteCode(requestId){
        this.$confirm('请核对当前成码申请没有问题？码源作废后，可重新提交成码申请, 是否继续?', '源码作废', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/codesrc/saas/cgRequest/opt/deprecate', { requestId }, false, (res)=>{
            if (res.code == '200') {
              this.$message({
                type: 'success',
                message: '已作废!'
              });
              this.list(event,this.search.pageNo,this.search.pageSize)
            } else {
              this.$message.error(res.msg);
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });
        });
      },
      addItem(product){
         let index = this.form.findIndex(item => {
          return item.productSn == product.sn
        })
        if(index>-1){
          this.$message({
            type: 'error',
            message: '已添加此规格!'
          });
          return
        }
        let item = {
          productSn:product.sn,
          codeSize:'',
          name:product.allName,
          factoryCode: ''
        }
        this.form.push(item)
      },
      deleteItem(index){
        console.log(index)
        this.form.splice(index,1)
      }
    }
  }
</script>

<style scoped>
  .space {position:relative;width:100%;height:20px;}
  .el-input, .el-select {
    width: 200px;
  }
  .jhmx.content{
    font-size: 18px;
    line-height: 35px;
  }
  .jhmx.content .title{
    margin-bottom: 20px;
  }
  .cmsq-card{
    margin-bottom: 20px;
  }
  .cmsq-card:last-child{
    margin-bottom: 0;
  }
</style>
