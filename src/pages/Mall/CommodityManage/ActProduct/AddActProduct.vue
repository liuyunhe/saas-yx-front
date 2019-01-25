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
                            <el-input class="tobacco-input" v-model="filters.memo" placeholder="请输入内容" maxlength="100"></el-input>
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
                        <el-form-item size="small" :label="giftTypeDisPlay==3?'红包面值：':'市面价值（元）：'" prop="price" v-if="giftTypeDisPlay==1||giftTypeDisPlay==2||giftTypeDisPlay==3">
                            <el-input type="number"  class="tobacco-input" v-model="filters.price" placeholder="请输入内容" min="0" max="9999999" @input="checkOn3(filters.price)"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="积分面值：" prop="score" v-if="giftTypeDisPlay==4">
                            <el-input type="number"  class="tobacco-input" v-model="filters.score" placeholder="请输入内容" min="0" max="9999999" @input="checkOn4(filters.score)"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item label="礼品图片：" prop="image" size="small">
                            <el-input v-model="filters.image" style="display: none" ></el-input>
                            <el-upload
                                    action="/api/saotx/attach/commonAliUpload"
                                    list-type="picture-card"
                                    class="product-img"
                                    :headers="headers"
                                    :show-file-list="false"
                                    :on-success="handleAvatarSuccess">
                                <img v-if="filters.image" width="100" height="74" :src="filters.image" class="avatar">
                                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                            </el-upload>
                            <div class="pic-tips">* 图片建议尺寸为 380*280px，格式为*.jpg\ *.bmp\ *.png\ *.gif</div>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="库存数量：" prop="shopQuantity">
                            <el-input type="number"  class="tobacco-input" v-model="filters.shopQuantity" placeholder="请输入内容" min="0" max="99999999" @input="checkOn(filters.shopQuantity)"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="链接URL："  v-if="giftTypeDisPlay==1">
                            <el-input class="tobacco-input" v-model="filters.exchangeUrl" placeholder="请输入内容" maxlength="200"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" :label="giftTypeDisPlay==3?'红包总数：':'积分总数：'"  v-if="giftTypeDisPlay==3||giftTypeDisPlay==4">
                            <el-input type="number" v-model="filters.abc" placeholder="请输入内容" maxlength="200" disabled="true"></el-input>
                        </el-form-item>
                    </el-row>
                    <el-row>
                        <el-form-item size="small" label="库存阀值：" prop="quantity">
                            <el-input type="number"  class="tobacco-input" v-model="filters.quantity" placeholder="请输入内容" min="0" max="99999998" @input="checkOn2(filters.quantity)"></el-input>
                        </el-form-item>
                    </el-row>

                    <el-row>
                        <el-form-item size="small" label="礼品描述："   v-if="giftTypeDisPlay==1||giftTypeDisPlay==2">
                            <el-input class="tobacco-input" v-model="filters.afterService" placeholder="请输入内容" type="textarea" :rows="3" maxlength="200"></el-input>
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
                allEchangeTypeData:[{id:4,name:"卡券"},{id:5,name:"外链"}],
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
                    score:0,
                    shopQuantity:'',
                    quantity:'',
                    exchangeType:4,
                    exchangeUrl:'',
                    afterService:'',
                    abc:0

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
                    ],
                    score:[
                        { required: true, message: '请输入市面价值', trigger: 'change' },
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
            checkOn(value){
                let reg = /^[1-9]\d*$/;
                if (value) {
                    if (value > 99999999 || new RegExp(reg).test(value) == false) {
                        this.filters.shopQuantity ='';
                    }else{
                        if(this.giftTypeDisPlay==3){
                            this.filters.abc=(this.filters.price*this.filters.shopQuantity).toFixed(2)
                        }else if(this.giftTypeDisPlay==4){
                            this.filters.abc=(this.filters.score*this.filters.shopQuantity).toFixed(2)
                        }
                    }
                }
            },
            checkOn2(value){
                let reg = /^[1-9]\d*$/;
                if (value) {
                    if (value > 99999999 || new RegExp(reg).test(value) == false) {
                        this.filters.quantity ='';
                    }
                }
            },
            checkOn3(value){
                if (value) {
                    if (value > 9999999 ) {
                        this.filters.price ='';
                    }else{
                        if(this.giftTypeDisPlay==3){
                            this.filters.abc=(this.filters.price*this.filters.shopQuantity).toFixed(2)
                        }
                    }
                }
            },
            checkOn4(value){
                if (value) {
                    if (value > 9999999 ) {
                        this.filters.score ='';
                    }else{
                        this.filters.abc=(this.filters.score*this.filters.shopQuantity).toFixed(2)
                    }
                }
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
                            score:this.filters.score,
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
                this.filters.score='',
                this.filters.shopQuantity='',
                this.filters.quantity='',
                this.filters.echangeType=4,
                this.filters.exchangeUrl='',
                this.filters.afterService='',
                this.filters.abc=''
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
    .product-img .el-upload {
        width: 102px;
        height: 76px;
        line-height: 84px;
    }
</style>
