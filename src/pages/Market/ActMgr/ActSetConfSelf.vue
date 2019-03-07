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
        <el-form-item label="优先级：" prop="idx" v-if="form != 'act-301'">
          <el-select v-model="confData.idx" placeholder="请选择" class="select-one">
            <el-option v-for="(val, key, index) in idxSelect" :key="index" :label="val" :value="key">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="活动时间：" prop="date">
          <!-- <el-date-picker v-model="actTime" :time-arrow-control="true" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss" type="datetimerange" :editable="false" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker> -->
          <el-date-picker v-model="confData.stimeStr" :disabled="timeDisable" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
          至
          <el-date-picker v-model="confData.etimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
        </el-form-item>
        <!-- 常规图片上传 -->
        <el-form-item label="活动图片：" prop="banner" v-if="form !== 'act-301'">
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*270像素；格式png、jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <!-- 红包雨图片上传 -->
        <el-form-item label="活动图片：" prop="banner" v-else>
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upBannerImg" :show-file-list="false">
            <img v-if="confData.banner" :src="confData.banner" class="avatar red-packet">
            <i v-else class="el-icon-plus avatar-uploader-icon red-packet"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：200像素*200像素；格式png、jpg；大小不超过2M</div>
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
          <el-select v-model="confData.selectProductList" multiple collapse-tags placeholder="请选择" @change="restrictSonBrand" class="select-two">
            <el-option v-for="item in productList" :key="item.id" :label="item.allName" :value="item.sn">
            </el-option>
          </el-select>
          <!-- 暂时不做 -->
          <!-- <el-button type="primary" @click="brandVisible = true" class="ml20">已选明细</el-button> -->
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
          <!--el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox-->
          <!-- 暂时不做 -->
          <!-- <el-button type="primary" @click="regionVisible = true" class="ml20">已选明细</el-button> -->
        </el-form-item>
        <el-form-item label="活动链接：" prop="link">
          <el-input v-model="confData.link" placeholder='请输入活动链接'></el-input>
        </el-form-item>
        <el-form-item label="是否在落地页显示：">
          <el-switch v-model="confData.showStatus"></el-switch>
        </el-form-item>
        <el-form-item label="是否立即发布：">
          <el-switch v-model="confData.status"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="nextStep">保存发布</el-button>
          <el-button @click="$router.push('/market/actTpl')">返回列表</el-button>
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
      if (this.confData.selectProductList.length>0) {
        callback()
      } else {
        callback(new Error('请选择品牌规格'))
      }
    }
    var valideSelectCityList = (rules, value, callback) => {
      if (this.confData.selectCityList.length>0) {
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
      extInfo:{
      	limited:1,
      	time:60
      },
      idxSelect: {},
      confData: {
        actDesc: '',
        actName: '',
        banner: '',
        form: '',
        idx: '1',
        note: '',
        stimeStr: '',
        etimeStr: '',
        showStatus: 1,
        tplCode: '',
        extInfo: '',
        status: 1,
        selectBrand: [], // 选择的品牌
        selectProductList: [], // 选择的产品
        selectProvList: [], // 选择的省份
        selectCityList: [], // 选择的城市
        selectDistrictList: [], // 选择的区县
        link: '' // 活动链接
      },
      redConf: {
        joinNum: 1,
        share: 0
      },
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
      uploadURL: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
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
    }
  },
  created() {
    this.getBrandList();
    this.getAllRegions();
    this.getDetail()
    this.getIdxSelect()
  },
  methods: {
  	limitNum(){
  		var len=4;
  		if(this.extInfo.time.length>len){
  			var str=this.extInfo.time.slice(0,len);
  			this.extInfo.time=parseInt(str);
  		}
  		
    },
    // 加载所有的省市区数据
    getAllRegions() {
      this.$request.post('/api/saotx/dim/allRegions', { withRight:true }, true, res => {
        if (res.ret == '200000') {
          let allAreas = res.data || {}; // {'province':[{code:'',name:'',pcode:'',pname:''}, ...], 'city':{'provCode': [{code:'',name:'',pcode:'',pname:''}], ...}, 'district':{'cityCode': [{code:'',name:'',pcode:'',pname:''}], ...}}
          this.allProv = allAreas['province']||[];
          this.allCity = allAreas['city']||{};
          this.allDistrict = allAreas['district']||{};
          this.provList = this.provList.concat(this.allProv);
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
          return;
        } else if(this.confData.selectProvList.length>1&&this.confData.selectProvList[0]=='000000') {
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
    },
    getDistrictList() {
      this.districtList = [];
      this.confData.selectDistrictList = [];
      if(this.confData.selectProvList.length>0) {
        if(this.confData.selectCityList[this.confData.selectCityList.length-1]=='000000') {
          // 全国
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
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/saotx/prod/listBrand', {pageSize: '-1'}, true, res => {
        if (res.ret == '200000') {
          this.brandList = res.data.list || [];
          return;
        }
        this.$message.error(res.message);
      })
    },
    // 获取子品牌列表
    getProductList() {
      this.$request.post('/api/saotx/prod/list', {brandCodeArr:this.confData.selectBrand, pageSize:'-1'}, true, res => {
        if (res.ret == '200000') {
          this.productList = res.data.list || [];
          return;
        }
        this.$message.error(res.message);
      });
    },
    getDetail() {
      if (!this.id) return
      this.$request.post('/api/saotx/act/detail', { id: this.id }, true, res => {
        if (res.ret == '200000') {
          if (this.clone == '1') {
            for (let key in this.confData) {
              this.confData[key] = res.data.act[key]
            }
          } else {
            this.confData = res.data.act
          }
          if (this.form == 'act-301') this.redConf = JSON.parse(this.confData.extInfo)
          this.confData.idx = this.confData.idx + ''
          if (this.redConf.extInfo) this.extInfo=JSON.parse(this.confData.extInfo)
          if (this.confData.stimeStr && this.confData.etimeStr) {
            this.handleDisableTime()
          }
          // this.actTime.push(this.confData.stimeStr)
          // this.actTime.push(this.confData.etimeStr)
          return
        }
        this.$message.error(res.messgae)
      })
    },
    handleDisableTime() {
      let newTime = new Date().getTime(),
        stime = new Date(this.form.stimeStr).getTime()
        if (newTime >= stime) {
          this.timeDisable = true
        }
    },
    // 获取优先级
    getIdxSelect() {
      this.$request.post('/api/saotx/act/idxSelect', {}, true, res => {
        if (res.ret === '200000') return this.idxSelect = res.data
      })
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
    nextStep() {
      this.$refs.actSetConfRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单数据!')
        if(this.form=='act-501'){
        	if(this.extInfo.limited==1){
	        	if(this.extInfo.time<=0 || !this.extInfo.time){
	        		 return this.$message.error('请填写时间限制的具体值!')
	        	}
	        }
        }       
        if (!this.id) {
          this.confData.form = this.form;
          if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(this.extInfo);
          }         
          this.confData.tplCode = this.tplCode
        }else {
        	if(this.form=='act-501'){
          	this.confData.extInfo=JSON.stringify(this.extInfo);
          } 
        }
        if (this.form == 'act-301') this.confData.extInfo = JSON.stringify(this.redConf)
        this.$request.post('/api/saotx/act/somtfSelf', this.confData, true, res => {
          if (res.ret === '200000') {
          	if(this.form=='act-501'){
          		return this.$router.push(
              '/market/actTpl/quesActSetConf?id=' + res.data.id + '&actCode=' + res.data.actCode+'&form='+this.form
            	)
          	} else if (this.form=='act-301') {
              return this.$router.push(`/market/actTpl/redPut?id=${res.data.id}&actCode=${res.data.actCode}`)
            } else {
          		return this.$router.push(
              '/market/actTpl/actPutConf?id=' + res.data.id + '&actCode=' + res.data.actCode
            	)
          	}
            
          }
          this.$message.error(res.message)
        })
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
  height: 108px;
  line-height: 108px;
  text-align: center;
  &.red-packet {
    width: 100px;
    height: 100px;
  }
}
.avatar {
  width: 300px;
  height: 108px;
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
