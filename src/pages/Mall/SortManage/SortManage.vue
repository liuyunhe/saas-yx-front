<template>
  <section class="sort-manage-container">
    <div class="add-new-category">
      <el-button type="primary" size="small fr"  @click="addCategory('1','0')">新建一级分类</el-button>
    </div>
    <el-tree
        v-loading="listLoading"
        default-expand-all
        :data="queryListTree"
        node-key="id"
        :expand-on-click-node="false">
      <span class="custom-tree-node" style="width: 100%" slot-scope="{ node, data }">
        <img v-if="node.level ==1" :src="node.data.icon" width="40" height="40" style="vertical-align: middle;">
        <span style="line-height: 40px;margin-left: 15px">{{ node.data.name }}</span>
        <span style="float: right">
          <el-button type="text" v-if="node.level !==4" @click="addCategory(node.level+1,node.data.id)">新增子分类</el-button>
          <el-button type="text" v-if="node.data.statusType == 1" @click="disableCategory(node.data.id)">禁用</el-button>
          <el-button type="text" v-if="node.data.statusType == 0" @click="enableCategory(node.data.id)">启用</el-button>
          <el-button type="text" @click="editCategory(node.level,node.data.id,node.data)">编辑</el-button>
          <el-button type="text" @click="removeCategory(node.data.id)">删除</el-button>
        </span>
      </span>
    </el-tree>

    <!--弹窗-->
    <el-dialog :title='dialogLevel' :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称：" prop="name" size="small">
          <el-input v-model="ruleForm.name" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item  label="排序值：" prop="idx" size="small">
          <el-input v-model="ruleForm.idx" type="number" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item v-show="dialogLevel == '新建一级分类'||dialogLevel == '编辑一级分类'" label="图标：" prop="icon" size="small">
          <el-input v-model="ruleForm.icon" style="display: none" ></el-input>
          <el-upload
              action="/api/saotx/attach/commonAliUpload"
              list-type="picture-card"
              class="cateory-icon"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccessUrl"
          >
            <img v-if="ruleForm.icon" width="146" height="146" :src="ruleForm.icon" class="avatar">
          </el-upload>
          <div class="pic-tips">提示：建议尺寸：60像素*60像素；格式png，jpg；大小不超过2M；</div>
        </el-form-item>
        <el-form-item label="状态：" prop="statusType" size="small">
          <el-radio v-model="ruleForm.statusType" label="1">启用</el-radio>
          <el-radio v-model="ruleForm.statusType" label="0">禁用</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>

