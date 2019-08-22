<template>
  <section class="basic-msg-container">
    <el-card>
      <div slot="header" class="clearfix">
        <span>订单信息：</span>
      </div>
      <div class="basic-msg-broad">
        <div class="basic-msg-item"><span class="title">订单号：</span>{{ orderId }}</div>
        <div class="basic-msg-item"><span class="title">订单数量：</span>{{ buyNum }}</div>
        <div class="basic-msg-item"><span class="title">位置：</span>{{ region }}</div>
        <div class="basic-msg-item"><span class="title">微信号：</span>{{ nickname }}</div>
        <div class="basic-msg-item"><span class="title">经销商：</span>{{ salerName }}</div>
        <div class="basic-msg-item"><span class="title">推荐码：</span>{{ invitCode }}</div>
        <div class="basic-msg-item"><span class="title">支付金额：</span>￥{{ amount }}</div>

      </div>
    </el-card>
    <div style="height: 30px"></div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>收货人信息：</span>
      </div>
      <el-form style="margin-left: 60px" label-width="100px" :model="ruleForm" :rules="rules" ref="ruleForm" :disabled="orderStatus>2">
        <el-form-item label="抢购人:" prop="contactName">
          <el-input style="width: 400px" v-model="ruleForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="手机号:" prop="contactPhone">
          <el-input style="width: 400px" v-model="ruleForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item size="small" label="位置:" prop="provinceId">
          <el-select
              v-model="ruleForm.provinceId"
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
        <el-form-item size="small" label="" prop="cityId">
          <el-select
              v-model="ruleForm.cityId"
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
        <el-form-item size="small" label="" prop="areaId">
          <el-select
              v-model="ruleForm.areaId "
              placeholder="请选择"
              @change="selectBrand3"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl3List"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="收货地址:" prop="addrDetail">
          <el-input style="width: 400px" v-model="ruleForm.addrDetail"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <div style="height: 30px"></div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>订单跟踪：</span>
      </div>
      <div class="contnent" style="margin-left: 60px">
        <div v-for="(item,index) in orderTrack" class="dd-line" :key="index"><span>{{ item.timeString }}</span><span>订单状态：{{ item.desc }}</span></div>

      </div>
    </el-card>
    <div class="basic-msg-form-bt">
      <el-button type="primary" @click="cancelOrder">取消订单</el-button>
      <el-button type="primary" v-if="orderStatus<2" @click="submitModify">确定</el-button>
      <el-button @click="returnMgr">返回列表</el-button>
    </div>
  </section>
</template>

