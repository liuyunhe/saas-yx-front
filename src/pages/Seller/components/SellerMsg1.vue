<template>
  <section class="basic-msg-container-1">
    <div class="basic-msg-broad">
      <div class="basic-msg-item"><span class="title">申请时间：</span>{{ applyTime }}</div>
      <div class="basic-msg-item"><span class="title">审核时间：</span>{{ auditTime }}</div>
    </div>
    <el-form :model="ruleForm" :disabled="disabled" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <div class="basic-msg-form-container">
        <el-form-item label="门店照片：" prop="shopImg" size="small">
          <el-input v-model="ruleForm.shopImg" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonNewUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :data="{channel:'hebei-sellerInfo '}"
          >
            <img v-if="ruleForm.shopImg"  width="200" height="200" :src="ruleForm.shopImg" class="avatar">
          </el-upload>
          <div class="pic-tips">上传图片的最佳尺寸：750像素*468像素；格式png、jpg；大小不超过2M</div>
          <div>
            <div class="preview-btn el-button el-button--primary el-button--small" v-if="ruleForm.shopImg" @click="handlePictureCardPreview(ruleForm.shopImg)">预览</div>
          </div>
        </el-form-item>
        <div></div>
        <el-form-item label="门店名称：" prop="shopName" size="small">
          <el-input v-model="ruleForm.shopName" style="width: 200px"></el-input>
        </el-form-item>
        <div> </div>
        <el-form-item label="烟草专卖证号：" prop="licenseNo" size="small">
          <el-input type="number" v-model="ruleForm.licenseNo" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="烟草专卖证号照片：" prop="licenseImg" size="small">
          <el-input v-model="ruleForm.licenseImg" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonNewUpload"
              list-type="picture-card"
              class="product-url"
              :headers="headers"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccessUrl"
              :data="{channel:'hebei-sellerInfo '}"
          >
            <img v-if="ruleForm.licenseImg" width="200" height="200" :src="ruleForm.licenseImg" class="avatar">
          </el-upload>
          <div class="pic-tips">此图用于商品详情展示；尺寸：宽750像素；格式png、jpg；大小不超过2M</div>
          <div>
            <div class="preview-btn el-button el-button--primary el-button--small" v-if="ruleForm.licenseImg" @click="handlePictureCardPreview(ruleForm.licenseImg)">预览</div>
          </div>
        </el-form-item>
        <div></div>
        <el-form-item label="经营人姓名：" prop="contactName" size="small">
          <el-input v-model="ruleForm.contactName" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item :size="'small'" prop="gender" label="性别：">
          <el-select
              v-model="ruleForm.gender"
              placeholder="请选择"
              style="width: 200px">
            <el-option label="男" :value="1"></el-option>
            <el-option label="女" :value="2"></el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="经营人电话：" prop="contactPhone" size="small">
          <el-input v-model="ruleForm.contactPhone" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="LBS显示图标名称：" prop="saleZoneCode" size="small">
          <el-select size="small" v-model="ruleForm.shopIconCode" placeholder="请选择" style="width: 200px" @change="handleLbsIconChange">
            <el-option
                v-for="(item,index) in iconList"
                :key="index"
                :label="item.iconName"
                :value="item.iconCode">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="LBS图标：" size="small">
          <img v-if="ruleForm.shopIconCode" width="100" height="100" :src="lbsIocn" style="display: block;border: 1px dashed #c0ccda;">
        </el-form-item>
        <div></div>
        <el-form-item size="small" label="位置：" prop="provCode">
          <el-select
              v-model="ruleForm.provCode"
              placeholder="请选择"
              @change="selectBrand1"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl1List"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="" prop="cityCode">
          <el-select
              v-model="ruleForm.cityCode"
              placeholder="请选择"
              @change="selectBrand2"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl2List"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item size="small" label="" prop="countyCode">
          <el-select
              v-model="ruleForm.countyCode "
              placeholder="请选择"
              @change="selectBrand3"
              style="width: 160px">
            <el-option
                v-for="item in cateLvl3List"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="门店地址：" prop="detailAddr" size="small">
          <el-input v-model="ruleForm.detailAddr" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="定位lat：" prop="shopLat" size="small">
          <el-input v-model="ruleForm.shopLat" style="width: 200px"></el-input>
        </el-form-item>
        <el-form-item label="定位lng：" prop="shopLat" size="small">
          <el-input v-model="ruleForm.shopLng" style="width: 200px"></el-input>
          <div class="preview-btn el-button el-button--primary el-button--small" style="margin-left: 20px" @click="handleClickMap(ruleForm.shopLat,ruleForm.shopLng)">核对定位</div>
        </el-form-item>
        <div></div>
        <el-form-item :size="'small'" prop="areaType" label="区域">
          <el-select
              v-model="ruleForm.areaType"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in districtList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="销区：" prop="saleZoneCode" size="small">
          <el-select size="small" v-model="ruleForm.saleZoneCode" placeholder="请选择" style="width: 200px">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
