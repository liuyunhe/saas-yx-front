<template>
   <div>
      <el-card>
          <el-row :gutter="20">
              <el-col :span="16"><div class="grid-content bg-purple">线下实物领奖明细</div></el-col>
          </el-row>
          <div class="space"></div>
          <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-row>
                  <el-form-item label="活动ID" size="small">
                      <el-input  v-model="form.hdCode" placeholder="请输入活动ID"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌" size="small" >
                      <el-select  v-model="selectAllBrands" placeholder="请选择">
                          <el-option v-for="(item,index) in allBrandsData" :key="item.brandCode" :label="item.name" :value="item.brandCode"></el-option>
                      </el-select>
                  </el-form-item>
<!--                  <el-form-item label="规格" size="small" >-->
<!--                      <el-select v-model="selectSpeciSns" placeholder="请选择" :disabled="id?true:false" :clearable="id?true:false"   >-->
<!--                          <el-option v-for="(item,index) in allSpecisData" :key="item.product.sn" :label="item.product.allName" :value="item.product.sn"></el-option>-->
<!--                      </el-select>-->
<!--                  </el-form-item>-->
                  <el-form-item label="订单号" size="small" >
                    <el-input v-model="form.orderCode" placeholder="请输入订单号"></el-input>
                  </el-form-item>
              </el-row>
              <el-row>
<!--                  <el-form-item label="发货状态" size="small" >-->
<!--                      <el-select v-model="form.status" placeholder="请选择">-->
<!--                          <el-option v-for="(name,code) in orderStatusData" :key="code" :label="name" :value="code"></el-option>-->
<!--                  </el-select>-->
<!--                  </el-form-item>-->

                  <el-form-item label="中奖地区" size="small" >
                      <el-select v-model="selectAllarea" placeholder="请选择">
                        <!--  <el-option v-for="item in allareaData" :key="item.code" :label="item.name" :value="item.code"></el-option>-->
                          <el-option-group v-for="group in allareaData":key="group.value":label="group.label">
                              <el-option  v-for="item in group.children"  :key="item.value"  :label="item.label" :value="item.value"></el-option>
                          </el-option-group>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="UserId" size="small" >
                    <el-input v-model="form.userId" placeholder="请输入UserId"></el-input>
                  </el-form-item>
                <el-form-item label="订单来源" size="small" >
                  <el-select v-model="form.actTypeSub" placeholder="请选择"   >
                    <el-option label="消费者" value="1"></el-option>
                    <el-option label="零售户" value="2"></el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="领奖时段"  size="small">
                     <el-date-picker  v-model="form.stime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至" size="small" >
                      <el-date-picker  v-model="form.etime" type="date" placeholder="选择日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd"> </el-date-picker>
                  </el-form-item>
<!--                  <el-form-item label="收件人手机号" size="small">-->
<!--                      <el-input  v-model="form.winnerMobile" placeholder="请输入手机号"></el-input>-->
<!--                  </el-form-item>-->

              </el-row>
              <el-row>

              </el-row>
              <el-form-item>
                  <el-row>
                      <el-button  size="small" type="primary" v-on:click="queryData">查询</el-button>
                      <el-button  size="small" v-on:click="resetData">重置</el-button>
                      <el-button  size="small" ><el-upload
                              class="upload-demo"
                              action="/api/wiseqr/order/import"
                              :headers="headers"
                              :data="addPool"
                              :before-upload="handlerSourceFileBUpload"
                              :on-success="handleSourceFileSuccess"
                              :on-remove="handleSourceFileRemove"
                              :file-list="sourceFiles"
                              :auto-upload="true">
                          <el-button slot="trigger" size="small" type="primary">导入物流信息</el-button>
                      </el-upload></el-button>
                      <el-button size="small" plain  v-on:click="exportData" >导出搜索结果</el-button>
                  </el-row>
              </el-form-item>
          </el-form>
          <el-table :data="listData" style="width: 100%" border>
              <el-table-column prop="hdCode" width="150px" label="活动编号" ></el-table-column>
              <el-table-column prop="orderCode" label="订单号" ></el-table-column>
              <el-table-column prop="actCode" label="活动ID" ></el-table-column>
              <el-table-column prop="actName" label="活动名称"></el-table-column>
              <el-table-column prop="nickname" label="中奖人"></el-table-column>
<!--              <el-table-column prop="mobile" label="收货人手机号"></el-table-column>-->
              <el-table-column prop="userId" label="userId"></el-table-column>
              <el-table-column prop="prizeName" label="奖项名称"></el-table-column>
              <el-table-column prop="snName" label="关联规格"></el-table-column>
<!--              <el-table-column  label="领奖时间">-->
<!--                  <template slot-scope="scope">-->
<!--                      {{new Date(scope.row.ctime).Format("yyyy-MM-dd hh:mm:ss")}}-->
<!--                  </template>-->
<!--              </el-table-column>-->
              <el-table-column  label="中奖地区">
                  <template slot-scope="scope">
                      <span>{{scope.row.awdProvinceName}}-{{scope.row.awdCityName}}-{{scope.row.awdDistrictName}}</span>
                  </template>
              </el-table-column>
