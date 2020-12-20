<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="dataForm" v-if="roleOptList.indexOf('materialBudget_add')> - 1">新建</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item label="使用年份：" prop="budgetYear">
          <el-date-picker
              v-model="search.budgetYear"
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
          <div v-if="yearSum" style="width: auto;float: right;margin-left: 30px">当年预算(数量)：{{ yearSum }}（个）</div>
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
        <el-table-column prop="materialName" label="礼品名称" align="center"></el-table-column>
        <el-table-column prop="budgetValue" label="当季度预算（数量）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.budgetValue}}个</span>
          </template>
        </el-table-column>
        <el-table-column prop="statGiven" label="已发放（数量）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.statGiven || 0}}个</span>
          </template>
        </el-table-column>
        <el-table-column prop="statReceived" label="已领取（数量）" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.statReceived || 0}}个</span>
          </template>
        </el-table-column>
        <el-table-column prop="statTime" label="统计数据时间" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.statTime || "暂无"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="budgetSeason" label="使用时间" align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.budgetSeason == 1">{{"第一季度（1月1日00:00-3月31日23:59:59）"}}</span>
            <span v-if="scope.row.budgetSeason == 2">{{"第二季度（4月1日00:00-6月30日23:59:59）"}}</span>
            <span v-if="scope.row.budgetSeason == 3">{{"第三季度（7月1日00:00-9月30日23:59:59）"}}</span>
            <span v-if="scope.row.budgetSeason == 4">{{"第四季度（10月1日00:00-12月31日23:59:59）"}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="budgetYear" label="年份" align="center"></el-table-column>
        <el-table-column prop="saleZoneName" label="销区" align="center"></el-table-column>
        <el-table-column prop="statRest" label="季度结算(数量)" align="center">
          <template slot-scope="scope">
            <span>{{scope.row.statRest || 0}}个</span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200" v-if="roleOptList.indexOf('materialBudget_valueAdd')> - 1 || roleOptList.indexOf('materialBudget_delete')> - 1">
          <template slot-scope="scope">
            <!--                        <el-button size="mini" @click="dataForm(scope.$index, scope.row)">编辑</el-button>-->
            <el-button size="mini" @click="addRepertory(scope.row)" type="primary" v-if="roleOptList.indexOf('materialBudget_valueAdd')> - 1">增库</el-button>
            <el-button type="danger" size="mini" @click="del(scope.row.id)" v-if="roleOptList.indexOf('materialBudget_delete')> - 1">删除</el-button>
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
    <el-dialog title="新建实物" width="500px" :visible.sync="form.show" @close="resetForm()">
      <el-form ref="ruleForm" label-width="150px" :model="form" :rules="formRules">
        <el-form-item label="实物礼品名称：" prop="materialName">
          <el-button size="small" @click="getList(1)">{{ form.materialName ? form.materialName : "选择" }}</el-button>
          <el-input style="display: none;" size="small" v-model="form.materialName" placeholder="请输入礼品名称"></el-input>
        </el-form-item>
        <el-form-item label="剩余库存（个）：" prop="stock">
          <el-input-number style="width: 200px" v-model="form.stock" :precision="0" :min="0" controls-position="right"
                           disabled></el-input-number>
        </el-form-item>
        <el-form-item label="预算（个）：" prop="budgetValue">
          <el-input-number v-model="form.budgetValue" :precision="0" :min="0" :max="form.stock || 0"
                           controls-position="right"></el-input-number>
          <span style="margin-left: 10px">提示：不可超过剩余库存</span>
        </el-form-item>
        <el-form-item label="使用季度：" prop="budgetSeason">
          <el-select size="small" v-model="form.budgetSeason" placeholder="请选择">
            <el-option label="第一季度（1月1日00:00-3月31日23:59:59）" value="1"></el-option>
            <el-option label="第二季度（4月1日00:00-6月30日23:59:59）" value="2"></el-option>
            <el-option label="第三季度（7月1日00:00-9月30日23:59:59）" value="3"></el-option>
            <el-option label="第四季度（10月1日00:00-12月31日23:59:59）" value="4"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用年份：" prop="budgetYear">
          <el-date-picker
              v-model="form.budgetYear"
              type="year"
              value-format="yyyy"
              placeholder="选择年">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="销区：" prop="saleZoneCode">
          <el-select size="small" v-model="form.saleZoneCode" @change="handleSelectZone" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="form.show=false">取 消</el-button>
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
        if (value == '0') {
          callback(new Error('请输入预算（个）'))
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
          pageNo: 1,
          pageSize: 10,
          budgetYear: new Date().getFullYear().toString(),
          saleZoneCode: null,
          materialType: 1
        },
        pagination: { // 分页
          total: 0
        },
        tableList: [],
        yearSum: '',
        form: {
          show: false, // 增库弹框是否展示
          id: '',
          materialName: '',
          budgetValue: '',
          materialType: 1,
          materialPoolId: null,
          budgetSeason: "",
          budgetYear: "",
          saleZoneCode: "", // 销区code
          saleZoneName: "", // 销区名称
          stock: ""          // 剩余库存
        },

        formRules: {
          materialName: [{required: true, message: '请选择实物礼品', trigger: 'change'}],
          budgetValue: [{required: true, validator: validateBudgetValue, trigger: 'blur'}],
          budgetSeason: [{required: true, message: '请选择季度', trigger: 'change'}],
          budgetYear: [{required: true, message: '请选择年份', trigger: 'change'}],
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
      } else {
        this.getSaleZone()
        this.search.saleZoneCode = this.saleZoneCode
        this.getTableList()
      }
    },
    methods: {
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
          pageNo: 1,
          pageSize: 10,
          budgetYear: '',
          saleZoneCode: null,
          materialType: 1
        }
        this.search.budgetYear = new Date().getFullYear().toString()
        if (this.isAllSaleZone == 1) {
          this.tableList = []
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
          materialName: '',
          budgetValue: '',
          materialType: 1,
          materialPoolId: null,
          budgetSeason: "",
          budgetYear: "",
          saleZoneCode: "", // 销区code
          saleZoneName: "", // 销区名称
          stock: "",
        }
      },
      // 查询礼品库列表数据
      getTableList(_event, pageNo, pageSize) {
        let _pageNo = 1
        if (pageNo) _pageNo = pageNo
        this.search.pageNo = _pageNo
        let _pageSize = 10
        if (pageSize) _pageSize = pageSize
        this.search.pageSize = _pageSize

        this.$request.post('/api/materialBudget/list', this.search, true, (res) => {
          if (res.code == '200') {
            this.tableList = res.data.budgetList.list || []
            this.yearSum = res.data.yearSum
            this.initPagination(res.data.budgetList.page || {})
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
        this.form.materialName = ""
        this.form.materialPoolId = ""
        this.form.stock = ""
        if (row && row.id) {
          this.form.id = row.id
          this.form.materialName = row.materialName
          this.form.materialPoolId = row.materialPoolId
          this.form.stock = row.stock
        }
        this.form.show = true
      },
      saveForm() {
        if (this.form.id) {

        } else {
          this.$refs.ruleForm.validate(valid => {
            if (valid) {
              let params = {
                "saleZoneCode": this.form.saleZoneCode, // 销区code
                "saleZoneName": this.form.saleZoneName, // 销区名称
                "budgetValue": this.form.budgetValue, // 预算数量
                "budgetSeason": this.form.budgetSeason, // 预算季节, 1,2,3,4 分别对应每个季度
                "budgetYear": this.form.budgetYear, //
                "materialType": this.form.materialType, // 物料类型, 1-实物; 3-红包; 6-积分;
                "materialName": this.form.materialName, // 礼品名称
                "materialPoolId": this.form.materialPoolId // 不允许为空
              }
              this.$request.post('/api/materialBudget/add', params, true, (res) => {
                if (res.code == '200') {
                  this.getTableList()
                  this.resetForm()
                  this.form.show = false
                  this.$message({type: 'success', message: '操作成功!'})
                } else {
                  this.$message.error(res.msg || res.message)
                }
              })
            }
          })
        }
      },
      addRepertory(item) {
        this.$request.post('/api/wiseqr/metra/detail', {id: item.materialPoolId, metraFlag: 'object'}, true, (res) => {
          if (res.ret == '200000') {
            let stock = res.data.stock
            this.$prompt(
              `<div style="line-height: 30px">实物礼品名称：${item.materialName}</div>
                         <div style="line-height: 30px">剩余库存（个）：${stock}</div>
                         增加预算（个）：（提示：不可超过剩余库存）`,
              '增库', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                inputPattern: /^\d{1,}$/,
                inputErrorMessage: '请输入数字',
                dangerouslyUseHTMLString: true
              }).then(({value}) => {
              if (value == 0) return this.$message.error('数字不能为0')
              if (value > stock) return this.$message.error('增库不可超过剩余库存')
              this.$request.get('/api/materialBudget/valueAdd', {
                budgetId: item.id,
                budgetValue: value,
                materialPoolId: item.materialPoolId
              }, res1 => {
                if (res1.code == '200') {
                  this.$message.success('增库成功')
                  this.getTableList()
                } else {
                  this.$message.error(res1.msg)
                }
              })
            }).catch(() => {
              this.$message({
                type: 'info',
                message: '取消输入'
              })
            })
          } else {
            this.$message.error(res.msg || res.message)
          }
        })
      },
      async del(id) {
        const confirmResult = await this.$confirm('您确定删除此预算？', '删除提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).catch(err => err)
        if (confirmResult !== 'confirm') {
          return this.$message({
            type: 'info',
            message: '已取消删除'
          })
        }
        this.$request.get(
          '/api/materialBudget/delete',
          {budgetId: id},
          res => {
            console.log(res)
            if (res.code == '200') {
              this.$message.success('删除成功')
              this.getTableList()
            } else {
              this.$message.error(res.msg)
            }
          },
          err => {
            console.log(err)
          }
        )
      },
      // 选择奖品
      selectPrize(obj, title, awardNo) {
        this.form.materialName = obj.name
        this.form.materialPoolId = obj.id
        this.form.stock = obj.stock
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
