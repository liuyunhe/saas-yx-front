<template>
    <section class="supply-container clearfix">
      <div class="box-container">
        <!--面包屑-->
        <el-col :span="24" class="breadcrumb-container">
          <el-button size="small" type="primary" @click="addSupplier">新增供应商</el-button>
        </el-col>
        <!--查询表单-->
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
          <el-form :inline="true" :model="filters" label-width="90px">
            <el-form-item :size="'small'" label="筛选供应商">
              <el-input v-model="filters.keywords" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item :size="'small'" label="联系人">
              <el-input v-model="filters.contact" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item :size="'small'" label="联系电话">
              <el-input v-model="filters.mobile" placeholder="请输入内容"></el-input>
            </el-form-item>
            <el-form-item :size="'small'" label="状态">
              <el-select
                  v-model="filters.status"
                  placeholder="请选择"
                  style="width: 200px">
                <el-option
                    v-for="item in dataStatusList"
                    :key="item.code"
                    :label="item.name"
                    :value="item.code">
                </el-option>
              </el-select>
            </el-form-item>
            <div></div>
            <el-form-item class="mr0" :size="'small'">
              <el-button type="primary" size="small" @click="commitForm">查询</el-button>
              <el-button size="small" class="important" @click="getStatus">重置</el-button>
            </el-form-item>
            、
          </el-form>
        </el-col>
      </div>
      <div class="box-container">
        <!--列表-->
        <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
          <el-table
              :data="supplyList"
              style="width: 100%">
            <el-table-column
                type="index"
                label="序号"
                width="100">
            </el-table-column>
            <el-table-column
                prop="name"
                label="供应商名称">
            </el-table-column>
            <el-table-column
                prop="contact"
                label="联系人"
                width="180">
            </el-table-column>
            <el-table-column
                prop="mobile"
                label="联系电话">
            </el-table-column>
            <el-table-column
                prop="status"
                label="状态"
                width="100">
              <template slot-scope="scope">
                <span v-if="scope.row.status == 0">{{ '已停用' }}</span>
                <span v-else>{{ '已启用' }}</span>
              </template>

            </el-table-column>
            <el-table-column
                label="操作"
                width="150"
            >
              <template slot-scope="scope">
                <el-button
                    size="mini"
                    @click="handleEdit(scope.$index, scope.row)"
                >编辑</el-button>
                <el-button
                    v-if="scope.row.status == 1"
                    size="mini"
                    type="danger"
                    @click="modifyStatus(scope.row.id,'0')"
                >停用</el-button>
                <el-button
                    v-else
                    size="mini"
                    @click="modifyStatus(scope.row.id,'1')"
                >启用</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>

        <!--工具条-->
        <el-col :span="24" class="footer-toolbar">
          <el-button type="primary" class="btn-jump-to" @click="jumpTo">跳转</el-button>
          <el-pagination
              background
              layout="total,prev, pager, next,jumper"
              :current-page="currentPage"
              @current-change="handleCurrentChange"
              :page-size="pageSize"
              :total="total"
              style="float:right;">
          </el-pagination>
        </el-col>
      </div>
    </section>
</template>

<style lang="scss" scoped>
    .supply-container{
      .box-container{
        background-color: #fff;
        padding: 15px;
        margin-bottom: 30px;
        &:after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          clear: both;
        }
      }
    }
    .el-dropdown {
        color: #8A96A0 !important;
        cursor: pointer;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .crm-tag {
        float: left;
        height: 24px;
        font-size: 12px;
        line-height: 22px;
        border: 1px solid #DCE0E6;
        border-radius: 2px;
        color: #5E6D82;
        margin-top: 8px;
        margin-right: 20px;
        .ms {
            float: left;
            padding: 0 12px;
        }
        .del {
            float: left;
            width: 24px;
            text-align: center;
            border-left: 1px solid #DCE0E6;
            cursor: pointer;
        }
    }
</style>
<style>
  .supply-container .el-table{text-align: center}
  .supply-container .el-table th{text-align: center}
  .supply-container .el-table td{text-align: center}
</style>

<script>
  export default {
    name: "",
    data() {
      return {
        //数据状态列表
        dataStatusList:[],
        //载入动画显示
        listLoading: false,
        //表单
        filters: {
          keywords:'',
          contact:'',
          mobile:'',
          status:''
        },
        //table内容
        supplyList: [],
        //数据总条数
        total: 0,
        //分页器当前选中页码
        currentPage: 1,

        pageNo: 1,
        pageSize: 10,
      }
    },
    methods: {
      addSupplier(){
        this.$router.push({
          path:"/product/supply/addSupplier"
        })
      },
      //获取列表
      getSupplyList() {
        let params = {
          contact: this.filters.contact,
          keywords: this.filters.keywords,
          mobile: this.filters.mobile,
          pageNo: this.pageNo,
          pageSize: this.pageSize,
          status: this.filters.status

        };
        this.postSearch(params)
      },

      //从后台拿取数据状态dataStatus
      getDataStatus(){
        this.$request.post('/api/wiseqr/dim/dataStatus',{}, true, (res) => {
          if (res.ret == '200000') {
            this.dataStatusList = res.data
          }
        })
      },

      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/api/wiseqr/supplier/list', params, true, (res) => {
          if (res.ret == '200000') {
            this.supplyList = res.data.list
            this.total = res.data.page.count
            this.pageSize = res.data.page.pageSize
            this.pageNo = res.data.page.pageNo
            this.listLoading = false;
          }
        })
      },
      //查询按钮
      commitForm() {
        this.page = 1
        this.currentPage = 1
        this.getSupplyList()
      },
      //radio按钮,重置
      getStatus() {
        this.filters.keywords = ''
        this.filters.contact = ''
        this.filters.mobile = ''
        this.filters.status = ''

        this.pageNo = 1
        this.currentPage = 1
        this.getSupplyList()
      },
      //编辑
      handleEdit(index, row) {
        this.$router.push({path:'/product/supply/editSupplier?id='+row.id})
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getSupplyList()
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //超过十个字添加title属性
      // istitle(value) {
      //   if (value) {
      //     if (value.length > 5) {
      //       return value
      //     } else {
      //       return ""
      //     }
      //   }
      // },
      //新增按钮
      modifyStatus(id,status) {
        let params = {
          id,
          status
        }
        this.$request.post('/api/wiseqr/supplier/modifyStatus',params,true,res => {
          if(res.ret == "200000"){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.getStatus()
          }
        })
      },
    },
    created(){
     this.getDataStatus()
    },
    mounted() {
      this.getSupplyList()
    }
  }
</script>