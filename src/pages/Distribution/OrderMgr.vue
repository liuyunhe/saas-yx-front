<template>
  <div class="review-manage-container">
    <div class="box-container">
      <div class="add-new-seller">
        <el-button type="primary" size="small" style="display:none;margin-bottom:15px "  @click="addNewSeller()">新建零售户</el-button>
      </div>
      <!--查询表单-->
      <el-col :span="24" class="toolbar" style="padding-bottom: 0px;margin-bottom: 0">
        <el-form :inline="true" :model="filters" label-width="90px">
          <el-form-item :size="'small'" label="订单状态：">
            <el-select
                v-model="filters.authStatus"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in authStatusList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="时间区间：">
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
          <el-form-item :size="'small'" label="关键词：">
            <el-input placeholder="请输入内容" v-model="filters.keywords" class="input-with-select" style="width: 300px">
              <el-select v-model="filters.searchType" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 120px">
                <el-option label="订单号" value="orderId"></el-option>
                <el-option label="抢购人" value="contactName"></el-option>
                <el-option label="手机号" value="contactPhone"></el-option>
                <el-option label="经销商" value="salerName"></el-option>
              </el-select>
            </el-input>
          </el-form-item>
          
          <div></div>
          <el-form-item size="small" label="位置：" prop="addrProvince">
            <el-select
                v-model="filters.addrProvince"
                placeholder="请选择"
                @change="selectBrand1"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl1List"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="" prop="addrCity">
            <el-select
                v-model="filters.addrCity"
                placeholder="请选择"
                @change="selectBrand2"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl2List"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item size="small" label="" prop="addrArea">
            <el-select
                v-model="filters.addrArea "
                placeholder="请选择"
                style="width: 160px">
              <el-option
                  v-for="item in cateLvl3List"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item :size="'small'" label="订单数量：">
            <el-select
                v-model="filters.buyNum"
                placeholder="请选择"
                style="width: 200px">
              <el-option
                  v-for="item in buyNumList"
                  :key="item.code"
                  :label="item.name"
                  :value="item.code">
              </el-option>
            </el-select>
          </el-form-item>
          <div></div>
          <el-form-item class="mr0" :size="'small'">
            <el-button type="primary" size="small" @click="commitForm">查询</el-button>
            <el-button size="small" class="important" @click="getStatus">重置</el-button>
            <el-button size="small" class="important" @click="exportData">导出未发出订单</el-button>
            <el-button  size="small" ><el-upload
                class="upload-demo"
                action="/fxweb/fxsaas/importOrders"
                :headers="headers"
                :data="addPool"
                :before-upload="handlerSourceFileBUpload"
                :on-success="handleSourceFileSuccess"
                :on-remove="handleSourceFileRemove"
                :file-list="sourceFiles"
                :auto-upload="true">
              <el-button slot="trigger" size="small" type="primary">导入物流信息</el-button>
            </el-upload></el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </div>

    <div class="box-container">
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="newList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="50">
          </el-table-column>
          <el-table-column
              prop="orderId"
              label="订单号"
              width="200">
          </el-table-column>
          <el-table-column
              prop="contactName"
              label="抢购人"
              width="120">
          </el-table-column>
          <el-table-column
              prop="contactPhone"
              label="手机号"
              width="120">
          </el-table-column>
          <el-table-column
              prop="addrDetail"
              label="收货地址"
              width="120">
          </el-table-column>
          <el-table-column
              prop="region"
              label="地区"
              width="200">
          </el-table-column>
          <el-table-column
              prop="buyNum"
              label="数量"
              width="120">
          </el-table-column>
          <el-table-column
              prop="amount"
              label="支付金额"
              width="120">
            <template slot-scope="scope">
              <span>￥{{ scope.row.amount }}</span>
            </template>
          </el-table-column>
          <el-table-column
              prop="salerName"
              label="经销商"
              width="120">
          </el-table-column>
          <el-table-column
              prop="desc"
              label="订单状态"
              width="120">
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="下单时间"
              width="120">
          </el-table-column>

          <el-table-column
              fixed="right"
              label="操作"
              width="240"
          >
            <template slot-scope="scope" >
              <el-button
                  type="text"
                  size="mini"
                  @click="sellerDetail(scope.row.orderId)"
              >查看详情</el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>

      <!--工具条-->
      <el-col :span="24" class="footer-toolbar">
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
        title="请输入不通过理由"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="cancelDialog">
      <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="failReason">
      </el-input>
      <div style="text-align: center;margin-top: 30px">
        <el-button size="small" @click="cancelDialog">取 消</el-button>
        <el-button size="small" type="primary" @click="disapproval">确 定</el-button>
      </div>

    </el-dialog>


  </div>
