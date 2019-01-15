<template>
  <div class="menu-container">
    <div class="lcontent">
      <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
      <div class="space"></div>
      <el-tree class="filter-tree" 
        :data="treeDatas" 
        :props="defaultProps" 
        :filter-node-method="filterNode" 
        ref="treeDatas"
        @node-click="treeNodeClick"></el-tree>
    </div>

    <div class="rcontent">
      <el-card>
        <el-row>
            <el-button size="small" type="primary" @click="createMenu">新建</el-button>
        </el-row>
        <div class="space"></div>
        <!-- 数据查询条件 -->
        <el-form :inline="true" :model="form" class="search-block">
            <el-form-item label="菜单名称">
                <el-input size="small" v-model="form.menuName" placeholder="请输入菜单名称"></el-input>
            </el-form-item>
            <el-form-item label="状态">
                <el-select size="small" v-model="form.status" placeholder="请选择">
                    <el-option label="请选择" value=""></el-option>
                    <el-option label="可见" value="1"></el-option>
                    <el-option label="不可见" value="2"></el-option>
                </el-select>
            </el-form-item>
            <div></div>
            <el-form-item>
                <el-button size="small" type="primary" @click="search">查询</el-button>
                <el-button size="small" @click="resetForm">重置</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <div class="space"></div>
    <el-card class="table-card">
        <!-- 数据表格 -->
        <el-table :data="tableList" class="table-data">
            <el-table-column prop="menuName" label="菜单姓名" align="center"></el-table-column>
            <el-table-column prop="parent.menuName" label="上级菜单" align="center"></el-table-column>
            <el-table-column prop="menuUrl" label="链接地址" align="center"></el-table-column>
            <el-table-column prop="statusName" label="状态" align="center" width="100px"></el-table-column>
            <el-table-column label="创建时间" align="center" width="160px">
                <template slot-scope="scope">
                    {{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}
                </template>
            </el-table-column>
            <el-table-column label="操作" align="center" width="200">
                <template slot-scope="scope">
                    <el-button size="mini" @click="edit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="mini" @click="remove(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <div class="space"></div>
        <!-- 分页组件 -->
        <!-- 
        <el-pagination background layout="total, prev, pager, next, jumper"
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="form.pageNo" :page-size="form.pageSize"
            :total="pagination.total">
        </el-pagination>
        -->
      </el-card>
    </div>

    <el-dialog title="菜单资源管理" width="550px" center :visible.sync="menuForm.show" @closed="menuFormCancel('menuForm')">
      <el-form :model="menuForm" :rules="menuFormRules" ref="menuForm" class="form" label-width="80px">
        <el-form-item label="菜单编码" prop="menuCode">
          <el-input size="small" v-model="menuForm.menuCode" placeholder="请输入不超过30个字符" :disabled="menuForm.id?true:false"></el-input>
        </el-form-item>
        <el-form-item label="菜单名称" prop="menuName">
          <el-input size="small" v-model="menuForm.menuName" placeholder="请输入不超过10个字符"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" prop="parentCode">
          <el-cascader size="small" 
            v-model="menuForm.parent" 
            placeholder="请选择"
            :props="menuProps" 
            :options="menuParentDatas" 
            clearable
            change-on-select 
            filterable></el-cascader>
        </el-form-item>
        <el-form-item label="链接地址" prop="menuUrl">
          <el-input size="small" v-model="menuForm.menuUrl" placeholder="请输入页面访问url，不能超过100个字符"></el-input>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio v-model="menuForm.status" :label="1">启用</el-radio>
          <el-radio v-model="menuForm.status" :label="2">禁用</el-radio>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="menuFormCancel('menuForm')">取消</el-button>
        <el-button size="small" type="primary" @click="menuFormOk('menuForm')">保存</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    data() {
      var validMenuCode = (rule, value, callback) => {
        if( value.length>30 ) {
            callback(new Error('菜单编码不能超过30个字符！'));
        } else {
            callback();
        }
      };
      // 校验菜单名称
      var validMenuName = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('菜单名称不能为空！'));
        } else if( value.length>10 ) {
            callback(new Error('菜单名称不能超过10个字符！'));
        } else {
            callback();
        }
      };
      var validMenuUrl = (rule, value, callback) => {
        if (value === '') {
            callback(new Error('菜单链接地址不能为空！'));
        } else if( value.length>100 ) {
            callback(new Error('菜单链接地址不能超过100个字符！'));
        } else {
            callback();
        }
      };
      return {
        loading: false, // 是否查询中
        form: {
          menuName: "",
          status: ""
        },
        tableList: [],// 列表展示内容，包括查询条件后的数据展示
        tableOriList: [], // 列表内容原数据
        filterText: '',
        treeDatas: [],
        defaultProps: {
          children: 'nodeList',
          label: 'menuName'
        },

        menuProps: {
          value: 'menuCode',
          label: 'menuName',
          children: 'nodeList'
        },
        menuParentDatas: [],// {menuCode:"", menuName:"", parent:"方便查询", nodeList:[子级]}
        menuForm: {
          show: false,
          id: "",
          menuCode: "",
          menuName: "",
          parent: [],
          parentCode: "",
          menuUrl: "",
          status: ""
        },
        menuFormRules: {
          menuCode: [{required:false, validator:validMenuCode, trigger:'blur'}],
          menuName: [{required:true, validator:validMenuName, trigger:'blur'}],
          menuUrl: [{required:true, validator:validMenuUrl, trigger:'blur'}],
          status: [{required:true, message:'状态不能为空！', trigger:'blur'}]
        }
      };
    },
    watch: {
      filterText(val) {
        this.$refs.treeDatas.filter(val);
      }
    },
    created() {
      this.initTree();
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.menuName.indexOf(value) !== -1;
      },
      initTree() {
        this.$request.post('/api/saotx/menu/all', {service:"saas"}, true, (res)=>{
          if (res.ret == '200000') {
            this.treeDatas = res.data || [];
            this.tableList = res.data || [];
            this.tableOriList = res.data || [];
            this.initFormParent();
          }
        });
      },
      // 只到二级
      initFormParent() {
        this.menuParentDatas = [];
        for(let i=0; i<this.treeDatas.length; i++) {
          let data = this.treeDatas[i];
          let tmp = {menuCode:data.menuCode, menuName:data.menuName, parent:data.parentCode, nodeList:[]};
          let datachild = data.nodeList;
          if(datachild&&datachild.length>0) {
            for(let j=0; j<datachild.length; j++) {
              let childdata = datachild[j];
              let tmpchild = {menuCode:childdata.menuCode, menuName:childdata.menuName, parent:data.menuCode};
              tmp.nodeList.push(tmpchild);
            }
          }
          this.menuParentDatas.push(tmp);
        }
      },
      treeNodeClick(nodeData, currentNode) {
        this.tableOriList = [];
        this.tableOriList.push(nodeData);
        if(nodeData.nodeList&&nodeData.nodeList.length>0) {
          for(let i=0;i<nodeData.nodeList.length;i++) {
            this.tableOriList.push(nodeData.nodeList[i]);
          }
        }
        this.tableList = this.tableOriList;
      },
      currentChange(pageNo) {
        // 分页pageNo变更监听
        this.search(event, pageNo);
      },
      sizeChange(pageSize) {
        // 分页pageSize变更监听
        this.search(event, null, pageSize);
      },
      search() {
        if(this.form.menuName||this.form.status) {
          this.tableList = [];
          for(let i=0;i<this.tableOriList.length;i++) {
            let nodeData = this.tableOriList[i];
            if(this.form.menuName&&this.form.status) {
              if(nodeData.menuName.indexOf(this.form.menuName)!=-1&&this.form.status==nodeData.status) {
                this.tableList.push(nodeData);
              }
            } else if(this.form.menuName&&nodeData.menuName.indexOf(this.form.menuName)!=-1) {// 菜单名称搜索
              this.tableList.push(nodeData);
            } else if(this.form.status&&this.form.status==nodeData.status) {
              this.tableList.push(nodeData);
            }
          }
        } else {
          this.tableList = this.tableOriList;
        }
      },
      resetForm() {
        this.form = {
          menuName: "",
          status: ""
        };
        this.search();
      },
      createMenu() {
        this.menuForm.show = true;
      },
      edit(idx, row) {
        let parentCode = row.parentCode;
        this.menuForm = {
          show: true,
          id: row.id,
          menuCode: row.menuCode,
          menuName: row.menuName,
          parentCode: parentCode,
          menuUrl: row.menuUrl,
          status: row.status
        };
        if(parentCode) {
          this.menuForm.parent = [];
          for(let i=0;i<this.menuParentDatas.length;i++) {
            let tmp = this.menuParentDatas[i];
            if(parentCode==tmp.menuCode) {
              this.menuForm.parent.push(tmp.parent);
              this.menuForm.parent.push(parentCode);
              return;
            } else {
              for(let j=0;j<tmp.nodeList.length;j++) {
                let tmp1 = tmp.nodeList[j];
                if(parentCode==tmp1.menuCode) {
                  this.menuForm.parent.push(tmp1.parent);
                  this.menuForm.parent.push(parentCode);
                  return;
                }
              }
            }
          }
        }
      },
      remove(idx, row) {
        this.$confirm('删除后，此菜单将从所有组织公司中去除，确认操作吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
          center: true
        }).then(() => {
          let params = {};
          params.id = row.id;
          params.status = 0;
          params.service = "saas";
          this.$request.post('/api/saotx/menu/modifyStatus', params, true, (res)=>{
            if (res.ret == '200000') {
              //this.list();
              this.menuFormCancel('menuForm');
              this.$message({type: 'success', message: '操作成功!'});
            } else {
              this.$message.error(res.message);
            }
          });
        }).catch(() => {/** 取消 */});
      },
      // 取消弹框
      menuFormCancel(form) {
        this.menuForm = {
          show: false,
          id: "",
          menuCode: "",
          menuName: "",
          parent: [],
          parentCode: "",
          menuUrl: "",
          status: ""
        };
        this.$refs[form].clearValidate();
      },
      // 确认提交弹框
      menuFormOk(form) {
        this.$refs[form].validate((valid) => {
          if (valid) {
            if(this.menuForm.parent&&this.menuForm.parent.length>0) {
              this.menuForm.parentCode = this.menuForm.parent[this.menuForm.parent.length-1];
            } else {
              this.menuForm.parentCode = "";
            }
            this.$request.post('/api/saotx/menu/somsys', this.menuForm, true, (res)=>{
              if (res.ret == '200000') {
                //this.list();
                this.menuFormCancel('menuForm');
                this.$message({type: 'success', message: '操作成功!'});
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
  .menu-container {
    width: 100%;
    .space {
      height: 10px;
    }
    .lcontent {
      float: left;
      width: 20%;
      height: 100%;
      .filter-tree {
        border-radius: 5px;
        height: 665px;
        overflow-y: scroll; 
      }
    }
    .rcontent {
      float: right;
      width: 79%;
      .table-card {
        width: 100%;
        height: 510px;
        overflow: auto;
        table {
          height: 100%;
        }
      }
    }

    .el-dialog {
      .el-input, .el-cascader {
        width: 400px;
      }
    }
  }
</style>