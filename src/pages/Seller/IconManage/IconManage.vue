<template>
  <div class="seller-icon-container" v-loading="loading">
    <el-card class="box-card">
      <div class="space"></div>
      <!-- 数据查询条件 -->
      <el-form :inline="true" :model="search">
        <el-form-item>
          <el-button size="small" type="primary" @click="addIcon">新建图标</el-button>
        </el-form-item>
        <div></div>
        <el-form-item label="图标名称：">
          <el-input size="small"  v-model="search.iconName"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item>
          <el-button size="small" type="primary" @click="list">查询</el-button>
          <el-button size="small" @click="reset">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="space"></div>
    <el-card>
      <!-- 数据表格 -->
      <el-table :data="tableList" style="width: 100%">
        <el-table-column label="序号" type="index" align="center" width="50">
          <template slot-scope="scope">
            {{ (search.page-1)*search.pageSize + scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="iconName" label="图标名称" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="dataForm(scope.$index, scope.row)">查看详情</el-button>
            <el-button type="text" size="mini" @click="deleteIcon(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="space"></div>
      <!-- 分页组件 -->
      <el-pagination :small="false" background layout="total, prev, pager, next, jumper"
                     @size-change="sizeChange" @current-change="currentChange"
                     :current-page="search.page" :page-size="search.pageSize"
                     :total="pagination.total">
      </el-pagination>
    </el-card>
    <el-dialog title="查看详情" width="500px" :visible.sync="form.show" center @close="handleCloseForm">
      <el-form  :inline="false"  label-width="100px">
        <el-form-item label="图标名称：">
          <el-input size="small"  v-model="form.iconName"></el-input>
        </el-form-item>
        <el-form-item label="图标图片：">
          <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :data="{channel:'hebei-sellerInfo '}"  :on-success="uploadImgUrlSuccess" :show-file-list="false">
            <img v-if="form.iconUrl" :src="form.iconUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer" style="text-align: center">

        <el-button size="small" v-if="!addFlag" type="primary" @click="submitForm">确 定</el-button>
        <el-button size="small" v-if="addFlag" type="primary" @click="addForm">确 定</el-button>
        <el-button size="small" @click="form.show=false">取 消</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadURL: '/api/wiseqr/attach/commonNewUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      search: {
        page: 1,
        pageSize: 10,
        iconName: "",
      },
      pagination: { // 分页
        total: 0
      },
      tableList: [],
      addFlag:false,
      form: {
        show: false, // 增库弹框是否展示
        id: '',
        iconUrl: '',
        rdmCode: '',
        iconName: ''
      },
      loading:false
    }
  },
  created() {
    this.list();
  },
  methods: {
    addIcon(){
      this.addFlag = true
      this.form.show = true
    },
    uploadImgUrlSuccess(resule) {
      if (resule.ret === '200000'){
        console.log(resule)
        this.form.rdmCode = resule.data.rdmCode
        this.form.iconUrl = resule.data.filePath
        return
      }
      this.$message.error(resule.message)
    },
    deleteIcon(id){
      this.$confirm(`您确定删除此图标？`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$request.post('/saasHbseller/shop/lbsIcon/del',{id},false,res => {
          if(res.code == 200){
            this.$message({
              message: '操作成功！',
              type: 'success'
            });
            this.list();
          }else{
            console.log(res)
            this.$message({
              message: res.msg,
              type: 'warning'
            });
            this.list();
          }
        })
      })
    },
    currentChange(page) {
      // 分页pageNo变更监听
      this.list(event, page);
    },
    sizeChange(pageSize) {
      // 分页pageNo变更监听
      this.list(event, null, pageSize);
    },
    // page = {"pageCount":总页数, "count":总数据条数}
    initPagination(total) {
      if(total) {
        this.pagination.total = total;
      }
    },
    // 重置查询
    reset() {
      this.search = {
        page: 1,
        pageSize: 10,
        iconName: ''
      }
      this.list();
    },
    // 查询礼品库列表数据
    list(_event, page, pageSize) {
      let _pageNo = 1;
      if(page) _pageNo = page;
      this.search.page = _pageNo;
      let _pageSize = 10;
      if(pageSize) _pageSize = pageSize;
      this.search.pageSize = _pageSize;

      this.$request.post('/saasHbseller/shop/lbsIcon/query', this.search, false, (res)=>{
        if (res.code == '200') {
          this.tableList = res.data.records || [];
          this.initPagination(res.data.total);
        }else {
          this.$message.error(res.msg);
        }
      });
    },
    handleCloseForm(){
      this.addFlag = false
      this.form.id = "";
      this.form.iconName = ""
      this.form.iconUrl = ""
      this.form.rdmCode = ""
    },
    dataForm(index, row) {
      this.loading = true
      this.form.id = "";
      if(row&&row.id) {
        this.form.id = row.id;
      }
      console.log(row)
      this.$request.post('/saasHbseller/shop/lbsIcon/detail', { id: this.form.id }, false, (res)=>{
        this.loading = false
        this.form.show = true;
        if (res.code == '200') {
          this.form.iconUrl = res.data.iconUrl
          this.form.iconName = res.data.iconName
          this.form.rdmCode = res.data.imgRdmCode
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    addForm(){
      if(!this.form.iconName){
        this.$message.error('请填写图片名称！')
      }
      if(!this.form.rdmCode){
        this.$message.error('请上传图片！')
      }
      let params = {
        iconName: this.form.iconName,
        rdmCode: this.form.rdmCode
      }
      this.$request.post('/saasHbseller/shop/lbsIcon/add', params, false, (res)=>{
        if (res.code == '200') {
          this.list();
          this.form.show = false;
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.msg);
        }
      });
    },
    submitForm() {
      let params = {
        id: this.form.id,
        iconName: this.form.iconName,
        rdmCode: this.form.rdmCode
      }
      this.$request.post('/saasHbseller/shop/lbsIcon/update', params, false, (res)=>{
        if (res.code == '200') {
          this.list();
          this.form.show = false;
          this.$message({type: 'success', message: '操作成功!'});
        } else {
          this.$message.error(res.msg);
        }
      });
    },
  }
}
</script>

<style scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
</style>
<style >
.seller-icon-container .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.seller-icon-container .avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.seller-icon-container .avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.seller-icon-container .avatar {
  width: 110px;
  height: 110px;
  display: block;
}
</style>
