<template>
  <div class="container">
    <el-card>
      <el-card class="mb20">
        <el-form ref="queryRef" :model="queryParams" inline :rules="rules">
          <el-form-item label="昵称：" prop="nickName">
            <el-input v-model="queryParams.nickName"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model="queryParams.mobile"></el-input>
          </el-form-item>
          <el-form-item label="用户等级：" prop="gradeNumber">
            <el-input v-model="queryParams.gradeNumber" @change="isNum"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="getUserList">查询</el-button>
          <el-button plain @click="reset">重置</el-button>
        </div>
      </el-card>
      <el-form>
        <el-form-item label="黑名单用户总数" ><span>{{queryParams.countDate}}</span>
        </el-form-item>
      </el-form>
      <!-- <el-button plain class="mt20 mb20">导出</el-button> -->
      <el-table :data="userList" v-loading="load" border>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="头像" align="center" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.headimg || userDetailImgUrl" width="40px" height="40">
          </template>
        </el-table-column>
        <el-table-column label="用户昵称" align="center">
          <template slot-scope="scope">
            <span :class="scope.row.scribeStatus ? 'red' : ''">{{scope.row.nickname}}</span>
          </template>
        </el-table-column>
        <el-table-column label="手机号" prop="mobile" align="center" width="120px"></el-table-column>
        <el-table-column label="性别" align="center" width="60px">
          <template slot-scope="scope">
            {{scope.row.gender == '1' ? '男' : '女'}}
          </template>
        </el-table-column>
        <el-table-column label="等级" prop="gradeNumber" align="center" width="60px"></el-table-column>
        <el-table-column label="积分" prop="points" align="center" width="100px"></el-table-column>
        <el-table-column label="成长值" prop="growth" align="center" width="100px"></el-table-column>
        <el-table-column label="地区" align="center" width="140px">
          <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            {{scope.row.scribeTime ? new Date(scope.row.scribeTime).Format('yyyy-MM-dd hh:mm:ss') : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push(`/customer/mgr/detail?id=${scope.row.id}`)">查看详情</el-button>
            <el-button type="text" @click="shift(scope.row.id)">移出黑名单</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination class="mt20" background @current-change="handleCurrentChange" :current-page="queryParams.pageNo" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 100,
      load: true,
      queryParams: {
        countDate:'',
        mobile: '159', // 电话号
        nickName: '马', // 昵称
        gradeNumber: '', // 等级
        pageNo:1,
        pageSize:10,
        ban: 1 // 黑名单
      },
      userDetailImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/user-detail-img.png',
      rules: {
        nickName: [{ max: 32, message: '用户昵称长度不能超过 32 位', trigger: 'blur' }],
        mobile: [{ max: 11, message: '手机号长度为11位', trigger: 'blur' }],
        gradeNumber: [{ min: 1, max: 3, message: '用户等级应为 1 到 3 位', trigger: 'blur' }]
      },
      userList: []
    }
  },
  mounted () {
    this.getUserList();
     this.getCount();
  },
  methods: {
      getCount(){
          this.$request.post('/api/wiseqr/mber/userCount', {ban:1}, true, res => {
              if (res.ret === '200000') {
                  this.queryParams.countDate=res.data;
                  return
              }
              this.$message.error(res.message)
          })
      },
    getUserList() {
        if(this.queryParams.mobile==""&&this.queryParams.nickName=="") return this.$message.error('昵称搜索条件和手机号搜索条件不能都为空!');
      this.$refs.queryRef.validate(valid => {
        if (!valid) return this.$message.error('请完善手机号!')
        this.$request.post('/api/wiseqr/mber/listUser', this.queryParams, true, res => {
          if (res.ret === '200000') {
            this.load = false
            this.userList = res.data.list
            this.total = res.data.page.count
            return
          }
          this.$message.error(res.message)
        })
      })
    },
    shift(id) {
      this.$confirm('是否将该用户移出黑名单?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/api/wiseqr/mber/upUserBan', {id, ban: 0}, true, res => {
          if (res.ret === '200000') {
            this.$message.success('移出黑名单成功')
            this.getUserList()
            return
          }
          this.$message.error(res.message)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消'
        })
      })
    },
    isNum(val) {
      if (isNaN(val)) this.queryParams.gradeNumber = ''
    },
    reset() {
      // this.queryParams.mobile = ''
      // this.queryParams.nickName = ''
      // this.queryParams.gradeNumber = ''
      this.queryParams.pageNo = 1
      this.$refs.queryRef.resetFields()
      this.getUserList()
    },
    handleCurrentChange(newPageNo) {
      this.queryParams.pageNo = newPageNo
      this.getUserList()
    }
  }
}
</script>
<style lang="scss" scoped>
.el-form-item.is-success /deep/ .el-input__inner {
  border: 1px solid #dcdfe6;
}
.el-input-number {
  width: 200px;
}
.red {
  color: red;
}
</style>
