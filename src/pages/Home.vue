<template>
  <div class="home-container">
    <!-- <el-container>
      <el-header>
        <div class="top-logo">
          <img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/top_logo.png" alt="">
        </div>
      </el-header>
      <el-container>
        <el-aside width="250px">
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#fff" text-color="#000" active-text-color="#3287FF" :unique-opened="true">
            <el-submenu :index="item.idx + ''" v-for="item in menuList" :key="item.id">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{item.menuName}}</span>
              </template>
              <el-submenu :index="subItem.menuCode" v-for="subItem in item.nodeList" :key="subItem.id">
                <template slot="title">{{subItem.menuName}}</template>
                <el-menu-item :index="childItem.menuName" v-for="childItem in subItem.nodeList" :key="childItem.id">{{childItem.menuName}}</el-menu-item>
              </el-submenu>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container> -->
    <el-container class="home-container">
      <el-aside width="200px">
        <div class="left">
          <div class="logo">
            <img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/top_logo_mini.png" alt="">
          </div>
          <div class="parent-menu">
            <ul>
              <li ref="parentMenu" v-for="(item, index) in menuList" :key="item.id" @click="getsonMenuList(item, index)" :class="index == 0 ? 'active' : ''">{{item.menuName}}</li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="menuName">{{nowMenuName}}</div>
          <div class="son-menu">
            <ul>
              <li v-for="(item, index) in sonMenuList" :key="item.id" @click="getGrandsonMentList(item, index)"><a :href="item.menuCode" ref="sonMenu" :class="index == 0 ? 'active' : ''">{{item.menuName}}</a></li>
            </ul>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="grandson-menu">
            <ul>
              <li v-for="(item, index) in grandsonMenuLisy" :key="index" @click="getPages(item, index)"><a href="javascipt:;" ref="grandsonMenu" :class="index == 0 ? 'active' : ''">{{item.menuName}}</a></li>
            </ul>
          </div>
        </el-header>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
export default {
  components: {
    draggable
  },
  data() {
    return {
      menuList: [],
      sonMenuList: [],
      grandsonMenuLisy: [],
      nowMenuName: '首页'
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMenuList()
    },
    // 获取菜单
    getMenuList() {
      this.$request.post(`/api/saotx/menu/all`, { service: 'browser' }, true, res => {
        console.log(res)
        if (res.ret === '200000') {
          // this.$message.success('获取成功')
          this.menuList = res.data
          this.sonMenuList = res.data[0].nodeList
          this.initGrandsonMenu(this.sonMenuList[0])
        }
      }),
        err => {
          this.$message.erroe('获取数据失败!')
        }
    },
    // 获取子级菜单(子级)
    getsonMenuList(item, index) {
      this.$refs.parentMenu.forEach(item => {
        item.classList.remove('active')
      })
      this.$refs.parentMenu[index].classList.add('active')
      this.sonMenuList = item.nodeList
      this.nowMenuName = item.menuName
      this.initGrandsonMenu(this.sonMenuList[0])
      this.initJuniorStyle(this.$refs.sonMenu)
      this.initJuniorStyle(this.$refs.grandsonMenu)
    },
    // 获取次子菜单(孙子级)
    getGrandsonMentList(item, index) {
      this.$refs.sonMenu.forEach(item => {
        item.classList.remove('active')
      })
      this.$refs.sonMenu[index].classList.add('active')
      this.initGrandsonMenu(item)
      this.initJuniorStyle(this.$refs.grandsonMenu)
    },
    // 获取页面详情
    getPages(item, index) {
      this.$refs.grandsonMenu.forEach(item => {
        item.classList.remove('active')
      })
      this.$refs.grandsonMenu[index].classList.add('active')
    },
    // 初始化次子级菜单(孙子级)
    initGrandsonMenu(son) {
      if (son.nodeList.length > 0) {
        this.grandsonMenuLisy = son.nodeList
      } else {
        this.grandsonMenuLisy = []
        this.grandsonMenuLisy.push(son)
      }
    },
    // 重置下级默认样式
    initJuniorStyle(allSon) {
      allSon.forEach(item => {
        item.classList.remove('active')
      })
      allSon[0].classList.add('active')
    }
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  font-size: 14px;
  color: #fff;
  background: #d9e0e7;
  // 第一版
  // .el-container {
  //   width: 100%;
  //   height: 100%;
  //   .el-header {
  //     height: 50px;
  //     background-color: #fff;
  //     padding: 0;
  //     .top-logo {
  //       width: 250px;
  //       height: 100%;
  //       line-height: 50px;
  //       text-align: center;
  //       background-color: #283543;
  //       img {
  //         vertical-align: middle;
  //       }
  //     }
  //   }
  //   .el-aside {
  //     width: 200px;
  //     height: 100%;
  //     background-color: #283543;
  //   }
  // }
  .el-aside {
    height: 100%;
    background-color: #283543;
    ul {
      text-align: center;
    }
    li {
      height: 36px;
      line-height: 36px;
      margin-bottom: 14px;
    }
    .left {
      float: left;
      width: 40%;
      .logo {
        width: 100%;
        height: 65px;
        line-height: 65px;
        text-align: center;
        img {
          width: 40px;
          vertical-align: middle;
        }
      }
      li.active {
        background-color: #f8f8f8;
        color: #333;
      }
    }
    .right {
      float: left;
      width: 60%;
      height: 100%;
      background-color: #fff;
      .menuName {
        height: 50px;
        line-height: 50px;
        text-align: center;
        color: #000;
        box-sizing: border-box;
        border-bottom: 1px solid #f2f2f2;
      }
      ul {
        width: 100%;
        box-sizing: border-box;
        padding: 13px 10px;
        li {
          border-radius: 2px;
        }
        a {
          display: block;
          width: 100%;
          height: 100%;
        }
        a.active {
          background-color: #eee;
        }
        a:hover {
          color: #38f;
        }
      }
    }
  }
  .el-header {
    height: 50px !important;
    background-color: #fff;
    box-sizing: border-box;
    border-left: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    .grandson-menu {
      height: 100%;
      li {
        float: left;
        height: 50px;
        line-height: 50px;
        margin: 0 20px;
        box-sizing: border-box;
        a {
          display: block;
          width: 100%;
          height: 100%;
          box-sizing: border-box;
        }
      }
      a.active {
        border-bottom: 2px solid #38f;
      }
    }
  }
}
</style>
