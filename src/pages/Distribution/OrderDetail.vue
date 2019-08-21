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
      <el-form style="margin-left: 60px" label-width="100px" disabled>
        <el-form-item label="抢购人:">
          <el-input style="width: 400px" v-model="ruleForm.contactName"></el-input>
        </el-form-item>
        <el-form-item label="手机号:">
          <el-input style="width: 400px" v-model="ruleForm.contactPhone"></el-input>
        </el-form-item>
        <el-form-item label="收货地址:">
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
      <el-button type="primary" @click="cancelModify">确定</el-button>
      <el-button @click="returnMgr">取消</el-button>
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

        ruleForm: {
          contactName: "",
          contactPhone: "",
          addrDetail:""
        },
        rules: {
          headImg: [
            { required: true, message: '请上传门店照片', trigger: 'change' },
          ],
          shopName: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          ownerName: [
            { required: true, message: '请输入经营人姓名', trigger: 'blur' },
          ],
          phoneNo: [
            { required: true, message: '请输入经营人电话', trigger: 'blur' },
          ],
          addrProvince: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          addrCity: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          addrArea: [
            { required: true, message: '请选择地区', trigger: 'change' },
          ],
          addrDetail: [
            { required: true, message: '请输入门店地址', trigger: 'blur' },
          ],
          licenceNo: [
            { required: true, message: '请输入烟草专卖证号', trigger: 'blur' },
          ],
          licenceImg: [
            { required: true, message: '请上传烟草专卖证号照片', trigger: 'change' },
          ],
          district: [
            { required: true, message: '请选择区域', trigger: 'change' },
          ],
          commercial: [
            { required: true, message: '请选择业态', trigger: 'change' },
          ],
          salesManNames: [
            { required: true, message: '请输入业务员姓名', trigger: 'change' },
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'change' },
          ],
          contactPhone: [
            { required: true, message: '请输入联系人电话', trigger: 'change' },
          ],
          authStatus: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
          failReason: [

          ],


        },
        orderTrack:[],
      }
    },
    created(){
      this.getReviewDetail()
      this.getOrderTrack()
    },
    methods:{

      //从后台拿取商品类型列表
      // getProductType(){
      //   this.$request.post('/sc/saotx/mall/giftTypeMap',{}, true, (res) => {
      //     if (res.ret == '200000') {
      //       this.productTypeList = [...this.productTypeList,...res.data]
      //     }
      //   })
      // },

      getReviewDetail(){
        this.$request.post('/fxweb/fxsaas/getOrderDetail',{orderId:this.orderId},true,res => {
          if (res.ok) {
            this.buyNum = res.data.buyNum
            this.region = res.data.region
            this.nickname = res.data.nickname
            this.salerName = res.data.salerName
            this.invitCode = res.data.invitCode
            this.amount = res.data.amount
            this.ruleForm.contactName = res.data.contactName
            this.ruleForm.contactPhone = res.data.contactPhone
            this.ruleForm.addrDetail = res.data.addrDetail
            //状态
            // this.ruleForm.authStatus = res.data.sellerInfo.authStatus+''
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
      cancelModify(){
        this.disabled = !this.disabled
        this.$refs['ruleForm'].resetFields();
        this.getReviewDetail()
      }
    },
  }
</script>