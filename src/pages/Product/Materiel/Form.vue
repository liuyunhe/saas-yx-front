<template>
  <div class="materiel">
    <el-card class="box-card">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <el-form-item :label="materielName[metraFlag]+'名称'" prop="name">
          <el-input size="small" v-model="form.name"></el-input>
        </el-form-item>
        <!-- 虚拟物料有此项内容 -->
        <el-form-item v-if="metraFlag=='virtual'" label="类型" prop="type">
          <el-select size="small" v-model="form.type" placeholder="请选择分类" @change="getCategories(2, form.type)" class="materiel-type" :disabled="id?true:false">
            <el-option v-for="item in categoryList" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
          <el-select size="small" v-model="form.subType" placeholder="请选择子分类" prop="subType" class="materiel-type" :disabled="id?true:false">
            <el-option v-for="item in categorySubList" :key="item.code" :label="item.name" :value="item.code"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="供应商" prop="supplierCode">
          <el-select size="small" v-model="form.supplierCode" placeholder="请选择供应商" :disabled="id?true:false">
            <el-option v-for="item in supplierList" :key="item.supplierCode" :label="item.name" :value="item.supplierCode"></el-option>
          </el-select>
        </el-form-item>
        <!-- 实物或虚拟物料有此项内容 -->
        <el-form-item v-if="metraFlag=='object'||metraFlag=='virtual'" label="市场价值（元）" prop="marketMoney">
          <el-input size="small" type="number" v-model="form.marketMoney"></el-input>
        </el-form-item>
        <el-form-item label="礼品图片" prop="pic">
          <!-- <el-upload class="avatar-uploader" :disabled="id?true:false" size="small" -->
          <el-upload class="avatar-uploader" size="small"
            action="/api/wiseqr/attach/commonAliUpload"
            :headers="headers"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <img v-if="form.pic" :src="form.pic" class="avatar" width="100" height="74">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">* 图片建议尺寸为380*280px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
          </el-upload>
        </el-form-item>
        <el-form-item :label="'库存（'+materielUnit[metraFlag]+'）'" prop="stock">
          <el-input size="small" type="text" v-model="form.stock" :disabled="id?true:false" @keyup.native="integerCheck('stock')"></el-input>
        </el-form-item>
        <el-form-item label="库存阀值" prop="warnValue">
          <el-input size="small" type="text" v-model="form.warnValue" @keyup.native="integerCheck('warnValue')"></el-input>
        </el-form-item>
        <!-- 虚拟物料有此项内容 -->
        <el-form-item v-if="metraFlag=='virtual' && elementShow['889']" label="链接URL" prop="outUrl">
          <el-input size="small" v-model="form.outUrl"></el-input>
        </el-form-item>
        <!-- 虚拟物料有此项内容 -->
        <el-form-item v-if="metraFlag=='virtual' && elementShow['890']" label="卡密文件" prop="sourceCode">
          <a class="alike-btn" href="javascript:;" @click="downTpl">模板下载</a>
          <el-upload class="upload-demo" size="small"
            action="/api/wiseqr/metra/import"
            :headers="headers"
            :data="form"
            :before-upload="handlerSourceFileBUpload"
            :on-success="handleSourceFileSuccess"
            :on-remove="handleSourceFileRemove"
            :file-list="sourceFiles">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传csv/excel文件</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="描述" prop="note">
          <el-input size="small" type="textarea" v-model="form.note" :autosize="{ minRows: 3, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="submitForm('form')">保存</el-button>
          <el-button size="small" @click="cancelForm('form')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import Config from '@/pages/Product/datas/conf'
