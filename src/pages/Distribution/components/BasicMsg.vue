<template>
  <section class="basic-msg-container">
    <div class="basic-msg-broad">
      <div class="basic-msg-item"><span class="title">申请时间：</span>{{ applyTime }}</div>
      <div class="basic-msg-item"><span class="title">审核通过时间：</span>{{ passTime }}</div>

    </div>
    <el-form :model="ruleForm" :disabled="disabled" :inline="true" :rules="rules" ref="ruleForm" label-width="150px" class="demo-ruleForm">
      <div class="basic-msg-form-container">
        <el-form-item label="门店照片：" prop="headImg" size="small">
          <el-input v-model="ruleForm.headImg" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-img"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
          >
            <img v-if="ruleForm.headImg" width="200" height="125" :src="ruleForm.headImg" class="avatar">
          </el-upload>
          <div class="pic-tips">上传图片的最佳尺寸：750像素*468像素；格式png、jpg；大小不超过2M</div>
        </el-form-item>
        <div></div>
        <el-form-item label="门店名称：" prop="shopName" size="small">
          <el-input v-model="ruleForm.shopName" style="width: 200px"></el-input>
        </el-form-item>
        <div> </div>
        <el-form-item label="经营人姓名：" prop="ownerName" size="small">
          <el-input v-model="ruleForm.ownerName" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="经营人电话：" prop="phoneNo" size="small">
          <el-input v-model="ruleForm.phoneNo" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item size="small" label="位置：" prop="addrProvince">
          <el-select
              v-model="ruleForm.addrProvince"
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
        <el-form-item size="small" label="" prop="addrCity">
          <el-select
              v-model="ruleForm.addrCity"
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
        <el-form-item size="small" label="" prop="addrArea">
          <el-select
              v-model="ruleForm.addrArea "
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
        <el-form-item label="门店地址：" prop="addrDetail" size="small">
          <el-input v-model="ruleForm.addrDetail" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="烟草专卖证号：" prop="licenceNo" size="small">
          <el-input type="number" v-model="ruleForm.licenceNo" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item label="烟草专卖证号照片：" prop="licenceImg" size="small">
          <el-input v-model="ruleForm.licenceImg" style="display: none" ></el-input>
          <el-upload
              action="/api/wiseqr/attach/commonAliUpload"
              list-type="picture-card"
              class="product-url"
              :headers="headers"
              :show-file-list="false"
              :on-success="handleAvatarSuccessUrl"
          >
            <img v-if="ruleForm.licenceImg" width="200" height="200" :src="ruleForm.licenceImg" class="avatar">
          </el-upload>
          <div class="pic-tips">此图用于商品详情展示；尺寸：宽750像素；格式png、jpg；大小不超过2M</div>
        </el-form-item>
        <div></div>
        <el-form-item :size="'small'" prop="district" label="区域">
          <el-select
              v-model="ruleForm.district"
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
        <el-form-item :size="'small'" prop="commercial" label="业态">
          <el-select
              v-model="ruleForm.commercial"
              placeholder="请选择"
              style="width: 200px">
            <el-option
                v-for="item in commercialList"
                :key="item.code"
                :label="item.name"
                :value="item.code">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>

        <el-form-item  label="业务员姓名：" prop="salesManNames" size="small">
          <el-input  v-model="ruleForm.salesManNames" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>

        <el-form-item  label="联系人姓名：" prop="contactName" size="small">
          <el-input  v-model="ruleForm.contactName" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>
        <el-form-item  label="联系人电话：" prop="contactPhone" size="small">
          <el-input type="number" v-model="ruleForm.contactPhone" style="width: 200px"></el-input>
        </el-form-item>
        <div></div>

        <el-form-item label="审核状态：" prop="authStatus" size="small">
          <el-input v-model="ruleForm.authStatus" style="display: none" ></el-input>
          <el-radio v-model="ruleForm.authStatus" label="2" @change="authStatusChange">审核通过</el-radio>
          <el-radio v-model="ruleForm.authStatus" label="3" @change="authStatusChange">审核不通过</el-radio>
        </el-form-item>
        <div></div>
        <el-form-item v-if="ruleForm.authStatus == 3"  label="不通过原因：" prop="failReason" size="small">
          <el-input v-model="ruleForm.failReason" style="width: 200px"></el-input>
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
          //门店照片
          headImg:'',
          //门店名称
          shopName:'',
          //经营人姓名
          ownerName:'',
          //经营人电话
          phoneNo:'',
          //地区分类
          addrProvince: '',
          addrCity: '',
          addrArea: '',
          //门店地址
          addrDetail: '',
          //烟草专卖证号
          licenceNo:'',
          //烟草专卖证号照片
          licenceImg:'',
          //区域
          district:'',
          //业态
          commercial:'',
          //业务员姓名
          salesManNames:'',
          //联系人姓名
          contactName:'',
          //联系人电话
          contactPhone:'',
          //状态
          authStatus:'',
          failReason:''
        },
        rules: {
          headImg: [
            { required: true, message: '请上传门店照片', trigger: 'change' },
          ],
          shopName: [
            { required: true, message: '请输入门店名称', trigger: 'blur' },
          ],
          ownerName: [
            { required: true, message: '请输入经营人姓名', trigger: 'blur' },
          ],
          phoneNo: [
            { required: true, message: '请输入经营人电话', trigger: 'blur' },
          ],
          addrProvince: [
            { required: true, message: '请选择省份', trigger: 'change' },
          ],
          addrCity: [
            { required: true, message: '请选择城市', trigger: 'change' },
          ],
          addrArea: [
            { required: true, message: '请选择地区', trigger: 'change' },
          ],
          addrDetail: [
            { required: true, message: '请输入门店地址', trigger: 'blur' },
          ],
          licenceNo: [
            { required: true, message: '请输入烟草专卖证号', trigger: 'blur' },
          ],
          licenceImg: [
            { required: true, message: '请上传烟草专卖证号照片', trigger: 'change' },
          ],
          district: [
            { required: true, message: '请选择区域', trigger: 'change' },
          ],
          commercial: [
            { required: true, message: '请选择业态', trigger: 'change' },
          ],
          salesManNames: [
            { required: true, message: '请输入业务员姓名', trigger: 'change' },
          ],
          contactName: [
            { required: true, message: '请输入联系人姓名', trigger: 'change' },
          ],
          contactPhone: [
            { required: true, message: '请输入联系人电话', trigger: 'change' },
          ],
          authStatus: [
            { required: true, message: '请选择审核状态', trigger: 'change' },
          ],
          failReason: [

          ],


        },

        applyTime:'',
        passTime:'',
      }
    },
    created(){
      this.getOneCategory()
      this.getReviewDetail()
    },
    methods:{

      //从后台拿取商品类型列表
      // getProductType(){
      //   this.$request.post('/sc/saotx/mall/giftTypeMap',{}, true, (res) => {
      //     if (res.ret == '200000') {
      //       this.productTypeList = [...this.productTypeList,...res.data]
      //     }
      //   })
      // },
      authStatusChange(val){
        if(val == 2){
          this.rules.failReason = []
        }else if(val ==3){
          this.rules.failReason = [
            { required: true, message: '请输入审批不通过原因', trigger: 'change' },
          ]
        }
      },
      getReviewDetail(){
        this.$request.post('/lsh/seller-manager/seller/select/detail',{sellerId:this.sellerId},false,res => {
          if (res.ok) {

            this.applyTime = new Date(res.data.sellerInfo.applyTime).Format('yyyy-MM-dd hh:mm:ss')
            this.passTime = new Date(res.data.sellerInfo.passTime).Format('yyyy-MM-dd hh:mm:ss')

            // this.ruleForm.phoneNo = new Date(res.data.createTime).Format('yyyy-MM-dd hh:mm:ss')

            //表单内容
            this.ruleForm.headImg = res.data.sellerInfo.headImg
            this.ruleForm.shopName = res.data.sellerInfo.shopName
            this.ruleForm.ownerName = res.data.sellerInfo.ownerName
            this.ruleForm.phoneNo = res.data.sellerInfo.ownerName

            this.ruleForm.addrProvince = res.data.sellerInfo.addrProvince+''
            this.ruleForm.addrCity = res.data.sellerInfo.addrCity+''
            this.ruleForm.addrArea = res.data.sellerInfo.addrArea+''

            this.ruleForm.addrDetail = res.data.sellerInfo.addrDetail
            this.ruleForm.licenceNo = res.data.sellerInfo.licenceNo
            this.ruleForm.licenceImg = res.data.sellerInfo.licenceImg
            this.ruleForm.district = res.data.sellerInfo.district+''
            this.ruleForm.commercial = res.data.sellerInfo.commercial+''
            this.ruleForm.salesManNames = res.data.sellerInfo.salesManNames
            this.ruleForm.contactName = res.data.sellerInfo.contactName
            this.ruleForm.contactPhone = res.data.sellerInfo.contactPhone


            this.getTwoCategory()
            this.getThreeCategory()

            //状态
            // this.ruleForm.authStatus = res.data.sellerInfo.authStatus+''
          }
        })
      },

      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/lsh/seller-manager/region/province',{}, true, (res) => {
          this.cateLvl1List = [...res]
        })
      },
      selectBrand1(){
        this.ruleForm.addrCity = ''
        this.cateLvl2List = []
        this.ruleForm.addrArea = ''
        this.cateLvl3List = []
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.ruleForm.addrProvince  == '')return
        this.$request.post('/lsh/seller-manager/region/newCity',{parentCode:this.ruleForm.addrProvince}, true, (res) => {
          this.cateLvl2List = [...res]
        })
      },
      selectBrand2(){
        this.ruleForm.addrArea = ''
        this.cateLvl3List = []
        this.getThreeCategory()
      },
      //从后台拿取商品分类3
      getThreeCategory(){
        if(this.ruleForm.addrCity == '')return
        this.$request.post('/lsh/seller-manager/region/newDistrict',{parentCode:this.ruleForm.addrCity}, true, (res) => {
          this.cateLvl3List = [...res]
        })
      },

      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            let params = {
              sellerId:this.sellerId,

              headImg:this.ruleForm.headImg,
              shopName:this.ruleForm.shopName,
              ownerName:this.ruleForm.ownerName,
              phoneNo:this.ruleForm.phoneNo,

              addrProvince:this.ruleForm.addrProvince,
              addrCity:this.ruleForm.addrCity,
              addrArea:this.ruleForm.addrArea,

              addrDetail:this.ruleForm.addrDetail,
              licenceNo:this.ruleForm.licenceNo,
              licenceImg:this.ruleForm.licenceImg,
              district:this.ruleForm.district,
              commercial:this.ruleForm.commercial,
              salesManNames:this.ruleForm.salesManNames,
              contactName:this.ruleForm.contactName,
              contactPhone:this.ruleForm.contactPhone,
              authStatus:this.ruleForm.authStatus


            }
            if(this.ruleForm.authStatus == 3){
              params.failReason = this.ruleForm.failReason
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
        this.ruleForm.headImg = imgUrl;
      },
      handleAvatarSuccessUrl(res, file){
        var data = res.data || {};
        var imgUrl = data && data.accessUrl;
        this.ruleForm.licenceImg = imgUrl;
      },
      returnMgr(){
        this.$router.push({
          path:this.returnPath
        })
      },
      cancelModify(){
        this.disabled = !this.disabled
        this.ruleForm.authStatus = ''
        this.$refs['ruleForm'].resetFields();
        this.getReviewDetail()
      }
    },
  }
</script>