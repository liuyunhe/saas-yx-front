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
          <el-form-item label="openid：" prop="openid">
            <el-input v-model="queryParams.openid"></el-input>
          </el-form-item>
          <el-form-item label="userId ：" prop="userId">
            <el-input v-model="queryParams.userId "></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="getUserList">查询</el-button>
          <el-button plain @click="reset">重置</el-button>
          <span style="margin-left: 20px;color: #cccccc">C端转化过来的正确userid计算规则：userid=粉丝号-9396593965</span>
        </div>
      </el-card>
      <el-form>
        <el-form-item label="正常用户总数" ><span>{{queryParams.countDate}}</span>
        </el-form-item>
      </el-form>
      <!-- <el-button plain class="mt20 mb20">导出</el-button> -->
      <el-table :data="userList" v-loading="load" border>
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column label="头像" align="center" width="100px">
          <template slot-scope="scope">
            <img :src="scope.row.headimg || userDetailImgUrl" width="40px" height="40px">
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
        <el-table-column label="openid" prop="openid" align="center" width="150px"></el-table-column>
        <el-table-column label="userId" prop="userId" align="center" width="100px"></el-table-column>
        <el-table-column label="积分" prop="points" align="center" width="100px"></el-table-column>
        <el-table-column label="成长值" prop="growth" align="center" width="100px"></el-table-column>
        <el-table-column label="地区" align="center" width="140px">
          <template slot-scope="scope">
            {{scope.row.province}}{{scope.row.city}}
          </template>
        </el-table-column>
        <el-table-column label="注册时间" align="center">
          <template slot-scope="scope">
            {{scope.row.scribeTime ? new Date(scope.row.scribeTime).Format('yyyy-MM-dd') : ''}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160px">
          <template slot-scope="scope">
            <el-button type="text" @click="$router.push(`/customer/mgr/detail?id=${scope.row.id}`)">查看详情</el-button>
            <el-button type="text" @click="addBlack(scope.row.id)">加入黑名单</el-button>
            <el-button type="text" @click="dataForm(scope.$index, scope.row)">更改手机号</el-button>
          </template>
        </el-table-column>
      </el-table>
       <el-pagination class="mt20" background @current-change="handleCurrentChange" :current-page="queryParams.pageNo" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>
    </el-card>
    <el-dialog title="更改手机号" width="30%" :visible.sync="form.show">
      <el-form label-width="100px">
        <div style="font-size: 20px;line-height: 50px;font-weight: bold;margin-bottom: 20px;">用户基本信息</div>
        <el-form-item label="用户昵称:">
          <div>{{ this.form.nickName }}</div>
        </el-form-item>
        <el-form-item label="userId:">
          <div>{{ this.form.userId }}</div>
        </el-form-item>
        <el-form-item v-if="form.mobile" label="绑定手机号:">
          <div>{{ this.form.mobileBind }}</div>
        </el-form-item>
        <el-form-item label="更改手机号:">
          <el-input size="small" v-model="form.mobile" style="width: 200px;"></el-input>
        </el-form-item>
        <el-form-item label="操作：" prop="mobileUpdateType" size="small">
          <el-radio v-model="form.mobileUpdateType" :label="0">解绑手机号</el-radio>
          <el-radio v-model="form.mobileUpdateType" :label="1">更新手机号</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="form.show=false">取 消</el-button>
                <el-button size="small" type="primary" @click="saveForm">确 定</el-button>
            </span>
    </el-dialog>
  </div>
</template>
<script>
export default {
  data() {
    return {
      total: 100,
      load: false,
      queryParams: {
        countDate:'',
        mobile: '', //电话号
        nickName: '', //昵称
        gradeNumber: '', //等级
        openid:'',
        userId:'',
        pageNo:1,
        pageSize:10,
        ban: 0 //正常用户
      },
      userDetailImgUrl: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/common/user-detail-img.png',
      rules: {
        nickName: [{ max: 32, message: '用户昵称长度不能超过 32 位', trigger: 'blur' }],
        mobile: [{ max: 11, message: '手机号长度为11位', trigger: 'blur' }],
        gradeNumber: [{ min: 1, max: 3, message: '用户等级应为 1 到 3 位', trigger: 'blur' }]
      },
      userList: [],
      form: {
        show: false, // 增库弹框是否展示
        id: '',
        mobile: '',
        mobileBind: '',
        nickName: '',
        userId: '',
        mobileUpdateType: 1,
      }
    }
  },
  mounted () {
    // this.getUserList();
    this.getCount();
  },
  methods: {
      getCount(){
          this.$request.post('/api/wiseqr/mber/userCount', {ban:0}, true, res => {
              if (res.ret === '200000') {
                  this.queryParams.countDate=res.data;
                  return
              }
              this.$message.error(res.message)
          })
      },
    getUserList() {
      if(this.queryParams.mobile==""&&this.queryParams.nickName==""&&this.queryParams.openid==""&&this.queryParams.userId=="") return this.$message.error('搜索条件:昵称、手机号、openid不能都为空!');
      this.$refs.queryRef.validate(valid => {
        if (!valid) return this.$message.error('请完善手机号!')
        this.load = true
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
    addBlack(id) {
      this.$confirm('加入黑名单后，该用户将无法领取活动奖品，无法获取积分及成长值，无法兑换商品，确认加入黑名单吗？ ', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/api/wiseqr/mber/upUserBan', {id, ban: 1}, true, res => {
          if (res.ret === '200000') {
            this.$message.success('加入黑名单成功')
            this.getUserList()
            return
          }
          this.$message.error(res.message)
        })
      }).catch(() => {
        this.$message.info('已取消')
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
      // this.getUserList()
    },
    handleCurrentChange(newPageNo) {
      this.queryParams.pageNo = newPageNo
      this.getUserList()
    },
    dataForm(index, row) {
        console.log(row)
      this.form.id = "";
      this.form.mobile = "";
      this.form.mobileBind = "";
      this.form.nickName = "";
      this.form.userId = "";
      if(row&&row.id) {
        this.form.id = row.id;
        this.form.mobile = row.mobile || null;
        this.form.mobileBind = row.mobile || null;
        this.form.nickName = row.nickname;
        this.form.userId = row.userId;
      }
      this.form.mobileUpdateType = 1
      this.form.show = true;
    },
    saveForm() {
      if (!/^1[3456789]\d{9}$/.test(this.form.mobile)) return this.$message.error('手机号填写错误！')
        let params = {
          id: this.form.id,
          mobile: this.form.mobile,
          mobileUpdateType: this.form.mobileUpdateType
        }
      this.$request.post('/api/wiseqr/mber/updateMobile', params, true, (res)=>{
        console.log(res)
        if (res.ret == '200000') {
          this.getUserList();
          this.form.show = false;
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.message);
        }
      });
    },
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
.el-table img {
  vertical-align: middle;
}
.red {
  color: red;
}
</style>