<!--        <el-form-item :size="'small'" prop="commercial" label="业态">-->
<!--          <el-select-->
<!--              v-model="ruleForm.commercial"-->
<!--              placeholder="请选择"-->
<!--              style="width: 200px">-->
<!--            <el-option-->
<!--                v-for="item in commercialList"-->
<!--                :key="item.code"-->
<!--                :label="item.name"-->
<!--                :value="item.code">-->
<!--            </el-option>-->
<!--          </el-select>-->
<!--        </el-form-item>-->
<!--        <div></div>-->

        <el-form-item  label="业务员姓名：" size="small">
          <el-input  v-model="ruleForm.salesman" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>

<!--        <el-form-item  label="联系人姓名：" prop="contactName" size="small">-->
<!--          <el-input  v-model="ruleForm.salesman" style="width: 200px"></el-input>-->
<!--        </el-form-item>-->
<!--        <div></div>-->
<!--        <el-form-item  label="联系人电话：" prop="contactPhone" size="small">-->
<!--          <el-input type="number" v-model="ruleForm.contactPhone" style="width: 200px"></el-input>-->
<!--        </el-form-item>-->
<!--        <div></div>-->

        <el-form-item label="审核状态：" v-if="$route.path === '/seller/review/reviewDetail' " prop="status" size="small">
          <el-input v-model="ruleForm.status" style="display: none" ></el-input>
          <el-radio v-model="ruleForm.status" label="1" >审核通过</el-radio>
          <el-radio v-model="ruleForm.status" label="3" >审核不通过</el-radio>
        </el-form-item>
        <div></div>
        <el-form-item v-if="ruleForm.status == 3" label="审核不通过理由：" prop="auditMsg" size="small">
          <el-input v-model="ruleForm.auditMsg" style="width: 300px"></el-input>
        </el-form-item>
        <div></div>
      </div>
    </el-form>
    <div class="basic-msg-form-bt">
      <template v-if="$route.path === '/seller/mgr/sellerDetail'">
        <el-button type="primary" v-if="disabled" @click="disabled = !disabled">修改基本信息</el-button>
      </template>

      <el-button type="primary" v-if="!disabled" @click="submitForm('ruleForm')">保存</el-button>
      <el-button v-if="!disabled" @click="cancelModify">取消</el-button>
      <el-button v-if="disabled" @click="returnMgr">返回列表</el-button>
    </div>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </section>
</template>

<style lang="scss" scoped>
  .basic-msg-container-1{
    background-color:   #fff;
    padding: 30px 15px;
    .basic-msg-broad{
      width: 940px;
      margin: 0 auto;
      display: flex;
      flex-wrap: wrap;
      color:#606266;
      margin-top: 30px;
      margin-bottom: 30px;
      .basic-msg-item{
        width: 33.3%;
        height: 40px;
        line-height: 40px;
        overflow: hidden;
        text-overflow:ellipsis ;
        white-space: nowrap;
        .title{
          display: inline-block;
          width: 100px;
          text-align: right;
          margin-right: 20px;
        }
      }

    }
    .basic-msg-form-container{
      width: 940px;
      margin: 0 auto;
      .pic-tips{
        color: #ccc;
      }
    }
    .basic-msg-form-bt{
      margin-top: 30px;
      text-align: center;
    }
  }
