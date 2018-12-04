<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">积分商城/自建订单明细</div></el-col>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item label="订单状态:"  size="small" >
                        <el-select v-model="form.status" placeholder="请选择">
                            <el-option v-for="(item,index) in orderStatusData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="时间段:"  size="small" >
                        <el-date-picker v-model="form.startTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm"> </el-date-picker>
                    </el-form-item>
                    <el-form-item label="至" size="small" >
                        <el-date-picker v-model="form.endTime" type="datetime" placeholder="选择日期" format="yyyy-MM-dd hh:mm" value-format="yyyy-MM-dd hh:mm"> </el-date-picker>
                    </el-form-item>

                </el-row>
                <el-row>
                    <el-form-item label="关键字:" size="small" >
                        <el-select v-model="selectallKyeType" placeholder="请选择">
                            <el-option v-for="(item,index) in allKeyWordData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small" >
                        <el-input v-model="form.kyeName" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item label="商品状态:" size="small" >
                        <el-select v-model="form.giftType" placeholder="请选择">
                            <el-option v-for="(item,index) in allGiftTypeData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="分类" size="small" >
                        <el-select v-model="selectallOneCate" placeholder="请选择">
                            <el-option v-for="(item,index) in allOneCateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small" >
                        <el-select v-model="selectallTwoCate" placeholder="请选择" :disabled="idtwo?true:false" :clearable="idtwo?true:false"   >
                            <el-option v-for="(item,index) in allTwoCateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small" >
                        <el-select v-model="selectallThrCate" placeholder="请选择" :disabled="idthr?true:false" :clearable="idthr?true:false"   >
                            <el-option v-for="(item,index) in allThrCateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small" >
                        <el-select v-model="selectallFroCate" placeholder="请选择" :disabled="idfro?true:false" :clearable="idfro?true:false"   >
                            <el-option v-for="(item,index) in allFroCateData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-form-item>
                    <el-row><el-button type="primary" v-on:click="queryData">查询</el-button>
                        <el-button v-on:click="resetData">重置</el-button>
                        <el-button ><el-upload
                                class="upload-demo"
                                action="/sc/saotx/mall/order/importZJOrders"
                                :headers="headers"
                                :data="addPool"
                                :before-upload="handlerSourceFileBUpload"
                                :on-success="handleSourceFileSuccess"
                                :on-remove="handleSourceFileRemove"
                                :file-list="sourceFiles"
                                :auto-upload="true"
                                >
                            <el-button slot="trigger" size="small" type="primary">导入物流信息</el-button>
                        </el-upload></el-button>
                        <el-button plain  v-on:click="exportData" >导出搜索结果</el-button>
                    </el-row>
                </el-form-item>
            </el-form>
            <el-table :data="listData" style="width: 100%" border>
                <el-table-column label="序号" type="index">
                    <template slot-scope="scope">
                        {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="100">
                    <template slot-scope="scope">
                        <el-button v-on:click="ObjectPageDatail(scope.row.orderId)" type="text" size="small">查看详情</el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="orderId" label="订单号" ></el-table-column>
                <el-table-column prop="awardName" label="商品名称" ></el-table-column>
                <el-table-column label="商品类型">
                    <template slot-scope="scope">
                        <span>{{scope.row.giftType == 2 ? "实物礼品":"虚拟礼品"}}</span>
                    </template>
                </el-table-column>
                <el-table-column prop="cate1Name" label="一级分类"></el-table-column>
                <el-table-column prop="cate2Name" label="二级分类"></el-table-column>
                <el-table-column prop="cate3Name" label="三级分类"></el-table-column>
                <el-table-column prop="cate4Name" label="四级分类"></el-table-column>
                <el-table-column prop="score" label="兑换币"></el-table-column>
                <el-table-column prop="userName" label="联系人姓名"></el-table-column>
                <el-table-column prop="mobile" label="联系人电话"></el-table-column>
                <el-table-column prop="address" label="收货地址"></el-table-column>
                <el-table-column label="下单时间">
                    <template slot-scope="scope">
                        {{new Date(scope.row.createTime).Format("yyyy-MM-dd hh:mm:ss")}}
                    </template>
                </el-table-column>
                <el-table-column  label="订单状态	">
                    <template slot-scope="scope">
                        <span>{{scope.row.status == 1 ? "待收货":scope.row.status == 2 ? "已收货":scope.row.status == 0 ? "待发货": ""}}</span>
                    </template>
                </el-table-column>

            </el-table>
            <!-- 分页组件 -->
            <el-pagination background layout="total, prev, pager, next, jumper"
                           @size-change="sizeChange" @current-change="currentChange"
                           :current-page="form.pageNo" :page-size="form.pageSize"
                           :total="pagination.total">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        components: {
            draggable
        },
        data() {
            return {
                listData: [],
                orderStatusData:[], //发货状态
                allKeyWordData:[],//关键字
                allGiftTypeData:[],//商品状态
                allOneCateData:[],//一级分类
                allTwoCateData:[],//二级分类
                allThrCateData:[],//三级分类
                allFroCateData:[],//四级分类
                selectallKyeType:'',
                selectallOneCate:'',
                selectallTwoCate:'',
                selectallThrCate:'',
                selectallFroCate:'',
                idtwo:'1',
                idthr:'1',
                idfro:'1',
                form: {
                    kyeName:'',
                    cateLvl1:'',
                    cateLvl2:'',
                    cateLvl3:'',
                    cateLvl4:'',
                    startTime:"",
                    endTime:"",
                    status:"",//订单状态
                    orderType: 1,
                    giftType:'',//商品状态
                    orderId:'',
                    awardName:'',
                    userName:'',
                    pageNo: 1,
                    pageSize: 10
                },
                pagination: { // 分页
                    total: 0
                },
                //分页器当前选中页码
                currentPage: 1,
                headers: {
                    "token": sessionStorage.getItem("access_token"),
                    "loginId": sessionStorage.getItem("access_loginId")
                },
                addPool: {

                },
                sourceFiles: [] // 文件上传结果存储{name:'', sourceCode: ''}
            }
        },
        name: "ZjOrderPage",
        created() {
            this.init()
        },
        watch:{//监听品牌，规格，地域
            selectallKyeType(nval, oval){
                if(nval&&nval!=oval) {
                    if(nval==1){
                        this.form.orderId=this.form.kyeName;
                        this.form.awardName='';
                        this.form.userName='';
                    }
                    if(nval==2){
                        this.form.orderId='';
                        this.form.awardName=this.form.kyeName;
                        this.form.userName='';
                    }
                    if(nval==3){
                        this.form.orderId='';
                        this.form.awardName='';
                        this.form.userName=this.form.kyeName;
                    }
                }
            },
            selectallOneCate(nval, oval){
                if(nval&&nval!=oval) {
                    this.idtwo='';
                    this.form.cateLvl1=nval;
                    this.allMoreCateList(nval,2);
                }
            },
            selectallTwoCate(nval, oval){
                if(nval&&nval!=oval) {
                    this.idthr='';
                    this.form.cateLvl2=nval;
                    this.allMoreCateList(nval,3);
                }
            },
            selectallThrCate(nval, oval){
                if(nval&&nval!=oval) {
                    this.idfro='';
                    this.form.cateLvl3=nval;
                    this.allMoreCateList(nval,4);
                }
            },
            selectallForCate(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.cateLvl4=nval;
                }
            },

        },
        methods: {
            init(){
                this.orderStatusList()
                this.allKeyWordList()
                this.allGiftTypeList()
                this.allOneCateList()
                this.getlistData();
            },
            orderStatusList() {//订单状态
                this.$request.post(`/sc/saotx/mall/orderStatusMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.orderStatusData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allKeyWordList() {//关键字
                this.$request.post(`/sc/saotx/mall/keyWordMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allKeyWordData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allGiftTypeList() {//商品状态
                this.$request.post(`/sc/saotx/mall/giftTypeMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allGiftTypeData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allOneCateList() {//一级分类
                this.$request.post(`/sc/saotx/mall/cate/oneCategory`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allOneCateData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allMoreCateList(ids,type){
                this.$request.post(`/sc/saotx/mall/cate/moreCategory`,{id: ids},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            if(type==2){
                                this.selectallTwoCate='';
                                this.selectallThrCate='';
                                this.selectallFroCate='';
                                this.allTwoCateData = res.data;
                            }
                            if(type==3){
                                this.selectallThrCate='';
                                this.selectallFroCate='';
                                this.allThrCateData = res.data;
                            }
                            if(type==4){
                                this.selectallFroCate='';
                                this.allFroCateData = res.data;
                            }
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            getlistData(){
                this.$request.post(`/sc/saotx/mall/order/list`,this.form,true,
                    res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.listData = res.data.list;
                            this.initPagination(res.data.page||{});
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            queryData: function(event){//搜索
                this.getlistData();
            },
            currentChange(pageNo) {
                this.form.pageNo = pageNo;
                // 分页pageNo变更监听
                this.getlistData();
            },
            sizeChange(pageSize) {
                // 分页pageSize变更监听
                this.form.pageSize = pageSize;
            },
            // page = {"pageCount":总页数, "count":总数据条数}
            initPagination(page) {
                if(page) {
                    this.pagination.total = page.count;
                }
            },
            resetData: function(event){//重置
                this.selectallKyeType='',
                this.selectallOneCate='',
                this.selectallTwoCate='',
                this.selectallThrCate='',
                this.selectallFroCate='',
                this.idtwo='1',
                this.idthr='1',
                this.idfro='1',
                this.form = {
                    kyeName:'',
                    cateLvl1:'',
                    cateLvl2:'',
                    cateLvl3:'',
                    cateLvl4:'',
                    startTime:"",
                    endTime:"",
                    status:"",//订单状态
                    orderType: 1,
                    giftType:'',//商品状态
                    orderId:'',
                    awardName:'',
                    userName:'',
                    pageNo: 1,
                    pageSize: 10
                }
                this.getlistData();
            },
            // 文件上传之前
            handlerSourceFileBUpload(file) {
            },
            // 文件上传控制。成功之后的回调
            handleSourceFileSuccess(res, file) {
                if(res.ret==200000) {
                	
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
            },
            exportData(){//导出
                var url = "/sc/saotx/mall/order/exportOrder";
                var xhr = new XMLHttpRequest();
                var formData = new FormData();
                for(var attr in this.form) {
                    formData.append(attr, this.form[attr]);
                }
                xhr.overrideMimeType("text/plain; charset=x-user-defined");
                xhr.open('POST', url, true);
                xhr.responseType = "blob";
                xhr.responseType = "arraybuffer"
                xhr.setRequestHeader("token", sessionStorage.getItem('access_token'));
                xhr.setRequestHeader("loginId", sessionStorage.getItem('access_loginId'));
                xhr.onload = function(res) {
                    if (this.status == 200) {
                        var blob = new Blob([this.response], {type: 'application/vnd.ms-excel'});
                        var respHeader = xhr.getResponseHeader("Content-Disposition");
                        var fileName = decodeURI(respHeader.match(/filename=(.*?)(;|$)/)[1]);
                        if (window.navigator.msSaveOrOpenBlob) {
                            navigator.msSaveBlob(blob, fileName);
                        } else {
                            var link = document.createElement('a');
                            link.href = window.URL.createObjectURL(blob);
                            link.download = fileName;
                            link.click();
                            window.URL.revokeObjectURL(link.href);
                        }
                    }
                }
                xhr.send(formData);
            },
            ObjectPageDatail(orderId){//订单详细
                this.$router.push({path:'/Orders/mall/zjOrderPageDetail?orderCode='+orderId})
            }
        }
    }
</script>

<style lang="scss"  scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
