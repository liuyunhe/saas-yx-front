<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="mgrForm">新建成员</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="form">
        <el-form-item label="成员筛选">
          <el-input size="small" v-model="form.keywords" placeholder="姓名/手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-select size="small" v-model="form.roleCode" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in roleList" :key="item.roleCode" :label="item.roleName" :value="item.roleCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="small" v-model="form.status" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="已启用" value="1"></el-option>
            <el-option label="已停用" value="0"></el-option>
            <el-option label="已锁定" value="2"></el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button size="small" type="primary" @click="list">查询</el-button>
          <el-button size="small" @click="resetForm">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="space"></div>
    <el-card class="box-card">
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center">
          <template slot-scope="scope">
            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column prop="orgName" label="单位" align="center"></el-table-column>
        <el-table-column prop="mobile" label="手机号" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.status==1?"已启用":scope.row.status==2?"已锁定":"已停用"}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="160">
          <template slot-scope="scope">
            <el-button v-if="scope.row.status==1" size="mini" @click="mgrForm(scope.$index, scope.row)">编辑</el-button>
            <el-button v-if="scope.row.roleCode!='orgadmin'&&scope.row.status==1" size="mini" @click="handleDelete(scope.$index, scope.row)" type="danger">停用</el-button>
            <el-button v-if="scope.row.roleCode!='orgadmin'&&scope.row.status==0" size="mini" @click="modifyData(scope.row.id, 1)">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-pagination background layout="total, prev, pager, next, jumper"
        @size-change="sizeChange" @current-change="currentChange"
        :current-page="form.pageNo" :page-size="form.pageSize"
        :total="pagination.total">
      </el-pagination>
    </el-card>

    <el-dialog title="成员管理" width="550px" center :visible.sync="userForm.show" :show-close="userForm.showClose">
      <el-form :model="userForm" :rules="userFormRules" ref="userForm" class="form" label-width="100px">
        <el-form-item label="公司">
          <el-input size="small" v-model="cluser.orgName" disabled></el-input>
        </el-form-item>
        <el-form-item label="账号id" prop="id" v-show="false">
          <el-input size="small" v-model="userForm.id"></el-input>
        </el-form-item>
        <el-form-item label="账号" prop="account">
          <el-input size="small" v-model="userForm.account" placeholder="登录账号" :disabled="userForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item label="昵称" prop="name">
          <el-input size="small" v-model="userForm.name" placeholder="账号昵称" :disabled="userForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input size="small" v-model="userForm.mobile" placeholder="账号绑定手机号"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input size="small" v-model="userForm.email" placeholder="常用邮箱"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="pwd" v-if="userForm.id?false:true">
          <el-input size="small" type="password" v-model="userForm.pwd" placeholder="8-16位字符(至少包含字母、数字、符号中的两种形式)"></el-input>
        </el-form-item>
        <el-form-item label="角色" prop="roleCode">
          <el-select size="small" v-model="userForm.roleCode" placeholder="全部" @change="handleRoleChange">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in roleList" :key="item.roleCode" :label="item.roleName" :value="item.roleCode"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="userForm.xpUser == 1" label="小屏角色" prop="xpAdmin">
          <el-select size="small" v-model="userForm.xpAdmin" placeholder="请选择" @change="userForm.xpSaleZone = null">
            <el-option label="管理人员" :value="1"></el-option>
            <el-option label="销区人员" :value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="orgHasSaleZone == '1'" label="销区：" prop="xpSaleZone">
          <el-select size="small" v-model="userForm.xpSaleZone" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="userFormCancel('userForm')">取 消</el-button>
        <el-button size="small" type="primary" @click="userFormOk('userForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    // 校验手机号
    var validMobile = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('手机号不能为空'));
      } else if(!/^1[0-9]{2}\d{8}$/.test(value)) {
          callback(new Error('手机号格式错误！'));
      } else {
          callback();
      }
    };
    // 校验邮箱
    var validEmail = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('邮箱不能为空'));
      } else if(!/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(value)) {
          callback(new Error('邮箱格式错误！'));
      } else {
          callback();
      }
    };
    // 校验密码
    var validPwd = (rule, value, callback) => {
      if (value === '') {
          callback(new Error('密码不能为空'));
      } else if(!/(?!^(\d+|[a-zA-Z]+|[~!@#$%^&*?]+)$)^[\w~!@#$%\^&*?]{8,16}$/.test(value)) {
          callback(new Error('8-16位字符(至少包含字母、数字、符号中的两种形式)'));
      } else {
          callback();
      }
    };
    return {
      orgHasSaleZone:sessionStorage.orgHasSaleZone,
      isAllSaleZone:sessionStorage.isAllSaleZone,
      cluser: {
        account: '',
        orgName: ''
      },
      roleList: [],
      statusList: [],
      saleZone: [],
      form: {
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 关键字
        roleCode: '', // 角色编码
        status: '', // 数据状态
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [], // 表格数据

      userForm: {
        showClose: false,
        show: false,
        orgName: '',
        id: '',
        account: '',
        name: '',
        mobile: '',
        email: '',
        pwd: '',
        roleCode: '',
        xpUser: 0,
        xpAdmin: '',
        xpSaleZone:null

      },
      userFormRules: {
        account: [{required:true, message:'账号不能为空', trigger:'blur'}],
        name: [{required:true, message:'账号昵称不能为空', trigger:'blur'}],
        mobile: [{required:true, validator:validMobile, trigger:'blur'}],
        email: [{required:true, validator:validEmail, trigger:'change'}],
        pwd: [{required:true, validator:validPwd, trigger:'blur'}],
        roleCode: [{required:true, message:'角色不能为空', trigger:'blur'}],
        xpAdmin: [{required:true, message:'小屏角色不能为空', trigger:'change'}],
        xpSaleZone: [{required:true, message:'销区不能为空', trigger:'change'}]
      }
    }
  },
  created() {
    // const cluserStr = sessionStorage.getItem("cluser");
    this.cluser = this.$store.state.cluser
    if(!this.cluser||!this.cluser.account) {
        this.clearLoginSession();
        return false;
    }
    this.getRoleList();
    this.getSaleZone()
    this.list();
  },
  methods: {
    // 清空当前登录用户信息缓存
    clearLoginSession() {
      // sessionStorage.removeItem("cluser");
      sessionStorage.removeItem("access_token");
      sessionStorage.removeItem("access_loginId");
    },
    currentChange(pageNo) {
      // 分页pageNo变更监听
      this.list(event, pageNo);
    },
    sizeChange(pageSize) {
      // 分页pageSize变更监听
      this.list(event, null, pageSize);
    },
    // 查询所有数据状态
    getRoleList() {
      this.$request.post('/api/wiseqr/role/list', {pageSize:-1}, true, (res)=>{
        if (res.ret == '200000') {
          this.roleList = res.data.list||[];
        }
      });
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/listWithQ', {}, true, (res)=>{
        if (res.code == '200') {
          this.saleZone = res.data||[];
        }
      });
    },
    // 重置查询
    resetForm() {
      this.form = {
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 关键字
        roleCode: '', // 关键字
        status: '' // 数据状态
      }
      this.list();
    },
    // 查询表格列表数据
    list(_event, pageNo, pageSize) {
      if(pageNo) {
        this.form.pageNo = pageNo;
      } else {
        this.form.pageNo = 1;
      }
      if(pageSize) {
        this.form.pageSize = pageSize;
      } else {
        this.form.pageSize = 10;
      }
      this.$request.post('/api/wiseqr/user/list', this.form, true, (res)=>{
        if (res.ret == '200000') {
          this.tableList = res.data.list || [];
          this.initPagination(res.data.page||{});
        }
      });
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(page) {
      if(page) {
        this.pagination.total = page.count;
      }
    },
    // 停用confirm弹框
    handleDelete(index, row) {
      this.$confirm('停用后，此用户将无法登陆平台系统，确认操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          this.modifyData(row.id, 0);// 确定停用
        }).catch(() => {/** 取消 */});
    },
    // 修改数据状态：status=1启用；status=0停用
    modifyData(id, status) {
      let params = {id:id, status:status}
      this.$request.post('/api/wiseqr/user/mstatus', params, true, (res)=>{
        if (res.ret == '200000') {
          this.list();
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.message);
        }
      });
    },
    mgrForm(index, row) {
      if(row) {// 编辑
        this.userForm = Object.assign({}, this.userForm, row);
      }
      this.userForm.show = true;
    },
    // 取消弹框
    userFormCancel(form) {
      this.userForm = {
        showClose: false,
        show: false,
        orgName: '',
        id: '',
        account: '',
        name: '',
        mobile: '',
        email: '',
        pwd: '',
        roleCode: '',
        xpUser: 0,
        xpAdmin: '',
        xpSaleZone:null
      };
      this.$refs[form].clearValidate();
    },
    handleRoleChange(item){
      console.log(item)
      if(item == ''){
        this.userForm.xpUser = 0
        this.userForm.xpAdmin = ''
        this.userForm.xpSaleZone = null
        return
      }
      let role = this.roleList.find((i)=>{
        return  i.roleCode == item
      })
      console.log(role.roleName == "数据小屏")
      if(role.roleName == "数据小屏") {
        this.userForm.xpUser = 1
      }else {
        this.userForm.xpUser = 0
        this.userForm.xpAdmin = ''
        this.userForm.xpSaleZone = null
      }
    },
    // 确认提交弹框
    userFormOk(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          let _pwd = this.userForm.pwd;
          if(_pwd) {
            this.userForm.pwd = this.$md5(_pwd);
          }
          this.$request.post('/api/wiseqr/user/saveOrModify', this.userForm, true, (res)=>{
            if (res.ret == '200000') {
              this.list();
              this.userFormCancel('userForm');
              this.$message({type: 'success', message: '操作成功!'});
            } else {
              this.userForm.pwd = _pwd;
              this.$message.error(res.message);
            }
          });
        }
      });
    }
  }
}
</script>

<style scoped>
  .space {position:relative;width:100%;height:20px;}
  .dialog-footer {
    clear: both;
  }
  .el-input, .el-select {
    width: 200px;
  }
  .form {
    width: 100%;
    overflow: hidden;
  }
  .form .el-input, .form .el-select {
    width: 380px;
  }
</style>
