/**
* 超级管理员管理角色
* 1. 管理各个组织下的角色、菜单
*/
<template>
  <div class="menu-container">
    
  </div>
</template>

<script>
  export default {
    data() {
      var validMenuCode = (rule, value, callback) => {
        if( value.length>30 ) {
            callback(new Error('菜单编码不能超过30个字符！'));
        } else {
            callback();
        }
      };
      return {
        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },
        loading: false, // 是否查询中
        form: {
        },
        tableList: []// 列表展示内容，包括查询条件后的数据展示
      };
    },
    watch: {
      filterText(val) {
        this.$refs.treeDatas.filter(val);
      }
    },
    created() {
    },
    mounted() {
    },
    methods: {
    }
  };
</script>

<style lang="scss" scoped>
</style>