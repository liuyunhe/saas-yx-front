<template>
  <div>
    <el-card class="box-card">
      <el-row>
        <el-button size="small" type="primary" @click="mgrForm">新建角色</el-button>
      </el-row>
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="form">
        <el-form-item label="角色名称">
          <el-input size="small" v-model="form.keywords" placeholder="模糊查询角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态">
          <el-select size="small" v-model="form.status" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option v-for="item in statusList" :key="item.code" :label="item.name" :value="item.code"></el-option>
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
        <el-table-column prop="roleName" label="角色" align="center"></el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template slot-scope="scope">
            {{scope.row.status==1?"已启用":"已停用"}}
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

    <el-dialog title="角色管理" width="550px" center :visible.sync="roleForm.show">
      <el-form :model="roleForm" class="form">
        <el-form-item label="角色名称">
          <el-input size="small" v-model="roleForm.roleName" placeholder="角色名称" :disabled="roleForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item>
          <div class="label">权限菜单</div>
          <div class="menu-tree">
            <el-tree ref="menuTree"
              :data="menus.datas"
              show-checkbox
              node-key="id"
              :default-expanded-keys="menus.defaultExpanded"
              :default-checked-keys="menus.defaultChecked"
              :props="menus.props">
            </el-tree>
          </div>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="roleForm.show=false">取 消</el-button>
        <el-button size="small" type="primary" @click="roleFormOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statusList: [],
      form: {
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 关键字
        status: '', // 数据状态
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [], // 表格数据
      roleForm: { // 角色管理表单
        show: false, // 表单弹框是否展示
        id: '', // 角色数据主键id
        roleCode: '', // 唯一性角色编码。可自定义，如果空则接口自动生成
        roleName: '', // 角色名称
        menus: '' // 角色管理授权的菜单：格式为menu1,menu2,menu3
      },
      menus: {
        datas: [], // 默认菜单数据
        defaultExpanded: [], // 默认展开
        defaultChecked: [], // 默认选中
        props: {
          children: 'children',
          label: 'label'
        }
      }
    }
  },
  created() {
    this.getStatus();
    this.list();
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
    // 查询所有数据状态
    getStatus() {
      this.$request.post('/api/wiseqr/dim/dataStatus', {}, false, (res)=>{
        if (res.ret == '200000') {
          this.statusList = res.data||[];
        }
      });
    },
    // 重置查询
    resetForm() {
      this.form = {
        pageNo: 1,
        pageSize: 10,
        keywords: '', // 关键字
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
      this.$request.post('/api/wiseqr/role/list', this.form, true, (res)=>{
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
      this.$confirm('停用后，会影响用户的权限，确认操作吗？', '提示', {
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
      this.$request.post('/api/wiseqr/role/mstatus', params, true, (res)=>{
        if (res.ret == '200000') {
          this.list();
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.message);
        }
      });
    },
    roleFormInit() {
      this.roleForm = {
        show: false,
        id: '', // 角色数据主键id
        roleCode: '', // 唯一性角色编码。可自定义，如果空则接口自动生成
        roleName: '', // 角色名称
        menus: [] // 角色管理授权的菜单
      };
      this.menus = {
        datas: [], // 默认菜单数据
        defaultExpanded: [], // 默认展开
        defaultChecked: [], // 默认选中
        props: {
          children: 'children',
          label: 'label'
        }
      };
    },
    // 新增或修改角色信息
    mgrForm(index, row) {
      if(row&&row.id) {// 编辑
        this.roleForm.id = row.id;
        this.roleForm.roleCode = row.roleCode;
        this.roleForm.roleName = row.roleName;
      } else {// 新增
        this.roleFormInit();
      }
      this.$request.post('/api/wiseqr/role/queryByCode', this.roleForm, true, (res)=>{
        if (res.ret == '200000') {
          this.roleForm.id = res.data.id||'';
          this.roleForm.roleCode = res.data.roleCode||'';
          this.roleForm.roleName = res.data.roleName||'';
          let menuNode = res.data.nodes||[]; // 菜单，数组
          let treeNodes = [];
          for(let i=0;i<menuNode.length;i++) {
            let menu = menuNode[i];
            if(!menu.pId) { // 说明为顶层父节点
              let node = {id:menu.id, label:menu.name, checked:menu.checked};
              this.recursiveMenu(menuNode, node);
              treeNodes.push(node);
            }
          }
          this.menus.datas = treeNodes;
          this.roleForm.show = true;
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 递归处理菜单
    recursiveMenu(menuNode, currentNode) {
      let children = [];
      for(let i=0;i<menuNode.length;i++) {
        let menu = menuNode[i];
        if(currentNode.id==menu.pId) { // 循环节点为当前currentNode节点的直接子节点
          let node = {id:menu.id, label:menu.name, checked:menu.checked};
          this.recursiveMenu(menuNode, node);
          children.push(node);
        }
      }
      currentNode.children = children;
      if(currentNode.children.length==0&&currentNode.checked) {// 当前节点为叶子节点，并且是选中状态
        this.menus.defaultChecked.push(currentNode.id);
      }
    },
    // 确认新增或修改
    roleFormOk() {
      if(!this.roleForm.roleName) {
        this.$message.error('角色名称不能为空！');
        return false;
      }
      let checkedMenus = this.$refs.menuTree.getHalfCheckedKeys()||[];
      let checkedKeys = this.$refs.menuTree.getCheckedKeys()||[];
      if(checkedMenus&&checkedMenus.length>0) {
        checkedMenus = checkedMenus.concat(checkedKeys);
      }
      this.roleForm.menus = checkedMenus.join(',')||'';
      this.$request.post('/api/wiseqr/role/saveOrModify', this.roleForm, true, (res)=>{
        if (res.ret == '200000') {
          this.$message({type: 'success', message: '操作成功!'});
          this.roleForm.show = false;
          this.list();
        } else {
          this.$message.error(res.message);
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
  .form .label {
    float: left;
    width: 70px;
  }
  .form .menu-tree {
    float: left;
    width: 400px;
    height: 240px;
    overflow: auto;
  }
  .form .el-input {
    width: 400px;
  }
</style>
