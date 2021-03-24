<template>
  <div class="home-container">
    <el-container class="home-container">
      <el-aside width="216px">
        <div class="left">
          <div class="logo">
<!--            <img src="http://qoss.qrmkt.cn/new_platform/pc/top_logo_mini.png" alt="">-->
          </div>
          <div class="parent-menu">
            <ul>
              <li ref="parentMenu" v-for="(item, index) in menuList" :key="item.id" @click="getsonMenuList(item, index)" :class="pathOneMenuActive ? (item.menuUrl == pathOneMenuActive ? 'active' : '') : (index == oneMenuIndex ? 'active' : '')">
                <img :src="pathOneMenuActive ? (item.menuUrl == pathOneMenuActive ? item.activeIcon : item.icon) : (index == oneMenuIndex ? item.activeIcon : item.icon)">
                <router-link :to="item.menuUrl">{{item.menuName}}</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="right">
          <div class="menuName">{{nowMenuName}}</div>
          <div class="son-menu">
            <ul>
              <li v-for="(item, index) in sonMenuList" :key="item.id" @click="getGrandsonMentList(item, index)" ref="sonMenu" :class="pathTowMenuActive ? (item.menuUrl == pathTowMenuActive ? 'active' : '') : (index == towMenuIndex ? 'active' : '')">
                <router-link :to="item.menuUrl">{{item.menuName}}</router-link>
              </li>
            </ul>
          </div>
        </div>
      </el-aside>
      <el-container>
        <el-header>
          <div class="grandson-menu">
            <el-dropdown class='user-info-home'>

              <span class="el-dropdown-link">
                <span>{{name}}</span>
                <i class="el-icon-arrow-down el-icon--right"></i>
              </span>
              <el-dropdown-menu slot="dropdown" class='down-home-item'>
                <el-dropdown-item>用户名：{{name}}</el-dropdown-item>
                <el-dropdown-item>公司：{{orgName}}</el-dropdown-item>
                <el-dropdown-item divided>
                  <div class="btns">
                    <div class="user-btn">
                      <router-link to='/setting/user/modPwd'>修改密码</router-link>
                    </div>
                  </div>

                </el-dropdown-item>
                <el-dropdown-item divided>
                  <div class="btns">
                    <div class="user-btn" @click='handleClose'>退出登录</div>
                  </div>

                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <ul>
              <li v-for="(item, index) in grandsonMenuLisy" :key="index" @click="getPages(item, index)" ref="grandsonMenu" :class="pathThreeMenuActive ? (item.menuUrl == pathThreeMenuActive ? 'active' : '') : (index == threeMenuIndex ? 'active' : '')">
                <router-link :to="item.menuUrl">{{item.menuName}}</router-link>
              </li>
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
import store from '@/store/index'
import {mapGetters} from 'vuex'
export default {
  components: {
    draggable
  },
  store,
  data() {
    return {
      menuList: [],
      sonMenuList: [],
      grandsonMenuLisy: [],
      nowMenuName: '首页',
      account: '',
      name: '',
      orgName: '',
      dialogVisible: false,
      pathOneMenuActive: '',
      pathTowMenuActive: '',
      pathThreeMenuActive: '',
      oneMenuIndex: 0,
      towMenuIndex: 0,
      threeMenuIndex: 0,
    }
  },
  created() {
    this.init()
  },
  watch: {
    $router(to, from) {
      // console.log(to)
    }
  },
  provide(){    //在父组件中创建属性
    return {
      routerRefresh: this.routerRefresh
    }
  },
  methods: {
    init() {
      this.getMenuList()
      this.getUserInfo()
      this.menuActive()
    },
    routerRefresh(){
      this.menuActive() // 刷新菜单样式
    },
    goFirstSonMenu() {
      let path = location.hash.replace('#', ''),
          newPath = ''
      if (path === '/home') {
        if (this.menuList[0].nodeList.length > 0) {
          if (this.menuList[0].nodeList[0].nodeList.length > 0) {
            newPath = this.menuList[0].nodeList[0].nodeList[0].menuUrl
            this.pathOneMenuActive = this.menuList[0].menuUrl
            this.pathTowMenuActive = this.menuList[0].nodeList[0].menuUrl
            this.pathThreeMenuActive = this.menuList[0].nodeList[0].nodeList[0].menuUrl
          } else {
            newPath = this.menuList[0].nodeList[0].menuUrl
            this.pathOneMenuActive = this.menuList[0].menuUrl
            this.pathTowMenuActive = this.menuList[0].nodeList[0].menuUrl
            this.initGrandsonMenu(this.menuList[0].nodeList[0])
          }
        } else {
          newPath = this.menuList[0].menuUrl
          this.pathOneMenuActive = this.menuList[0].menuUrl
        }
        this.$router.push(newPath)
      }
      // this.menuList.filter(item => {
      //   return item.menuUrl == path
      // })
      // console.log(this.menuList.indexOf(path))
    },
    getUserInfo() {
      var that = this
      this.$request.post(
        '/api/wiseqr/user/cluser',
        {},
        true,
        res => {
          if (res.ret == '200000') {
            var data = res.data || {}
            let cluser = {
              account: data.account,
              name: data.name,
              orgId: data.orgId,
              orgName: data.orgName,
              orgRegion: data.orgRegion
            }
            // sessionStorage.setItem('cluser', JSON.stringify(cluser))
            that.$store.commit('setCluser', cluser)
            that.account = data.account
            that.name = data.name
            that.orgName = data.orgName
            sessionStorage.setItem('account',that.account)
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    // 获取菜单
    getMenuList() {
      this.$request.post(
        `/api/wiseqr/menu/all`,
        {
          service: 'browser'
        },
        true,
        res => {
          if (res.ret === '200000') {
            this.menuList = res.data
            this.$store.commit('setMenu', res.data)
            // sessionStorage.menu = JSON.stringify(res.data)
            this.sonMenuList = res.data[0].nodeList
            // this.initGrandsonMenu(this.sonMenuList[0])
            this.menuActive()
            this.goFirstSonMenu()
          } else {
            this.$message.error(res.message)
          }
        }
      ),
        err => {
          console.log(err)
        }
      // this.menuList = this.$store.state.menu
      // // console.log(this.menuList)
      // this.menuActive()
    },
    // 页面刷新的时候 加载对应的菜单样式
    menuActive() {
      this.pathOneMenuActive = '/' + location.hash.split('/').slice(1, 2)
      this.pathTowMenuActive = '/' + location.hash .split('/').slice(1, 3).join('/')
      if (location.hash.split('/')[3]) {
        const url = location.hash.split('/').slice(1, 4).join('/')
        const index = url.indexOf('?')
        if (index !== -1) {
          this.pathThreeMenuActive = '/' + url.substring(0, index)
        } else {
          this.pathThreeMenuActive = '/' + url
        }
      }
      this.menuList.forEach(item => {
        if (item.menuUrl == this.pathOneMenuActive) {
          this.nowMenuName = item.menuName
          this.sonMenuList = item.nodeList
        }
      })
      this.sonMenuList.forEach(item => {
        if (item.menuUrl == this.pathTowMenuActive) {
          this.initGrandsonMenu(item)
        }
      })
      // this.initGrandsonMenu(this.sonMenuList[0])
    },
    // 获取子级菜单(子级)
    getsonMenuList(item, index) {
      this.$router.push(item.nodeList[0].menuUrl)
      // if (location.hash)
      this.pathOneMenuActive = ''
      this.pathTowMenuActive = ''
      this.pathThreeMenuActive = ''
      this.oneMenuIndex = index
      this.towMenuIndex = 0
      this.threeMenuIndex = 0
      this.sonMenuList = item.nodeList
      this.nowMenuName = item.menuName
      this.initGrandsonMenu(this.sonMenuList[0])
    },
    // 获取次子菜单(孙子级)
    getGrandsonMentList(item, index) {
      this.pathTowMenuActive = ''
      this.pathThreeMenuActive = ''
      this.towMenuIndex = index
      this.threeMenuIndex = 0
      this.initGrandsonMenu(item)
    },
    // 获取页面详情
    getPages(item, index) {
      this.pathThreeMenuActive = ''
      this.threeMenuIndex = index
    },
    // 初始化次子级菜单(孙子级)
    initGrandsonMenu(son) {
      if (son.nodeList.length > 0) {
        this.grandsonMenuLisy = son.nodeList
        if (location.hash.replace('#', '') == son.menuUrl) {
          this.$router.push(son.nodeList[0].menuUrl)
          this.pathThreeMenuActive = son.nodeList[0].menuUrl
        }
      } else {
        this.grandsonMenuLisy = []
        this.grandsonMenuLisy.push(son)
        this.pathThreeMenuActive = son.menuUrl
      }
    },
    logout() {
      var that = this
      this.$request.post(
        '/api/sys/login/logout',
        {},
        true,
        res => {
          if (res.ret == '200000') {
            that.dialogVisible = false
            // that.$router.push('/login')
            that.$router.replace({name: 'Login'})
          } else {
            this.$message.error(res.message)
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    handleClose(done) {
      var that = this
      this.$confirm('确定要退出登录？')
        .then(_ => {
          that.logout()
        })
        .catch(_ => {})
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
  .el-aside {
    height: 100%;
    user-select:none;
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
      width: 96px;
      .logo {
        width: 100%;
        height: 65px;
        line-height: 65px;
        text-align: center;
        img {
          width: 30px;
          vertical-align: middle;
        }
      }
      .parent-menu {
        li {
          text-align: left;
          padding-left: 18px;
          padding-bottom: 1px;
          box-sizing: border-box;
        }
        img {
          vertical-align: -5%;
          max-width: 14px;
          max-height: 14px;
          margin-right: 5px;
        }
      }
      a {
        color: #fff;
      }
      li.active {
        background-color: #3289FF;
        // a {
        //   color: #333;
        // }
      }
    }
    .right {
      float: left;
      width: 120px;
      height: 100%;
      background-color: #fff;
      overflow: auto;
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
        li.active {
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
      position: relative;
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
        }
      }
      li.active {
        border-bottom: 2px solid #38f;
      }
      .user-info-home {
        width: 100px;
        height: 100%;
        position: absolute;
        right: 0;
        top: 0;
        color: #000;
        line-height: 50px;
        i {
          position: absolute;
          right: 0;
          top: 50%;
          margin-top: -7px;
        }
        .el-dropdown-link {
          cursor: pointer;
          display: block;
          span {
            overflow: hidden;
            text-overflow: ellipsis;
            display: inline-block;
            white-space: pre;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
            /*! autoprefixer: off */
    				/* autoprefixer: on */
    				white-space: pre;
            width: 70px !important;
          }
        }
      }
      .btns {
        .user-btn {
          width: 50%;
        }
      }
    }
  }
}
</style>
