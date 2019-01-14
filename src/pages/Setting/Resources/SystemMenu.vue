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
            <el-button size="small" type="primary" @click="business=2">新建</el-button>
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
            <el-table-column prop="statusName" label="状态" align="center"></el-table-column>
            <el-table-column label="创建时间" align="center" width="300px">
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
        <el-pagination background layout="total, prev, pager, next, jumper"
            @size-change="sizeChange" @current-change="currentChange"
            :current-page="form.pageNo" :page-size="form.pageSize"
            :total="pagination.total">
        </el-pagination>
      </el-card>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
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
            console.log(res.data);
            this.treeDatas = res.data || [];
            this.tableList = res.data || [];
            this.tableOriList = res.data || [];
          }
        });
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
      edit(idx, row) {

      },
      remove(idx, row) {
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
  }
</style>