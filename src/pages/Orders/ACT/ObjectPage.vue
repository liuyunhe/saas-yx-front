<template>
   <div>
      <el-card>
          <el-row :gutter="20">
              <el-col :span="16"><div class="grid-content bg-purple">实物领奖明细</div></el-col>
          </el-row>
          <div class="space"></div>
          <el-form :inline="true" :model="form" class="demo-form-inline">
              <el-row>
                  <el-form-item label="活动编号">
                      <el-input v-model="form.hdCode" placeholder="请输入活动编号"></el-input>
                  </el-form-item>
                  <el-form-item label="品牌选择">
                      <el-select v-model="selectAllBrands" placeholder="请选择">
                          <el-option v-for="(item,index) in allBrandsData" :key="item.brandCode" :label="item.name" :value="item.brandCode"></el-option>
                      </el-select>
                  </el-form-item>
                  <el-form-item label="规格选择">
                      <el-select v-model="selectSpeciSns" placeholder="请选择" multiple>
                          <el-option v-for="(item,index) in allSpecisData" :key="item.product.sn" :label="item.product.allName" :value="item.product.sn"></el-option>
                      </el-select>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="发货状态">
                      <el-select v-model="form.status" placeholder="请选择">
                          <el-option v-for="(name,code) in orderStatusData" :key="code" :label="name" :value="code"></el-option>
                  </el-select>
                  </el-form-item>
                  <el-form-item label="订单号">
                      <el-input v-model="form.orderCode" placeholder="请输入订单号"></el-input>
                  </el-form-item>
                  <el-form-item label="中奖地区">
                      <el-select v-model="selectAllarea" placeholder="请选择">
                        <!--  <el-option v-for="item in allareaData" :key="item.code" :label="item.name" :value="item.code"></el-option>-->
                          <el-option-group v-for="group in allareaData":key="group.value":label="group.label">
                              <el-option  v-for="item in group.children"  :key="item.value"  :label="item.label" :value="item.value"></el-option>
                          </el-option-group>
                      </el-select>
                  </el-form-item>
              </el-row>
              <el-row>
                  <el-form-item label="领奖时段" >
                     <el-date-picker v-model="form.startTime" type="date" placeholder="选择日期"> </el-date-picker>
                  </el-form-item>
                  <el-form-item label="至">
                      <el-date-picker v-model="form.endTime" type="date"  placeholder="选择日期"> </el-date-picker>
                  </el-form-item>
              </el-row>
              <el-form-item>
                  <el-button type="primary" v-on:click="queryData">查询</el-button>
                  <el-button v-on:click="resetData">重置</el-button>
              </el-form-item>
          </el-form>
          <el-table :data="listData" style="width: 100%">
              <el-table-column prop="orderCode" label="订单号" ></el-table-column>
              <el-table-column prop="actCode" label="活动ID" ></el-table-column>
              <el-table-column prop="actName" label="活动名称"></el-table-column>
              <el-table-column prop="nickname" label="中奖人"></el-table-column>
              <el-table-column prop="winnerMobile" label="中奖人手机号"></el-table-column>
              <el-table-column prop="prizeName" label="奖项名称"></el-table-column>
              <el-table-column prop="snName" label="关联规格"></el-table-column>
              <el-table-column prop="ctime" label="领奖时间"></el-table-column>
              <el-table-column prop="awdProvinceName" label="中奖地区"></el-table-column>
              <el-table-column prop="status" label="订单状态	"></el-table-column>
              <el-table-column prop="address" label="操作	"></el-table-column>
          </el-table>

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
                form: {
                    hdCode: '', // 活动编号
                    orderCode:'',
                    endTime:"",
                    startTime:"",
                    status:"",
                    metraType: 1
                },
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
                    this.allSpecisList(this.form.brandArr[0]);
                }
            },
            selectSpeciSns(nval, oval){
                if(nval&&nval!=oval) {
                    this.form.snArr  = [];
                    this.form.snArr[0] = nval;
                }
            }
        },
        methods: {
            init(){
                this.orderStatusList()
                this.allBrandsList();
                this.allareaList();
               // this.getlistData()
            },
            orderStatusList() {//发货状态
                this.$request.post(`/api/saotx/order/statusSelect`,{service: 'browser'},true,res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.orderStatusData = res.data;
                            this.orderStatus="";
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            allBrandsList(){//所有品牌
                this.$request.post(`/api/saotx/prod/listBrand`,{service: 'browser'},true,res => {
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
                var brandListArrObj = {};
                brandCodeArr.push(nval);
                brandListArrObj.brandCodeArr = brandCodeArr;
                this.$request.post(`/api/saotx/prod/listTbc`,{
                    brandListArrObj
                    },true,res => {
                        if (res.ret === '200000') {
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
                thisnext.$request.post(`/api/saotx/dim/regionByPCode`,{
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
                                    thisnext.$request.post(`/api/saotx/dim/regionByPCode`,{parentCode: n.code},true,(res) => {
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
                                        console.log(thisnext.allareaData);
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
                this.$request.post(`/api/saotx/order/list`,{
                        brandArr:this.selectAllBrands==""?[]:this.selectAllBrands,
                        cityArr:this.allareas==""?[]:this.allareas,
                        stime:this.startTime,
                        etime:this.endTime,
                        hdCode:this.hdCode,
                        metraType:1,
                        orderCode:this.orderCode,
                        snArr:this.selectSpecis==""?[]:this.selectSpecis,
                        status:this.status,
                        pageNo: 1,
                        pageSize: 10
                    },true,
                    res => {
                        console.log(res.data)
                        if (res.ret === '200000') {
                            this.listData = res.data;
                        }
                    }
                ),
                    err => {
                        console.log(err)
                    }
            },
            // 点击搜索
             searchItem : function () {
                return {
                    hdCode:this.form.hdCode || '',
                    orderCode: this.form.orderCode || '',
                    brandArr: this.form.brandArr=="" ||this.form.brandArr==undefined ?[]:[this.form.brandArr],
                    snArr: this.form.snArr=="" || this.form.snArr==undefined?[]:[$this.form.snArr],
                    cityArr: this.form.allareaArr==""|| this.form.allareaArr ==undefined?[]: [this.form.allareaArr],
                    metraType: 1,
                    status: this.form.status || '',
                    stime: this.form.startTime ,
                    etime: this.form.endTime
                }
            },
            queryData: function(event){

            },
            resetData: function(event){

            }
        }


    }
</script>

<style lang="scss"  scoped>
    .space {position:relative;width:100%;height:20px;}
</style>
