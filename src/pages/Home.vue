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
		<!--<el-dialog title="提示" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
			<span>确定要退出登录？</span>
			<span slot="footer" class="dialog-footer">
				<el-button @click="dialogVisible = false">取 消</el-button>
				<el-button type="primary" @click="logout">确 定</el-button>
			</span>
		</el-dialog>-->
		<el-container class="home-container">
			<el-aside width="200px">
				<div class="left">
					<div class="logo">
						<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/top_logo_mini.png" alt="">
					</div>
					<div class="parent-menu">
						<ul>
							<li ref="parentMenu" v-for="(item, index) in menuList" :key="item.id" @click="getsonMenuList(item, index)" :class="index == 0 ? 'active' : ''"><router-link :to="item.menuUrl">{{item.menuName}}</router-link></li>
						</ul>
					</div>
				</div>
				<div class="right">
					<div class="menuName">{{nowMenuName}}</div>
					<div class="son-menu">
						<ul>
							<li v-for="(item, index) in sonMenuList" :key="item.id" @click="getGrandsonMentList(item, index)" ref="sonMenu" :class="index == 0 ? 'active' : ''">
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
										<div class="user-btn">修改密码</div>
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
							<li v-for="(item, index) in grandsonMenuLisy" :key="index" @click="getPages(item, index)" ref="grandsonMenu" :class="index == 0 ? 'active' : ''">
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
export default {
  components: {
    draggable
  },
  data() {
    return {
      menuList: [],
      sonMenuList: [],
      grandsonMenuLisy: [],
      nowMenuName: '首页',
      account: '',
      name: '',
      orgName: '',
      dialogVisible: false
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.getMenuList()
      this.getUserInfo()
    },
    getUserInfo() {
      var that = this
      this.$request.post(
        '/api/saotx/user/cluser',
        {},
        true,
        res => {
          console.log(res)
          if (res.ret == '200000') {
            var data = res.data || {}
            let cluser = {
              account: data.account,
              name: data.name,
              orgId: data.orgId,
              orgName: data.orgName,
              orgRegion: data.orgRegion
            };
            sessionStorage.setItem("cluser", JSON.stringify(cluser));
            that.account = data.account
            that.name = data.name
            that.orgName = data.orgName
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
        `/api/saotx/menu/all`,
        {
          service: 'browser'
        },
        true,
        res => {
          console.log(res)
          if (res.ret === '200000') {
            this.menuList = res.data
            this.sonMenuList = res.data[0].nodeList
            this.initGrandsonMenu(this.sonMenuList[0])
          }
        }
      ),
        err => {
          console.log(err)
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
    },
    comfirm() {},
    logout() {
      var that = this
      this.$request.post(
        '/api/sys/login/logout',
        {},
        true,
        res => {
          if (res.ret == '200000') {
            that.dialogVisible = false
            that.$router.replace({
              name: 'Login'
            })
          }
        },
        err => {
          console.log(err)
        }
      )
    },
    handleClose(done) {
    	var that=this;
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
        width: 90px;
        height: 65px;
        line-height: 65px;
        text-align: center;
        img {
          width: 50px;
          vertical-align: middle;
        }
			}
			a {
				color: #fff;
			}
      li.active {
        background-color: #f8f8f8;
        a {
					color: #333;
				}
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
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
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