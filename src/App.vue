<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
//以下为全局属性
  body,p {
    margin: 0px;
    padding: 0px;
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    color: #1A173B;
    font-size: 14px;
    -webkit-font-smoothing: antialiased;
  }
  ol, ul {
    list-style: none;
  }
  div{
    box-sizing: border-box;
  }
  i{
    font-style:normal
  }
  .fl{
    float: left;
  }
  .fr{
    float: right;
  }
  .clearfix:after{clear: both;display: block;visibility: hidden;height: 0;content: "";}
  .mr0{
    margin-right: 0px;
  }
  .view-container{
    padding: 30px;
    min-width: 1080px;
    max-width: 1440px;
    margin: 0 auto;
    box-sizing: border-box;
    overflow-y: auto;
  }
  #app {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
  }

  .el-menu-item [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }
  .el-submenu [class^=fa] {
    vertical-align: baseline;
    margin-right: 10px;
  }

  //按钮
  .el-button.important{
    color: #0077ff!important;
    border-color: #0077ff!important;
  }

  //顶部菜单栏
  .crm-home{
    .el-menu-item{
      width: 110px;
      text-align: center;
      border-bottom: none!important;
    }
    .el-submenu{
      .el-submenu__title{
        width: 110px;
        height: 62px!important;
        text-align: center;
        border-bottom: none!important;
        .el-submenu__icon-arrow {
          display: none;
        }
      }
    }

  }
  .el-menu--popup{
    min-width: 130px!important;
    text-align: center;
    padding: 0!important;
    .el-menu-item:hover{
      background-color: #0077FF!important;
    }
    .el-menu-item.is-active:hover{
      background-color: #0077FF!important;
      color: #fff!important;
    }
    .el-menu-item.is-active{
      color: #0077FF!important;
    }
  }

  //DropDown下拉菜单
  .el-dropdown-menu{
    padding: 0!important;
    .el-dropdown-menu__item.active{
      color: #0077FF;
    }
  }


  //表单下拉
  .el-select-dropdown{
    .el-select-dropdown__list{
      padding: 0!important;
    }
    .popper__arrow{
      display: none!important;
      &::after{
        display: none!important;
      }
    }
  }

  //用户账号下拉
  .user-dropdown-menu.el-popper[x-placement^=bottom] {
    .popper__arrow{
      display: none;
      &::after{
        display: none;
      }
    }
  }

  //
  .section-container{
    padding: 30px;
  }

  //面包屑只保留当前功能名称
  .el-breadcrumb{
    span.el-breadcrumb__item{
      display: none;
      &:last-child{
        display: block;
        font-size: 16px;
        .el-breadcrumb__inner {
          color: #555;
          font-weight: bold;
        }
      }
    }
  }
  .breadcrumb-container {
    margin-bottom: 30px;
    .title {
      width: 200px;
      float: left;
      color: #475669;
    }
    .breadcrumb-inner {
      float: left;
      line-height: 32px;
    }
  }

.el-select-dropdown__item{
  font-size: 13px!important;
  &.hover,&:hover{
    background-color: #0077FF!important;
    color: #fff!important;
  }
}
  //工具条
  .toolbar {
    margin-bottom: 30px;
    .el-form-item {
      margin-bottom: 0px;
      margin-right: 20px;
    }
    .el-form-item.mr0 {
      margin-bottom: 0px;
      margin-right: 0px;
    }
    .el-form-item__label{
      color: #8A96A0!important;
      text-align: left!important;
    }
  }
  //底部工具条
  .footer-toolbar {
    margin: 25px 0px 0px;
    .btn-jump-to{
      width: 50px!important;
      height: 28px;
      line-height: 28px;
      float: right;
      padding: 0 4px;
      margin: 2px 0px 2px 20px;
    }
  }

</style>
