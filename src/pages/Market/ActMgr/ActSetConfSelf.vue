<!-- Description: 自定义活动基础设置-->
<template>
  <div class="actSetConf-container">
    <el-card>
      <el-form ref="actSetConfRef" :model="confData" label-width="150px" :rules="confRules">
        <el-form-item label="活动名称：" prop="actName">
          <el-input v-model="confData.actName" maxLength='15' placeholder='请输入活动名称，15字以内'></el-input>
        </el-form-item>
        <el-form-item label="活动描述：" prop="note">
          <el-input type="textarea" v-model="confData.note" :rows="3" resize="none" maxLength='15' placeholder='请输入活动描述，15字以内'></el-input>
        </el-form-item>
        <el-form-item label="优先级：" prop="idx">
          <el-select v-model="confData.idx" placeholder="请选择" class="select-one">
            <el-option v-for="(val, key) in idxSelect" :key="key" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间：" prop="date">
          <el-date-picker v-model="confData.stimeStr" :disabled="timeDisable" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
          至
          <el-date-picker v-model="confData.etimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <!-- 常规图片上传 -->
        <el-form-item label="活动图片：" prop="banner">
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*160像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="活动说明：" prop="desc">
          <quill-editor ref="myTextEditor" v-model="confData.actDesc" :options="editorOption" placeholder="请输入活动说明，300字以内" @blur="onEditorBlur($event)">
          </quill-editor>
        </el-form-item>
        <el-form-item label="品牌规格：" prop="selectProductList">
          <el-select v-model="confData.selectBrand" multiple collapse-tags placeholder="请选择" @change="getProductList" class="select-two">
            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="confData.selectProductList" multiple collapse-tags placeholder="请选择"  class="select-two">
            <el-option v-for="item in productList" :key="item.id" :label="item.allName" :value="item.sn">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="地区：" prop="selectCityList">
          <el-select size="small" v-model="confData.selectProvList" multiple collapse-tags filterable placeholder="请选择" @change="getCityList" class="select-three">
            <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select size="small" v-model="confData.selectCityList" multiple collapse-tags filterable placeholder="请选择" @change="getDistrictList" class="select-three">
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select size="small" v-model="confData.selectDistrictList" multiple collapse-tags filterable placeholder="请选择" class="select-three">
            <el-option v-for="item in districtList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动链接：" prop="link">
          <el-input v-model="confData.link" placeholder='请输入活动链接'></el-input>
        </el-form-item>
        <el-form-item label="是否在落地页显示：">
          <el-switch v-model="confData.showStatus" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否立即发布：">
          <el-switch v-model="confData.status" :active-value="1" :inactive-value="2" :disabled="statusDisabled"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confirmSubmit">确定</el-button>
          <el-button @click="$router.push('/market/actMgr')">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
