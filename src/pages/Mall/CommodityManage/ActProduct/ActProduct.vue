<template>

    <div>
        <el-card>
            <el-row :gutter="20">
                <el-col :span="16"><div class="grid-content bg-purple">积分商城/活动物料管理</div></el-col>
            </el-row>
            <div class="space"></div>
            <el-form :inline="true" :model="form" class="demo-form-inline">
                <el-row>
                    <el-form-item>
                        <el-button size="small"   type="primary" v-on:click="addProduct">新建礼品</el-button>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item label="关键字:" size="small" >
                        <el-select v-model="selectallKyeType" placeholder="全部">
                            <el-option v-for="(item,index) in allKeyWordActData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item  size="small" >
                        <el-input v-model="form.kyeName" placeholder="请输入关键词"></el-input>
                    </el-form-item>
                    <el-form-item label="礼品类型:" size="small" >
                        <el-select v-model="form.giftType" placeholder="全部">
                            <el-option v-for="(item,index) in allGiftTypeActData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="使用状态:"  size="small" >
                        <el-select v-model="form.status" placeholder="全部">
                            <el-option v-for="(item,index) in allStatusData" :key="item.id" :label="item.name" :value="item.id"></el-option>
                        </el-select>
                    </el-form-item>
                </el-row>
                <el-row>
                    <el-form-item>
                        <el-button size="small"  type="primary" v-on:click="queryData">查询</el-button>
                        <el-button size="small"  v-on:click="resetData">重置</el-button>
                    </el-form-item>
                </el-row>
            </el-form>
            <el-table :data="listData" style="width: 100%" border>
                <el-table-column label="序号" type="index">
                    <template slot-scope="scope">
                        {{ (form.pageNo-1)*form.pageSize + scope.$index + 1 }}
                    </template>
                </el-table-column>
                <el-table-column prop="productId" label="礼品ID" ></el-table-column>
                <el-table-column prop="memo" label="礼品名称" ></el-table-column>
                <el-table-column  label="礼品图片">
                    <template slot-scope="scope">
                        <img v-if="scope.row.image" :src="scope.row.image" style="width: 90px;height: 50px" />
                    </template>
                </el-table-column>
                <el-table-column label="礼品类型">
                    <template slot-scope="scope">
                        {{scope.row.sourceType==3?'活动奖品':'其他' }}
                    </template>
                </el-table-column>
                <el-table-column  label="礼品分类">
                    <template slot-scope="scope">
                        {{scope.row.giftType==1?'虚拟':scope.row.giftType==2?'实物':scope.row.giftType==3?'红包':scope.row.giftType==4?'积分':scope.row.giftType==7?"折扣卡":scope.row.giftType==8?"翻倍卡":"" }}
                    </template>
                </el-table-column>
              <!--  <el-table-column prop="shopQuantity" label="剩余库存"></el-table-column>-->
                <el-table-column label="使用状态">
                    <template slot-scope="scope">
                        {{scope.row.status==1?'已启用':scope.row.status==-1?'已停用':'未知' }}
                    </template>
                </el-table-column>
                <el-table-column
                        fixed="right"
                        label="操作"
                        width="240">
                    <template slot-scope="scope">
                        <el-button @click="edit(scope.row.id)" type="primary" size="mini">编辑</el-button>
                      <!--  <el-button @click="addQuanTity(scope.row.id)" type="primary"  size="mini">增库</el-button>-->
                        <el-button @click="editSatus(scope.row.id,-1)" type="danger" size="mini" v-if="scope.row.status==1">停用</el-button>
                        <el-button @click="editSatusOn(scope.row.id,1)" type="primary" size="mini" v-if="scope.row.status==-1">启用</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!-- 分页组件 -->
            <el-pagination background layout="total, prev, pager, next, jumper"
                           @size-change="sizeChange" @current-change="currentChange"
                           :current-page="form.pageNo" :page-size="form.pageSize"
                           :total="pagination.total">
            </el-pagination>


            <el-dialog title="增加库存" :visible.sync="dialogFormVisible" width="30%">
                <el-form :model="form2">
                    <el-form-item label="增加库存" :label-width="formLabelWidth">
                        <el-input type="text" v-model="form2.id" style="display: none"></el-input>
                        <el-input type="number" v-model="form2.shopQuantity" style="width: 180px;" minlength="0"  min="0" @input="checkOn(form2.shopQuantity)"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false">取 消</el-button>
                    <el-button type="primary" @click="submitAddQuanTity()" :disabled="dialogFormBtn">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="礼品提示" :visible.sync="dialogFormVisible2" width="30%">
                <el-form :model="form3">
                    <el-row><div align="center">停用后，新增活动将不能使用该礼品</div></el-row>
                    <el-form-item label="" :label-width="formLabelWidth">
                        <el-input type="text" v-model="form3.id" style="display: none"></el-input>
                        <el-input type="text" v-model="form3.status" style="display: none"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="subEditSatus()">确 定</el-button>
                </div>
            </el-dialog>

        </el-card>
    </div>

