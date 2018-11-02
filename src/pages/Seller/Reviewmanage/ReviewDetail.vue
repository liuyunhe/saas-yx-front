<template>
  <basic-msg :sellerId="sellerId" :returnPath="returnPath"></basic-msg>
</template>

<script>
  import BasicMsg from '../components/BasicMsg'
  export default {
    props:['sellerId'],
    name: "ReviewDetail",
    components:{
      BasicMsg
    },
    data(){
      return{
        returnPath:'/seller/review'
      }
    }


  }
</script>

<style scoped>

</style>