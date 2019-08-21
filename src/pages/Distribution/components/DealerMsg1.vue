<template>
  <section class="basic-msg-container">
    <div class="basic-msg-broad" v-loading="loading">
      <div class="basic-msg-item"><span class="title">经销商姓名：</span>{{ form.salerName }}</div>
      <div class="basic-msg-item"><span class="title">手机号：</span>{{ form.phoneNo }}</div>
      <div class="basic-msg-item"><span class="title">微信ID：</span>{{ form.wxId ? form.wxId:''}}</div>
      <div class="basic-msg-item"><span class="title">位置：</span>{{ form.provinceName }}{{ form.cityName }}{{ form.areaName }}</div>
      <div class="basic-msg-item"><span class="title">推荐人：</span>{{ form.higherName }}</div>
      <div class="basic-msg-item"><span class="title">推荐码：</span>{{ form.invitCode }}</div>
      <div class="basic-msg-item"><span class="title">团队数量：</span>{{ form.teamAcount }}人</div>
      <div class="basic-msg-item"><span class="title">累积金额：</span>￥{{ form.totalIncome }}</div>
      <div class="basic-msg-item"><span class="title">可提现金额：</span>￥{{ form.balance }}</div>
      <div class="basic-msg-item"><span class="title">已提现金额：</span>￥{{ form.totalPay }}</div>
      <div class="basic-msg-item"><span class="title">申请时间：</span>{{ new Date(form.ctime).Format('yyyy-MM-dd hh:mm:ss') }}</div>
      <div class="basic-msg-item"><span class="title">申请通过时间：</span>{{ new Date(form.appPassTime).Format('yyyy-MM-dd hh:mm:ss') }}</div>
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
    props:['salerId'],
    name: "",
    data() {
      return {
        loading:true,
        form:{}

      }
    },
    created(){
      console.log(this.salerId)
      this.getReviewDetail()
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
        this.$request.post('/fxweb/fxsaas/getSalerDetail',{salerId:this.salerId},true,res => {
          if (res.ok) {
            this.loading = false
            this.form = res.data
          }
        })
      },


    }
  }
</script>