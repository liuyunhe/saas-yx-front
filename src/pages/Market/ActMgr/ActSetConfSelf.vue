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
        <el-form-item label="活动弹窗：" prop=" popInfo">
          <el-upload class="avatar-uploader-popup" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :on-success="upPopInfoImg" :show-file-list="false">
            <img v-if="confData.popInfo" :src="confData.popInfo" class="avatar-popup">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：600像素*700像素；格式png、jpg；大小不超过2M</div>
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
          <el-select size="small" v-model="confData.selectProvList" multiple collapse-tags filterable placeholder="请选择" @change="getCityList" class="select-three" :disabled="isDisabled">
            <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select size="small" v-model="confData.selectCityList" multiple collapse-tags filterable placeholder="请选择" @change="getDistrictList" class="select-three" :disabled="isDisabled" @remove-tag='removeTag'>
            <el-option label='全选' value='全选' @click.native='selectAll'></el-option>
            <el-option v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
<!--          <el-select size="small" v-model="confData.selectDistrictList" multiple collapse-tags filterable placeholder="请选择" class="select-three">-->
<!--            <el-option v-for="item in districtList" :key="item.code" :label="item.name" :value="item.code">-->
<!--            </el-option>-->
<!--          </el-select>-->
          <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox>
        </el-form-item>
        <el-form-item label="活动标签：" prop="actTag" >
          <el-radio v-for="(item,index) in actTagGroup" :key="index" :disabled="id ? true : false" v-model="confData.actTag" :label="item.id">{{ item.name }}</el-radio>
          <span v-if="showNoneActTag">无</span>
        </el-form-item>
<!--        <el-form-item label="销区：" v-if="showSaleZone">-->
<!--          <el-select size="small" :disabled="saleZoneDisabled" :clearable="true" v-model="confData.saleZoneCode" placeholder="请选择">-->
<!--            <el-option-->
<!--                v-for="(item,index) in saleZone"-->
<!--                :key="index"-->
<!--                :label="item.zoneName"-->
<!--                :value="item.zoneCode">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
        <el-form-item label="活动链接：" prop="link">
          <el-input v-model="confData.link" placeholder='请输入活动链接'></el-input>
        </el-form-item>
        <el-form-item label="是否在落地页显示：">
          <el-switch v-model="confData.showStatus" :active-value="1" :inactive-value="0"></el-switch>
        </el-form-item>
        <el-form-item label="是否立即发布：">
          <el-switch v-model="confData.status" :active-value="1" :inactive-value="2" :disabled="statusDisabled"></el-switch>
        </el-form-item>
        <el-form-item label="是否配置奖池：">
          <el-switch v-model="useAwardArr" :active-value="true" :inactive-value="false"></el-switch>
        </el-form-item>
        <el-form-item label="是否直接抽奖：" v-if="useAwardArr">
          <el-switch v-model="directDraw" :active-value="'1'" :inactive-value="'0'"></el-switch>
        </el-form-item>
        <ActPutConf ref="actPutConf" :awardArr="awardArr" :nLimit="nLimit" @modifyAwardArr = "modifyAwardArr" v-show="useAwardArr"></ActPutConf>
        <el-form-item v-if="!useAwardArr">
          <el-button type="primary" @click="confirmSubmit">确定</el-button>
          <el-button @click="$router.push('/market/actMgr')">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