</template>

<script>
  export default {
    name: "Reviewmanage",
    // beforeRouteLeave(to, from, next) {
    //   // console.log(to.path)
    //   if (to.path !== '/seller/review/addSeller') {
    //     next()
    //   }else {
    //     next("/seller/review/")
    //   }
    // },
    data(){
      return{
        listLoading:false,

        //状态列表
        authStatusList:[
          {
            code:null,
            name:"全部"
          },
          {
            code:"1",
            name:"待支付"
          },
          {
            code:"2",
            name:"待发货"
          },
          {
            code:"3",
            name:"待收货"
          },
          {
            code:"4",
            name:"已完成"
          },
          {
            code:"5",
            name:"已取消"
          },
        ],
        buyNumList:[
          {
            code:null,
            name:"全部"
          },
          {
            code:"1",
            name:"1"
          },
          {
            code:"2",
            name:"2"
          },
        ],

        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],

        filters: {
          //审核状态：1-待审核；2-审核通过；3-审核未通过；4-待激活
          authStatus :null,
          //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
          commercial:'',
          //区域: 1-城镇；2-乡村
          district:'',
          //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
          searchType:'',
          //模糊搜索内容
          keywords:'',
          //开始时间
          // appStartTime:'',
          // //结束时间
          // appEndTime:'',
          time:[],

          //门店所在省份编码
          addrProvince:'',
          //门店所在城市编码
          addrCity:'',
          //门店所在区县编码
          addrArea:'',

          buyNum:null

        },
        //表单内容
        newList:[],

        //每页条数
        pageSize:10,

        pageNo: 1,
        //当前页码
        currentPage:1,
        //总条数
        total:0,

        //批量通过
        batchPass : true,
        ids:'',

        //审批不通过原因
        dialogVisible:false,
        failReason:'',
        sellerIds:'',

        headers: {
          "token": sessionStorage.getItem("access_token"),
          "loginId": sessionStorage.getItem("access_loginId")
        },
        addPool: {

        },
        sourceFiles: []
      }

    },
    created(){
      this.getListNewList()
      this.getOneCategory()
    },
    methods:{
      addNewSeller(){
        this.$router.push({
          'path':'/seller/review/addSeller'
        })
      },
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/lsh/seller-manager/region/province',{}, true, (res) => {
          this.cateLvl1List = [...res]
        })
      },
      selectBrand1(){
        this.filters.addrCity = ''
        this.cateLvl2List = []
        this.filters.addrArea = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.filters.addrProvince  == '')return
        this.$request.post('/lsh/seller-manager/region/newCity',{parentCode:this.filters.addrProvince}, true, (res) => {
          this.cateLvl2List = [...res]
        })
      },
      selectBrand2(){
        this.filters.addrArea = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.filters.addrCity == '')return
        this.$request.post('/lsh/seller-manager/region/newDistrict',{parentCode:this.filters.addrCity}, true, (res) => {
          this.cateLvl3List = [...res]
        })
      },
      //获取列表
      getListNewList() {
        let params = {
          //订单状态
          orderStatus:this.filters.authStatus,
          buyNum:this.filters.buyNum,
          //关键词
          // keywords:this.filters.keywords,

          //地区
          provinceId: this.filters.addrProvince,
          cityId: this.filters.addrCity,
          areaId: this.filters.addrArea,
          //时间
          startTime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          endTime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',

          pageNo: this.pageNo,
          pageSize: 10,

        };
        if(this.filters.searchType&&this.filters.keywords){
          params[this.filters.searchType] = this.filters.keywords
        }
        this.postSearch(params)
      },
      postSearch(params) {
        // this.listLoading = true;
        this.$request.post('/fxweb/fxsaas/getOrders', params, true, (res) => {

            console.log(res.data)
            // this.listLoading = false;
            this.newList = res.data.listData
            this.total = res.data.pageResult.count
            this.pageNo = res.data.pageResult.pageNo

        })
      },
      //查詢
      commitForm() {
        this.pageNo = 1
        this.currentPage = 1
        this.getListNewList()
      },
      //重置
      getStatus() {
        //审核状态：1-待审核；2-审核通过；3-审核未通过；4-待激活
        this.filters.authStatus = null,
        //业态 : 1-食杂店；2-便利店；3-超市；4-商场；5-烟酒商店；6-娱乐服务；7-其他
        this.filters.commercial = '',
        //区域: 1-城镇；2-乡村
        this.filters.district = '',
        //搜索类型  1-店主联系人名称；2-店主联系人电话；3-烟草专卖许可证号；4-门店名称；5-业务员名称
        this.filters.searchType = '',
        //模糊搜索内容
        this.filters.keywords = '',

        this.filters.time = [];
        //开始时间
        this.filters.appStartTime = '',
        //结束时间
        this.filters.appEndTime = '',

        //门店所在省份编码
        this.filters.addrProvince = '',
        //门店所在城市编码
        this.filters.addrCity = '',
        //门店所在区县编码
        this.filters.addrArea = '',

        this.pageNo = 1
        this.currentPage = 1
        this.getListNewList()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
      },

      //审批通过
      approval(sellerIds){
        let params = {sellerIds,authResult:1}
        this.$confirm(`您确定审核通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/approvalBatch',params,false,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.getListNewList()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
            }
          })
        })
      },
      //审批不通过
      disapprovalDialog(sellerIds){
        this.dialogVisible = true
        this.sellerIds = sellerIds
      },
      disapproval(){
        let params = {sellerIds:this.sellerIds,authResult:2,failReason:this.failReason}
        this.$confirm(`您确定审核不通过吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/lsh/seller-manager/seller/approvalBatch',params,false,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
            }else{
              this.$message({
                message: res.message,
                type: 'warning'
              });
              this.dialogVisible = false
              this.failReason = ""
              this.getListNewList()
            }
          })
        })
      },
      cancelDialog(){
        this.dialogVisible = false
        this.failReason = ""
      },
      sellerDetail(orderId){
        this.$router.push({
          path:'/distribution/orderDetail?orderId='+orderId
        })
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getListNewList()
      },

      exportData(){//导出
        var url = "/fxweb/fxsaas/exportOrders";
        var xhr = new XMLHttpRequest();
        var formData = new FormData();
        let params = {
          //地区
          provinceId: this.filters.addrProvince,
          cityId: this.filters.addrCity,
          areaId: this.filters.addrArea,
          //时间
          startTime: this.filters.time?this.filters.time[0]?this.filters.time[0]:'':'',
          endTime: this.filters.time?this.filters.time[1]?this.filters.time[1]:'':'',
        };
        if(this.filters.searchType&&this.filters.keywords){
          params[this.filters.searchType] = this.filters.keywords
        }
        for(var attr in params) {
          formData.append(attr, params[attr]);
        }
        xhr.overrideMimeType("text/plain; charset=x-user-defined");
        xhr.open('POST', url, true);
        xhr.responseType = "blob";
        xhr.responseType = "arraybuffer"
        xhr.setRequestHeader("token", sessionStorage.getItem('access_token'));
        xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'));
        xhr.onload = function(res) {
          if (this.status == 200) {
            var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
            var respHeader = xhr.getResponseHeader("Content-Disposition");
            var fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1]);
            if (window.navigator.msSaveOrOpenBlob) {
              navigator.msSaveBlob(blob, fileName);
            } else {
              var link = document.createElement('a');
              link.href = window.URL.createObjectURL(blob);
              link.download = fileName;
              link.click();
              window.URL.revokeObjectURL(link.href);
            }
          }
        }
        xhr.send(formData);
      },
      handlerSourceFileBUpload(file) {
      },
      // 文件上传控制。成功之后的回调
      handleSourceFileSuccess(res, file) {
        if(res.ok) {
          this.$message({type:'success', message:'上传成功！'});
        } else {
          this.$message.error(res.msg);
        }
      },
      // 卡密文件上传之后，删除文件
      handleSourceFileRemove(file, fileList) {
        this.sourceFiles = []; // 清空上传文件内容的引用
      },
    }
  }
</script>

<style lang="scss" scoped>
  .review-manage-container{
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
  .review-manage-container .el-table{text-align: center}
  .review-manage-container .el-table th{text-align: center}
  .review-manage-container .el-table td{text-align: center}
  .review-manage-container .mini .el-form-item__label {width: 40px!important;}
</style>