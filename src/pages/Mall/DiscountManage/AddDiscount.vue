<template>
  <div class="container">
    <el-card v-loading="loading">
      <el-col class="mb20">
        <div style="line-height: 32px;margin-bottom: 28px;font-size: 18px;font-weight: bolder">添加限时折扣:</div>
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="120px" class="demo-ruleForm">
          <el-form-item label="标题名称：" prop="name" size="small">
            <el-input v-model="ruleForm.name" style="width: 200px" :maxlength="10"></el-input>
          </el-form-item>
          <el-form-item label='活动时间：' prop="date">
            <el-date-picker v-model="ruleForm.stime"  :disabled="!newAct" value-format="yyyy-MM-dd HH:mm" format="yyyy-MM-dd HH:mm" type="datetime" placeholder="选择开始时间"></el-date-picker>
            至
            <el-date-picker v-model="ruleForm.etime" :disabled="!newAct" type="datetime" value-format="yyyy-MM-dd HH:mm"  format="yyyy-MM-dd HH:mm" placeholder="选择结束时间" ></el-date-picker>
            <span>(注意：折扣活动时间不可重叠)</span>
          </el-form-item>
          <div></div>
          <el-button type="primary" @click="addDiscount" style="margin-left: 30px" >添加折扣信息</el-button>
          <div style="margin-bottom: 20px"></div>
        </el-form>
        <template v-for="(item,index) in discountConf">
          <el-form ref="discountConf" :model="item" label-width="150px" :rules="rules">
            <el-card :body-style="{ padding: '20px' }">
              <div slot="header" class="clearfix">
                <span>折扣信息{{index+1}}：</span>
                <span style="float: right;color: red;cursor: pointer" @click="delteDiscountItem(index)">删除</span>
              </div>
              <el-form-item label='每天可兑换时间：' prop="time">
                <el-time-picker
                    is-range
                    v-model="item.time"
                    value-format="HH:mm"
                    format="HH:mm"
                    range-separator="至"
                    start-placeholder="开始时间"
                    end-placeholder="结束时间"
                    placeholder="选择时间范围">
                </el-time-picker>
              </el-form-item>
              <el-form-item label='单个商品限兑换数量（可兑换时间内）：' label-width="300px" prop="num">
                <el-input-number
                    :step="1"
                    :precision="0"
                    :min="0"
                    controls-position="right"
                    v-model="item.num">
                </el-input-number>
              </el-form-item>
              <el-form-item label='折扣：'  prop="discount" label-width="75px">
                <el-input-number
                    :step="0.01"
                    :precision="2"
                    :min="0"
                    :max="1"
                    controls-position="right"
                    v-model="item.discount">
                </el-input-number>
              </el-form-item>
              <div>
                <el-button type="primary" @click="chooseProduct(index)" >添加折扣商品</el-button>
              </div>
              <div style="line-height: 32px;margin-bottom: 18px;margin-top: 18px">已选商品列表:</div>
              <el-tabs v-model="item.listType" type="card" @tab-click="handleClickTab">
                <el-tab-pane label="自建商品" name="ZJ">
                  <el-table
                    :data="item.zj"
                    style="width: 100%">
                    <el-table-column property="id" label="商品ID" width="200"></el-table-column>
                    <el-table-column property="memo" label="商品名称" width="200"></el-table-column>
                    <el-table-column property="cate1Name" label="一级分类"></el-table-column>
                    <el-table-column property="cate2Name" label="二级分类"></el-table-column>
                    <el-table-column prop="score" label="兑换值"></el-table-column>
                    <el-table-column prop="score" label="折扣价">
                      <template slot-scope="scope">
                        <span>{{ parseFloat((scope.row.score * item.discount).toPrecision(12))}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="shopQuantity" label="商品库存"></el-table-column>
                    <el-table-column prop="shopQuantity" label="可兑换库存">
                      <template slot-scope="scope">
                        <span>{{ item.num }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" label="商品类型">
                      <template slot-scope="scope">
                        <span>{{ scope.row.status == "1" ? "上架中":"下架中"}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                    >
                      <template slot-scope="scope" >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteRow(scope.$index, item.zj)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
                <el-tab-pane label="苏宁商品" name="SN">
                  <el-table
                      :data="item.sn"
                      style="width: 100%">
                    <el-table-column property="id" label="商品ID" width="200"></el-table-column>
                    <el-table-column property="memo" label="商品名称" width="200"></el-table-column>
                    <el-table-column property="cate1Name" label="一级分类"></el-table-column>
                    <el-table-column property="cate2Name" label="二级分类"></el-table-column>
                    <el-table-column prop="score" label="兑换值"></el-table-column>
                    <el-table-column prop="score" label="折扣价">
                      <template slot-scope="scope">
                        <span>{{ parseFloat((scope.row.score * item.discount).toPrecision(12))}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="shopQuantity" label="商品库存"></el-table-column>
                    <el-table-column prop="shopQuantity" label="可兑换库存">
                      <template slot-scope="scope">
                        <span>{{ item.num }}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="status" label="商品类型">
                      <template slot-scope="scope">
                        <span>{{ scope.row.status == "1" ? "上架中":"下架中"}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column
                        fixed="right"
                        label="操作"
                    >
                      <template slot-scope="scope" >
                        <el-button
                            size="mini"
                            type="danger"
                            @click="deleteRow(scope.$index, item.sn)"
                        >删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
              </el-tabs>
            </el-card>
          </el-form>
          <div style="height: 20px"></div>
        </template>
      </el-col>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="returnDiscount">取消</el-button>
    </el-card>



    <el-dialog title="选择商品" :visible.sync="dialogTableVisible" width="850px">

      <el-form :inline="true" :model="filters" label-width="80px">
        <el-form-item :size="'small'" label="关键词">
          <el-input placeholder="请输入内容" v-model="filters[filters.select]" class="input-with-select" style="width: 300px">
            <el-select v-model="filters.select" slot="prepend" @change="inputWithSelectChange" placeholder="请选择" style="width: 100px">
              <el-option label="商品名称" value="keywords"></el-option>
              <el-option label="商品ID" value="productId"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item :size="'small'" label="分类">
          <el-select
              v-model="filters.cateLvl1"
              placeholder="请选择"
              @change="selectBrand1"
              style="width: 100px">
            <el-option
                v-for="item in cateLvl1List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
          <el-select
              v-model="filters.cateLvl2"
              placeholder="请选择"
              style="width: 100px">
            <el-option
                v-for="item in cateLvl2List"
                :key="item.id"
                :label="item.name"
                :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="mr0" :size="'small'">
          <el-button type="primary" size="small" @click="commitForm">查询</el-button>
        </el-form-item>
      </el-form>

      <el-tabs v-model="listType" type="card" @tab-click="handleClick">
        <el-tab-pane label="自建商品" name="ZJ">
          <el-table :data="listZJ" ref="ZJTable" v-loading="listLoading" highlight-current-row @selection-change="handleSelectProductZJ" >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="productId" label="商品ID" width="200"></el-table-column>
            <el-table-column property="memo" label="商品名称"  width="200"></el-table-column>
            <el-table-column property="cate1Name" label="一级分类"></el-table-column>
            <el-table-column property="cate2Name" label="二级分类"></el-table-column>
            <el-table-column property="cate3Name" label="三级分类"></el-table-column>
            <el-table-column property="cate4Name" label="四级分类"></el-table-column>
          </el-table>
          <div class="footer-toolbar clearfix">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :current-page="currentPage"
                @current-change="handleCurrentChangeZJ"
                :page-size="filters.pageSize"
                :total="filters.total"
                style="float:right;">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane label="苏宁商品" name="JD">
          <el-table :data="listJD" ref="JDTable" v-loading="listLoading" highlight-current-row @selection-change="handleSelectProductJD"   >
            <el-table-column
                type="selection"
                width="55">
            </el-table-column>
            <el-table-column type="index" label="序号" width="50"></el-table-column>
            <el-table-column property="productId" label="商品ID" width="200"></el-table-column>
            <el-table-column property="memo" label="商品名称" width="200"></el-table-column>
            <el-table-column property="cate1Name" label="一级分类"></el-table-column>
            <el-table-column property="cate2Name" label="二级分类"></el-table-column>
            <el-table-column property="cate3Name" label="三级分类"></el-table-column>
            <el-table-column property="cate4Name" label="四级分类"></el-table-column>
          </el-table>
          <div class="footer-toolbar clearfix">
            <el-pagination
                background
                layout="total,prev, pager, next,jumper"
                :current-page="currentPage"
                @current-change="handleCurrentChangeJD"
                :page-size="filters.pageSize"
                :total="filters.total"
                style="float:right;">
            </el-pagination>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div style="margin-top: 30px;text-align: center">
        <el-button type="primary" size="small" @click="confirmDialog">确定</el-button>
        <el-button size="small" @click="cancelDialog">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  export default {
    name:"AddDiscount",
    data() {
      var validateDate = (rule, value, callback) => {
        if (!this.ruleForm.stime || !this.ruleForm.etime) {
          callback(new Error('请选择活动时间'))
        } else if (this.ruleForm.stime >= this.ruleForm.etime){
          callback(new Error('开始时间必须小于结束时间'))
        } else {
          callback()
        }
      }
      var validateNum = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入数量，数量必须大于0'))
        } else if (value == 0){
          callback(new Error('数量必须大于0'))
        } else {
          callback()
        }
      }
      var validateDiscount = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入折扣，折扣必须大于0'))
        } else if (value == 0){
          callback(new Error('折扣必须大于0'))
        } else {
          callback()
        }
      }
      return {
        listLoading:false,
        loading:false,
        newAct:true,
        //基本设置
        ruleForm: {
          name: '',
          stime:'',
          etime:'',
        },
        //折扣信息
        discountConf:[
          {
            time:'',
            num:'',
            discount:'',
            listType:'ZJ',
            zj:[],
            sn:[],

          }
        ],
        rules: {
          name: [{ required: true, message: '请输入推荐位名称', trigger: 'blur' }],
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          time: [{ required: true, message: '选择时间范围', trigger: 'change' }],
          num: [{ required: true, validator: validateNum, trigger: 'blur' }],
          discount: [{ required: true, validator: validateDiscount, trigger: 'blur' }],

        },
        discountIndex:'',
        dialogTableVisible:false,
        //对话框表格类型
        listType: 'ZJ',
        listJD: [],
        listZJ: [],
        filters:{
          inputWithSelect:"",
          select:"",
          //商品状态
          status:1,
          //商品类型
          giftType:"",
          //是否有运费
          hasDelivery:"",
          //关键词
          keywords:"",
          //分类
          cateLvl1:"",
          cateLvl2:"",
          productId:"",
          //每页条数
          pageSize:5,

          pageNo: 1,


          //总条数
          total:0,
        },
        //当前页码
        currentPage:1,
//分类列表
        cateLvl1List:[
          {name: "全部", id: ""}
        ],
        cateLvl2List:[
          {name: "全部", id: ""}
        ],
        selectProduct:{
          productId : "",
          productName : "",
          image:""
        },
        selectProductZJ:[],
        selectProductJD:[],
      }
    },
    created() {
      this.getOneCategory()
      this.getListZJ()
      // this.getListJD()

    },
    methods: {
      deleteRow(index, rows) {
        rows.splice(index, 1);
      },
      delteDiscountItem(index){
        this.discountConf.splice(index,1)
      },

      handleClickTab(tab, event) {
        console.log(tab)
      },
      getListJD() {
        let params = {
          //商品状态
          status:this.filters.status,
          //商品类型
          giftType:this.filters.giftType,
          //是否有运费
          hasDelivery:this.filters.hasDelivery,
          //关键词
          keywords:this.filters.keywords,
          //分类
          cateLvl1:this.filters.cateLvl1,
          cateLvl2:this.filters.cateLvl2,

          productId:this.filters.productId,

          pageSize:this.filters.pageSize,
          pageNo:this.filters.pageNo
        };

        this.postSearchJD(params)
      },
      postSearchJD(params) {
        this.listLoading = true;
        // this.$request.post('/sc/saotx/mall/product/listJD', params, true, (res) => {
        this.$request.post('/sc/mall/suning/product/list', params, true, (res) => {
          if (res.ret == '200000') {
            this.listLoading = false;
            this.listJD = res.data.list
            this.filters.total = res.data.page.count
            this.filters.pageNo = res.data.page.pageNo
          }
        })
      },
      //从后台拿取自建商品列表
      getListZJ() {
        let params = {
          //商品状态
          status:this.filters.status,
          //商品类型
          giftType:this.filters.giftType,
          //关键词
          keywords:this.filters.keywords,
          //分类
          cateLvl1:this.filters.cateLvl1,
          cateLvl2:this.filters.cateLvl2,
          productId:this.filters.productId,
          pageSize:this.filters.pageSize,
          pageNo:this.filters.pageNo
        };
        this.postSearchZJ(params)
      },
      postSearchZJ(params) {
        this.listLoading = true;
        this.$request.post('/sc/saotx/mall/product/listZJ', params, true, (res) => {
          if (res.ret == '200000') {
            this.listLoading = false;
            this.listZJ = res.data.list
            this.filters.total = res.data.page.count
            this.filters.pageNo = res.data.page.pageNo
          }
        })
      },
      commitForm() {
        this.handleClick()
      },
      inputWithSelectChange(val){
        this.filters.keywords = ""
        this.filters.productId = ""
      },
      //从后台拿取商品分类1
      getOneCategory(){
        this.$request.post('/sc/saotx/mall/cate/oneCategory',{}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl1List = [...this.cateLvl1List,...res.data]
          }
        })
      },
      selectBrand1(){
        this.filters.cateLvl2 = ""
        this.cateLvl2List = [{name: "全部", id: ""}]
        this.getTwoCategory()
      },
      //从后台拿取商品分类2
      getTwoCategory(){
        if(this.filters.cateLvl1 == "")return
        this.$request.post('/sc/saotx/mall/cate/moreCategory',{id:this.filters.cateLvl1}, true, (res) => {
          if (res.ret == '200000') {
            this.cateLvl2List = [...this.cateLvl2List,...res.data]
          }
        })
      },
      handleSelectProductZJ(val) {
        if(val){
          this.selectProductZJ = val
        }
      },
      handleSelectProductJD(val) {
        if(val){
          this.selectProductJD = val
        }
      },
      addDiscount(){
        const item = {
          time:'',
          num:'',
          discount:'',
          listType:'ZJ',
          zj:[],
          sn:[],
        }
        this.discountConf.push(item)
      },
      chooseProduct(index){
        this.dialogTableVisible = true
        this.discountIndex = index
      },
      //tabs切换
      handleClick(tab, event) {
        this.filters.pageNo = 1
        this.currentPage = 1
        this.selectProductJD = []
        this.selectProductZJ = []
        if(this.listType == "JD"){
          this.getListJD()
        }else if(this.listType == "ZJ"){
          this.getListZJ()
        }
      },
      //跳转按钮功能
      jumpTo() {
        this.$emit('current-change')
      },
      //分页器功能
      handleCurrentChangeZJ(val) {
        this.selectProductJD = []
        this.selectProductZJ = []
        this.filters.pageNo = val
        this.currentPage = val
        this.getListZJ()
      },
      handleCurrentChangeJD(val) {
        this.selectProductJD = []
        this.selectProductZJ = []
        this.filters.pageNo = val
        this.currentPage = val
        this.getListJD()
      },

      confirmDialog(){
        if(this.selectProductJD.length == 0 && this.selectProductZJ.length == 0){
          this.$message({
            message:"请选择要添加的商品",
            type: 'warning'
          })
          return
        }else {
          if(this.selectProductJD.length != 0) {
            if(this.discountConf[this.discountIndex].sn.length == 0) {
              this.discountConf[this.discountIndex].sn = [...this.selectProductJD]
            }else {
              this.selectProductJD.forEach((item,index) => {
                let i = this.discountConf[this.discountIndex].sn.findIndex((i)=>{
                  return i.productId == item.productId
                })
                if(i==-1){
                  this.discountConf[this.discountIndex].sn.push(item)
                }
              })
            }
          }else if(this.selectProductZJ.length != 0) {
            if(this.discountConf[this.discountIndex].zj.length == 0) {
              this.discountConf[this.discountIndex].zj = [...this.selectProductZJ]
            }else {
              this.selectProductZJ.forEach((item,index) => {
                let i = this.discountConf[this.discountIndex].zj.findIndex((i)=>{
                  return i.productId == item.productId
                })
                if(i==-1){
                  this.discountConf[this.discountIndex].zj.push(item)
                }
              })
            }
          }
          this.$refs.JDTable.clearSelection();
          this.$refs.ZJTable.clearSelection();
          this.dialogTableVisible = false
          this.filters.select = ""
          this.filters.productId = ""
          this.filters.keywords = ""
          this.filters.cateLvl1 = ""
          this.filters.cateLvl2 = ""
          this.filters.pageNo = 1
          this.currentPage = 1
          this.listType ='ZJ'
          this.getListZJ()
          this.selectProduct.productName = ""
          this.selectProduct.productId = ""
          this.selectProduct.image = ""
          this.selectProductJD = []
          this.selectProductZJ = []
        }
      },
      cancelDialog() {
        this.$refs.JDTable.clearSelection();
        this.$refs.ZJTable.clearSelection();
        this.dialogTableVisible = false
        this.filters.select = ""
        this.filters.productId = ""
        this.filters.keywords = ""
        this.filters.cateLvl1 = ""
        this.filters.cateLvl2 = ""
        this.filters.pageNo = 1
        this.currentPage = 1
        this.listType ='ZJ'
        this.getListZJ()
        this.selectProduct.productName = ""
        this.selectProduct.productId = ""
        this.selectProduct.image = ""
        this.dialogTableVisible = false
        this.selectProductJD = []
        this.selectProductZJ = []
      },
      save(){
        let flag = true
        this.$refs.discountConf.forEach(item => {
          item.validate(valid => {
            if(valid){

            }else {
              flag = false
            }
          })
        })
        this.$refs.ruleForm.validate(valid => {
          if (valid) {
            if (!flag) return
            let actItemWrapperList = this.discountConf.map((item)=>{
              let zj = item.zj.map((i)=>{    //商品类型 1 自建 4. 苏宁
                return {
                  "productId":i.id, //商品id . 商品信息里的id字段.
                  "productType":1
                }
              })
              let sn = item.sn.map((i)=>{
                return {
                  "productId":i.id, //商品id . 商品信息里的id字段.
                  "productType":4
                }
              })
              return {
                "smDisActItem":{ //可兑换时间段配置
                  "stime":item.time[0], //开始时间
                  "etime":item.time[1], //截止时间
                  "numLimit":item.num, //数量
                  "discount":item.discount //折扣值 0到1之间
                },
                "smDisActItemProductList":[...zj,...sn]
              }
            })
            let params = {
              "smDisAct":{
                "actName":this.ruleForm.name, //活动名称
                "stime":this.ruleForm.stime, //活动开始时间
                "etime":this.ruleForm.etime //活动结束时间
              },
              actItemWrapperList
            }
            let f = true
            params.actItemWrapperList.forEach((item)=>{
              if(item.smDisActItemProductList.length<4) {
                f = false
              }
            })
            if(!f){
              this.$message.error('配置的商品合计不少于4个！');
              return
            }
            console.log(params)
            this.$request.post('/sc/discount/act/save', params, true, res => {
              if (res.code == '200') {
                this.$message({type: 'success', message: '操作成功!'});
                this.returnDiscount()
              } else {
                this.$message.error(res.msg);
              }
            })
          }
        })
      },
      returnDiscount(){
        this.$router.push({
          path:'/mall/discount'
        })
      },
    }
  };
</script>
<style lang="scss" scoped>
  .select-num-dialog {
    .con {
      text-align: center;
      user-select: none;
      .warpper {
        padding: 20px 40px;
      }
      .num {
        display: inline-block;
        width: 60px;
        height: 60px;
        line-height: 60px;
        font-size: 20px;
        border: 1px solid #ccc;
        border-radius: 50%;
        margin: 10px 10px;
        cursor: pointer;
        transition: all 0.3s;
        &.active {
          color: #fff;
          background-color: #409EFF;
        }
        &.active:hover {
          color: #fff;
        }
      }
      .num:hover {
        color: #409EFF;
        border: 1px solid #409EFF;
      }
    }
  }
  .selected-dialog {
    .con {
      width: 400px;
      height: 60px;
      display: flex;
      margin: 0 auto 40px;
      .num {
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        color: #fff;
        background-color: #409EFF;
        border-radius: 50%;
      }
      .num:first-child {
        margin: 0 40px 0 120px;
      }
    }
    .btn {
      text-align: center;
    }
  }
</style>
