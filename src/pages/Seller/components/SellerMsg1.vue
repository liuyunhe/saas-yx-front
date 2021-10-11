<template>
  <section class="basic-msg-container">
    <div class="basic-msg-broad">
      <div class="basic-msg-item"><span class="title">申请时间：</span>{{ applyTime }}</div>
      <div class="basic-msg-item"><span class="title">审核时间：</span>{{ auditTime }}</div>
    </div>
    <el-form :model="ruleForm" :disabled="disabled" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <div class="basic-msg-form-container">
        <el-form-item label="门店照片：" prop="shopImg" size="small">
          <el-input v-model="ruleForm.shopImg" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.shopImg"  width="200" height="125" :src="ruleForm.shopImg" class="avatar">
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
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-url"
              :headers="headers"
              :show-file-list="false"
              :on-preview="handlePictureCardPreview"
              :on-success="handleAvatarSuccessUrl"
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
        <el-form-item label="经营人电话：" prop="contactPhone" size="small">
          <el-input v-model="ruleForm.contactPhone" style="width: 200px"></el-input>
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

        <el-form-item  label="业务员姓名：" prop="salesman" size="small">
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

        <el-form-item label="审核状态：" prop="status" size="small">
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
      <el-button type="primary" v-if="disabled" @click="disabled = !disabled">修改基本信息</el-button>
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
  .basic-msg-container{
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
  .preview-btn{
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
  }
  .basic-msg-container .product-img .el-upload {
    width: 202px;
    height: 127px;

  }
  .basic-msg-container .product-url .el-upload {
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



        ruleForm: {
          saleZoneCode:'',
          //门店照片
          shopImg:'',
          //门店名称
          shopName:'',
          //地区分类
          provCode: '',
          cityCode: '',
          countyCode: '',
          //门店地址
          detailAddr: '',
          //烟草专卖证号
          licenseNo:'',
          //烟草专卖证号照片
          licenseImg:'',
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
          shopLng:null
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
      this.getSaleZone()
      this.getOneCategory()
      this.getReviewDetail()
    },
    methods:{
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
            this.ruleForm.contactName = res.data.info.contactName
            this.ruleForm.contactPhone = res.data.info.contactPhone

            this.ruleForm.provCode = res.data.info.provCode+''
            this.ruleForm.cityCode = res.data.info.cityCode+''
            this.ruleForm.countyCode = res.data.info.countyCode+''
            this.ruleForm.shopLat = res.data.info.shopLat+''
            this.ruleForm.shopLng = res.data.info.shopLng+''
            this.ruleForm.saleZoneCode = res.data.info.saleZoneCode

            this.ruleForm.detailAddr = res.data.info.detailAddr
            this.ruleForm.licenseNo = res.data.info.licenseNo
            this.ruleForm.licenseImg = res.data.info.licenseImg
            this.ruleForm.areaType = res.data.info.areaType+''
            this.ruleForm.commercial = res.data.info.commercial+''
            this.ruleForm.salesman = res.data.info.salesman
            this.ruleForm.status = res.data.info.status+''
            this.ruleForm.auditMsg = res.data.info.auditMsg || ''

            this.getTwoCategory()
            this.getThreeCategory()

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
      selectBrand1(){
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
      selectBrand2(){
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

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              sellerId:this.sellerId,

              shopImg:this.ruleForm.shopImg,
              shopName:this.ruleForm.shopName,


              provCode:this.ruleForm.provCode,
              cityCode:this.ruleForm.cityCode,
              countyCode:this.ruleForm.countyCode,
              shopLat:this.ruleForm.shopLat,
              shopLng:this.ruleForm.shopLng,
              saleZoneCode:this.ruleForm.saleZoneCode,

              detailAddr:this.ruleForm.detailAddr,
              licenseNo:this.ruleForm.licenseNo,
              licenseImg:this.ruleForm.licenseImg,
              areaType:this.ruleForm.areaType,
              commercial:this.ruleForm.commercial,
              salesman:this.ruleForm.salesman,
              contactName:this.ruleForm.contactName,
              contactPhone:this.ruleForm.contactPhone,
              status:this.ruleForm.status,
            }
            if(params.status == 3){
              params.auditMsg = this.ruleForm.auditMsg
            }

            this.postParams(params)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      postParams(params){
        this.$request.post('/lsh/seller-manager/seller/saveOrUpdateSeller',params,false,res => {
          if(res.ok){
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
      handleAvatarSuccess(res, file) {
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.shopImg = imgUrl;
      },
      handleAvatarSuccessUrl(res, file){
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.licenseImg = imgUrl;
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
