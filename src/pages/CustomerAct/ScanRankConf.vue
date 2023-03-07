<template>
  <div class="QA-container">
    <div >
      <el-col class="mb20" v-if="type != 0">
        <el-button type="primary" @click="open" :disabled="!info.btnFlag">开奖</el-button>
        <span style="margin-left: 20px"></span>
        <span v-if="info.openStatus == 0" style="color: #7c7f83">未开奖</span>
        <span v-if="info.openStatus == 1" style="color: #7c7f83">开奖中</span>
        <span v-if="info.openStatus == 2" style="color: #7c7f83">已开奖</span>
      </el-col>
      <el-col class="mb20" v-if="type != 0">
        <div  style="color: #111">截止{{info.dataTime}}，达标荷芯粉丝数的零售户数量<span style="color: #409EFF">{{ info.dataNum }}</span>个</div>
      </el-col>
      <el-col class="mb20" v-if="type != 0 && info.dataNum">
        <div  style="color: #111">
          <span style="color: #f56c6c">*</span>开奖人数设置：零售户排名开奖人数设置为
          <el-input-number :step="1" :precision="0":min="0"  controls-position="right" v-model="config.rankLimitNumber"></el-input-number>
          人
          <span style="margin-right: 20px"></span>
          <el-button type="primary" @click="setRankLimitNumber" :disabled="info.openStatus != 0">保存</el-button>
        </div>
      </el-col>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>活动设置：</span>
        </div>
        <el-form :model="config" :rules="rules" :disabled="type == 2" ref="ruleForm" label-width="200px" class="demo-ruleForm">
          <el-form-item label="是否立即启用：">
            <el-switch
                v-model="config.openFlag"
                active-color="#13ce66"
                inactive-color="#ff4949"
                style="margin-top: -4px;"
                @change="handleOpen"
                :disabled="config.outStatus == 2"
            >
            </el-switch>
          </el-form-item>
          <el-form-item label="活动时间：" prop="date">
            <el-date-picker v-model="config.stime" :disabled="config.outStatus == 2" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
            至
            <el-date-picker v-model="config.etime" :disabled="config.outStatus == 2" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="活动名称：" prop="actName">
            <el-input  v-model="config.actName" style="width: 220px"></el-input>
          </el-form-item>
          <el-form-item label="活动类型：" prop="actName">
            扫码粉丝数排名
          </el-form-item>
          <el-form-item label="活动入口图：" prop="actPic">
            <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadURL" :headers="headerObj" :data="{channel:'hebei-sellerInfo '}"  :on-success="uploadImgUrlSuccess" :show-file-list="false">
              <img v-if="config.actPic" :src="config.actPic" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon1"></i>
              <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*160像素；格式png、jpg</div>
            </el-upload>
          </el-form-item>
          <el-form-item label="活动规则：" prop="desc">
            <quill-editor ref="myTextEditor" :disabled="type == 2 " v-model="config.actRuleDesc" style="width: 420px;" :options="editorOption" placeholder="请输入活动规则，300字以内">
            </quill-editor>
          </el-form-item>
          <el-form-item label="活动参与截止时间：" prop="actJoinEtime">
            <el-date-picker v-model="config.actJoinEtime" :disabled="config.outStatus == 2" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择活动参与截止时间"></el-date-picker>
            <span style="margin-left: 20px;color: #c0c4cc">可选时间在10:00-23:00之间</span>
          </el-form-item>
          <el-form-item label="排名规则：" prop="actJoinEtime">
            在参与结束时间后，展示扫码累计达到
            <el-input-number :step="1" :precision="0":min="0"  controls-position="right" v-model="config.targetNumber"></el-input-number>
            天的粉丝数进行零售户排名
          </el-form-item>
          <el-form-item label="品牌规格：" prop="selectProductList">
            <div v-for="(item,index) in config.hbsScandrawConfs" :key="index" style="margin-bottom: 10px">
              <el-select v-model="config.hbsScandrawConfs[index].snOrgCode"   placeholder="请选择" @change="()=>getBrandList(index)" class="select-two">
                <el-option v-for="item in brandList"  :label="item.name" :value="item.code" :key="item.code">
                </el-option>
              </el-select>
              <el-select v-model="config.hbsScandrawConfs[index].sn"   placeholder="请选择"  class="select-two" @change="(value)=>getProductList(value,index)">
                <el-option v-for="item in (productList[config.hbsScandrawConfs[index].snOrgCode] || [])" :key="item.sn" :label="item.allName" :value="item.sn">
                </el-option>
              </el-select>
              <el-button type="danger" @click="deleteProduct(index)">删除规格</el-button>
            </div>
            <div>
              <el-button type="primary" @click="addProduct">增加规格</el-button>
            </div>
          </el-form-item>
          <el-form-item label="备注说明：">
            <div>1、参与活动时间结束后当天24:00后自动刷新排名；</div>
            <div>2、手动开奖，系统自动发送推送消息；</div>
            <div>3、开奖前，需配置好奖品，不允许超过参与人数。</div>
            <div>4、活动开启后，排名规则配置支持调整，品牌规格不可修改。</div>
          </el-form-item>
        </el-form>

      </el-card>
      <el-col class="mb20"></el-col>
      <el-card :body-style="{ padding: '20px' }">
        <div slot="header" class="clearfix">
          <span>零售户拉新粉丝数排名奖励：</span>
        </div>
        <div>
          <el-button size="small" type="primary" @click="addItem" v-if="awardConf.length<14 && type != 2">新增商品</el-button>
          <span style="margin-left: 20px">提醒：物料名称会在C端“我的礼品”中显示</span>
        </div>
        <template v-for="(ai,key) in awardConf">
          <div  style="height: 30px;font-size: 18px;line-height: 30px;margin:20px;color: #409EFF">
            奖项{{ key + 1 }}:
            <el-button size="mini" type="danger" style="margin-left: 450px" @click="delItem(key)" v-if="type != 2">删除奖品</el-button>
          </div>

          <el-form :disabled="type == 2" ref="awardConf" :model="ai"  label-width="150px" :rules="confRules">

            <el-form-item label="奖品类型：" prop="awdType">
              <el-select  @change="handleSelectChange(ai)" v-model="ai.awdType" style="width: 300px" placeholder="请选择">
                <el-option
                    v-for="i in awardType"
                    :key="i.value"
                    :label="i.label"
                    :value="i.value">
                </el-option>
              </el-select>
            </el-form-item>

            <!--            <el-form-item v-show="ai.awardType&&!ai.id" :label="`选择${ ai.awardType == '1' ? '实物' : ai.awardType == '7' ? '折扣卡' : '翻倍卡' }：`">-->
            <!--              <el-button size="" @click="getList(ai.awardType,key)">选择</el-button>-->
            <!--            </el-form-item>-->

            <el-form-item label="物料名称：" prop="awdName">
              <el-input style="width: 300px"  v-model="ai.awdName"></el-input>
            </el-form-item>

            <el-form-item label='奖品图片：' prop="awdPicture">
              <el-input v-model="ai.awdPicture" style="display: none" ></el-input>
              <img width="100" height="100" v-if="ai.awdPicture" :src="ai.awdPicture" alt="" style="border: 1px dashed #e4e7ed;">
              <el-upload  :action="uploadAwdURL" :headers="headerObj" :on-success="(res)=>{uploadAwdImgUrlSuccess(res,key)}" :show-file-list="false">
                <el-button size="small" type="primary" >上传图片</el-button>
                <span style="margin-left: 20px">上传商品图片尺寸（233x233px）</span>
              </el-upload>
            </el-form-item>

            <el-form-item v-if="ai.awdType==3" label='红包：' prop="awdValue">
              <el-input-number :step="0.01" :precision="2":min="0" controls-position="right" v-model="ai.awdValue"></el-input-number>
              <span>元</span>
            </el-form-item>

            <el-form-item v-if="ai.awdType==6" label='积分：' prop="awdValue">
              <el-input-number :step="1" :precision="0":min="0"  controls-position="right" v-model="ai.awdValue"></el-input-number>
              <span></span>
            </el-form-item>