<!--              <el-table-column  label="订单状态	">-->
<!--                  <template slot-scope="scope">-->
<!--                      <span>{{ scope.row.status==1?'已领取':scope.row.status==2?'待发货':'已发货' }}</span>-->
<!--                  </template>-->
<!--              </el-table-column>-->
              <el-table-column
                      fixed="right"
                      label="操作"
                      width="100">
                  <template slot-scope="scope">
                      <el-button v-on:click="ObjectPageDatail(scope.row.orderCode)" type="text" size="small">查看详情</el-button>
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
                allBrandsData: [], // 公共参数：品牌
                allSpecisData: [], // 公共参数：规格
                allareaData:[],// 公共参数：规格中奖地区
                selectAllBrands:'',
                selectSpeciSns:'',
                selectAllarea:'',
                id:'1',
                form: {
                    brandArr:[],
                    snArr:[],
                    cityArr:[],
                    hdCode: '', // 活动编号
                    orderCode:'',
                    etime:"",
                    stime:"",
                    status:"",
                    metraType: 10,
                    winnerMobile:"",
                    pageNo: 1,
                    pageSize: 10,
                    userId:'',
                    actTypeSub:'',
                    actTypeMain:2,  //奖品平台类型， 1:营销 2:私域流量
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
                sourceFiles: [] // 卡密文件上传结果存储{name:'', sourceCode: ''}
            }
        },
        name: "Object",
        created() {
            this.init()
        },
        watch:{//监听品牌，规格，地域
            selectAllBrands(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.brandArr  = [];
                    this.form.brandArr[0] = nval;
                    this.id='';
                    this.selectSpeciSns=''
                    this.form.snArr  = [];
                    this.allSpecisList(this.form.brandArr[0]);
                }
            },
            selectSpeciSns(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.snArr  = [];
                    this.form.snArr[0] = nval;
                }
            },
            selectAllarea(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.cityArr  = [];
                    this.form.cityArr[0] = nval;
                }
            }
        },
        methods: {
            currentChange(pageNo) {
                this.form.pageNo = pageNo;
                // 分页pageNo变更监听
                this.getlistData();
            },
            sizeChange(pageSize) {
                // 分页pageSize变更监听
                this.form.pageSize = pageSize;
            },
            init(){
                this.orderStatusList()
                this.allBrandsList();
                this.allareaList();
                this.getlistData();
            },
            orderStatusList() {//发货状态
                this.$request.post(`/api/wiseqr/order/statusSelect`,{service: 'browser'},true,res => {
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
            allBrandsList(){//所有品牌
                this.$request.post(`/api/wiseqr/prod/listBrand`,{service: 'browser'},true,res => {
                        if (res.ret === '200000') {
                            this.allBrandsData = res.data.list;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allSpecisList(nval){//所有规格
                var brandCodeArr = [];
                brandCodeArr.push(nval);
                this.$request.post(`/api/wiseqr/prod/listTbc`,{
                    brandCodeArr
                    },true,res => {
                        if (res.ret === '200000') {
                            this.allSpecisData=[];
                            this.allSpecisData = res.data.list;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allareaList(){//所有地域
                var brandListArrObj = {parentCode: '',withRegion:true}
                let thisnext =this;
                thisnext.$request.post(`/api/wiseqr/dim/regionByPCode`,{
                        brandListArrObj
                    },true,(res) => {
                        if (res.ret === '200000') {
                            var provinceArr = res.data;
                            if (provinceArr.length != 0) {
                                provinceArr.forEach(function (n ,index) {
                                    var group = {
                                        label: n.name,
                                        value: n.code,
                                        children: []
                                    };
                                    thisnext.$request.post(`/api/wiseqr/dim/regionByPCode`,{parentCode: n.code},true,(res) => {
                                        var cityArr = res.data;
                                        if(cityArr!=null){
                                            if (cityArr.length != 0) {
                                                cityArr.forEach(function (n, index) {
                                                    group['children'].push({
                                                        label: n.name,
                                                        value: n.code
                                                    })
                                                })
                                            }
                                        }
                                        thisnext.allareaData.push(group);
                                    })
                                })
                            }
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            getlistData(){//数据列表
                this.$request.post(`/api/wiseqr/order/list`,this.form,true,
                    res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.listData = res.data.list;
                            this.initPagination(res.data.page||{});
                            //this.listData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            // page = {"pageCount":总页数, "count":总数据条数}
            initPagination(page) {
                if(page) {
                    this.pagination.total = page.count;
                }
            },
            queryData: function(event){//搜索
                this.getlistData();
            },
            resetData: function(event){//重置
                this.selectAllBrands='';
                 this.selectSpeciSns='';
                this.selectAllarea='';
                this.id='1';
                this.form = {
                    metraFlag: 'Object',
                    hdCode: '', // 活动编号
                    orderCode:'',//订单编号
                    brandArr:[],//品牌
                    snArr:[],//规格
                    cityArr:[],//地区
                    metraType: 1, // 订单类型
                    status: '', // 发货状态
                    stime: '', // 开始时间
                    etime: '', // 结束时间
                    winnerMobile:'',
                    userId:null,
                    actTypeSub:'',
                    actTypeMain:2,  //奖品平台类型， 1:营销 2:私域流量
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
                var url = "/api/wiseqr/order/export";
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
                this.$router.push({path:'/Orders/HbSellerAct/offlineObjectDetail?orderId='+orderId})
            }
        }


    }
</script>

<style lang="scss"  scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