import { quillEditor } from 'vue-quill-editor'
import ActPutConf from './components/ActPutConf'
export default {
  props: ['form', 'tplCode', 'id', 'clone'],
  components: {
    quillEditor,
    ActPutConf
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
      actTagGroup:[],
      confData: {
        id: '', // 活动数据主键id
        actCode: '', // 活动唯一编码
        actDesc: '', // 活动描述
        actName: '', // 活动名称
        banner: '', // 活动入口banner
        popInfo: '',
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
        saleZoneFlag:0,
        saleZoneCode: null,
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
      saleZone:[],  //  销区
      provList: [{code: '000000',name: '全国'}], // 省
      cityList: [], // 市
      districtList: [], // 区
      allProv: [], // 所有省份：[{code:'',name:'',pcode:'',pname:''}, ...]
      allCity: {}, // 所有城市：{'provCode': [{code:'',name:'',pcode:'',pname:''}], ...}
      allDistrict: {}, // 所有区县：{'cityCode': [{code:'',name:'',pcode:'',pname:''}], ...}
      isDisabled: false, // 是否全国

      initProd: false, // 是否编辑或复制时的页面品牌规格初始化
      initCity: false, // 是否编辑或复制时的页面城市初始化
      initDistrict: false, // 是否编辑或复制时的页面区县初始化

      awardArr:[],
      useAwardArr:false,
      directDraw:"0",
      nLimit:{
        nlimit:0,
        nlimitNum:null,
        nlimitProb:null,
      },
      Cindex:0,

      showSaleZone:sessionStorage.getItem('account').indexOf('shankun') == -1,
      saleZoneDisabled:false,
      showNoneActTag:false,
    }
  },
  watch:{
    isDisabled: function (val) {
      // console.log(val)
      if (val) {
        this.confData.selectProvList = ['000000']
        this.confData.selectCityList = ['000000']
        this.cityList = []
        this.cityList.push({code: '000000',name: '全国'})
        // this.confData.selectDistrictList = ['000000']
      } else {
        this.confData.selectProvList = []
        this.confData.selectCityList = []
        // this.confData.selectDistrictList = []
        this.cityList = []
      }
    },
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
      this.getActTag()
    }
  },
  methods: {
    upPopInfoImg(resule) {
      if (resule.ret === '200000') {
        this.confData.popInfo = resule.data.accessUrl
        // this.$refs.actSetConfRef.validateField('banner', valid => {})
        return
      }
      this.$message.error(resule.message)
    },
    getActTag() {
      if(!this.id){
        this.$request.post('/api/actTag/query/saleZoneTag', {saleZoneCode:this.confData.saleZoneCode}, false, (res) => {
          if (res.code == '200') {
            this.actTagGroup = res.data.tagList || []
          }
        })
      }else {
        this.$request.post('/api/actTag/query/saleZoneTag', {saleZoneCode:null}, false, (res) => {
          if (res.code == '200') {
            let actTag = res.data.tagList.find((item)=>{
              return item.id == this.confData.actTag
            })
            if(actTag){
              this.actTagGroup = [actTag]
            }else {
              this.actTagGroup = []
            }
          }
        })
      }

    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res)=>{
        if (res.code == '200') {
          this.saleZone = res.data||[];
        }
      });
    },
    modifyAwardArr(data){
      this.awardArr = data
      console.log(this.awardArr)
      this.confirmSubmit()
    },
    initAjax() {
      this.getIdxSelect();
      this.getBrandList();
      this.getAllRegions();
      this.getSaleZone()
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
          let strategy = this.strategyArr[this.Cindex];
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
    getCityList(val) {
      this.districtList = [];
      this.confData.selectDistrictList = [];
      if(this.confData.selectProvList.length>0) {
        if(this.confData.selectProvList[this.confData.selectProvList.length-1]=='000000') {
          // 最后一次点击是全国
          this.confData.selectCityList = [];
          this.confData.selectProvList = ['000000'];
          this.cityList.splice(0,this.cityList.length)
          let allcity = Object.values(this.allCity)
          let tmpList = [];
          for(let i = 0; i < allcity.length; i++){
            tmpList = tmpList.concat(allcity[i])
          }
          for(let i = 0; i < tmpList.length; i++){
            this.cityList.push(tmpList[i])
          }
          this.confData.selectCityList = this.cityList.map(item => {
            return item.code
          })
          this.confData.selectCityList.unshift('全选')
          if (this.initCity) {
            let strategy = this.strategyArr[this.Cindex];
            if(strategy) {
              if(strategy.areas.cityArr[0] =='000000'){
                this.isDisabled = true
              }
              this.confData.selectCityList = strategy.areas.cityArr||[];
            }
            this.initCity = false;
          }
          return;
        } else if(this.confData.selectProvList.length>1&&this.confData.selectProvList[0]=='000000') {
          // 第一个点击的是全国，并且最后一个点击的非全国，则去除全国的选中
          this.confData.selectProvList.shift();
          this.confData.selectDistrictList = [];
        }
        console.log(111)
        let arr = []
        this.cityList = [];
        this.confData.selectProvList.forEach(item=>{
          this.cityList.push(...this.allCity[item])
        })
        this.confData.selectCityList.forEach((item,index)=>{
          const city = this.cityList.find(i=>{
            return i.code == item
          })
          console.log(city)
          if(city){
            arr.push(item)
          }
        })
        this.confData.selectCityList =  arr
        let l = this.confData.selectCityList.length
        if(this.confData.selectCityList.includes('全选')){
          l = l - 1
        }
        console.log(l,this.cityList.length)
        if(l != this.cityList.length){
          if(this.confData.selectCityList[0]=='全选'){
            this.confData.selectCityList.shift();
          }
        }else {
          if(this.confData.selectCityList[0]!='全选'){
            this.confData.selectCityList.unshift('全选')
          }
        }
        // if(this.confData.selectCityList.length>1&&this.confData.selectProvList[0]=='000000')
        // let tmpList = [];
        // for(let i=0; i<this.confData.selectProvList.length; i++) {
        //   let provCode = this.confData.selectProvList[i];
        //   tmpList = tmpList.concat(this.allCity[provCode]);
        // }
        // this.cityList = tmpList;
      } else {
        console.log(2222)
        this.cityList = [];
        this.confData.selectCityList=[]
      }
      if (this.initCity) {
        let strategy = this.strategyArr[this.Cindex];
        if(strategy) {
          this.confData.selectCityList = strategy.areas.cityArr||[];
        }
        if(this.confData.selectCityList.length !==0 && this.confData.selectCityList.length == this.cityList.length){
          this.confData.selectCityList.unshift('全选')
        }
        this.initCity = false;
      }
      if (this.initDistrict) {
        this.getDistrictList();
      }
    },
    selectAll() {
      if (this.confData.selectCityList.length < this.cityList.length) {
        this.confData.selectCityList = []
        this.cityList.map((item) => {
          this.confData.selectCityList.push(item.code)
        })
        this.confData.selectCityList.unshift('全选')
      } else {
        this.confData.selectCityList = []
      }
    },
    removeTag(val) {
      if (val === '全选') {
        this.confData.selectCityList = []
      }
    },
    getDistrictList(val) {
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
        let strategy = this.strategyArr[this.Cindex];
        if(strategy) {
          this.confData.selectDistrictList = strategy.areas.districtArr||[];
        }
        this.initDistrict = false;
      }
      if(!val) return
      if (!val.includes('全选') && val.length === this.cityList.length) {
        this.confData.selectCityList.unshift('全选')
      } else if (val.includes('全选') && (val.length - 1) < this.cityList.length) {
        this.confData.selectCityList = this.confData.selectCityList.filter((item) => {
          return item !== '全选'
        })
      }
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/wiseqr/prod/listBrand', {pageSize: '-1'}, true, res => {
        if (res.ret == '200000') {
          this.brandList = res.data.list || [];
          // 处理产品规格
          let strategy = this.strategyArr[this.Cindex];
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
      this.$request.post('/api/wiseqr/prod/list', {brandCodeArr:this.confData.selectBrand, pageSize:'-1', status: '1',}, true, res => {
        if (res.ret == '200000') {
          this.productList = res.data.list || [];
          if (this.initProd) {
            let strategy = this.strategyArr[this.Cindex];
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
      if (act.status == 2) {
        this.saleZoneDisabled = false
      } else {
        this.saleZoneDisabled = true
      }
      // 处理活动链接
      if (act.extInfo) {
        this.extInfo = JSON.parse(act.extInfo);
      }
      console.log(act)
      this.confData = {
        id: act.id||'', // 活动数据主键id
        actCode: act.actCode||'', // 活动唯一编码
        actDesc: act.actDesc||'', // 活动描述
        actTag: act.actTag||'', // 活动标签
        actName: act.actName||'', // 活动名称
        banner: act.banner||'', // 活动入口banner
        popInfo: act.popInfo||'', // 活动入口banner
        form: this.form, // 活动类型
        idx: act.idx+''||'', // 活动优先级
        note: act.note||'', // 活动说明
        stimeStr: act.stimeStr||'', // 活动开始时间
        etimeStr: act.etimeStr||'', // 活动结束时间
        showStatus: act.showStatus||0, // 活动是否在落地页展示：0-不展示；1-展示
        tplCode: act.tplCode||'', // 活动投放使用的模板编码。自定义活动为空
        extInfo: act.extInfo||'', // 活动扩展字段。自定义活动存储外链：{link: ''}
        status: act.status||2, // 活动是否启用：1-启用；2-不启用
        saleZoneCode: act.saleZoneCode||null, // 销区
        saleZoneFlag: act.saleZoneFlag|| 0, // 销区标识
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
          this.getActTag()
          if(!this.confData.actTag){
            this.showNoneActTag = true
          }
          this.strategyArr = res.data.strategyArr;
          res.data.strategyArr.forEach((item, index) => {
            if (item.tfType == 'common') {
              this.Cindex = index
              this.initAjax();
              if(res.data.strategyArr[this.Cindex].awardArr){
                this.useAwardArr = true
                this.awardArr = res.data.strategyArr[this.Cindex].awardArr
                if('directDraw' in JSON.parse(res.data.act.extInfo)){
                  if(JSON.parse(res.data.act.extInfo)['directDraw']=='1'){
                    this.directDraw = '1'
                  }
                }
                if(res.data.act.tfExtInfo != null && 'nlimit' in JSON.parse(res.data.act.tfExtInfo)){
                  console.log(11111111)
                  if(JSON.parse(res.data.act.tfExtInfo)['nlimit'] == 1){
                    this.nLimit.nlimit = 1
                    this.nLimit.nlimitNum = JSON.parse(res.data.act.tfExtInfo)['nlimitNum']
                    this.nLimit.nlimitProb = JSON.parse(res.data.act.tfExtInfo)['nlimitProb']
                    this.$refs.actPutConf.NprizeLimitFlag = true
                  }
                }
              }
            }
            if (item.tfType == 'sn_first') {
              if(this.clone != 1){
                this.$refs.actPutConf.firstScanTfId = item.tf.id
              }
              item.awardArr.forEach((sonItem, i) => {
                if (i != 0) {
                  this.$refs.actPutConf.firstScanTabs.push({
                    title: '常规奖项' + (i + 1),
                    name: '' + (i + 1)
                  })
                }
                // for (let k in sonItem) {
                //   this.firstScanTabs[i][k] = sonItem[k]
                // }
                if (i == 0) {
                  for (let k in sonItem) {
                    this.$refs.actPutConf.firstScanConf[0][k] = sonItem[k]
                  }
                } else {
                  this.$refs.actPutConf.firstScanConf.push(sonItem)
                }
              })
              this.$refs.actPutConf.specialRuleConfFlag = true
              this.$refs.actPutConf.firstScanFlag = true
              this.$refs.actPutConf.firstScanConf = item.awardArr
            }
            if (item.tfType == 'n_mwin') {
              if(this.clone != 1){
                this.$refs.actPutConf.nWinTfId = item.tf.id
              }
              this.$refs.actPutConf.nWinTabs=[]
              item.awardArr.forEach((sonItem, i) => {

                this.$refs.actPutConf.nWinTabs.push({
                  title: sonItem.n + '次必中',
                  name: '' + (i+1)
                })
                // for (let k in sonItem) {
                //   this.nWinTabs[i][k] = sonItem[k]
                // }
                if (i == 0) {
                  for (let k in sonItem) {
                    this.$refs.actPutConf.nWinConf[0][k] = sonItem[k]
                  }
                } else {
                  this.$refs.actPutConf.nWinConf.push(sonItem)
                }
              })
              this.$refs.actPutConf.specialRuleConfFlag = true
              this.$refs.actPutConf.nWinFlag = true
              this.$refs.actPutConf.nWinConf = item.awardArr
            }
            if (item.tfType == 'special') {
              if(this.clone != 1){
                this.$refs.actPutConf.fixationPutTfId = item.tf.id
              }
              item.awardArr.forEach((sonItem, i) => {
                if (i != 0) {
                  this.$refs.actPutConf.fixationPutTabs.push({
                    title: '常规奖项' + (i + 1),
                    name: '' + (i + 1)
                  })
                }
                // for (let k in sonItem) {
                //   console.log(this.normalConf[i][k])
                //   this.fixationPutTabs[i][k] = sonItem[k]
                // }
                if (i == 0) {
                  for (let k in sonItem) {
                    this.$refs.actPutConf.fixationPutConf[0][k] = sonItem[k]
                  }
                } else {
                  this.$refs.actPutConf.fixationPutConf.push(sonItem)
                }
              })
              this.$refs.actPutConf.specialRuleConfFlag = true
              this.$refs.actPutConf.fixationPutFlag = true
              this.$refs.actPutConf.fixationPutConf = item.awardArr
              this.$refs.actPutConf.specialAreas = item.areas
              this.$refs.actPutConf.specialBrand.brandArr = item.brandArr
              this.$refs.actPutConf.specialBrand.snArr = item.snArr
              this.$refs.actPutConf.tfDurationArr.push(item.tf.sduration)
              this.$refs.actPutConf.tfDurationArr.push(item.tf.eduration)
              this.$refs.actPutConf.tfTimeArr.push(item.tf.stimeStr)
              this.$refs.actPutConf.tfTimeArr.push(item.tf.etimeStr)
            }
          })
          return
        }
        this.$message.error(res.message)
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
          this.extInfo = {
            link: this.confData.link,
            directDraw:this.directDraw,
          };
          let tfExtInfo = {
            nlimit:this.$refs.actPutConf.nLimit.nlimit,
            nlimitNum:this.$refs.actPutConf.nLimit.nlimitNum,
            nlimitProb:this.$refs.actPutConf.nLimit.nlimitProb,
          };
          this.confData.extInfo = JSON.stringify(this.extInfo);
          this.confData.tfExtInfo = JSON.stringify(tfExtInfo);
          let params = {};
          params.act = this.confData;
          let strategyParams = {tf:{}, tfType:'common', snArr: this.confData.selectProductList, areas: {provinceArr:this.confData.selectProvList, cityArr:this.confData.selectCityList, districtArr:this.confData.selectDistrictList}};
          console.log(strategyParams)
          if(strategyParams.areas.cityArr[0] == '全选'){
            strategyParams.areas.cityArr.shift()
          }
          let strategy = this.strategyArr[this.Cindex];
          if(strategy) {

            strategyParams.tf['id'] = strategy.tf.id;
            strategyParams.tf['tfCode'] = strategy.tf.tfCode;
          }
          if(this.clone == 1){
            strategyParams.tf = {}
          }
          params.strategyArr = [];
          params.strategyArr.push(strategyParams);
          if(this.useAwardArr){
            params.strategyArr[0].awardArr = this.awardArr
          }
          let index = 0
          if (this.$refs.actPutConf.firstScanFlag) {
            params.strategyArr.push(JSON.parse(JSON.stringify(this.$refs.actPutConf.strategy)))
            index = params.strategyArr.length
            params.strategyArr[index - 1].awardArr = this.$refs.actPutConf.firstScanConf
            params.strategyArr[index - 1].confOpen = true
            params.strategyArr[index - 1].tfType = 'sn_first'
            params.strategyArr[index - 1].tf = { id: this.$refs.actPutConf.firstScanTfId }
          }
          if (this.$refs.actPutConf.nWinFlag) {
            params.strategyArr.push(JSON.parse(JSON.stringify(this.$refs.actPutConf.strategy)))
            index = params.strategyArr.length
            params.strategyArr[index - 1].awardArr = this.$refs.actPutConf.nWinConf
            params.strategyArr[index - 1].confOpen = true
            params.strategyArr[index - 1].tfType = 'n_mwin'
            params.strategyArr[index - 1].tf = { id: this.$refs.actPutConf.nWinTfId }
          }
          if (this.$refs.actPutConf.fixationPutFlag) {
            params.strategyArr.push(JSON.parse(JSON.stringify(this.$refs.actPutConf.strategy)))
            index = params.strategyArr.length
            params.strategyArr[index - 1].areas = this.$refs.actPutConf.specialAreas
            params.strategyArr[index - 1].awardArr = this.$refs.actPutConf.fixationPutConf
            params.strategyArr[index - 1].confOpen = true
            params.strategyArr[index - 1].brandArr = this.$refs.actPutConf.specialBrand.brandArr
            params.strategyArr[index - 1].snArr = this.$refs.actPutConf.specialBrand.snArr
            // data.strategyArr[index - 1].tf.sduration = this.tfDurationArr[0]
            // data.strategyArr[index - 1].tf.eduration = this.tfDurationArr[1]
            // data.strategyArr[index - 1].tf.stimeStr = this.tfTimeArr[0]
            // data.strategyArr[index - 1].tf.etimeStr = this.tfTimeArr[1]
            params.strategyArr[index - 1].tf = {
              sduration: this.$refs.actPutConf.tfDurationArr[0],
              eduration: this.$refs.actPutConf.tfDurationArr[1],
              stimeStr: this.$refs.actPutConf.tfTimeArr[0],
              etimeStr: this.$refs.actPutConf.tfTimeArr[1],
              id: this.$refs.actPutConf.fixationPutTfId
            }
            params.strategyArr[index - 1].tfType = 'special'
            // data.strategyArr[index - 1].tf = { id: this.fixationPutTfId }
          }
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
.avatar-uploader-popup{
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 140px;
    line-height: 140px;
    text-align: center;
    &.red-packet {
      width: 100px;
      height: 100px;
      line-height: 100px
    }
  }
}

.avatar-popup {
  width: 120px;
  height: 140px;
  display: block;
  &.red-packet {
    width: 100px;
    height: 100px;
    line-height: 100px
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
