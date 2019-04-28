<template>
  <div class="rebate-manage-container">
    <div class="box-container">
      
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="80px">
          <el-form-item :size="'small'" label="品牌">
            <el-select
                v-model="filters.brandCodeArr"
                multiple
                collapse-tags
                filterable
                style="width: 250px"
                placeholder="请选择"
                @change="selectBrand">
              <el-option
                  v-for="item in brandList"
                  :key="item.brandCode"
                  :label="item.name"
                  :value="item.brandCode"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="规格">
            <el-select
                v-model="filters.snArr"
                multiple
                collapse-tags
                filterable
                style="width: 250px"
                placeholder="请选择">
              <el-option
                  v-for="item in snList"
                  :key="item.sn"
                  :label="item.name"
                  :value="item.sn">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="地区">
            <el-select
                v-model="filters.adCodes"
                multiple
                collapse-tags
                filterable
                reserve-keyword
                style="width: 250px"
                placeholder="请选择"
                @blur="RegionOrign"
                @focus="RegionOrign"
                :filter-method="filterRegion"
                >
              <el-option
                  v-for="item in AllRegion"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code"
                  style="width: 250px"
              >
                <span style="float: left">{{ item.name }}</span>
                <span style="float: right; color: #8492a6; font-size: 13px;margin-right: 30px">{{ item.province }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="活动类型">
            <el-select
                v-model="filters.activityForm"
                placeholder="请选择"
                style="width: 250px">
              <el-option
                  v-for="item in allFormsBrand"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="活动状态">
            <el-select
                v-model="filters.status"
                placeholder="请选择"
                style="width: 250px">
              <el-option
                  v-for="item in statusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="关键词">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 250px"></el-input>
          </el-form-item>
          <el-form-item :size="'small'" label="时间区间">
            <el-date-picker
                v-model="filters.time"
                type="datetimerange"
                placeholder="选择日期时间"
                value-format="yyyy-MM-dd HH:mm"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                style="width: 350px">
            </el-date-picker>
          </el-form-item>

          <div></div>

          <div></div>
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="commitForm">查询</el-button>
            <el-button size="small" class="important" @click="getStatus">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="activityRebateList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="rebate"
              label="返现比例"
              width="200">
          </el-table-column>
          <el-table-column
              prop="activityName"
              label="活动名称"
              width="120">
          </el-table-column>
          <el-table-column
              prop="snName"
              label="规格"
              width="120">
          </el-table-column>
          <el-table-column
              prop="balance"
              label="活动时间"
              width="200">
            <template slot-scope="scope">
              <div>{{ new Date(scope.row.stime).Format('yyyy-MM-dd hh:mm:ss')}}</div>
              <div>-</div>
              <div>{{ new Date(scope.row.etime).Format('yyyy-MM-dd hh:mm:ss')}}</div>
            </template>
          </el-table-column>
          <el-table-column
              prop="adNames"
              label="投放地区"
              width="120">
            <template slot-scope="scope">
              <template v-if="scope.row.adNames">
                <span v-if="scope.row.adNames.length<=20">{{scope.row.adNames}}</span>
                <span v-else :title="scope.row.adNames">{{scope.row.adNames.substr(0,20)+'...'}}</span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
              prop="statusName"
              label="使用状态">
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="100"
          >
            <template slot-scope="scope" >
              <el-button
                  type="text"
                  size="mini"
                  @click="rebateDialog(scope.row.activityCode)"
              >设置返佣比例</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
        <!--<el-button type="primary" class="btn-jump-to" @click="jumpTo">跳转</el-button>-->
        <el-pagination
            background
            layout="total,prev, pager, next,jumper"
            :current-page="currentPage"
            @current-change="handleCurrentChange"
            :page-size="pageSize"
            :total="total"
            style="float:right;">
        </el-pagination>
      </el-col>
    </div>
    <el-dialog
        title="设置返佣比例"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="cancelDialog">
      <el-input
          type="number"
          :rows="2"
          placeholder="请输入返佣比例"
          v-model="rebate">
        <template slot="append">%</template>
      </el-input>
      <div style="text-align: center;margin-top: 30px">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="setActivityRebate">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "Reviewmanage",
    data(){
      return{
        listLoading:false,
        //品牌列表
        brandList:[],
        //规格列表
        snList:[],
        //地区列表
        AllRegion:[],
        AllRegionOrign:[],
        //活动列表
        allFormsBrand:[
          {
            code:"",
            name:"全部"
          },
        ],
        //状态列表
        statusList:[
          {
            code:"",
            name:"全部"
          },
        ],
        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],

        filters: {

          brandCodeArr: [],
          snArr: [],
          adCodes:[],
          //活动类型
          activityForm:'',
          //活动状态
          status :'',

          //模糊搜索内容
          keywords:'',
          //开始时间
          // appStartTime:'',
          // //结束时间
          // appEndTime:'',
          time:[],

        },
        //表单内容
        activityRebateList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,


        //设置返佣比例
        dialogVisible:false,
        rebate:'',
        activityCode:''
      }

    },
    created(){
      this.getListBrand()
      this.getListAllForms()
      this.getListStatus()
      this.getListAllRegion()
      this.getActivityRebateList()
    },
    methods:{
      //从后台拿取品牌列表listBrand
      getListBrand(){
        this.$request.post('/api/wiseqr/prod/listBrand',{}, true, (res) => {
          if (res.ret == '200000') {
            this.brandList = res.data.list
          }
        })
      },

      //从后台拿取规格1列表listBrand
      getListSN(){
        this.$request.post('/api/wiseqr/prod/list',{"brandCodeArr":this.filters.brandCodeArr}, true, (res) => {
          if (res.ret == '200000') {
            this.snList = res.data.list
          }
        })
      },
      selectBrand(selected){
        this.filters.snArr = []
        this.getListSN()
      },

      //从后台拿取活动类型allFormsBrand
      getListAllForms(){
        this.$request.post('/api/wiseqr/act/allForms',{}, true, (res) => {
          if (res.ret == '200000') {
            this.allFormsBrand = [...this.allFormsBrand ,...res.data.list]
          }
        })
      },
      //从后台拿取活动状态statusList
      getListStatus(){
        this.$request.post('/api/wiseqr/act/statusSelect',{}, true, (res) => {
          if (res.ret == '200000') {
            let arr = Object.entries(res.data)
            let statusList = []
            arr.map((e,i)=>{
              let [code,name] = e
              statusList.push({code,name})
            })
             this.statusList = [...this.statusList ,...statusList]
          }
        })
      },
      //从后台拿取地区列表AllRegion
      getListAllRegion(){
        this.$request.post('/lsh/seller-manager/region/queryAllRegion',{parentCode:''}, false, (res) => {
          if (res.ok) {
            // this.AllRegion = [...this.allFormsBrand ,...res.data.list]
            let AllRegion = []
            let arr = Object.entries(res.data.cities)
            let provinceArr = [...res.data.provinces]
            // console.log(arr)
            arr.map((e)=>{
              let [province,items] = e
              // console.log(province,1)
              provinceArr.map((f)=>{
                // console.log(f.code,2)
                if(f.code == province){
                  items.map((g)=>{
                    g.province = f.name
                  })
                }
              })
              AllRegion  = [...AllRegion,...items]
            })
            this.AllRegion = AllRegion
            this.AllRegionOrign = AllRegion
          }
        })
      },
      filterRegion(val){
        console.log(val)
        if(val){
          let arr =  [...this.AllRegionOrign]
          let AllRegion = arr.filter((e)=>{
            return e.name.includes(val) || e.province.includes(val)
          })
          this.AllRegion = [...AllRegion]
        }else {
          this.AllRegion = this.AllRegionOrign
        }
      },
      RegionOrign(){
        this.AllRegion = this.AllRegionOrign
      },
      //获取列表
      getActivityRebateList() {
        let params = {

          brandCode:this.filters.brandCodeArr.join(','),
          sn:this.filters.snArr.join(','),

          adCodes:this.filters.adCodes.join(','),
          //活动类型
          activityForm:this.filters.activityForm,
          status:this.filters.status,

          //关键词
          keywords:this.filters.keywords,


          //时间
          activityStime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          activityEtime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',


          pageNo: this.pageNo,
          pageSize: 10,

        };

        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/lsh/seller-manager/setting/activityRebateList', params, false, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.activityRebateList = res.data.list
            this.total = res.data.page.count
            this.pageNo = res.data.page.pageNo

        })
      },
      //查詢
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getActivityRebateList()
      },
      //重置
      getStatus() {
        this.filters.brandCodeArr = []
        this.filters.snArr = []
        this.filters.adCodes = []
        this.filters.activityForm = ''
        this.filters.status = ''

        //模糊搜索内容
        this.filters.keywords = ''
        this.filters.time = []



        this.pageNo = 1
        this.currentPage = 1
        this.getActivityRebateList()
      },

      //设置返佣比例
      rebateDialog(activityCode){
        this.dialogVisible = true
        this.activityCode = activityCode
      },
      setActivityRebate(){
        let params = {activityCode:this.activityCode,rebate:this.rebate}

        this.$request.post('/lsh/seller-manager/setting/setActivityRebate',params,false,res => {
          if(res.ok){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.dialogVisible = false
            this.rebate = ""
            this.getActivityRebateList()
          }else{
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'warning'
            });
            this.dialogVisible = false
            this.rebate = ""
            this.getActivityRebateList()
          }
        })

      },
      cancelDialog(){
        this.dialogVisible = false
        this.rebate = ""
      },

      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getActivityRebateList()
      },
    }
  }
</script>

<style lang="scss" scoped>
  .rebate-manage-container{
  .box-container{
    background-color: #fff;
    padding: 15px;
    margin-bottom: 30px;
    add-new-seller{
      margin-bottom: 30px;
    }
  &:after{
     content: '';
     display: block;
     width: 0;
     height: 0;
     clear: both;
   }
  }
  }
  .el-form-item {
    margin-bottom: 20px;
  }
</style>
<style >
  .rebate-manage-container .el-table{text-align: center}
  .rebate-manage-container .el-table th{text-align: center}
  .rebate-manage-container .el-table td{text-align: center}
  .rebate-manage-container .mini .el-form-item__label {width: 40px!important;}
</style>