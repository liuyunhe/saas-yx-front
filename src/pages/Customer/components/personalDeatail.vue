<template>
  <div class="container">
    <el-card>
      <h3>个人信息</h3>
      <div class="con">
        <div class="left">
          <img :src="userInfo.headimg">
        </div>
        <div class="right">
          <p>
            <span class="mr20">{{userInfo.nickname}}</span>
            <span>{{userInfo.gender == 1 ? '男' : '女'}}</span>
          </p>
          <p>
            <img v-if="userInfo.gradeImg" :src="userInfo.gradeImg" class="gradeImg" width="20" height="20"><span>{{userInfo.gradeName}}</span>
          </p>
          <p class="info">
            联系方式：<span>{{userInfo.mobile}}</span>
            生日：<span>{{userInfo.birthday}}</span>
            注册时间：<span>{{userInfo.scribeTime ? new Date(userInfo.scribeTime).Format('yyyy-MM-dd') : ''}}</span>
          </p>
          <p class="info">
            所属地区：<span>{{userInfo.province}}{{userInfo.city}}</span>
          </p>
          <el-button type="primary" plain @click="dialogVisible = true">增减积分</el-button>
          <div class="asset">
            <div class="score">
              <div class="title">用户积分</div>
              <div class="num">{{userInfo.points}}</div>
            </div>
            <div class="growth">
              <div class="title">用户成长值</div>
              <div class="num">{{userInfo.growth}}</div>
            </div>
          </div>
          <div class="tabs">
            <div :class="tabsActive == 1 ? 'active' : ''" @click="tabsActive = 1">积分明细</div><div :class="tabsActive == 2 ? 'active' : ''" @click="tabsActive = 2">权益明细</div>
          </div>
          <el-table border v-loading="load" :data="pointsList" :stripe="true" v-show="tabsActive == 1">
            <el-table-column label="积分变动时间" align="center">
              <template slot-scope="scope">
                {{scope.row.createTime ? new Date(scope.row.createTime).Format('yyyy-MM-dd hh:mm:ss') : ''}}
              </template>
            </el-table-column>
            <el-table-column label="操作人" prop="modifier" align="center"></el-table-column>
            <el-table-column label="积分变动明细" prop="txnDesc" align="center"></el-table-column>
            <el-table-column label="明细" align="center">
              <template slot-scope="scope">
                {{scope.row.txnType ? scope.row.txnPoints : '-' + scope.row.txnPoints}}
              </template>
            </el-table-column>
          </el-table>
          <el-table border :data="growthList" v-loading="load" :stripe="true" v-show="tabsActive == 2">
            <el-table-column label="用户权益名称" prop="rightsName" align="center"></el-table-column>
            <el-table-column label="使用情况" align="center">
              <template slot-scope="scope">
                {{scope.row.useFlg ? '已使用' : '未使用'}}
              </template>
            </el-table-column>
            <el-table-column label="有效期" align="center">
              <template slot-scope="scope">
                {{scope.row.expiratTime ? new Date(scope.row.expiratTime).Format('yyyy-MM-dd hh:mm:ss') : ''}}
              </template>
            </el-table-column>
            <el-table-column label="来源" align="center">
              <template slot-scope="scope">
                LV{{scope.row.gradeCode}}用户特权
              </template>
            </el-table-column>
            <el-table-column label="获取日期" align="center">
              <template slot-scope="scope">
                {{scope.row.expiratTime ? new Date(scope.row.expiratTime).Format('yyyy-MM-dd hh:mm:ss') : ''}}
              </template>
            </el-table-column>
          </el-table>
          <el-pagination class="mt20" background @current-change="handleCurrentChange" :current-page="tabsActive == 1 ? pointsQuery.pageNo : rightsQuery.pageNo" :page-size="tabsActive == 1 ? pointsQuery.pageSize : rightsQuery.pageSize" layout="total, prev, pager, next, jumper" :total="total">
          </el-pagination>
        </div>
      </div>
      <el-dialog title="增减积分" :visible.sync="dialogVisible" @close="changeNum = null" width="400px" :close-on-click-modal="false">
        <el-input v-model="changeNum" placeholder="请输入要加/减的积分值（-1代表减1积分）"></el-input>
        <div class="mt20" style="text-align: center;">
          <el-button type="primary" @click="changeScore">确定</el-button>
          <el-button plain @click="dialogVisible = false">取消</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>
