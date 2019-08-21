<template>
  <section class="seller-detail-container">
    <dealer-msg1 :salerId="salerId" :returnPath="returnPath"></dealer-msg1>
    <el-tabs v-model="activeName" type="card" @tab-click="handleClick">

      <el-tab-pane label="TA的团队" name="1">
        <dealer-msg2 :salerId="salerId" :returnPath="returnPath"></dealer-msg2>
      </el-tab-pane>
      <el-tab-pane label="佣金明细" name="2">
        <dealer-msg3 :salerId="salerId" :returnPath="returnPath"></dealer-msg3>
      </el-tab-pane>
      <el-tab-pane label="提现记录" name="3">
<!--        <dealer-msg4 :salerId="salerId" :returnPath="returnPath"></dealer-msg4>-->
      </el-tab-pane>
      <el-tab-pane label="推广订单明细" name="4">
<!--        <dealer-msg5 :salerId="salerId" :returnPath="returnPath"></dealer-msg5>-->
      </el-tab-pane>
    </el-tabs>
  </section>
</template>

<script>
  import DealerMsg1 from './components/DealerMsg1'
  import DealerMsg2 from './components/DealerMsg2'
  import DealerMsg3 from './components/DealerMsg3'
  import DealerMsg4 from './components/DealerMsg4'
  import DealerMsg5 from './components/DealerMsg5'
  export default {
    name: "DealerDetail",
    props:['salerId'],
    components :{
      DealerMsg1,
      DealerMsg2,
      DealerMsg3,
      DealerMsg4,
      DealerMsg5,
    },
    data() {
      return {
        activeName: '1',

        returnPath:'/distribution/dealerMgr'
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