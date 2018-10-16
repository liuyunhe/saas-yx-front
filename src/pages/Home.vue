<template>
  <div class="home-container">
    <el-container>
      <el-header>
        <div class="top-logo">
          <img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/top_logo.png" alt="">
        </div>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu default-active="2" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item-group>
                <el-submenu>
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>导航1.1</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">选项1</el-menu-item>
                    <el-menu-item index="1-2">选项2</el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
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
        </el-aside>
        <el-main>Main</el-main>
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
  computed: {},
  created() {},
  data() {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  width: 100%;
  height: 100%;
  background: #d9e0e7;
  .el-container {
    width: 100%;
    height: 100%;
    .el-header {
      height: 50px;
      background-color: #fff;
      padding: 0;
      .top-logo {
        width: 200px;
        height: 100%;
        line-height: 50px;
        text-align: center;
        background-color: #283543;
        img {
          vertical-align: middle;
        }
      }
    }
    .el-aside {
      width: 200px;
      height: 100%;
      background-color: #283543;
    }
  }
}
</style>