<script>
export default {
  props: {
    id: {
      redirect: true
    }
  },
  data() {
    return {
      load: true,
      userInfo: {},
      pointsList: [],
      growthList: [],
      tabsActive: 1,
      pointsQuery: {
        openid: '',
        pageNo: 1,
        pageSize: 10
      },
      rightsQuery: {
        openid: '',
        pageNo: 1,
        pageSize: 10
      },
      total: 0,
      dialogVisible: false,
      changeNum: null,
    }
  },
  watch: {
    tabsActive(val) {
      if (val == 1) {
        this.getUserPoints()
      } else {
        this.getUserGrowth()
      }
    }
  },
  created() {
    if (!this.id) return this.$router.push('/customer/mgr')
    // this.getUserPoints()
  },
  mounted() {
    const loading = this.$loading({
      target: '.el-card'
    })
    this.getUsreInfo(() => loading.close())
  },
  methods: {
    getUsreInfo(callback) {
      this.$request.post('/api/saotx/mber/detailById', {id: this.id}, true, res => {
        if (res.ret === '200000') {
          this.userInfo = res.data
          this.getUserPoints()
          callback && callback()
          return
        }
        this.$message.error(res.message)
      })
    },
    getUserPoints() {
      this.load = true
      this.pointsQuery.openid = this.userInfo.openid
      this.$request.post('/api/saotx/mber/listUPTxn', this.pointsQuery, true, res => {
        if (res.ret === '200000') {
          this.load = false
          this.pointsList = res.data.list
          this.total = res.data.page.count
        }
      })
    },
    getUserGrowth() {
      this.load = true
      this.rightsQuery.openid = this.userInfo.openid
      this.$request.post('/api/saotx/mber/listURights', this.pointsQuery, true, res => {
        if (res.ret === '200000') {
          this.load = false
          this.growthList = res.data.list
          this.total = res.data.page.count
        }
      })
    },
    handleClick() {},
    changeScore() {
      if (isNaN(this.changeNum)) return this.$message.warning('请输入数字')
      if (+this.changeNum > 1000000) return this.$message.warning('增加积分数值不能大于一百万')
      if (+this.changeNum + this.userInfo.points < 0) return this.$message.warning('用户积分不够扣减，请重新输入')
      // 调接口
      this.$request.post('/api/saotx/mber/addAndSubtPoints', {openid: this.userInfo.openid, points: this.changeNum}, true, res => {
        if (res.ret === '200000') {
          this.getUsreInfo()
        } else {
          this.$message.error(res.message)
        }
        this.dialogVisible = false
      })
    },
    handleCurrentChange(newPageNo) {
      if (this.tabsActive == 1) {
        this.pointsQuery.pageNo = newPageNo
        this.getUserPoints()
      } else {
        this.rightsQuery.pageNo = newPageNo
        this.getUserGrowth()
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.gradeImg {
  vertical-align: text-top;
  margin-right: 4px;
}
.con {
  margin-top: 40px;
}
.con > div {
  color: #999;
  &.left {
    float: left;
    width: 100px;
    height: 100px;
    border-radius: 50%;
    overflow: hidden;
    margin-top: 20px;
    img {
      width: 100%;
      height: 100%;
    }
  }
  &.right {
    position: relative;
    min-width: 800px;
    margin-left: 120px;
    padding: 10px;
    overflow: hidden;
    .info {
      color: #999;
      span {
        color: #333;
        margin-right: 40px;
      }
    }
    .el-button {
      position: absolute;
      right: 40px;
      top: 20px;
    }
    .asset {
      display: flex;
      justify-content: space-around;
      height: 100px;
      text-align: center;
      background-color: rgba(242, 242, 242, 1);
      .title {
        font-size: 16px;
        font-weight: 700;
        margin: 20px 0;
        color: #000;
      }
      .num {
        color: red;
      }
    }
    .tabs {
      height: 55px;
      margin-top: 40px;
      margin-bottom: 8px;
      > div {
        display: inline-block;
        width: 250px;
        height: 100%;
        line-height: 55px;
        text-align: center;
        color: #333;
        border: 1px solid rgb(204, 204, 204);
        cursor: pointer;
        box-sizing: border-box;
      }
      .active {
        border: 1px solid #409EFF;
        color: #409EFF;
      }
    }
  }
}
</style>
