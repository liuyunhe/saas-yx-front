<template>
    <section class="add-tobaccomgr-container clearfix">
        <el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
            <el-form ref="ruleForm" :inline="true" :rules="rules"  :model="filters" label-width="110px">
                <div class="add-tobaccomgr-form-container">
                    <el-row>
                        <el-form-item size="small" label="礼品类型：" prop="giftType">
                            <el-select class="tobacco-input" v-model="seletGiftType" placeholder="请选择">
                                <el-option
                                        v-for="item in allGiftTypeActData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="礼品名称：" prop="memo">
                            <el-input class="tobacco-input" v-model="filters.memo" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="礼品分类：" prop="exchangeType"  v-if="giftTypeDisPlay==1">
                            <el-select class="tobacco-input" v-model="filters.exchangeType" placeholder="请选择">
                                <el-option
                                        v-for="item in allEchangeTypeData"
                                        :key="item.id"
                                        :label="item.name"
                                        :value="item.id">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="市面价值（元）：" prop="price">
                            <el-input type="number"  class="tobacco-input" v-model="filters.price" placeholder="请输入内容" min="0"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="主图：" prop="image" size="small">
                            <el-input v-model="filters.image" style="display: none" ></el-input>
                            <el-upload
                                    action="/api/saotx/attach/commonAliUpload"
                                    list-type="picture-card"
                                    class="product-img"
                                    :headers="headers"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess">
                                <img v-if="filters.image" width="200" height="125" :src="filters.image" class="avatar">
                            </el-upload>
                            <div class="pic-tips">上传图片的最佳尺寸：750像素*468像素；格式png、jpg；大小不超过2M</div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="库存数量：" prop="shopQuantity">
                            <el-input type="number"  class="tobacco-input" v-model="filters.shopQuantity" placeholder="请输入内容"min="0"></el-input>
                            <div class="pic-tips">库存数量保存后不可手动减库存，请谨慎输入</div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="库存阀值：" prop="quantity">
                            <el-input type="number"  class="tobacco-input" v-model="filters.quantity" placeholder="请输入内容" min="0"></el-input>
                            <div class="pic-tips">库存阀值不可高于库存</div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="链接URL："  v-if="giftTypeDisPlay==1">
                            <el-input class="tobacco-input" v-model="filters.exchangeUrl" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="礼品描述："   v-if="giftTypeDisPlay==1||giftTypeDisPlay==2">
                            <el-input class="tobacco-input" v-model="filters.afterService" placeholder="请输入内容" type="textarea" :rows="3"></el-input>
                        </el-form-item>
                    </el-row>
                </div>
                <div class="add-tobaccomgr-form-bt">
                    <el-form-item>
                        <el-button type="primary" size="small" @click="submitForm('ruleForm')">保存</el-button>
                        <el-button size="small" @click="returnTobaccoMgr">取消</el-button>
                    </el-form-item>
                </div>
            </el-form>
        </el-col>
    </section>
</template>

<script>
    export default {
        name: "AddActProduct",
        data(){
            return{
                allGiftTypeActData:[],
                allEchangeTypeData:[{id:4,name:"卡卷"},{id:5,name:"外链"}],
                seletGiftType:'',
                seleteEchangeType:'',
                giftTypeDisPlay:2,
                headers:{
                    'loginId':sessionStorage.getItem('access_loginId'),
                    'token':sessionStorage.getItem('access_token')
                },
                filters:{
                    giftType:'',
                    memo:'',
                    image:'',
                    price:'',
                    shopQuantity:'',
                    quantity:'',
                    exchangeType:4,
                    exchangeUrl:'',
                    afterService:''

                },
                rules:{
                    giftType: [
                        { required: true, message: '请选择礼物类型', trigger: 'change' },
                    ],
                    memo: [
                        { required: true, message: '请输入礼物名称', trigger: 'change' },
                    ],
                    price:[
                        { required: true, message: '请输入市面价值', trigger: 'change' },
                    ],
                    image:[
                        { required: true, message: '请输入礼品图片', trigger: 'change' },
                    ],
                    exchangeType:[
                        { required: true, message: '请输入礼品分类', trigger: 'change' },
                    ]

                }
            }
        },
        created(){
          this.init();
        },
        watch:{
            seletGiftType(nval, oval){
                if(nval&&nval!=oval) {
                    if(nval==1){
                        this.giftTypeDisPlay=nval;
                        this.filters.giftType=nval;
                        this.clearData();

                    }
                    if(nval==2){
                        this.giftTypeDisPlay=nval;
                        this.filters.giftType=nval;
                        this.clearData();
                    }
                    if(nval==3){
                        this.giftTypeDisPlay=nval;
                        this.filters.giftType=nval;
                        this.clearData();
                    }
                    if(nval==4){
                        this.giftTypeDisPlay=nval;
                        this.filters.giftType=nval;
                        this.clearData();
                    }
                }
            },
        },
        methods:{
            init(){
                this.allGiftTypeActList();
            },
            allGiftTypeActList(){
                this.$request.post(`/sc/saotx/mall/giftTypeActMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allGiftTypeActData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let params = {
                            giftType: this.filters.giftType,
                            memo: this.filters.memo,
                            image: this.filters.image,
                            price: this.filters.price,
                            shopQuantity: this.filters.shopQuantity,
                            quantity: this.filters.quantity,
                            exchangeType: this.filters.exchangeType,
                            exchangeUrl: this.filters.exchangeUrl,
                            afterService: this.filters.afterService
                        }
                        this.$request.post('/sc/saotx/mall/product/saveOrModifyAct',params,true,res => {
                            if(res.ret == '200000'){
                                this.$message({
                                    message: '保存成功！',
                                    type: 'success'
                                });
                                this.returnTobaccoMgr();
                            }else{
                                this.$message({
                                    message:res.message,
                                    type: 'warning'
                                })
                            }
                        },err => {

                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            returnTobaccoMgr(){
                this.$router.push({
                    path:'/mall/product/act'
                })
            },
            clearData(){
                this.filters.memo='',
                this.filters.image='',
                this.filters.price='',
                this.filters.shopQuantity='',
                this.filters.quantity='',
                this.filters.echangeType=4,
                this.filters.exchangeUrl='',
                this.filters.afterService=''
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePictureCardPreview(file) {
                this.dialogImageUrl = file.url;
                this.dialogVisible = true;
            },
            handleAvatarSuccess(res, file) {
                var data = res.data || {};
                var imgUrl = data && data.accessUrl;
                this.filters.image = imgUrl;
            },
        }
    }
</script>

<style lang="scss" scoped>
    .add-tobaccomgr-container{
        background-color: #fff;
        padding: 15px;
        .add-tobaccomgr-form-title{
            width: 1000px;
            margin: 0 auto;
            height: 30px;
            margin-bottom: 10px;
            line-height: 30px;
            color:#000000;

        }
        .add-tobaccomgr-form-container{
            width: 910px;
            margin: 0 auto;
            .pic-tips{
                  color: #ccc;
              }
        }
        .add-tobaccomgr-form-bt{
            margin-top: 25px;
            text-align: center;
        }
    }

    .tobacco-input{
        width: 170px;
    }
    .needed{
        color: red;
        display: inline-block;
        line-height: 33px;
    }
    .el-form-item {
        margin-bottom: 30px;
    }

</style>
<style>
    .tobacco-pic .el-upload {
        width: 162px;
        height: 282px;

    }
</style>
