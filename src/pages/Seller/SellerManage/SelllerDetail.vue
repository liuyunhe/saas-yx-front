<template>
  <section class="seller-detail-container">
<!--    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">-->
<!--      <el-tab-pane label="基本信息" name="1">-->
<!--        <seller-msg1 :sellerId="sellerId" :returnPath="returnPath"></seller-msg1>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="店铺粉丝" name="2">-->
<!--        <seller-msg2 :sellerId="sellerId" :returnPath="returnPath"></seller-msg2>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="扫码返现" name="3">-->
<!--        <seller-msg3 :sellerId="sellerId" :returnPath="returnPath"></seller-msg3>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="账单流水" name="4">-->
<!--        <seller-msg4 :sellerId="sellerId" :returnPath="returnPath"></seller-msg4>-->
<!--      </el-tab-pane>-->
<!--      <el-tab-pane label="入库明细" name="5">-->
<!--        <seller-msg5 :sellerId="sellerId" :returnPath="returnPath"></seller-msg5>-->
<!--      </el-tab-pane>-->
<!--    </el-tabs>-->
    <seller-msg1 :sellerId="sellerId" :returnPath="returnPath"></seller-msg1>
  </section>
</template>

<script>
  import SellerMsg1 from '../components/SellerMsg1'
  import SellerMsg2 from '../components/SellerMsg2'
  import SellerMsg3 from '../components/SellerMsg3'
  import SellerMsg4 from '../components/SellerMsg4'
  import SellerMsg5 from '../components/SellerMsg5'
  export default {
    name: "SelllerDetail",
    props:['sellerId'],
    components :{
      SellerMsg1,
      SellerMsg2,
      SellerMsg3,
      SellerMsg4,
      SellerMsg5,
    },
    data() {
      return {
        activeName: '1',

        returnPath:'/seller/mgr'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .seller-detail-container{
    background-color:   #fff;
    padding: 30px 15px;
    color:#606266 ;
  }

</style>