<!--            <el-form-item label='奖品数量：' prop="numTotal">-->
<!--              <el-input-number :disabled="!!ai.id" :step="1" :precision="0":min="0"  controls-position="right"  v-model="ai.numTotal"></el-input-number>-->
<!--              <span v-if="!!ai.id" style="margin-left: 20px">剩余：{{ ai.numTotal - ai.numUsed }}</span>-->
<!--              <el-button size="small" type="primary" v-if="!!ai.id" style="margin-left: 20px" @click="addRepertory(ai)">增库</el-button>-->
<!--            </el-form-item>-->

            <el-form-item label='名次起始值：' prop="startNum">
              <el-input-number controls-position="right" :precision="0" :step="1" :min="1"  v-model="ai.startNum"></el-input-number>
            </el-form-item>

            <el-form-item label='名次结束值：' prop="endNum">
              <el-input-number controls-position="right" :precision="0" :step="1" :min="1"  v-model="ai.endNum"></el-input-number>
            </el-form-item>

            <div style="height: 30px"></div>
          </el-form>

        </template>
        <div style="margin-bottom: 50px"></div>
      </el-card>

    </div>


    <div style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" v-if="type != 2" @click="confirmSubmit">保存</el-button>
      <el-button type="primary" v-if="type == 2" @click="$router.back()">返回</el-button>
    </div>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px" @close="handleColseList">
      <el-table :data="list" border :stripe="true" style="width: 100%">
        <el-table-column prop="name" label="礼品名称" align="center">
        </el-table-column>
        <el-table-column label="礼品图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.pic" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="stock" label="剩余库存" align="center">
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button size="mini" @click="selectPrize(scope.row,title,awardNo)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PartyMgr",
  props:['actCode','type'],
  data(){
    var validateDate = (rule, value, callback) => {
      if (!this.config.stime || !this.config.etime) {
        callback(new Error('请选择活动时间'))
      } else if (this.config.stime >= this.config.etime){
        callback(new Error('开始时间必须小于结束时间'))
      } else {
        callback()
      }
    }
    var validateActPic = (rule, value, callback) => {
      if (!this.config.actPic) {
        callback(new Error('请上传活动入口图'))
      } else {
        callback()
      }
    }
    var validateDesc = (rule, value, callback) => {
      if (!this.config.actRuleDesc) {
        callback(new Error('请输入活动规则'))
      } else {
        callback()
      }
    }
    var validateActJoinEtime = (rule, value, callback) => {
      if (!this.config.actJoinEtime ) {
        callback(new Error('请选择截止时间'))
      } else {
        callback()
      }
    }
    var validateEndNum = (rule, value, callback) =>{
      let i
      let n = 0
      this.awardConf.forEach(item=>{
        if(item.endNum == value){
          n += 1
          i = item
        }
      })
      if(n>1){
        callback(new Error('名次有重复，请检查！'))
      }
      if(i.startNum > value){
        callback(new Error('结束名次不能小于开始名次！'))
      }else {
        callback()
      }
    }
    var valideSelectProductList = (rules, value, callback) => {
      if (this.config.hbsScandrawConfs.length>0) {
        let flag = false
        this.config.hbsScandrawConfs.forEach(item=>{
          if(item.sn == null || item.snOrgCode == null) {
            flag = true
          }
        })
        if(flag){
          callback(new Error('请完整填写品牌规格'))
        }else {
          callback()
        }
      } else {
        callback(new Error('请选择品牌规格'))
      }
    }
    return {
      uploadURL: '/api/wiseqr/attach/commonNewUpload',
      uploadAwdURL: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      editorOption: {
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', , 'blockquote'],
            [{ color: [] }, { background: [] }, { align: [] }]
          ]
        },
        placeholder: '请输入活动规则'
      },
      id: null,
      newAct: false,
      loading:true,
      config:{
        "outStatus": null, // 第一次配置为 null 或者 不传递
        "openFlag":true,
        "actName": "", // 活动名称
        "stime":null,
        "etime":null,
        "actPicCode":null,
        "actPic":null,
        "actRuleDesc":null,
        "targetNumber":null,
        "rankLimitNumber":null,
        "hbsScandrawConfs":[{
          snOrgCode: null, //规格所属的组织(钻石或荷花)
          sn: null, //规格
          snName: null //规格名称
        }]
      },
      addNum :0,
      openawdUserNum:0,
      openedNum:0,
      canOpenAward:false,
      info:{
        "dataTime": "", //数据时间
        "dataNum": 0,    // 参与人数
        "btnFlag": false,
        "openStatus": 0  // 活动开奖状态, 0: 未开奖, 1:开奖中, 2: 已开奖
      },
      rules: {
        actName: [{required: true, message: '请输入活动名称', trigger: 'blur'}],
        desc: [{ required: true, validator: validateDesc,trigger: 'blur' }],
        date: [{ required: true, validator: validateDate, trigger: 'change' }],
        actPic: [{ required: true, validator: validateActPic,trigger: 'change' }],
        actJoinEtime: [{ required: true, validator: validateActJoinEtime,trigger: 'change' }],
        selectProductList: [{ required: true, validator: valideSelectProductList,trigger: 'blur'}],
      },
      orgId:'',

      awardConf:[
        {
          "awdName": "",
          "awdPicture": "",
          "awdType": null,
          "awdValue": 0,
          "awdPr": 0,
          "numTotal":0,
          "startNum":null,
          "actJoinEtime":null,
          "endNum":null
        }
      ],
      title: '选择物品',
      list: [],
      params: {
        metraFlag: '',
        pageNo: 1,
        pageSize: 10,
        status: 1
      },
      listTotal: 0,
      listVisible: false,

      brandList:[],
      productList:[],

      confRules: {
        awdType: [{ required: true, message: '请选择奖品类型', trigger: 'change' }],
        awdName: [{ required: true, message: '请选择物料', trigger: 'change' }],
        awdPicture: [{ required: true, message: '请上传奖品图片' ,trigger: 'change'}],
        numTotal: [{ required: true, message: '请输入中奖人数',trigger:'blur' }],
        awdPr: [{ required: true, message: '请输入中奖概率',trigger:'blur' }],
        awdValue: [{ required: true, message: '请输入奖品面额',trigger:'blur' }],
        startNum: [{ required: true, message: '请输入名次起始值',trigger:'blur' }],
        endNum: [{ required: true,validator: validateEndNum,trigger:'blur' }],
      },

      awardType:[
        {
          value: 1,
          label:'实物'
        },
        {
          value: 3,
          label:'红包'
        },
        {
          value: 6,
          label:'积分'
        },
      ],
      awardNo:'',
      useOpen:true,
    }
  },
  created() {

  },
  mounted() {
    this.getActSn()
    if(this.type == 0) {
      this.actCode = null
      return
    }
    this.getInfo()
    this.getAwdOpenInfo()
  },
  methods:{
    handleOpen(value){

    },

    open(){
      this.$request.post('/saasHbseller/sellerAct/corefan/openAwd', {actCode:this.actCode}, false, res => {
        if (res.code == '200') {
          this.$message.success('开奖成功！')
          this.getAwdOpenInfo()
          return
        }
        this.$message.error(res.msg)
        this.getAwdOpenInfo()
      })
    },
    getAwdOpenInfo() {
      this.$request.post('/saasHbseller/sellerAct/corefan/awdOpenInfo', {actCode:this.actCode}, false, res => {
        this.loading = false
        if (res.code == '200') {
          console.log(res.data)
          if(res.data){
            this.info.btnFlag = res.data.btnFlag
            this.info.dataNum = res.data.dataNum
            this.info.dataTime = res.data.dataTime
            this.info.openStatus = res.data.openStstus
            this.config.rankLimitNumber = res.data.rankLimitNumber
          }
          return
        }
        this.$message.error(res.msg)
      })
    },
    setRankLimitNumber(){
      if(this.config.rankLimitNumber>this.info.dataNum){
        this.$message.error('开奖人数不能大于达标的零售户数量！')
        return
      }
      let params = {
        actCode:this.actCode,
        openNum:this.config.rankLimitNumber
      }
      this.$request.post('/saasHbseller/sellerAct/corefan/modifyOpenNum', params, false, res => {
        this.loading = false
        if (res.code == '200') {
          console.log(res.data)
          this.$message({type: 'success', message: '操作成功!'});
          return
        }
        this.$message.error(res.msg)
      })
    },
    getInfo() {
      this.$request.get('/saasHbseller/sellerAct/corefan/queryInfo', {actCode:this.actCode}, res => {
        this.loading = false
        if (res.code == '200') {
          console.log(res.data)
          if(res.data.baseInfo){
            this.config.outStatus = res.data.baseInfo.outStatus
            if(res.data.baseInfo.outStatus == 1 || res.data.baseInfo.outStatus == 2){
              this.config.openFlag = true
            }else {
              this.config.openFlag = false
            }
            this.config.actRuleDesc = res.data.baseInfo.actRuleDesc
            this.config.actName = res.data.baseInfo.actName
            this.config.actPicCode = res.data.baseInfo.actPicCode
            this.config.actPic = res.data.baseInfo.actPic
            this.config.stime = res.data.baseInfo.stime
            this.config.etime = res.data.baseInfo.etime
            this.config.actJoinEtime = res.data.baseInfo.actJoinEtime
            this.config.targetNumber = res.data.corefanConf.targetNumber
            if(res.data.awdList.length > 0){
              this.awardConf = []
              res.data.awdList.forEach(item => {
                this.awardConf.push(item)
              })
            }
            if(res.data.actSnList.length){
              this.config.hbsScandrawConfs = res.data.actSnList
            }
          }
          return
        }
        this.$message.error(res.msg)
      })
    },
    addItem(){
      const awardDemo = {
        "awdName": "",
        "awdPicture": "",
        "awdType": null,
        "awdValue": 0,
        "awdPr": 0,
        "numTotal":0
      }
      this.awardConf.push(awardDemo)
    },
    delItem(index){
      this.awardConf.splice(index,1)
    },
    addRepertory(item) {
      this.$prompt('请输入数字', '增库', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        inputPattern: /^\d{1,}$/,
        inputErrorMessage: '请输入数字'
      }).then(({ value }) => {
        if (value == 0) return this.$message.error('数字不能为0')
        this.$request.post('/hbact/saas/zt/ztActAwdAdd', {
          id: item.id ,
          actCode: this.actCode,
          addValue: value
        }, false, res => {
          if (res.code == '200') {
            this.$message.success('增库成功')
            this.getInfo()
          } else {
            this.$message.error(res.msg)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消输入'
        });
      });
    },
    getBrandList(index){
      this.config.hbsScandrawConfs[index].sn = null
    },
    getProductList(value,index){
      let flag = 0
      this.config.hbsScandrawConfs.forEach((item)=>{
        if(item.sn === value) {
          flag ++
        }
      })
      console.log(flag)
      if(flag > 1){
        this.config.hbsScandrawConfs[index].sn = null
        this.$message.error("已选择当前规格!")
        return
      }
      this.config.hbsScandrawConfs[index].sn = value
      const product =  this.productList[this.config.hbsScandrawConfs[index].snOrgCode].find((item=>{
        return item.sn === value
      }))
      this.config.hbsScandrawConfs[index].snOrgCode = product.orgId
      this.config.hbsScandrawConfs[index].snName = product.allName
    },
    addProduct(){
      this.config.hbsScandrawConfs.push({
        snOrgCode: null, //规格所属的组织(钻石或荷花)
        sn: null, //规格
        snName: null //规格名称
      })
    },
    deleteProduct(index){
      this.config.hbsScandrawConfs.splice(index,1)
    },
    getActSn(){
      this.$request.post('/saasHbseller/actCommon/actSn', {}, false, res => {
        if (res.code == '200') {
          this.brandList = Object.keys(res.data).map((item)=>{
            if(item === 'hebeizhongyan'){
              return {
                name:'钻石',
                code:item
              }
            }else if(item === 'hebeihehua') {
              return {
                name:'荷花',
                code:item
              }
            }
          })
          this.productList = res.data
          console.log(this.brandList)
          console.log(this.productList)
          return
        }
        this.$message.error(res.msg)
      })
    },
    confirmSubmit() {
      let ruleConfig = true
      let awardConfig = true
        this.$refs.ruleForm.validate((valid) => {
          if(valid){

          }else {
            ruleConfig = false
          }
        })
      this.$refs.awardConf.forEach(item => {
        item.validate(valid => {
          if(valid){

          }else {
            awardConfig = false
          }
        })
      })
      if(awardConfig && ruleConfig) {
        let awdParams = this.awardConf.map((item,index)=>{
          return {
            "confLevel": index + 1, //级别批次，从1开始
            "startNum": item.startNum, //名次起始值
            "endNum": item.endNum, //名次结束值
            "levelNum":  item.endNum - item.startNum + 1, //本批次总数
            "awdType": item.awdType, //奖品类型, 1: 实物, 3: 红包, 6: 积分
            "awdName": item.awdName, //奖品名称
            "awdValue": item.awdValue, //奖品名称
            "awdPicture": item.awdPicture //奖品图片
          }
        });
        const params = {
          baseInfoParam: {
            "openFlag": this.config.openFlag ? 1 : 0, //是否开启, 0:不开启, 1:开启
            "actCode": this.actCode || null, //活动code
            "stime": this.config.stime, //开始时间
            "etime": this.config.etime, //结束时间
            "actName": this.config.actName, //活动名称
            "actPicCode": this.config.actPicCode, //活动图片code
            "actJoinEtime": this.config.actJoinEtime, //截止时间
            "actRuleDesc":this.config.actRuleDesc, //活动规则描述
          },
          awdParamList: awdParams,
          snParamList: this.config.hbsScandrawConfs,
          targetNumber: this.config.targetNumber,    // 荷心粉丝统计要求：活动期间扫码需要累计达到的天数
        }
        console.log(params)
        this.$request.post('/saasHbseller/sellerAct/corefan/updateInfo', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
            this.$router.back()
          } else {
            this.$message.error(res.msg);
          }
        })
      }
    },
    // 选择奖品
    selectPrize(obj,title,awardNo) {
      // let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
      // newAwae.awdPicture = obj.pic
      // newAwae.poolName = obj.name
      // newAwae.prizeName = obj.name
      // newAwae.poolId = obj.id
      console.log(awardNo)
      this.awardConf[awardNo].awardName = obj.name
      this.awardConf[awardNo].awardPrice = obj.marketMoney
      this.awardConf[awardNo].marketMoney = obj.marketMoney
      this.handleColseList()
    },
    handleColseList(){
      this.listVisible = false
      this.params.pageNo = 1
    },
    handleSizeChange(newSize) {
      this.params.pageSize = newSize
      this.getList()
    },
    handleCurrentChange(newSize) {
      this.params.pageNo = newSize
      this.getList()
    },
    beforeAvatarUpload(file) {
      const JPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!JPGOrPNG) {
        this.$message.error('上传图片只能是 JPG 或 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return JPGOrPNG && isLt2M;
    },
    uploadImgUrlSuccess(resule) {
      if (resule.ret === '200000'){
        console.log(resule)
        this.config.actPicCode = resule.data.rdmCode
        this.config.actPic = resule.data.filePath
        return
      }
      this.$message.error(resule.message)
    },
    uploadAwdImgUrlSuccess(resule,index) {
      if (resule.ret === '200000')
        return (this.awardConf[index].awdPicture = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    handleSelectChange(item){
      console.log(item)
      item.awdName = ""
      item.awdPicture = ""
    },
    getList(type,key) {
      if (type == '1') {
        this.params.metraFlag = 'object'
        this.title = '选择实物'
      } else if (type == '2') {
        this.params.metraFlag = 'virtual'
        this.title = '选择虚拟'
      } else if (type == '3') {
        this.params.metraFlag = 'redpack'
        this.title = '选择红包'
      } else if (type == '6') {
        this.params.metraFlag = 'integral'
        this.title = '选择荷石币'
      } else if (type == '7') {
        this.params.metraFlag = 'cdDisc'
        this.title = '选择折扣卡'
      } else if (type == '8') {
        this.params.metraFlag = 'cdDouble'
        this.title = '选择翻倍卡'
      }
      if(key != undefined){
        if(key != -1){
          this.awardNo = key
        }
      }
      this.$request.post('/api/wiseqr/metra/list', this.params, true, res => {
        if (res.ret === '200000') {
          this.list = []
          this.list = res.data.list
          this.listTotal = res.data.page.count
          this.listVisible = true
          return
        }
        this.$message.error(res.message)
      })
    },
  }

}
</script>
<style>
.avatar-uploader-icon1 {
  font-size: 28px;
  color: #8c939d;
  width: 300px;
  height: 64px;
  line-height: 64px;
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 110px;
  height: 110px;
  line-height: 110px;
  text-align: center;
}
.avatar {
  width: 300px;
  height: 64px;
  line-height: 64px;
  display: block;
}
</style>
<style lang="scss" scoped>
.QA-container{
  background: #fff;
  padding: 30px;
  box-sizing: border-box;
}
</style>