<script>
  export default {
    name: "SortManage",
    data() {
      return {
        //载入条
        listLoading:false,

        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },

        queryListTree:[],

        dialogFormVisible:false,
        //弹窗表单
        ruleForm: {
          //分类名称
          name:'',
          //排序值
          idx:'',
          //分类图标
          icon:'',
          //状态
          statusType:'1',
          //父级id
          pid:'',
          //当前ID
          id:''
        },
        rules: {
          name: [
            { required: true, message: '请输入分类名称', trigger: 'blur' },
          ],
          idx: [
            { required: true, message: '请输入排序值', trigger: 'blur' },
          ],
          icon: [
            { required: true, message: '请上传图标', trigger: 'change' },
          ],
          statusType: [
            { required: true, message: '请选择状态', trigger: 'blur' },
          ],
        },
        dialogLevel:'',
      }
    },
    created(){
      this.getQueryListTree()
    },
    methods: {
      //从后台拿取商品分类树
      getQueryListTree(){
        this.listLoading = true
        this.$request.post('/sc/saotx/mall/cate/queryListTree',{}, true, (res) => {
          if (res.ret == '200000') {
            this.queryListTree = [...res.data]
            this.listLoading = false
          }else {
            this.listLoading = false
            this.$message({
              message:res.message,
              type: 'warning'
            })
          }
        })
      },
      modifyForm(){
        //分类名称
        this.ruleForm.name = ''
        //排序值
        this.ruleForm.idx = ''
        //分类图标
        this.ruleForm.icon = ''
        //状态
        this.ruleForm.statusType = '1'
        //父级id
        this.ruleForm.pid = ''
        //当前ID
        this.ruleForm.id = ''
      },
      //新建分类
      addCategory(level,id){
        if(level == 1){
          this.dialogLevel = "新建一级分类"
          this.rules.icon = [{ required: true, message: '请上传图标', trigger: 'change' }]

        }
        if(level == 2){
          this.dialogLevel = "新建二级分类"
          this.rules.icon = []
        }
        if(level == 3){
          this.dialogLevel = "新建三级分类"
          this.rules.icon = []
        }
        if(level == 4){
          this.dialogLevel = "新建四级分类"
          this.rules.icon = []
        }
        this.dialogFormVisible = true
        this.ruleForm.pid = id
      },
      //编辑分类
      editCategory(level,id,data){
        // this.resetForm('ruleForm')
        if(level == 1){
          this.dialogLevel = "编辑一级分类"
          this.rules.icon = [{ required: true, message: '请上传图标', trigger: 'change' }]
          this.ruleForm.icon = data.icon
        }
        if(level == 2){
          this.dialogLevel = "编辑二级分类"
          this.rules.icon = []
        }
        if(level == 3){
          this.dialogLevel = "编辑三级分类"
          this.rules.icon = []
        }
        if(level == 4){
          this.dialogLevel = "编辑四级分类"
          this.rules.icon = []
        }
        this.dialogFormVisible = true
        this.ruleForm.pid = data.pId
        this.ruleForm.name = data.name
        this.ruleForm.idx = data.idx
        this.ruleForm.statusType = data.statusType+""

        this.ruleForm.id = id
      },
      //提交表单
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              "name":this.ruleForm.name,
              "idx":this.ruleForm.idx,
              "pid":this.ruleForm.pid,
              "statusType":this.ruleForm.statusType,
              "id":this.ruleForm.id
            }
            if(this.dialogLevel == '新建一级分类'||this.dialogLevel == '编辑一级分类'){
              params.icon = this.ruleForm.icon
            }
            this.$request.post('/sc/saotx/mall/cate/saveOrModify',params, true, (res) => {
              if (res.ret == '200000') {
                this.resetForm('ruleForm')
                this.modifyForm()
                this.dialogFormVisible = false
                this.getQueryListTree()
              }else{
                this.$message({
                  message:res.message,
                  type: 'warning'
                })
              }
            })

          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      //禁用
      disableCategory(id){
        this.$confirm('您确定禁用此分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id}
          this.$request.post('/sc/saotx/mall/cate/disable',params, true, (res) => {
            if (res.ret == '200000') {
              this.$message({
                message:"已禁用",
                type: 'warning'
              })
              this.getQueryListTree()
            }else{
              this.$message({
                message:res.message,
                type: 'warning'
              })
              this.getQueryListTree()
            }
          })
        }).catch(() => {
          //
        });
      },
      //启用
      enableCategory(id){
        this.$confirm('您确定启用此分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id}
          this.$request.post('/sc/saotx/mall/cate/used',params, true, (res) => {
            if (res.ret == '200000') {
              this.$message({
                message:"已启用",
                type: 'success'
              })
              this.getQueryListTree()
            }else{
              this.$message({
                message:res.message,
                type: 'warning'
              })
              this.getQueryListTree()
            }
          })
        }).catch(() => {
          //
        });
      },
      //删除
      removeCategory(id){
        this.$confirm('您确定删除此分类？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {id}
          this.$request.post('/sc/saotx/mall/cate/remove',params, true, (res) => {
            if (res.ret == '200000') {
              this.$message({
                message:"已删除",
                type: 'success'
              })
              this.getQueryListTree()
            }else{
              this.$message({
                message:res.message,
                type: 'warning'
              })
              this.getQueryListTree()
            }
          })
        }).catch(() => {
          //
        });
      },
      cancelForm(){
        this.dialogFormVisible = false
        this.resetForm('ruleForm')
        this.modifyForm()
      },
      //重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleAvatarSuccessUrl(res, file){
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.icon = imgUrl;
      },
    },
    mounted(){
      // this.cancelForm()
    }
  }
</script>

<style lang="scss" scoped>
  .sort-manage-container{
    padding: 20px;
    max-width: 1200px;
    background: #fff;
  }
  .add-new-category{
    margin-bottom: 30px;
    &:after{
      content: "";
      display:  block;
      width: 0;
      height: 0;
      clear: both;
    }
    .pic-tips{
      color: #ccc;
    }
  }
</style>