</style>
<style>
.basic-msg-container-1 .avatar {
  width: 200px;
  height: 200px;
  display: block;
}
  .preview-btn{
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .basic-msg-container-1 .product-img .el-upload {
    width: 202px;
    height: 202px;

  }
  .basic-msg-container-1 .product-url .el-upload {
    width: 202px;
    height: 202px;

  }
</style>
<script>
  export default {
    props:['sellerId','returnPath'],
    name: "",
    data() {
      return {
        disabled:true,
        headers:{
          'loginId':sessionStorage.getItem('access_loginId'),
          'token':sessionStorage.getItem('access_token')
        },
        saleZone:[],
        commercialList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"食杂店"
          },
          {
            code:"2",
            name:"便利店"
          },
          {
            code:"3",
            name:"超市"
          },
          {
            code:"4",
            name:"商场"
          },
          {
            code:"5",
            name:"烟酒商店"
          },
          {
            code:"6",
            name:"娱乐服务"
          },
          {
            code:"7",
            name:"其他"
          },
        ],
        districtList:[
          {
            code:"",
            name:"全部"
          },
          {
            code:"1",
            name:"城镇"
          },
          {
            code:"2",
            name:"乡村"
          }
        ],

        //分类列表
        cateLvl1List:[],
        cateLvl2List:[],
        cateLvl3List:[],
        iconList:[],
        lbsIocn:'',


        ruleForm: {
          saleZoneCode:'',
          //门店照片
          shopImg:'',
          //门店名称
          shopName:'',
          shopImgCode:'',
          //地区分类
          provCode: '',
          provName:'',
          cityCode: '',
          cityName: '',
          countyCode: '',
          countyName: '',
          //门店地址
          detailAddr: '',
          //烟草专卖证号
          licenseNo:'',
          //烟草专卖证号照片
          licenseImg:'',
          licenseImgCode:'',
          //区域
          areaType:'',
          //业态
          commercial:'',
          //业务员姓名
          salesman:'',
          //联系人姓名
          contactName:'',
          //联系人电话
          contactPhone:'',
          //状态
          status:'',
          auditMsg:'',
          shopLat:null,
          shopLng:null,
          gender:null,
          shopIconCode:null,
          birthday:null,
        },
        rules: {
          shopImg: [
            { required: true, message: '请上传门店照片', trigger: 'change' },
          ],
          shopName: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          contactName: [
            { required: true, message: '请输入经营人姓名', trigger: 'blur' },
          ],
          contactPhone: [
            { required: true, message: '请输入经营人电话', trigger: 'blur' },
          ],
          shopLat: [
            { required: true, message: '请输入Lat', trigger: 'blur' },
          ],
          shopLng: [
            { required: true, message: '请输入Lng', trigger: 'blur' },
          ],
          provCode: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          cityCode: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          countyCode: [
            { required: true, message: '请选择地区', trigger: 'change' },
          ],
          detailAddr: [
            { required: true, message: '请输入门店地址', trigger: 'blur' },
          ],
          licenseNo: [
            { required: true, message: '请输入烟草专卖证号', trigger: 'blur' },
          ],
          licenseImg: [
            { required: true, message: '请上传烟草专卖证号照片', trigger: 'change' },
          ],
          areaType: [
            { required: true, message: '请选择区域', trigger: 'change' },
          ],
          saleZoneCode: [
            { required: true, message: '请选择销区', trigger: 'change' },
          ],
          commercial: [
            { required: true, message: '请选择业态', trigger: 'change' },
          ],
          salesman: [
            { required: true, message: '请输入业务员姓名', trigger: 'change' },
          ],
          auditMsg: [
            { required: true, message: '请输入审核不通过理由', trigger: 'change' },
          ],
          authStatus: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
          failReason: [

          ],


        },

        applyTime:'',
        auditTime:'',
        dialogImageUrl: '',
        dialogVisible: false
      }
    },
    created(){
      this.getIconList()
      this.getSaleZone()
      this.getOneCategory()

    },
    methods:{
      handleClickMap(lat,lng){
        window.open(`https://mapapi.qq.com/web/mapComponents/locationPicker/v/index.html?search=1&type=0&key=OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77&referer=myapp&coord=${lat},${lng}`)
      },
      getIconList() {
        this.$request.post('/saasHbseller/shop/lbsIcon/query', {
          page: 1,
          pageSize: 50,
          iconName: "",
        }, false, (res) => {
          if (res.code == '200') {
            this.iconList = res.data.records || []
          }
          this.getReviewDetail()
        })
      },
      handleLbsIconChange(value){
        this.lbsIocn = this.iconList.find(i=>i.iconCode ==  value).iconUrl
      },
      handlePictureCardPreview(file) {
        console.log(file)
        this.dialogImageUrl = file;
        this.dialogVisible = true;
      },
      //从后台拿取商品类型列表
      // getProductType(){
      //   this.$request.post('/sc/saotx/mall/giftTypeMap',{}, true, (res) => {
      //     if (res.ret == '200000') {
      //       this.productTypeList = [...this.productTypeList,...res.data]
      //     }
      //   })
      // },
      getSaleZone() {
        this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
          if (res.code == '200') {
            this.saleZone = res.data || []
          }
        })
      },

      getReviewDetail(){
        this.$request.post('/saasHbseller/seller/manager/selectById',{id:this.sellerId},false,res => {
          if (res.code == 200) {

            this.applyTime = res.data.info.ctime
            this.auditTime = res.data.info.auditTime

            // this.ruleForm.contactPhone = new Date(res.data.createTime).Format('yyyy-MM-dd hh:mm:ss')

            //表单内容
            this.ruleForm.shopImg = res.data.info.shopImg
            this.ruleForm.shopName = res.data.info.shopName
            this.ruleForm.shopImgCode = res.data.info.shopImgCode
            this.ruleForm.contactName = res.data.info.contactName
            this.ruleForm.contactPhone = res.data.info.contactPhone

            this.ruleForm.provCode = res.data.info.provCode+''
            this.ruleForm.provName = res.data.info.provName+''
            this.ruleForm.cityCode = res.data.info.cityCode+''
            this.ruleForm.cityName = res.data.info.cityName+''
            this.ruleForm.countyCode = res.data.info.countyCode+''
            this.ruleForm.countyName = res.data.info.countyName+''
            this.ruleForm.shopLat = res.data.info.shopLat+''
            this.ruleForm.shopLng = res.data.info.shopLng+''
            this.ruleForm.saleZoneCode = res.data.info.saleZoneCode

            this.ruleForm.detailAddr = res.data.info.detailAddr
            this.ruleForm.licenseNo = res.data.info.licenseNo
            this.ruleForm.licenseImg = res.data.info.licenseImg
            this.ruleForm.licenseImgCode = res.data.info.licenseImgCode
            this.ruleForm.areaType = res.data.info.areaType+''
            // this.ruleForm.commercial = res.data.info.commercial+''
            this.ruleForm.salesman = res.data.info.salesman
            this.ruleForm.gender = res.data.info.gender
            this.ruleForm.shopIconCode = res.data.info.shopIconCode
            this.ruleForm.birthday = res.data.info.birthday
            this.ruleForm.status = res.data.info.status+''
            this.ruleForm.auditMsg = res.data.info.auditMsg || ''

            this.getTwoCategory()
            this.getThreeCategory()
            this.lbsIocn = this.iconList.find(i=>i.iconCode ==  this.ruleForm.shopIconCode).iconUrl
            //状态
            // this.ruleForm.authStatus = res.data.info.authStatus+''
          }
        })
      },

      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/saasHbseller/region/province',{}, true, (res) => {
          this.cateLvl1List = [...res]
        })
      },
      selectBrand1(item){
        this.ruleForm.provName = this.cateLvl1List.find((i=>(i.code === item))).name
        this.ruleForm.cityCode = ''
        this.cateLvl2List = []
        this.ruleForm.countyCode = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.ruleForm.provCode  == '')return
        this.$request.post('/saasHbseller/region/city',{parentCode:this.ruleForm.provCode}, false, (res) => {
          this.cateLvl2List = [...res]
        })
      },
      selectBrand2(item){
        this.ruleForm.cityName = this.cateLvl2List.find((i=>i.code === item)).name
        this.ruleForm.countyCode = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.ruleForm.cityCode == '')return
        this.$request.post('/saasHbseller/region/district',{parentCode:this.ruleForm.cityCode}, false, (res) => {
          this.cateLvl3List = [...res]
        })
      },
      selectBrand3(item){
        this.ruleForm.countyName = this.cateLvl3List.find((i=>i.code === item)).name
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              id:this.sellerId,
              shopName:this.ruleForm.shopName,
              shopImgCode:this.ruleForm.shopImgCode,

              provCode:this.ruleForm.provCode,
              provName:this.ruleForm.provName,
              cityCode:this.ruleForm.cityCode,
              cityName:this.ruleForm.cityName,
              countyCode:this.ruleForm.countyCode,
              countyName:this.ruleForm.countyName,
              shopLat:this.ruleForm.shopLat,
              shopLng:this.ruleForm.shopLng,
              saleZoneCode:this.ruleForm.saleZoneCode,

              detailAddr:this.ruleForm.detailAddr,
              licenseNo:this.ruleForm.licenseNo,
              licenseImgCode:this.ruleForm.licenseImgCode,
              areaType:this.ruleForm.areaType,
              // commercial:this.ruleForm.commercial,
              salesman:this.ruleForm.salesman,
              contactName:this.ruleForm.contactName,
              contactPhone:this.ruleForm.contactPhone,
              gender:this.ruleForm.gender,
              shopIconCode:this.ruleForm.shopIconCode,
              birthday:this.ruleForm.birthday,
            }
            // if(params.status == 3){
            //   params.auditMsg = this.ruleForm.auditMsg
            // }

            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/saasHbseller/seller/manager/infoUpdate',params,true,res => {
          if(res.code == 200){
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
            this.returnMgr()
          }else{
            this.$message({
              message:res.msg,
              type: 'warning'
            })
          }
        },err => {

        })
      },
      handleAvatarSuccess(resule, file) {
        this.ruleForm.shopImg = resule.data.filePath
        this.ruleForm.shopImgCode = resule.data.rdmCode
      },
      handleAvatarSuccessUrl(resule, file){
        this.ruleForm.licenseImgCode = resule.data.rdmCode
        this.ruleForm.licenseImg = resule.data.filePath
      },
      returnMgr(){
        this.$router.push({
          path:this.returnPath
        })
      },
      cancelModify(){
        this.disabled = !this.disabled
        this.$refs['ruleForm'].resetFields();
        this.getReviewDetail()
      }
    },
  }
</script>
