<template>
  <el-row class="container">
    <el-col :span="24" class="header">
      <el-col :span="4" class="userinfo">
        <el-dropdown trigger="hover">
          <span class="el-dropdown-link userinfo-inner">{{sysUserName}}<img :src="this.sysUserAvatar" /></span>
          <el-dropdown-menu slot="dropdown" class="user-dropdown-menu">
            <el-dropdown-item disabled>账号：{{ sysAdmin }}</el-dropdown-item>
            <el-dropdown-item disabled>角色：{{ '系统管理员' }}</el-dropdown-item>
            <el-dropdown-item disabled>归属：{{ '集团总部' }}</el-dropdown-item>
            <el-dropdown-item divided >
              <span class="userinfo-btn">修改密码</span>
              <span class="userinfo-btn" style="float: right" @click="logout">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-col>
      <el-col :span="4" class="logo-bar">
        <span>logo</span>
      </el-col>
      <el-col  class="menu">
        <el-menu
          :default-active="$route.path"
          class="el-menu crm-home"
          mode="horizontal"
          router
          @select="handleSelect"
          background-color="#202A3E"
          text-color="#fff"
          active-text-color="#fff"
        >
          <!--单级菜单-->
          <el-menu-item index="/Home">首页</el-menu-item>
          <!--循环遍历多级菜单-->
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <el-submenu :index="index+''" v-if="!item.leaf">
              <template slot="title">{{item.name}}</template>
              <el-menu-item :class="{'is-active':$route.path === child.path}" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</el-menu-item>
            </el-submenu>
          </template>
        </el-menu>
      </el-col>
    </el-col>
    <el-col :span="24" class="main">
      <section class="left-menu">
        <el-row class="tac">
          <el-col :span="12">
            <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose">
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <template slot="title">分组一</template>
                  <el-menu-item index="1-1">选项1</el-menu-item>
                  <el-menu-item index="1-2">选项2</el-menu-item>
                </el-menu-item-group>
                <el-menu-item-group title="分组2">
                  <el-menu-item index="1-3">选项3</el-menu-item>
                </el-menu-item-group>
                <el-submenu index="1-4">
                  <template slot="title">选项4</template>
                  <el-menu-item index="1-4-1">选项1</el-menu-item>
                </el-submenu>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">导航二</span>
              </el-menu-item>
              <el-menu-item index="3" disabled>
                <i class="el-icon-document"></i>
                <span slot="title">导航三</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-setting"></i>
                <span slot="title">导航四</span>
              </el-menu-item>
            </el-menu>
          </el-col>
        </el-row>
      </section>
      <section class="content-container">
        <div class="grid-content bg-purple-light clearfix" style="width: 100%">
          <el-col :span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </el-col>
        </div>
      </section>

    </el-col>
    <div>
      <div></div>
    </div>
  </el-row>

</template>

<script>
    export default {
        name: "",
        data() {
            return {
              breadcrumb:true,
              //菜单
              isCollapse:true,
              isCollapseTransition:false,
              //顶部导航
              activeIndex: '',
              //用户头像图片
              sysUserAvatar:'',
              //用户姓名
              sysUserName:'',
              //用户账号
              sysAdmin:'',
            }
        },
        methods:{
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          logout() {
            let _this = this

            this.$confirm('确认要离开吗?','提示',{
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            })
              .then(()=>{
                sessionStorage.removeItem('user')
                _this.$router.push('/login')
              })
              .catch(()=>{

              })
          },
          handleSelect() {

          }
        },
        mounted() {
          let user = sessionStorage.getItem('user');
          if(user) {
            user = JSON.parse(user)
            this.sysUserName = user.name || ''
            this.sysUserAvatar = user.avatar || ''
            this.sysAdmin = user.username || ''
          }
          console.log(this.$route.path)
        }
    }
</script>

<style lang="scss" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .userinfo-btn{
    cursor: pointer;
    &:hover{
      color: #4A7DE1;
    }
  }
  .user-dropdown-menu{
    width: 160px;
    background-color: rgba(26,37,58,1);
    .el-dropdown-menu__item.is-disabled{
      color: #fff!important;
      font-size: 12px;
      height:30px;
      line-height: 30px;
    }
    .el-dropdown-menu__item.el-dropdown-menu__item--divided{
      font-size: 12px;
      height:30px;
      line-height: 30px;
      color: #fff!important;
      cursor: inherit;
      border: none;
      padding: 0 15px;
      &:hover{
        background-color: rgba(26,37,58,1);
      }
      &:before{
        background-color: rgba(26,37,58,1);
        margin: 0px;
        border-top: 1px solid #0B1019;
      }
    }
  }
  .container{
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    /*min-width: 1340px;*/
    .header{
      border-bottom: solid 1px #e6e6e6;
      background: #202A3E;
      color:#fff;
      .logo-bar{
        line-height: 66px;
        font-size: 20px;
        font-weight: bolder;
        width: 200px;
      }
      .menu {
        /*background: $color-primary;*/
        width: auto;
        float:left;
        height: 66px;
        line-height: 66px;
        padding: 4px 0;
        .el-menu{
          border: none;
          box-sizing: border-box;
          .el-menu-item{
            float: left;
          }
        }
      }
      .userinfo {
        width: 190px;
        text-align: right;
        padding-left: 20px;
        padding-right: 35px;
        float: right;
        line-height: 66px;
        .el-dropdown{
          height: 58px;
        }
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 13px 10px 13px 0px;
            float: left;
          }
        }
      }
    }
    .main {
      display: flex;
      // background: #324057;
      position: absolute;
      top: 66px;
      bottom: 0px;
      overflow-x: hidden;
      aside {
        flex:0 0 230px;
        width: 230px;
        // position: absolute;
        // top: 0px;
        // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
        .el-menu.el-menu-vertical-demo{
          width: inherit!important;
        }
      }
      .left-menu{
        position: fixed;
      }
      .content-container {
        margin-left: 200px;
        flex:1;
        .grid-content{
          width: 100%;
          height: 100%;
          overflow: auto;
          .content-wrapper {
            background-color: #fff;
            box-sizing: border-box;
          }
        }

      }
    }
  }
</style>
