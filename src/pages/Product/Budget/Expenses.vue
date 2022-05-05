<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="dataForm" v-if="roleOptList.indexOf('materialBudget_add')> - 1">新建</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item label="使用年份：" prop="costYear">
          <el-date-picker
              v-model="search.costYear"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销区：">
          <el-select size="small" v-model="search.saleZoneCode" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button size="small" type="primary" @click="getTableList">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
<!--          <div v-if="yearSum" style="width: auto;float: right;margin-left: 30px">当年预算：{{ yearSum }}（元）</div>-->
        </el-form-item>
      </el-form>
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center"></el-table-column>
        <el-table-column prop="costYear" label="使用年份" align="center"></el-table-column>
        <el-table-column prop="saleZoneName" label="销区" align="center"></el-table-column>
        <el-table-column prop="costBudgetValue" label="费用预算（单位：元）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.costBudgetValue || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="costBudgetRest" label="剩余预算（单位：元）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.costBudgetRest || 0}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200">
          <template slot-scope="scope">
            <!--                        <el-button size="mini" @click="dataForm(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="mini" @click="editItem(scope.row)" type="primary" >编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="currentChange"
                     :current-page="search.pageNo" :page-size="search.pageSize"
                     :total="pagination.total">
      </el-pagination>
    </el-card>
    <el-dialog :title="`${form.id?'编辑':'新建'}红包`" width="500px" :visible.sync="form.show" @close="resetForm">
      <el-form ref="ruleForm" label-width="150px" :model="form" :rules="formRules">
        <el-form-item label="使用年份：" prop="costYear" >
          <el-date-picker
              :disabled="form.id?true:false"
              v-model="form.costYear"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销区：" prop="saleZoneCode" >
          <el-select size="small" v-model="form.saleZoneCode" @change="handleSelectZone" placeholder="请选择" :disabled="form.id?true:false">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="费用预算（元）：" prop="costBudgetValue">
          <el-input style="width: 200px" v-model="form.costBudgetValue"  size="small"
                          ></el-input>
        </el-form-item>
        <el-form-item label="剩余库存（元）：" prop="costBudgetRest">
          <el-input style="width: 200px" v-model="form.costBudgetRest" size="small"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeForm">取 消</el-button>
                <el-button size="small" type="primary" @click="saveForm">确 定</el-button>
            </span>
    </el-dialog>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px" @close="handleColseList">
      <el-table :data="list" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row,title,awardNo)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page="params.pageNo" :page-size="params.pageSize"
                       layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'Brand',
    data() {
      var validateBudgetValue = (rule, value, callback) => {
        if (value == '') {
          callback(new Error('请输入预算（元）'))
        } else {
          callback()
        }
      }
      return {
        orgHasSaleZone: sessionStorage.orgHasSaleZone,   // 组织公司是否含有销区
        isAllSaleZone: sessionStorage.isAllSaleZone,     // 是否有所有销区权限
        saleZoneCode: sessionStorage.saleZoneCode,     // 销区code
        roleOptList: sessionStorage.roleOptList.split(","),
        saleZone: [],
        search: {
          costYear: new Date().getFullYear().toString(),
          saleZoneCode: null,
          orgId:sessionStorage.getItem("orgId")
        },
        pagination: { // 分页
          total: 0
        },
        tableList: [],
        yearSum: '',
        form: {
          show: false, // 增库弹框是否展示
          id: '',
          costBudgetValue: '',
          costYear: "",
          saleZoneCode: "", // 销区code
          saleZoneName: "", // 销区名称
          costBudgetRest: ""          // 剩余库存
        },

        formRules: {
          materialName: [{required: true, message: '请输入红包礼品名称', trigger: 'change'}],
          costBudgetValue: [{required: true, validator: validateBudgetValue, trigger: 'blur'}],
          budgetSeason: [{required: true, message: '请选择季度', trigger: 'change'}],
          costYear: [{required: true, message: '请选择年份', trigger: 'change'}],
          saleZoneCode: [{required: true, message: '请选择销区', trigger: 'change'}],
        },

        title: '选择物品',
        list: [],
        params: {
          metraFlag: '',
          pageNo: 1,
          pageSize: 10,
          status: 1
        },
        listTotal: 0,
        listVisible: false,
        awardType: [
          {
            value: 1,
            label: '实物'
          },
          {
            value: 6,
            label: '积分'
          },
          {
            value: 3,
            label: '红包'
          },
          {
            value: 7,
            label: '折扣卡'
          },
          {
            value: 8,
            label: '翻倍卡'
          },
        ],
        awardNo: '',
      }
    },
    created() {
      if (this.isAllSaleZone == 1) {
        this.getSaleZone()
        this.getTableList()
      } else {
        this.getSaleZone()
        this.search.saleZoneCode = this.saleZoneCode
        this.getTableList()
      }
    },
    methods: {
      closeForm(){
        console.log(111)
        this.form.show  = false
      },
      // 查询所有的销区数据
      getSaleZone() {
        this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
          if (res.code == '200') {
            this.saleZone = res.data || []
          }
        })
      },
      currentChange(pageNo) {
        // 分页pageNo变更监听
        this.getTableList(event, pageNo)
      },
      sizeChange(pageSize) {
        // 分页pageNo变更监听
        this.getTableList(event, null, pageSize)
      },
      // page = {"pageCount":总页数, "count":总数据条数}
      initPagination(page) {
        if (page) {
          this.pagination.total = page.count
        }
      },
      // 重置查询
      reset() {
        this.search = {
          // pageNo: 1,
          // pageSize: 10,
          costYear: '',
          saleZoneCode: null,
          orgId:sessionStorage.getItem("orgId")
        }
        this.search.costYear = new Date().getFullYear().toString()
        if (this.isAllSaleZone == 1) {
          this.tableList = []
          this.getTableList()
        } else {
          this.search.saleZoneCode = this.saleZoneCode
          this.getTableList()
        }
      },
      resetForm() {
        this.$refs.ruleForm.resetFields()
        this.form = {
          show: false, // 增库弹框是否展示
          id: '',
          costBudgetValue: '',
          costYear: "",
          saleZoneCode: "", // 销区code
          saleZoneName: "", // 销区名称
          costBudgetRest: ""          // 剩余库存
        }
      },
      // 查询礼品库列表数据
      getTableList(_event, pageNo, pageSize) {
        // let _pageNo = 1
        // if (pageNo) _pageNo = pageNo
        // this.search.pageNo = _pageNo
        // let _pageSize = 10
        // if (pageSize) _pageSize = pageSize
        // this.search.pageSize = _pageSize

        this.$request.post('/api/materialBudget/costBudgetList', this.search, true, (res) => {
          if (res.code == '200') {
            this.tableList = res.data.costBudget || []
            // this.yearSum = res.data.yearSum
            // this.initPagination(res.data.costBudget.page || {})
          }
        })
      },
      handleSelectZone(obj) {
        let zone = this.saleZone.find((item) => {
          return item.zoneCode == obj
        })
        console.log(zone)
        this.form.saleZoneName = zone.zoneName
      },
      dataForm(index, row) {
        this.form.id = ""
        this.form.costBudgetRest = ""
        this.form.costBudgetValue = ""
        this.form.costYear = ""
        this.form.saleZoneCode = ""
        this.form.saleZoneName = ""
        if (row && row.id) {
          this.form.id = row.id
          this.form.costBudgetRest = row.costBudgetRest
        }
        this.form.show = true
      },
      editItem(row){
        this.$request.post('/api/materialBudget/costBudgetInfo', {id:row.id}, false, (res) => {
          if (res.code == '200') {
            this.form.id = res.data.itemInfo.id
            this.form.costBudgetRest = res.data.itemInfo.costBudgetRest
            this.form.costBudgetValue = res.data.itemInfo.costBudgetValue
            this.form.costYear = res.data.itemInfo.costYear
            this.form.saleZoneCode = res.data.itemInfo.saleZoneCode
            this.form.saleZoneName = res.data.itemInfo.saleZoneName
            this.form.show = true
          }
        })
      },
      saveForm() {
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            let params = {
              "orgId": sessionStorage.getItem("orgId"),
              "saleZoneCode": this.form.saleZoneCode, // 销区code
              "saleZoneName": this.form.saleZoneName, // 销区名称
              "costBudgetValue": this.form.costBudgetValue, // 预算数量
              "costBudgetRest": this.form.costBudgetRest, // 预算数量
              "costYear": this.form.costYear, //
            }
            if(this.form.id) {
              params.id = this.form.id
            }
            this.$request.post('/api/materialBudget/saveUpdate', params, true, (res) => {
              if (res.code == '200') {
                this.getTableList()
                this.form.show = false
                this.$message({type: 'success', message: '操作成功!'})
              } else {
                this.$message.error(res.msg || res.message)
              }
            })
          }
        })
      },
      // 选择奖品
      selectPrize(obj, title, awardNo) {
        this.form.materialName = obj.name
        this.form.materialPoolId = obj.id
        this.form.costBudgetRest = obj.stock
        console.log(obj)

        this.handleColseList()
      },
      handleColseList() {
        this.listVisible = false
        this.params.pageNo = 1
      },
      handleSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handleCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },


      getList(type, key) {
        if (type == '1') {
          this.params.metraFlag = 'object'
          this.title = '选择实物'
        } else if (type == '2') {
          this.params.metraFlag = 'virtual'
          this.title = '选择虚拟'
        } else if (type == '3') {
          this.params.metraFlag = 'redpack'
          this.title = '选择红包'
        } else if (type == '6') {
          this.params.metraFlag = 'integral'
          this.title = '选择荷石币'
        } else if (type == '7') {
          this.params.metraFlag = 'cdDisc'
          this.title = '选择折扣卡'
        } else if (type == '8') {
          this.params.metraFlag = 'cdDouble'
          this.title = '选择翻倍卡'
        }
        if (key != undefined) {
          if (key != -1) {
            this.awardNo = key
          }
        }
        this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
          if (res.ret === '200000') {
            this.list = []
            this.list = res.data.list
            this.listTotal = res.data.page.count
            this.listVisible = true
            return
          }
          this.$message.error(res.message)
        })
      },
    }
  }
</script>

<style scoped>
  .space {
    position: relative;
    width: 100%;
    height: 20px;
  }

  .el-input, .el-select {
    width: 200px;
  }
</style>
