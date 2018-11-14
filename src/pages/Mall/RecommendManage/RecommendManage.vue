<template>
  <section class="recommend-manage-container">
    <div class="box-container">
      <el-col :span="24" class="breadcrumb-container">
        <el-button size="small" type="primary" @click="addRecommend">新增推荐位</el-button>
      </el-col>
      <!--列表-->
      <el-col class="crm-table-wrap" v-loading="listLoading" :span="24">
        <el-table
            :data="recommendList"
            style="width: 100%">
          <el-table-column
              type="index"
              label="序号"
              width="70">
          </el-table-column>
          <el-table-column
              prop="name"
              label="推荐位名称">
          </el-table-column>
          <el-table-column
              prop="idx"
              label="排序值">
          </el-table-column>
          <el-table-column
              prop="ctime"
              label="创建时间"
              width="200">
            <template slot-scope="scope">
              <span>{{ new Date(scope.row.ctime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
            </template>
          </el-table-column>
          <el-table-column
              label="操作">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  @click="editRecommend(scope.row.id,scope.row.type)">
                编辑</el-button>
              <el-button
                  size="mini"
                  type="danger"
                  @click="deleteRecommend(scope.row.id)">
                删除</el-button>
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

    <div class="newLandingPage">
      <el-dialog
          title="推荐位模板选择"
          :visible.sync="landingPage"
          :before-close="handleClose"
          width="694px">
        <div class="tpm-img clearfix" style="display: flex">
          <div class="left"  @click="templateLink('A')">
            <div class="img">
              <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/saas/template1.png" alt="A模板">
            </div>
            <p>A模板</p>
          </div>
          <div class="left">
            <div class="img" @click="templateLink('B')">
              <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/saas/template3.png" alt="B模板">
            </div>
            <p>B模板</p>
          </div>
          <div class="left">
            <div class="img" @click="templateLink('C')">
              <img src="https://weiopn.oss-cn-beijing.aliyuncs.com/saas/template2.png" alt="C模板">
            </div>
            <p>C模板</p>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button style="width:79px;height:32px;line-height:8px;" @click="landingPage = false">取 消</el-button>
        </span>
      </el-dialog>
    </div>
  </section>
</template>

<script>
  export default {
    name: "RecommendManage",
    data() {
      return {
        //载入动画显示
        listLoading: false,

        //table内容
        recommendList: [],
        //数据总条数
        total: 0,
        //分页器当前选中页码
        currentPage: 1,

        pageNo: 1,
        pageSize: 10,

        landingPage: false,

      }
    },
    methods: {
      addRecommend(){
        this.landingPage = true
        // this.$router.push({
        //   path:"/mall/banner/addRecommend"
        // })
      },
      //获取列表
      getRecommendList() {
        let params = {
          "pageNo": this.pageNo,
          "pageSize": this.pageSize,
        };
        this.postSearch(params)
      },
      //传送查询条件
      postSearch(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/recommend/list', params, true, (res) => {
          if (res.ret == '200000') {
            this.recommendList = res.data.list
            this.total = res.data.page.count
            this.pageSize = res.data.page.pageSize
            this.pageNo = res.data.page.pageNo
            this.listLoading = false;
          }
        })
      },
      //分页器功能
      handleCurrentChange(val) {
        this.pageNo = val
        this.currentPage = val
        this.getRecommendList()
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //编辑
      editRecommend(id,type){
        if(type==1){
          this.$router.push({
            path:'/mall/recommend/editCommendTpmA?id='+id
          })
        }else if(type==2){
          this.$router.push({
            path:'/mall/recommend/editCommendTpmB?id='+id
          })
        }else if(type==3){
          this.$router.push({
            path:'/mall/recommend/editCommendTpmC?id='+id
          })
        }

      },
      //删除
      deleteRecommend(id){
        this.$confirm('您确定删除此推荐位？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id}
          this.$request.post('/sc/saotx/mall/recommend/remove',params, true, (res) => {
            if (res.ret == '200000') {
              this.$message({
                message:"已删除",
                type: 'warning'
              })
              this.getRecommendList()
            }else{
              this.$message({
                message:res.message,
                type: 'warning'
              })
              this.getRecommendList()
            }
          })
        }).catch(() => {
          //
        });
      },

      handleClose() {
        this.landingPage = false
      },
      templateLink(type){
        this.landingPage =false;
        this.$router.push('/mall/recommend/addCommendTpm'+type)
      },
    },
    created(){
      this.getRecommendList()
    },
  }
</script>

<style lang="scss" scoped>
  .recommend-manage-container{
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
    .newLandingPage {
      .el-dialog__header {
        display: flex !important;
        padding: 4px 20px 10px;
        height: 49px;
        font-size: 14px;
        font-family: PingFangSC-Regular;
        color: rgba(26, 23, 59, 1);
        line-height: 49px;
        border-bottom: 1px solid rgba(242, 244, 248, 1);
      }
      .tpm-img {
        width: 100%;
        .left {
          width: 50%;
          height: auto;
          float: left;
          text-align: center;
          .img{
            height: 100px;
            line-height: 120px;
            cursor: pointer;
            img {
              width: auto;
              height: 80%;
            }
          }
          p{
            margin-top: 18px;
            line-height: 30px;
            color: #1A173B;
          }
        }
      }
      .el-dialog__footer {
        padding: 10px 20px 20px;
        text-align: right;
        box-sizing: border-box;
        height: 56px;
        border-top: 1px solid rgba(242, 244, 248, 1);
      }
    }
  }
</style>
<style>
  .recommend-manage-container .el-table{text-align: center}
  .recommend-manage-container .el-table th{text-align: center}
  .recommend-manage-container .el-table td{text-align: center}
</style>