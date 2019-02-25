/**
* 超级管理员管理角色
* 1. 管理各个组织下的角色、菜单
* 2. 只管理企业管理员角色：orgadmin
* 3. 只管理默认管理员账号：type=2
*/
<template>
  <div class="auth-container">
    <el-card>
      <el-row>
        <el-button size="small" type="primary" @click="authForm.show=true">关联企业</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="form" class="search-block">
        <el-form-item label="企业名称">
          <el-select size="small" v-model="form.orgId" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="org in allOrgs" :class="org.auth==1?'':'hide'" :key="org.orgId" :label="org.orgName" :value="org.orgId"></el-option>
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
    <el-card class="table-card">
      <!-- 数据表格 -->
      <el-table :data="tableList" class="table-data">
        <el-table-column label="序号" type="index" align="center">
          <template slot-scope="scope">
            {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="orgName" label="企业名称" align="center"></el-table-column>
        <el-table-column prop="account" label="登录账号" align="center"></el-table-column>
        <el-table-column prop="name" label="姓名" align="center"></el-table-column>
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.roleStatus==1?'正常':'停用'}}
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" width="160px">
          <template slot-scope="scope">
            {{new Date(scope.row.roleCtime).Format("yyyy-MM-dd hh:mm:ss")}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
            <!--
            <el-button size="mini" v-show="scope.row.roleStatus==1" @click="remove(scope.$index, scope.row)">停用</el-button>
            <el-button size="mini" v-show="scope.row.roleStatus==0" @click="remove(scope.$index, scope.row)">启用</el-button>
            -->
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

    <el-dialog title="企业授权管理" width="550px" center :visible.sync="authForm.show" @closed="authFormCancel()">
      <el-form :model="authForm" :rules="authFormRules" ref="authForm" class="form" label-width="80px">
        <el-form-item label="企业名称" prop="orgId">
          <el-select size="small" v-model="authForm.orgId" placeholder="全部" :disabled="authForm.roleId?true:false">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="org in allOrgs" :class="org.auth==1?'hide':''" :key="org.orgId" :label="org.orgName" :value="org.orgId"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="姓名">
          <span>企业管理员</span>
        </el-form-item>
        <el-form-item label="登录账号" prop="account">
          <el-input size="small" v-model="authForm.account" placeholder="系统平台唯一性。例：xxx-admin；user1" :disabled="authForm.roleId?true:false"></el-input>
        </el-form-item>
        <el-form-item label="登录密码" prop="pwd" v-show="authForm.roleId?false:true">
          <el-input size="small" v-model="authForm.pwd" disabled ></el-input>
          <div class="error-tip">初始登录密码系统默认生成，用户首次登录时需及时修改</div>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input size="small" v-model="authForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <span>企业管理员角色</span>
        </el-form-item>
        <el-form-item label="菜单权限" required>
          <div class="menu-tree">
            <el-tree
              :data="treeDatas" 
              :props="menuProps" 
              ref="treeDatas"
              node-key="menuCode"
              :default-checked-keys="defaultCheckedMenus"
              :default-expanded-keys="defaultExpanded"
              show-checkbox>
            </el-tree>
          </div>
          <div class="el-form-item__error" v-show="menusValidErr">菜单授权不能为空！</div>
        </el-form-item>
        <el-form-item label="状态" prop="roleStatus">
          <el-radio v-model="authForm.roleStatus" :label="1">启用</el-radio>
          <el-radio v-model="authForm.roleStatus" :label="0">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="authFormCancel()">取消</el-button>
        <el-button size="small" type="primary" @click="authFormOk('authForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },
        allOrgs: [],
        loading: false, // 是否查询中
        form: {
          pageNo: 1,
          pageSize: 10,
          orgId: ""
        },
        tableList: [], // 列表展示内容，包括查询条件后的数据展示
        pagination: {
          total: 0
        },

        treeDatas: [],
        menuProps: {
          value: 'menuCode',
          label: 'menuName',
          children: 'nodeList'
        },
        defaultCheckedMenus: [], // [1, 2, 3]默认选中的节点
        defaultExpanded: [], // 默认展开的节点

        menusValidErr: false,
        authForm: {
          show: false,
          roleId: "",
          orgId: "",
          account: "",
          name: "企业管理员",
          pwd: "123456",
          mobile: "",
          roleCode: "",
          roleName: "",
          menus: "",
          roleStatus: ""
        },
        authFormRules: {
          orgId: [{required:true, message:'企业名称不能为空！', trigger:'blur'}],
          account: [{required:true, message:'登录账号不能为空！', trigger:'blur'}],
          roleStatus: [{required:true, message:'状态不能为空！', trigger:'blur'}]
        }
      };
    },
    created() {
      this.getAllOrgs();
      this.list();
      this.getAllMenus();
    },
    methods: {
      currentChange(pageNo) {
        // 分页pageNo变更监听
        this.list(event, pageNo);
      },
      sizeChange(pageSize) {
        // 分页pageSize变更监听
        this.list(event, null, pageSize);
      },
      // 查询所有的组织公司
      getAllOrgs() {
         this.$request.get('/api/saotx/auth/orgAuth', {}, (res)=>{
          if (res.ret == '200000') {
            this.allOrgs = res.data||{};
          }
        });
      },
      // 加载所有的菜单树
      getAllMenus() {
        this.$request.post('/api/saotx/menu/alldata', {service: "saas"}, true, (res)=>{
          if (res.ret == '200000') {
            this.treeDatas = res.data||{};
          }
        });
      },
      // 重置查询
      resetForm() {
        this.form = {
          pageNo: 1,
          pageSize: 10, 
          operType: "", // 操作类型
          stime: "", // 开始时间：年-月-日 时:分:秒
          etime: "", // 结束时间：年-月-日 时:分:秒
          userName: "" // 用户名
        };
        let _now = new Date();
        this.form.time = [_now.Format("yyyy-MM-dd")+" 00:00:00", _now];
        this.list();
      },
      // page = {"pageCount":总页数, "count":总数据条数}
      initPagination(page) {
        if(page) {
          this.pagination.total = page.count;
        }
      },
      // 查询礼品库列表数据
      list(_event, pageNo, pageSize) {
        this.form.pageNo = pageNo?pageNo:1;
        this.form.pageSize = pageSize?pageSize:10;

        this.loading = true;
        this.$request.post('/api/saotx/auth/orgAuthDatas', this.form, true, (res)=>{
          this.loading = false;
          if (res.ret == '200000') {
              this.tableList = res.data.list || [];
              this.initPagination(res.data.page||{});
          } else {
              this.$message.error(res.message);
          }
        });
      },
      edit(idx, row) {
        this.authForm = {
          roleId: row.roleId,
          orgId: row.orgId,
          account: row.account,
          name: row.name,
          mobile: row.mobile,
          roleCode: row.roleCode,
          roleName: row.roleName,
          menus: row.menus,
          roleStatus: row.roleStatus
        };
        this.$request.post('/api/saotx/auth/authMenus', {orgId: row.orgId}, true, (res)=>{
          if (res.ret == '200000') {
            this.defaultCheckedMenus = [];
            if(res.data) {
              this.defaultCheckedMenus = res.data.split(",");
            }
          } else {
            this.$message.error(res.message);
          }
        });
        this.authForm.show = true;
      },
      authFormCancel() {
        this.authForm = {
          show: false,
          roleId: "",
          orgId: "",
          account: "",
          name: "企业管理员",
          pwd: "123456",
          mobile: "",
          roleCode: "",
          roleName: "",
          menus: "",
          roleStatus: ""
        };
        this.$refs.treeDatas.setCheckedKeys([]);
        this.$refs['authForm'].clearValidate();
        let allDatas = this.$refs.treeDatas.store._getAllNodes();
        for(let i=0;i<allDatas.length;i++) {
          allDatas[i].expanded = false;
        }
      },
      authFormOk(form) {
        this.$refs[form].validate((valid) => {
          let checkedKeys = this.$refs.treeDatas.getCheckedKeys();
          if( checkedKeys&&checkedKeys.length>0 ) {
            this.menusValidErr = false;
          } else {
            this.menusValidErr = true;
          }
          if (valid&&!this.menusValidErr) {
            let halfCheckedKeys = this.$refs.treeDatas.getHalfCheckedKeys();
            let allMenus = (halfCheckedKeys?halfCheckedKeys:"")||"";
            allMenus += checkedKeys?((allMenus?",":"")+checkedKeys):"";
            this.authForm.menus = allMenus;
            this.$request.post('/api/saotx/auth/somAuth', this.authForm, true, (res)=>{
              if (res.ret == '200000') {
                this.authFormCancel();
                this.list();
              } else {
                this.$message.error(res.message);
              }
            });
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  ::-webkit-scrollbar-track-piece { //滚动条凹槽的颜色，还可以设置边框属性
    background-color:#f8f8f8;
  }
  ::-webkit-scrollbar {//滚动条的宽度
    width:0px;
    height:9px;
  }
  ::-webkit-scrollbar-thumb {//滚动条的设置
    background-color:#dddddd;
    background-clip:padding-box;
    min-height:28px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background-color:#fff;
  }
  .hide { display: none; }
  .space {position:relative;width:100%;height:20px;}
  .el-input, .el-select {
    width: 400px;
  }
  .menu-tree {
    width: 400px;
    height: 240px;
    overflow-y: scroll;
  }
  .error-tip {
    font-size: 12px;
    color: #c8ccd3;
  }
</style>