</template>

<script>
    import draggable from 'vuedraggable'

    export default {
        components: {
            draggable
        },
        name: "ActProduct",
        data(){
            return {
                dialogFormBtn:true,
                dialogFormVisible:false,
                dialogFormVisible2:false,
                formLabelWidth: '120px',
                selectallKyeType:1,
                allKeyWordActData:[],
                allGiftTypeActData:[{name: "全部", id: ''}],
                allStatusData:[{name: "全部", id: ''}],
                listData:[],
                form2:{
                    delivery: false,
                    shopQuantity: ''
                },
                form3:{
                    delivery: false,
                    id:'',
                    status:''
                },
                form:{
                    kyeName:'',
                    giftType:'',
                    status:'',
                    productId:'',
                    productName:'',
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
                }
            }
        },
        created(){
            this.init();
        },
        watch:{
            selectallKyeType(nval, oval){
                if(nval&&nval!=oval) {
                    if(nval==1){
                        this.form.productId=this.form.kyeName;
                        this.form.productName='';
                    }
                    if(nval==2){
                        this.form.productId='';
                        this.form.productName=this.form.kyeName;
                    }
                }
            },
        },
        methods:{
            init(){
                this.allKeyWordActList();
                this.allGiftTypeActList();
                this.allStatusList();
                this.getlistData();
            },
            checkOn(value){
                // let reg = /^[1-9]\d*$/;
                let reg = /^\+?[1-9][0-9]*$/;
                if (value) {
                    if (value > 999999 || new RegExp(reg).test(value) == false) {
                        this.dialogFormBtn=true;
                        this.form2.shopQuantity ='';
                    }else{
                        this.dialogFormBtn=false;
                    }
                }else{
                    this.dialogFormBtn=true;
                }
            },
            allKeyWordActList() {//关键字
                this.$request.post(`/sc/saotx/mall/KeyWordActMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allKeyWordActData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allGiftTypeActList(){
                this.$request.post(`/sc/saotx/mall/giftTypeActMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allGiftTypeActData = [...this.allGiftTypeActData,...res.data];
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allStatusList(){
                this.$request.post(`/sc/saotx/mall/statusOnOffMap`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.allStatusData = [...this.allStatusData,...res.data];
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },

            getlistData(){
                this.$request.post(`/sc/saotx/mall/product/listAct`,this.form,true,res => {
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
            addQuanTity(id){
                this.form2.id=id;
                this.form2.shopQuantity=0;
                this.dialogFormVisible=true;
            },
            submitAddQuanTity(){
                this.$request.post('/sc/saotx/mall/product/addQuantity',this.form2,true,res => {
                    if(res.ret == '200000'){
                        this.dialogFormVisible=false;
                        this.getlistData();
                        this.$message({
                            message: '增加成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message:res.message,
                            type: 'warning'
                        })
                    }
                },err => {

                });
            },
            edit(pid){
                this.$router.push({
                    path:'/mall/product/act/editActProduct?pid='+pid
                })
            },
            subEditSatus(){
                let params = {
                    id:this.form3.id,
                    status:this.form3.status,
                };
                this.$request.post('/sc/saotx/mall/product/onOffline',params,true,res => {
                    if(res.ret == '200000'){
                        this.dialogFormVisible2=false;
                        this.getlistData();
                        this.$message({
                            message: '停用成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message:res.message,
                            type: 'warning'
                        })
                    }
                },err => {

                });
            },
            editSatus(id,sat){
                this.form3.id=id;
                this.form3.status=sat;
                this.dialogFormVisible2=true;
            },
            editSatusOn(id,sat){
                let params = {
                    id:id,
                    status:sat,
                };
                this.$request.post('/sc/saotx/mall/product/onOffline',params,true,res => {
                    if(res.ret == '200000'){
                        this.dialogFormVisible2=false;
                        this.getlistData();
                        this.$message({
                            message: '启用成功！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message:res.message,
                            type: 'warning'
                        })
                    }
                },err => {

                });
            },
            queryData(){
                if(this.selectallKyeType==1){
                    this.form.productId=this.form.kyeName;
                    this.form.productName='';
                }else if(this.selectallKyeType==2){
                    this.form.productId='';
                    this.form.productName=this.form.kyeName;
                }else{
                    this.form.productId='';
                    this.form.productName='';
                }
                this.getlistData();
            },
            resetData(){
                this.selectallKyeType='';
                this.form.kyeName=''
                this.form.giftType='';
                this.form.status='';
                this.form.productId='';
                this.form.productName='';
                this.form.pageNo= 1;
                this.form.pageSize= 10;
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
            addProduct(){
                this.$router.push({
                    path:'/mall/product/act/addActProduct'
                })
            }
        }
    }
</script>

<style scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