export default {
  props: ['form', 'tplCode', 'id', 'clone'],
  components: {
    quillEditor
  },
  data() {
    var validateDate = (rule, value, callback) => {
      if (!this.confData.stimeStr || !this.confData.etimeStr) {
        callback(new Error('请选择活动时间'))
      } else if (this.confData.stimeStr >= this.confData.etimeStr){
        callback(new Error('开始时间必须小于结束时间'))
      } else {
        callback()
      }
    }
    var validateIdx = (rule, value, callback) => {
      if (value == '0') {
        callback(new Error('请选择活动优先级'))
      } else {
        callback()
      }
    }
    var validateBanner = (rule, value, callback) => {
      if (!this.confData.banner) {
        callback(new Error('请选择活动图片'))
      } else {
        callback()
      }
    }
    var validateDesc = (rule, value, callback) => {
      if (!this.confData.actDesc) {
        callback(new Error('请输入活动说明'))
      } else {
        callback()
      }
    }
    var valideSelectProductList = (rules, value, callback) => {
      if (this.confData.selectProductList&&this.confData.selectProductList.length>0) {
        callback()
      } else {
        callback(new Error('请选择品牌规格'))
      }
    }
    var valideSelectCityList = (rules, value, callback) => {
      if (this.confData.selectCityList&&this.confData.selectCityList.length>0) {
        callback()
      } else {
        callback(new Error('请选择地区'))
      }
    }
    return {
      // 富文本设置
      editorOption: {
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', , 'blockquote'],
            [{ color: [] }, { background: [] }, { align: [] }]
          ]
        },
        placeholder: '请输入活动说明'
      },
      idxSelect: {},
      confData: {
        id: '', // 活动数据主键id
        actCode: '', // 活动唯一编码
        actDesc: '', // 活动描述
        actName: '', // 活动名称
        banner: '', // 活动入口banner
        form: this.form, // 活动类型
        idx: '', // 活动优先级
        note: '', // 活动说明
        stimeStr: '', // 活动开始时间
        etimeStr: '', // 活动结束时间
        showStatus: 0, // 活动是否在落地页展示：0-不展示；1-展示
        tplCode: '', // 活动投放使用的模板编码。自定义活动为空
        extInfo: '', // 活动扩展字段。自定义活动存储外链：{link: ''}
        status: 1, // 活动是否启用：1-启用；2-不启用
        selectBrand: [], // 选择的品牌
        selectProductList: [], // 选择的产品
        selectProvList: [], // 选择的省份
        selectCityList: [], // 选择的城市
        selectDistrictList: [], // 选择的区县
        link: '' // 活动链接
      },
      statusDisabled: false,
      strategyArr: [], // 活动投放策略
      extInfo: {},
      confRules: {
        actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' }],
        note: [{ required: true, message: '请输入活动描述', trigger: 'blur' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        idx: [{ required: true, validator: validateIdx, trigger: 'change' }],
        banner: [{ required: true, validator: validateBanner }],
        desc: [{ required: true, validator: validateDesc }],
        selectProductList: [{ required: true, validator: valideSelectProductList }],
        selectCityList: [{ required: true, validator: valideSelectCityList }],
        link: [{ required: true, message: '请输入活动链接', trigger: 'blur' }]
      },
      // actTime: [],
      timeDisable: false,
      uploadURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token')
      },
      stepActive:0,

      brandList: [], // 品牌
      productList: [], // 产品

      provList: [{code: '000000',name: '全国'}], // 省
      cityList: [], // 市
      districtList: [], // 区
      allProv: [], // 所有省份：[{code:'',name:'',pcode:'',pname:''}, ...]
      allCity: {}, // 所有城市：{'provCode': [{code:'',name:'',pcode:'',pname:''}], ...}
      allDistrict: {}, // 所有区县：{'cityCode': [{code:'',name:'',pcode:'',pname:''}], ...}
      
      initProd: false, // 是否编辑或复制时的页面品牌规格初始化
      initCity: false, // 是否编辑或复制时的页面城市初始化
      initDistrict: false // 是否编辑或复制时的页面区县初始化
    }
  },
  created() {
    if( this.id&&this.id>0 ) {
      // 编辑或复制
      this.initProd = true;
      this.initCity = true;
      this.initDistrict = true;
      this.getDetail();
    } else {
      this.initAjax();
    }
  },
  methods: {
    initAjax() {
      this.getIdxSelect();
      this.getBrandList();
      this.getAllRegions();
    },
    // 获取优先级
    getIdxSelect() {
      this.$request.post('/api/wiseqr/act/idxSelect', {}, true, res => {
        if (res.ret === '200000') return this.idxSelect = res.data
      })
    },
    // 加载所有的省市区数据
    getAllRegions() {
      this.$request.post('/api/wiseqr/dim/allRegions', { withRight:true }, true, res => {
        if (res.ret == '200000') {
          let allAreas = res.data || {}; // {'province':[{code:'',name:'',pcode:'',pname:''}, ...], 'city':{'provCode': [{code:'',name:'',pcode:'',pname:''}], ...}, 'district':{'cityCode': [{code:'',name:'',pcode:'',pname:''}], ...}}
          this.allProv = allAreas['province']||[];
          this.allCity = allAreas['city']||{};
          this.allDistrict = allAreas['district']||{};
          this.provList = this.provList.concat(this.allProv);
          // 处理地区
          let strategy = this.strategyArr[0];
          if(strategy) {
            this.confData.selectProvList = strategy.areas.provinceArr||[];
          }
          if (this.initCity) {
            this.getCityList();
          }
        } else {
          this.$message.error(res.messgae);
        }
      })
    },
    getCityList() {
      this.districtList = [];
      this.confData.selectCityList = [];
      this.confData.selectDistrictList = [];
      if(this.confData.selectProvList.length>0) {
        if(this.confData.selectProvList[this.confData.selectProvList.length-1]=='000000') {
          // 最后一次点击是全国
          this.confData.selectProvList = ['000000'];
          this.cityList = [{code: '000000',name: '全国'}];
          if (this.initCity) {
            this.confData.selectCityList = ['000000'];
            this.initCity = false;
          }
          return;
        } else if(this.confData.selectProvList.length>1&&this.confData.selectProvList[0]=='000000') {
          // 第一个点击的是全国，并且最后一个点击的非全国，则去除全国的选中
          this.confData.selectProvList.shift();
        }
        this.cityList = [];
        let tmpList = [];
        for(let i=0; i<this.confData.selectProvList.length; i++) {
          let provCode = this.confData.selectProvList[i];
          tmpList = tmpList.concat(this.allCity[provCode]);
        }
        this.cityList = tmpList;
      } else {
        this.cityList = [];
      }
      if (this.initCity) {
        let strategy = this.strategyArr[0];
        if(strategy) {
          this.confData.selectCityList = strategy.areas.cityArr||[];
        }
        this.initCity = false;
      }
      if (this.initDistrict) {
        this.getDistrictList();
      }
    },
    getDistrictList() {
      this.districtList = [];
      this.confData.selectDistrictList = [];
      if(this.confData.selectProvList.length>0) {
        if(this.confData.selectCityList[this.confData.selectCityList.length-1]=='000000') {
          // 全国
          this.confData.selectCityList = ['000000'];
          this.districtList = [{code: '000000',name: '全国'}];
          return;
        }
        this.districtList = [];
        let tmpList = [];
        for(let i=0; i<this.confData.selectCityList.length; i++) {
          let cityCode = this.confData.selectCityList[i];
          tmpList = tmpList.concat(this.allDistrict[cityCode]);
        }
        this.districtList = tmpList;
      } else {
        this.districtList = [];
      }
      if (this.initDistrict) {
        let strategy = this.strategyArr[0];
        if(strategy) {
          this.confData.selectDistrictList = strategy.areas.districtArr||[];
        }
        this.initDistrict = false;
      }
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/wiseqr/prod/listBrand', {pageSize: '-1'}, true, res => {
        if (res.ret == '200000') {
          this.brandList = res.data.list || [];
          // 处理产品规格
          let strategy = this.strategyArr[0];
          if(strategy) {
            this.confData.selectBrand = strategy.brandArr||[];
            if (this.initProd) {
              this.getProductList();
            }
          }
          return;
        }
        this.$message.error(res.message);
      })
    },
    // 获取子品牌列表
    getProductList() {
      this.$request.post('/api/wiseqr/prod/list', {brandCodeArr:this.confData.selectBrand, pageSize:'-1'}, true, res => {
        if (res.ret == '200000') {
          this.productList = res.data.list || [];
          if (this.initProd) {
            let strategy = this.strategyArr[0];
            if(strategy) {
              this.confData.selectProductList = strategy.snArr||[];
            }
            this.initProd = false;
          }
          return;
        }
        this.$message.error(res.message);
      });
    },
    copyDetailAttr(act) {
      if(act.status == 1) {
        this.statusDisabled = true;
      }
      // 处理活动链接
      if (act.extInfo) {
        this.extInfo = JSON.parse(act.extInfo);
      }
      this.confData = {
        id: act.id||'', // 活动数据主键id
        actCode: act.actCode||'', // 活动唯一编码
        actDesc: act.actDesc||'', // 活动描述
        actName: act.actName||'', // 活动名称
        banner: act.banner||'', // 活动入口banner
        form: this.form, // 活动类型
        idx: act.idx+''||'', // 活动优先级
        note: act.note||'', // 活动说明
        stimeStr: act.stimeStr||'', // 活动开始时间
        etimeStr: act.etimeStr||'', // 活动结束时间
        showStatus: act.showStatus||1, // 活动是否在落地页展示：0-不展示；1-展示
        tplCode: act.tplCode||'', // 活动投放使用的模板编码。自定义活动为空
        extInfo: act.extInfo||'', // 活动扩展字段。自定义活动存储外链：{link: ''}
        status: act.status||2, // 活动是否启用：1-启用；2-不启用
        selectBrand: [], // 选择的品牌
        selectProductList: [], // 选择的产品
        selectProvList: [], // 选择的省份
        selectCityList: [], // 选择的城市
        selectDistrictList: [], // 选择的区县
        link: this.extInfo['link']||'' // 活动链接
      };
      if (this.clone == '1') {// 复制
        this.confData.id = '';
        this.confData.actCode = '';
      }
      if (act.stimeStr && act.etimeStr) {
        this.handleDisableTime()
      }
    },
    getDetail() {
      this.$request.post('/api/wiseqr/act/detail', { id: this.id }, true, res => {
        if (res.ret == '200000') {
          this.copyDetailAttr(res.data.act);
          this.strategyArr = res.data.strategyArr;
          this.initAjax();
          return
        }
        this.$message.error(res.messgae)
      })
    },
    handleDisableTime() {
      let newTime = new Date().getTime(),
        stime = new Date(this.confData.stimeStr).getTime()
        if (newTime >= stime&&this.confData.status == 1) {
          this.timeDisable = true
        }
        if(this.clone == '1'){
          this.timeDisable = false
        }
    },
    // 上传活动图片
    upBannerImg(resule) {
      if (resule.ret === '200000') {
        this.confData.banner = resule.data.accessUrl
        this.$refs.actSetConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    // 富文本框失焦
    onEditorBlur() {
      this.$refs.actSetConfRef.validateField('desc', valid => {})
    },
    // form表单提交
    confirmSubmit() {
      this.$refs.actSetConfRef.validate(valid => {
        if (valid) {
          this.extInfo = {link: this.confData.link};
          this.confData.extInfo = JSON.stringify(this.extInfo);
          let params = {};
          params.act = this.confData;
          let strategyParams = {tf:{}, tfType:'common', snArr: this.confData.selectProductList, areas: {provinceArr:this.confData.selectProvList, cityArr:this.confData.selectCityList, districtArr:this.confData.selectDistrictList}};
          let strategy = this.strategyArr[0];
          if(strategy) {
            strategyParams.tf['id'] = strategy.tf.id;
            strategyParams.tf['tfCode'] = strategy.tf.tfCode;
          }
          params.strategyArr = [];
          params.strategyArr.push(strategyParams);
          this.$request.post('/api/wiseqr/act/somtfSelf', params, true, res => {
            if (res.ret == '200000') {
              this.$message({type: 'success', message: '操作成功!'});
              this.$router.push({path:"/market/actMgr"});
            } else {
              this.$message.error(res.message);
            }
          })
        }
      })
    },
    beforeAvatarUpload(file) {
      const JPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!JPGOrPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return JPGOrPNG && isLt2M;
    }
  }
}
</script>
<style lang="scss" scoped>
.actSetConf-container {
  .el-input,
  .el-textarea,
  .select-one {
    width: 600px;
  }
  .select-two {
    width: 297px;
  }
  .select-three {
    width: 197px;
  }
  .el-date-editor {
    width: 289px;
  }
}

.step-style {
	margin-bottom: 40px;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 64px;
  line-height: 64px;
  text-align: center;
  &.red-packet {
    width: 100px;
    height: 100px;
  }
}
.avatar {
  width: 300px;
  height: 64px;
  display: block;
  &.red-packet {
     width: 100px;
    height: 100px;
  }
}
.quill-editor {
  width: 600px;
}
.limited-time {
	width:60px;
	margin-left: 10px;
	margin-right: 10px;
	height: 24px;
	border-radius: 4px;
	border:none;
	border:1px solid #ccc;
}
.el-date-editor {
  width: 210px;
}
</style>