<style lang="scss" scoped>
  .basic-msg-container{
    background-color:   #fff;
    padding: 30px 15px;
    .basic-msg-broad{
      width: 940px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      color:#606266;
      margin-top: 30px;
      margin-bottom: 30px;
      .basic-msg-item{
        width: 33.3%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow:ellipsis ;
        white-space: nowrap;
        .title{
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
      }

    }
    .basic-msg-form-container{
      width: 940px;
      margin: 0 auto;
      .pic-tips{
        color: #ccc;
      }
    }
    .basic-msg-form-bt{
      margin-top: 30px;
      text-align: center;
    }
    .dd-line{
      line-height: 40px;
      span{
        margin-right: 60px;
      }
    }
  }
</style>
<style>
  .basic-msg-container .product-img .el-upload {
    width: 202px;
    height: 127px;

  }
  .basic-msg-container .product-url .el-upload {
    width: 202px;
    height: 202px;

  }
</style>
<script>
  export default {
    props:['orderId'],
    name: "",
    data() {
      return {
        disabled:true,
        returnPath:'/distribution/orderMgr',

        buyNum:'',
        region:'',
        nickname:'',
        salerName:'',
        invitCode:'',
        amount:'',

        orderStatus: 0,
        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],
        ruleForm: {
          contactName: "",
          contactPhone: "",
          provinceId: "",
          provinceName: "",
          cityId: "",
          cityName: "",
          areaId: "",
          areaName: "",
          addrDetail:"",
        },
        rules: {
          contactName: [
            { required: true, message: '请输入抢购人', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, message: '请输入手机号', trigger: 'blur' },
          ],
          provinceId: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          cityId: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          areaId: [
            { required: true, message: '请选择地区', trigger: 'change' },
          ],
          addrDetail: [
            { required: true, message: '请输入收货地址', trigger: 'blur' },
          ],
        },
        orderTrack:[],
      }
    },
    created(){
      this.getReviewDetail()
      this.getOrderTrack()
      // this.getOneCategory()
    },
    methods:{


      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/fxweb/fxsaas/getProvince',{}, false, (res) => {
          this.cateLvl1List = [...res.data]
        })
      },
      selectBrand1(item){
        let e = this.cateLvl1List.find((i)=>(i.code == item))
        this.ruleForm.provinceName = e.name
        this.ruleForm.cityName = ''
        this.ruleForm.cityId = ''
        this.cateLvl2List = []
        this.ruleForm.areaId = ''
        this.ruleForm.areaName = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.ruleForm.provinceId  == '')return
        this.$request.post('/fxweb/fxsaas/getCity',{parentCode:this.ruleForm.provinceId}, false, (res) => {
          this.cateLvl2List = [...res.data]
        })
      },
      selectBrand2(item){
        let e = this.cateLvl2List.find((i)=>(i.code == item))
        this.ruleForm.cityName = e.name
        this.ruleForm.areaId = ''
        this.ruleForm.areaName = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.ruleForm.cityId == '')return
        this.$request.post('/fxweb/fxsaas/getCounty',{parentCode:this.ruleForm.cityId}, false, (res) => {
          this.cateLvl3List = [...res.data]
        })
      },
      selectBrand3(item){
        let e = this.cateLvl3List.find((i)=>(i.code == item))
        this.ruleForm.areaName = e.name
      },
      getReviewDetail(){
        this.$request.post('/fxweb/fxsaas/getOrderDetail',{orderId:this.orderId},true,res => {
          if (res.ok) {
            this.buyNum = res.data.orderInfo.buyNum
            this.region = res.data.orderInfo.region
            this.nickname = res.data.orderInfo.nickname
            this.salerName = res.data.orderInfo.salerName
            this.invitCode = res.data.orderInfo.invitCode
            this.amount = res.data.orderInfo.amount
            this.ruleForm.contactName = res.data.orderAddress.contactName
            this.ruleForm.contactPhone = res.data.orderAddress.contactPhone
            this.ruleForm.provinceName = res.data.orderAddress.provinceName
            // this.ruleForm.provinceId = res.data.orderAddress.provinceId+""
            this.ruleForm.cityName = res.data.orderAddress.cityName
            // this.ruleForm.cityId = res.data.orderAddress.cityId+""
            this.ruleForm.areaName = res.data.orderAddress.areaName
            // this.ruleForm.areaId = res.data.orderAddress.areaId+""
            this.ruleForm.addrDetail = res.data.orderAddress.addrDetail

            this.orderStatus = res.data.orderInfo.orderStatus
            //状态
            // this.ruleForm.authStatus = res.data.sellerInfo.authStatus+''

            this.$request.post('/fxweb/fxsaas/getProvince',{}, false, (res1) => {
              this.cateLvl1List = [...res1.data]
              this.ruleForm.provinceId = res.data.orderAddress.provinceId+""
              this.$request.post('/fxweb/fxsaas/getCity',{parentCode:this.ruleForm.provinceId}, false, (res2) => {
                this.cateLvl2List = [...res2.data]
                this.ruleForm.cityId = res.data.orderAddress.cityId+""
                this.$request.post('/fxweb/fxsaas/getCounty',{parentCode:this.ruleForm.cityId}, false, (res3) => {
                  this.cateLvl3List = [...res3.data]
                  this.ruleForm.areaId = res.data.orderAddress.areaId+""
                })
              })
            })
          }
        })
      },
      getOrderTrack(){
        this.$request.post('/fxweb/fxsaas/getOrderTrack',{orderId:this.orderId},false,res => {
          this.orderTrack = res.data
        })
      },


      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {

            }

            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/lsh/seller-manager/seller/saveOrUpdateSeller',params,false,res => {
          if(res.ok){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.returnMgr()
          }else{
            this.$message({
              message:res.msg,
              type: 'warning'
            })
          }
        },err => {

        })
      },
      returnMgr(){
        this.$router.push({
          path:this.returnPath
        })
      },
      cancelOrder(){
        this.$confirm(`您确定取消此订单吗？`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$request.post('/fxweb/fxsaas/cancelOrder',{ orderId:this.orderId },false,res => {
            if(res.ok){
              this.$message({
                message: '操作成功！',
                type: 'success'
              });
              this.returnMgr()
            }else{
              this.$message({
                message:res.msg,
                type: 'warning'
              })
            }
          },err => {

          })
        })

      },
      submitModify(){
        this.$refs['ruleForm'].validate((valid) => {
          if (valid) {
            let params = this.ruleForm
            params.orderId = this.orderId
            let TEL_REGEXP = /^1[3456789]\d{9}$/;
            if(!TEL_REGEXP.test(params.contactPhone)){
              this.$message({
                message: '手机号格式不正确！',
                type: 'error'
              });
              return
            }
            this.$request.post('/fxweb/fxsaas/modifyOrderAddress',params,true,res => {
              if(res.ok){
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                this.returnMgr()
              }else{
                this.$message({
                  message:res.msg,
                  type: 'warning'
                })
              }
            },err => {

            })
          } else {
            return false;
          }
        });
      }
    },
  }
</script>