export default {
  props: ['metraFlag', 'materielId'],
  data() {
    return {
      id: this.materielId,
      materielName: Config.materielName,
      materielUnit: Config.materielUnit,
      materielType: Config.materielType,
      headers: {
        "token": sessionStorage.getItem("access_token"),
        "loginId": sessionStorage.getItem("access_loginId")
      },
      categoryList: [], // 虚拟物料大分类：/saotx/dim/query {cateCode: "award_type", parentCode: "2"}
      categorySubList: [], // 虚拟物料子分类
      supplierList: [],
      form: {
        id: '',
        name: '',
        supplierCode: '',
        pic: '',
        stock: '',
        warnValue: '',
        note: '',
        marketMoney: '', // 实物或虚拟物料市场价值
        type: '', // 虚拟物料类型
        subType: '', // 虚拟物料子类型
        outUrl: '', // 虚拟物料外链
        sourceCode: '' // 虚拟物料上传卡密文件编码
      },
      rules: {
        name: [{required:true, message:'请输入名称', trigger:'blur'}],
        type: [{required:true, message:'类型不能为空', trigger:'blur'}],
        supplierCode: [{required:true, message:'请选择供应商', trigger:'change'}],
        marketMoney: [{required:true, message:'请输入正确的市场价值'}],
        pic: [{required:true, message:'请上传礼品图片', trigger:'change'}],
        stock: [{required:true, message:'请输入库存值', trigger:'change' }]
      },
      elementShow: {
        '889': false, // 889-外链
        '890': false // 890-卡密
      },
      sourceFiles: [] // 卡密文件上传结果存储{name:'', sourceCode: ''}
    };
  },
  created() {
    this.getSuppliers();
    if(this.metraFlag&&this.id) { // id有值，则说明编辑
      this.detail();
    } else {
      this.form.pic = Config.banner[this.metraFlag];
    }
    if(this.metraFlag=='virtual') {
      this.getCategories(1, this.materielType[this.metraFlag]);
    }
  },
  methods: {
    downTpl() {
      location.href = 'https://qoss.qrmkt.cn/saas_platform/common/materiel-tpl890.xlsx';
    },
    // 验证控制库存值为正整数
    integerCheck (key) {
      if (key) {
        if (this.form[key].indexOf('0')==0) {
          this.form[key] = this.form[key].substring(1);
        }
        this.form[key] = this.form[key].replace(/[^\.\d]/g,'');
        this.form[key] = this.form[key].replace('.','');
      }
    },
    // 查询所有的供应商数据
    getSuppliers() {
      this.$request.post('/api/wiseqr/supplier/list', {pageSize:-1, status: 1}, true, (res)=>{
        if (res.ret == '200000') {
          this.supplierList = res.data.list||[];
        }
      });
    },
    /**
     * 查询根据父编码查询所有的物料分类
     * level 查询等级：1-一级；2-二级
     * parentCode 父分类的编码
     * defaultV 当前等级默认值
     */
    getCategories(level, parentCode, defaultV) {
      for(let key in this.elementShow) {
        this.elementShow[key] = false;
      }
      this.elementShow[parentCode] = true;
      this.form.subType = defaultV||'';
      this.categorySubList = [];
      this.$request.post('/api/wiseqr/dim/query', {cateCode:"award_type",parentCode:parentCode}, true, (res)=>{
        if (res.ret == '200000') {
          if(level==1) {
            this.categoryList = res.data||[];
          } else {
            this.categorySubList = res.data||[];
          }
        }
      });
    },
    // 查询数据详情
    detail() {
      this.$request.post('/api/wiseqr/metra/detail', {id:this.id, metraFlag:this.metraFlag}, true, (res)=>{
        if (res.ret == '200000') {
          let _data = res.data;
          if(_data) {
            this.form = Object.assign({}, this.form, _data);
            if(this.metraFlag=='virtual') {
              this.getCategories(2, this.form.type, this.form.subType);
              if(_data.sourceFile) {
                let obj = {name:_data.sourceFile, sourceCode:_data.sourceCode};
                this.sourceFiles.push(obj);
              }
            }
          }
        }
      });
    },
    // 提交表单
    submitForm(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.form.metraFlag = this.metraFlag;
          if(this.metraFlag=='virtual'&&this.form.type=='890') { // 虚拟物料
            if(this.sourceFiles.length==0) { // 卡券类型
              this.$message.error("卡密类型的物料必须上传卡密文件！");
              return false;
            }
            let source = this.sourceFiles[0];
            const count = source.count;
            if(count!=this.form.stock) {// 卡密上传成功解析入库数与增库数不同
              this.$confirm('卡密上传成功解析入库数与增库数不同，确认提交吗？', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
              }).then(() => {
                this.form.sourceCode = source.sourceCode; // 卡密编码
                this.form.sourceFile = source.name; // 卡密文件名称
                this.requestAddStore();
              }).catch(() => {});
              return false;
            }
          }
          this.requestAddStore();
        }
      });
    },
    requestAddStore() {
      this.$request.post('/api/wiseqr/metra/saveOrModify', this.form, true, (res)=>{
        if (res.ret == '200000') {
          //this.$router.push({path:"/product/materiel/table?metraFlag="+this.metraFlag});
          this.$emit('showTable', true);
        } else {
          this.$message.error(res.message);
        }
      });
    },
    // 提交取消
    cancelForm(form) {
      this.$refs[form].resetFields();
      //this.$router.push({path:'/product/materiel/'+this.metraFlag});
      this.$emit('showTable');
    },
    // 文件上传控制。上传之前的校验
    beforeAvatarUpload(file) {
      //const isJPG = file.type === 'image/jpeg';
      let ext;
      let filename = file.name;
      let idx = filename.lastIndexOf(".");
      if( idx>-1 ) {
        ext = filename.substring(idx+1);
      }
      if("png,jpg,jpeg".indexOf(ext)==-1) {
        this.$message.error('图片格式错误，只支持：png、jpg、jpeg!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!');
        return false;
      }
      return true;
    },
    // 文件上传控制。成功之后的回调
    handleAvatarSuccess(res, file) {
      if(res.ret==200000) {
        this.form.pic = res.data.accessUrl;
      }
    },
    // 卡密文件上传之前
    handlerSourceFileBUpload(file) {
      if(!this.form.type) {
        this.$message.error("请先选择类型，在上传卡密文件！");
        return false;
      }
    },
    // 卡密文件上传控制。成功之后的回调
    handleSourceFileSuccess(res, file) {
      if(res.ret==200000) {
        //sourceCode: "D248BAE8A6DE47168F2BA5C1B1E2B3EE"
        //sourceFile: "卡密.xlsx"
        //successCount: 2
        //successMsg: "成功解析入库2条数据！"
        this.$message({type:'success', message:res.data.successMsg});
        let obj = {name:res.data.sourceFile, sourceCode:res.data.sourceCode, count:res.data.successCount};
        this.sourceFiles.push(obj);
      } else {
        this.$message.error(res.message);
      }
    },
    // 卡密文件上传之后，删除文件
    handleSourceFileRemove(file, fileList) {
      this.sourceFiles = []; // 清空上传文件内容的引用
    }
  }
}
</script>

<style scoped>
  .el-input, .el-select, .el-textarea, .el-upload-list {
    width: 400px;
  }
  .el-select.materiel-type {
    width: 200px;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    text-align: center;
  }
  .materiel .avatar-uploader .el-upload {
    width: 102px;
    height:76px;
    line-height: 84px;
  }
  .alike-btn {
    color:#409EFF;
    display: block;
    padding-bottom: 10px;
  }
</style>
