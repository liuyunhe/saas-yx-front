<template>
  <div class="QA-container" >
    <div >

      <!--基本设置-->
      <el-card :body-style="{ padding: '20px' }" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>基本设置：</span>
        </div>
          <el-form ref="actSetConfRef" label-width="100px" :model="config"  :rules="confRules">
            <el-form-item label='活动时间：' prop="date">
              <el-date-picker v-model="config.stime" :disabled="!newAct" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择开始时间"></el-date-picker>
              至
              <el-date-picker v-model="config.etime" :disabled="!newAct" value-format="yyyy-MM-dd HH:mm:ss" type="datetime" placeholder="选择结束时间" ></el-date-picker>
            </el-form-item>
            <el-form-item label='抽奖限制：' prop="dayAwardNum">
              每人每天前
              <el-input-number v-model="config.dayAwardNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              次抽奖可获得卡片
            </el-form-item>
            <el-form-item label='转赠限制：' prop="weekOutNum">
              每人每周可转增
              <el-input-number v-model="config.weekOutNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              张卡片
            </el-form-item>
            <el-form-item label='收卡限制：' prop="weekInNum">
              每人每周可接收
              <el-input-number v-model="config.weekInNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>
              张卡片
            </el-form-item>
            <el-form-item label-width="auto" label='卡片设置：(上传卡片图片尺寸313x313px)' prop="">
            </el-form-item>
            <div style="width: 1120px">
              <div style="overflow: auto">
                <el-form-item label-width="0px" prop="cardImg1" style="width: 120px;float: left">
                  <el-input v-model="config.cardImg1" style="display: none" ></el-input>
                  <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :disabled="!newAct" :on-success="(res)=>{uploadImgUrlSuccess(res,'1')}" :show-file-list="false">
                    <img v-if="config.cardImg1" :src="config.cardImg1" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div style="width: 430px;float: left;margin-right: 20px">
                  <el-form-item label='卡片名称：' prop="cardName1" >
                    <el-input style="width: 300px" maxlength="10" :disabled="!newAct"  v-model="config.cardName1"></el-input>
                  </el-form-item>
                  <el-form-item label='卡片介绍：' prop="cardDesc1" >
                    <el-input type="textarea" maxlength="100" style="width: 300px" :disabled="!newAct"  v-model="config.cardDesc1"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label-width="0px" prop="cardDesc2" style="width: 120px;float: left">
                  <el-input v-model="config.cardImg2" style="display: none" ></el-input>
                  <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :disabled="!newAct" :on-success="(res)=>{uploadImgUrlSuccess(res,'2')}" :show-file-list="false">
                    <img v-if="config.cardImg2" :src="config.cardImg2" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div style="width: 430px;float: left">
                  <el-form-item label='卡片名称：' prop="cardName2" >
                    <el-input style="width: 300px" maxlength="10" :disabled="!newAct" v-model="config.cardName2"></el-input>
                  </el-form-item>
                  <el-form-item label='卡片介绍：' prop="cardDesc2" >
                    <el-input type="textarea" maxlength="100" style="width: 300px" :disabled="!newAct" v-model="config.cardDesc2"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
            <div style="width: 1120px">
              <div style="overflow: auto">
                <el-form-item label-width="0px" prop="cardImg3" style="width: 120px;float: left">
                  <el-input v-model="config.cardImg3" style="display: none" ></el-input>
                  <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :disabled="!newAct" :on-success="(res)=>{uploadImgUrlSuccess(res,'3')}" :show-file-list="false">
                    <img v-if="config.cardImg3" :src="config.cardImg3" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div style="width: 430px;float: left;margin-right: 20px">
                  <el-form-item label='卡片名称：' prop="cardName3" >
                    <el-input style="width: 300px" maxlength="10" :disabled="!newAct" v-model="config.cardName3"></el-input>
                  </el-form-item>
                  <el-form-item label='卡片介绍：' prop="cardDesc3" >
                    <el-input type="textarea" maxlength="100" style="width: 300px" :disabled="!newAct" v-model="config.cardDesc3"></el-input>
                  </el-form-item>
                </div>
                <el-form-item label-width="0px" prop="cardImg4" style="width: 120px;float: left">
                  <el-input v-model="config.cardImg4" style="display: none" ></el-input>
                  <el-upload  class="avatar-uploader" :action="uploadURL" :headers="headerObj" :disabled="!newAct" :on-success="(res)=>{uploadImgUrlSuccess(res,'4')}" :show-file-list="false">
                    <img v-if="config.cardImg4" :src="config.cardImg4" class="avatar">
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <div style="width: 430px;float: left">
                  <el-form-item label='卡片名称：' prop="cardName4" >
                    <el-input style="width: 300px" maxlength="10" :disabled="!newAct" v-model="config.cardName4"></el-input>
                  </el-form-item>
                  <el-form-item label='卡片介绍：' prop="cardDesc4" >
                    <el-input type="textarea" maxlength="100" style="width: 300px" :disabled="!newAct" v-model="config.cardDesc4"></el-input>
                  </el-form-item>
                </div>
              </div>
            </div>
          </el-form>
        <div v-show="newAct" style="height: 40px;text-align: center">
          <el-button type="primary" @click="handleBaseSave">保存</el-button>
        </div>
      </el-card>
      <div style="height: 30px"></div>

      <!--规格设置-->
      <el-card :body-style="{ padding: '20px' }" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>规格设置：</span>
        </div>
        <div>
          <el-button size="small" type="primary" @click="addItem" v-if="newAct">新增规格</el-button>
        </div>
        <template v-for="(item,key) in snConf">
          <div  style="height: 30px;font-size: 18px;line-height: 30px;margin:20px;color: #409EFF">
            规格设置{{ key + 1 }}:
          </div>
          <el-form ref="awardConf" :model="item" label-width="150px" :rules="snRules" :disabled="!newAct">

            <el-form-item label="关联规格：" prop="snInfo">
              <el-select multiple v-model="item.snInfo" style="width: 300px" placeholder="请选择" @remove-tag="handleRemoveTag" @visible-change="handleVisbleChange">
                <el-option
                    v-for="i in brandList"
                    :key="i.sn"
                    :label="i.productName"
                    :value="i.sn"
                >
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="选择卡片：" prop="cardsLength">
              <el-button @click="add(key)">选择</el-button>
              <el-input style="width: 300px;display: none" disabled v-model="item.cardsLength"></el-input>
            </el-form-item>
            <div></div>
            <template v-for="(card,cardKey) in item.cardInfo">
              <el-form ref="cardsConf" :model="card" label-width="150px" :rules="cardsRules">
                <el-form-item label="卡片名称：" prop="cardName">
                  <el-input style="width: 300px" :disabled="!newAct" readonly v-model="card.cardName"></el-input>
                </el-form-item>
                <div style="overflow: auto;height: 60px">
                  <div style="float: left">
                    <el-form-item label="投放数量：" prop="totalNum">
                      <el-input-number v-model="card.totalNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>个
                      <span v-if="!newAct">
                        <span style="margin-right: 20px"></span>
                        剩余{{ card.totalNum - (card.outNum?card.outNum:0) }}个
                      </span>
                    </el-form-item>
                  </div>
                  <div style="float: left">
                    <el-form-item label="中奖概率：" prop="prizePert">
                      <el-input-number v-model="card.prizePert" :disabled="!newAct" :precision="1" :step="0.1" :min="0" controls-position="right"></el-input-number>%
                    </el-form-item>
                  </div>
                  <span v-if="!newAct">
                    <span style="margin-right: 20px"></span>
                    <el-button type="primary" @click="addCardRepertory(card)">增库</el-button>
                  </span>
                </div>
              </el-form>
            </template>

          </el-form>
          <el-button size="mini" type="danger" style="margin-left: 50px" @click="deleteAward('snConf',key)" v-if="key>0 && newAct">删除规格</el-button>
        </template>
      </el-card>
      <div style="height: 30px"></div>

      <!--奖池设置-->
      <el-card :body-style="{ padding: '20px' }" v-loading="loading">
        <div slot="header" class="clearfix">
          <span>奖池设置：</span>
        </div>
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>红包：</span>
          </div>
          <div style="margin-bottom: 20px">选择红包:<el-button size="" style="margin-left: 20px" :disabled="!newAct"  @click="getList(3)">选择</el-button></div>
          <el-form ref="hbConfRef" :inline="true" label-width="100px" v-for="(item,index) in hb" :key="index" :model="item"  :rules="confRules">
            <el-form-item  label='名称：' prop="redpackValue">
              面额 <el-input-number v-model="item.redpackValue" :disabled="!newAct" :precision="2" :min="0" controls-position="right"></el-input-number>元
            </el-form-item>
            <el-form-item  label='投放数量：' prop="totalNum">
               <el-input-number v-model="item.totalNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>个
            </el-form-item>
            <span v-if="!newAct">
               <span style="margin-right: 20px"></span>
                剩余{{ item.totalNum - item.outNum }}个
              </span>
            <span style="margin-right: 20px"></span>
            总金额:{{ parseFloat((item.redpackValue*item.totalNum).toPrecision(12)) }}元
            <span style="margin-right: 20px"></span>
            <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type='primary' @click="addRepertory(item)">增库</el-button>
              </span>
            <span style="margin-right: 20px"></span>
            <el-button v-if="newAct" type='danger' @click="deleteAward('hb',index)">删除</el-button>
          </el-form>
        </el-card>
        <div style="height: 30px"></div>
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>荷石币：</span>
          </div>
          <div style="margin-bottom: 20px">选择荷石币:<el-button style="margin-left: 20px" :disabled="!newAct"  @click="getList(6)">选择</el-button></div>
          <el-form ref="hsbConfRef" :inline="true" label-width="100px" v-for="(item,index) in hsb" :key="index" :model="item"  :rules="confRules">
            <el-form-item label='名称：' prop="scoreValue">
              面额 <el-input-number v-model="item.scoreValue" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>荷石币
            </el-form-item>
            <el-form-item label="投放数量：" prop="totalNum">
              <el-input-number v-model="item.totalNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>个
            </el-form-item>
            <span v-if="!newAct">
               <span style="margin-right: 20px"></span>
              剩余{{ item.totalNum - item.outNum }}个
              </span>
            <span style="margin-right: 20px"></span>
            总荷石币:{{ item.scoreValue*item.totalNum }}
            <span style="margin-right: 20px"></span>
            <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="addRepertory(item)">增库</el-button>
              </span>
            <span style="margin-right: 20px"></span>
            <el-button v-if="newAct" type='danger' @click="deleteAward('hsb',index)">删除</el-button>
          </el-form>
        </el-card>
        <div style="height: 30px"></div>
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>折扣卡：</span>
          </div>
          <div style="margin-bottom: 20px">选择折扣卡:<el-button style="margin-left: 20px" :disabled="!newAct"  @click="getList(7)">选择</el-button></div>
          <el-form ref="zkkConfRef" :inline="true" label-width="100px" v-for="(item,index) in zkk" :key="index" :model="item"  :rules="confRules">
            <el-form-item label='名称：' prop="cardValue">
              <el-input-number v-model="item.cardValue" :disabled="!newAct" :step="0.01" :precision="2" :min="0" :max="1" controls-position="right"></el-input-number>折扣卡
            </el-form-item>
            <el-form-item label="投放数量：" prop="totalNum">
              <el-input-number v-model="item.totalNum" :disabled="!newAct" :precision="0" :min="0" controls-position="right"></el-input-number>个
            </el-form-item>
            <span v-if="!newAct">
               <span style="margin-right: 20px"></span>
              剩余{{ item.totalNum - item.outNum }}个
              </span>
            <span style="margin-right: 20px"></span>
            <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="addRepertory(item)">增库</el-button>
              </span>
            <span style="margin-right: 20px"></span>
            <el-button v-if="newAct" type='danger' @click="deleteAward('zkk',index)">删除</el-button>
          </el-form>
        </el-card>
        <div style="height: 30px"></div>
        <el-card :body-style="{ padding: '20px' }">
          <div slot="header" class="clearfix">
            <span>翻倍卡：</span>
          </div>
          <div style="margin-bottom: 20px">选择翻倍卡:<el-button style="margin-left: 20px" :disabled="!newAct" @click="getList(8)">选择</el-button></div>
          <el-form ref="fbkConfRef" :inline="true" label-width="100px" v-for="(item,index) in fbk" :key="index" :model="item"  :rules="confRules">
            <el-form-item label='名称：' prop="cardValue">
              <el-input-number v-model="item.cardValue" :disabled="!newAct"  :step="0.01" :precision="2" :min="1"  controls-position="right"></el-input-number>翻倍卡
            </el-form-item>
            <el-form-item label="投放数量：" prop="totalNum">
              <el-input-number v-model="item.totalNum" :disabled="!newAct"  :precision="0" :min="0" controls-position="right"></el-input-number>个
            </el-form-item>
            <span v-if="!newAct">
               <span style="margin-right: 20px"></span>
              剩余{{ item.totalNum - item.outNum }}个
              </span>
            <span style="margin-right: 20px"></span>
            <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="addRepertory(item)">增库</el-button>
              </span>
            <span style="margin-right: 20px"></span>
            <el-button v-if="newAct" type='danger' @click="deleteAward('fbk',index)">删除</el-button>
          </el-form>
        </el-card>
        <div style="height: 30px"></div>
      </el-card>
    </div>


    <div v-show="newAct"  style="height: 40px;text-align: center;margin-top: 30px">
      <el-button type="primary" @click="confirmSubmit">保存</el-button>
    </div>

    <!-- 通用 -->
    <el-dialog :title="title" :visible.sync="listVisible" width="800px">
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
            <el-button size="mini" @click="selectPrize(scope.row,title)">选择</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-col :span="24">
        <el-pagination background @size-change="handSizeChange" @current-change="handCurrentChange" :current-page="params.pageNo" :page-size="params.pageSize" layout="total, prev, pager, next, jumper" :total="listTotal">
        </el-pagination>
      </el-col>
      <div style="clear:both"></div>
    </el-dialog>

    <!--    选择卡片-->
    <el-dialog title="选择卡片" :visible.sync="cardListVisible" width="800px" @close="toggleSelection">
      <el-table ref="multipleTable" :data="cardList" border :stripe="true" style="width: 100%" @selection-change="handleSelectionChange">
        <el-table-column
            type="selection"
            width="55">
        </el-table-column>
        <el-table-column prop="cardName" label="卡片名称" align="center">
        </el-table-column>
        <el-table-column label="卡片图片" align="center">
          <template slot-scope="scope">
            <img :src="scope.row.cardImg" alt="" style="height: 60px">
          </template>
        </el-table-column>
        <el-table-column prop="cardDesc" label="卡片介绍" align="center">
        </el-table-column>
      </el-table>
      <div style="height: 40px;text-align: center;margin-top: 30px">
        <el-button type="primary" @click="handleSelectCards">保存</el-button>
        <el-button type="" @click="toggleSelection">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "PicturePuzzleMgr",
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
      var validateDayAwardNum = (rule, value, callback) => {
        if (!this.config.dayAwardNum) {
          if(this.config.dayAwardNum == 0){
            callback(new Error('每天可抽奖次数不能为0'))
          }else {
            callback(new Error('请输入每天可抽奖次数'))
          }
        } else {
          callback()
        }
      }
      var validateWeekOutNum = (rule, value, callback) => {
        if (!this.config.weekOutNum) {
          if(this.config.weekOutNum == 0){
            callback(new Error('每周可转赠次数不能为0'))
          }else {
            callback(new Error('请输入每周可转赠次数'))
          }
        } else {
          callback()
        }
      }
      var validateWeekInNum = (rule, value, callback) => {
        if (!this.config.weekInNum) {
          if(this.config.weekInNum == 0){
            callback(new Error('每周可接受次数不能为0'))
          }else {
            callback(new Error('请输入每周可接受次数'))
          }
        } else {
          callback()
        }
      }
      var validateRedpackValue = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入红包金额'))
        } else {
          callback()
        }
      }
      var validateScoreValue = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入荷石币数量'))
        } else {
          callback()
        }
      }
      var validateAwardPrice = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入折扣卡数量'))
        } else {
          callback()
        }
      }
      var validateTotalNum = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入投放数量'))
        } else {
          callback()
        }
      }
      var validateCardsLength = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请选择卡片'))
        } else {
          callback()
        }
      }
      var validatePrizeProductList = (rule, value, callback) => {
        if (value.length<1) {
          callback(new Error('请选择规格'))
        } else {
          callback()
        }
      }
      var validateTotalNumb = (rule, value, callback) => {
        if (value+''== '0') {
          callback(new Error('请输入投放数量'))
        } else {
          callback()
        }
      }
      var validateProbability = (rule, value, callback) => {
        if (!value) {
          callback(new Error('请输入中奖概率'))
        } else {
          callback()
        }
      }

      return {
        loading:false,
        uploadURL: '/api/wiseqr/attach/commonAliUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },
        id:'',
        actCode:'',
        newAct: true,
        brandList:[],
        brandListReadOnly:[],
        act:{},
        config:{
          id:'',
          stime: "",
          etime: "",
          dayAwardNum: "",
          weekOutNum: "",
          weekInNum:"",

          cardImg1: "",
          cardName1: "",
          cardDesc1: "",
          card1Id:"",

          cardImg2: "",
          cardName2: "",
          cardDesc2: "",
          card2Id:"",

          cardImg3: "",
          cardName3: "",
          cardDesc3: "",
          card3Id:"",

          cardImg4: "",
          cardName4: "",
          cardDesc4: "",
          card4Id:""
        },
        confRules: {
          date: [{ required: true, validator: validateDate, trigger: 'change' }],
          dayAwardNum: [{ required: true, validator: validateDayAwardNum, trigger: 'blur' }],
          weekOutNum: [{ required: true, validator: validateWeekOutNum, trigger: 'blur' }],
          weekInNum: [{ required: true, validator: validateWeekInNum, trigger: 'blur' }],

          cardImg1: [{ required: true, message: '请上传卡片图片', trigger: 'change' }],
          cardName1: [{ required: true, message: '请输入卡片名称', trigger: 'blur' }],
          cardDesc1: [{ required: true, message: '请输入卡片介绍', trigger: 'blur' }],

          cardImg2: [{ required: true, message: '请上传卡片图片', trigger: 'change' }],
          cardName2: [{ required: true, message: '请输入卡片名称', trigger: 'blur' }],
          cardDesc2: [{ required: true, message: '请输入卡片介绍', trigger: 'blur' }],

          cardImg3: [{ required: true, message: '请上传卡片图片', trigger: 'change' }],
          cardName3: [{ required: true, message: '请输入卡片名称', trigger: 'blur' }],
          cardDesc3: [{ required: true, message: '请输入卡片介绍', trigger: 'blur' }],

          cardImg4: [{ required: true, message: '请上传卡片图片', trigger: 'change' }],
          cardName4: [{ required: true, message: '请输入卡片名称', trigger: 'blur' }],
          cardDesc4: [{ required: true, message: '请输入卡片介绍', trigger: 'blur' }],

          redpackValue:[{ required: true, validator: validateRedpackValue, trigger: 'blur' }],
          scoreValue:[{ required: true, validator: validateScoreValue, trigger: 'blur' }],
          cardValue:[{ required: true, validator: validateAwardPrice, trigger: 'blur' }],
          totalNum:[{ required: true, validator: validateTotalNum, trigger: 'blur' }],

        },

        snConf:[
          {
            snInfo:[],
            cardInfo:[],
            cardsLength:0
          }
        ],
        snConfIndex:'',
        snRules:{
          snInfo: [{ required: true, validator: validatePrizeProductList,trigger:'change' }],
          cardsLength: [{ required: true, validator: validateCardsLength, trigger: 'change' }],
        },
        cardsRules:{
          cardName: [{ required: true, message: '请选择卡片', trigger: 'change' }],
          totalNum: [{ required: true, validator: validateTotalNumb, trigger: 'change' }],
          prizePert: [{ required: true, validator: validateProbability, trigger: 'change' }],
        },

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
        pintuConfig:'',
        pintuCardBases:[],
        pintuGroupSettings:[],
        pintuPrizes:[],
        hb:[],
        hsb:[],
        zkk:[],
        fbk:[],
        defaultAwae: { // 给个默认 好复制
          awdCode: '',
          awdPicture: '',
          awdName: '',
          awdType: 1, // 奖项类型
          scoreValue: null, // 投放积分面额 如果非积分奖，赠送积分时，代表赠送的积分面额
          redpackValue: '', // 投放红包面额
          cardValue:'',
          totalNum: '', // totalNum
          outNum: '',
          poolId: 1, // 奖项物料池主键id
        },

        cardListVisible:false,
        cardList:[],
        multipleSelection:''
      }
    },
    created() {
      this.getDetail()
      this.getBrandList()
    },
    mounted() {
    },
    computed: {
      residue: {
        get: function() {
          return this.awae.totalNum - this.awae.outNum
        },
        set: function(newValue) {
          // console.log(newValue)
        }
      },
      totalRed: {
        get: function() {
          return this.awae.redpackValue * this.awae.totalNum
        },
        set: function(newValue) {
          // console.log(newValue)
        }
      }
    },
    methods:{
      add(index){
        this.snConfIndex = index
        let rows = []
        this.snConf[this.snConfIndex].cardInfo.forEach(item => {
          this.cardList.forEach((card,index) => {
            if(card.id == item.cardId){
              rows.push(card)
            }
          })
        })
        this.cardListVisible = true
        this.$nextTick(()=>{
          rows.forEach(row => {
            this.$refs.multipleTable.toggleRowSelection(row);
          });
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val;
        // console.log(val)
      },
      toggleSelection(){
        this.$refs.multipleTable.clearSelection();
        this.cardListVisible = false
      },
      handleSelectCards(){
        if(!this.multipleSelection) {
          this.multipleSelection = []
        }
        let cardIdArr = this.snConf[this.snConfIndex].cardInfo.map(item=>{
          return item.cardId
        })
        let cards = []
        console.log(cardIdArr)
        this.multipleSelection.forEach(item => {
          if(cardIdArr.includes(item.id)){
            let cardObj = this.snConf[this.snConfIndex].cardInfo.find( card =>{
              return item.id == card.cardId
            })
            cards.push(cardObj)
          }else {
            cards.push({
              actId:item.actId,
              cardId:item.id,
              totalNum:'',
              cardName:item.cardName,
              outNum:'',
              prizePert:''
            })
          }
        })
        // this.snConf[this.snConfIndex].cardInfo = this.multipleSelection.map(item => {
        //   return {
        //     actId:item.actId,
        //     cardId:item.id,
        //     totalNum:'',
        //     cardName:item.cardName,
        //     outNum:'',
        //     prizePert:''
        //   }
        // })
        this.snConf[this.snConfIndex].cardInfo = [...cards]
        this.snConf[this.snConfIndex].cardsLength = this.multipleSelection.length
        this.toggleSelection()
      },
      handleRemoveTag(value){
        let snGroup = []
        this.snConf.forEach(k => {
          k.snInfo.map(j => {
            snGroup.push(j)
          })
        })
        console.log(snGroup)
        this.brandList = this.brandListReadOnly.filter(i => {
          return !snGroup.includes(i.sn)
        })
      },
      handleVisbleChange(flag){
        if(!flag){
          let snGroup = []
          this.snConf.forEach(k => {
            k.snInfo.map(j => {
              snGroup.push(j)
            })
          })
          this.brandList = this.brandListReadOnly.filter(i => {
            return !snGroup.includes(i.sn)
          })
        }
      },
      uploadImgUrlSuccess(resule,index) {
        if (resule.ret === '200000')
          console.log(`cardImg${index}`)
          return (this.config[`cardImg${index}`] = resule.data.accessUrl)
        this.$message.error(resule.message)
      },

      getBrandList() {
        // 关联品牌
        this.$request.post(
          '/api/wiseqr/prod/list', {
            brandCodeArr: ["BRAND-7D41JAAAAA"],
            pageSize: '-1'
          },
          true,
          res => {
            if (res.ret === '200000') {
              this.brandList = res.data.list.map(item=>{
                return {
                  sn:item.sn,
                  productName:item.allName
                }
              })
              this.brandListReadOnly = res.data.list.map(item=>{
                return {
                  sn:item.sn,
                  productName:item.allName
                }
              })
              return
            }
            this.$message.error(res.message)
          }
        )
      },
      getCardList() {
        // 关联品牌
        this.$request.get('/hbact/hyr/ptsaas/cardBase/show', {actId:this.config.id}, res => {
          if (res.code === '200') {
            this.cardList = res.data
            return
          }
          this.$message.error(res.message)
        })
      },
      getDetail() {
        this.loading = true
        this.$request.post('/hbact/hyr/ptsaas/actInfo/show', { id: this.id }, true, res => {
          this.loading = false
          if (res.code == '200') {
            if (!res.data.canModify){
              this.newAct = false
            }
            this.pintuConfig = res.data.pintuConfig

            if(res.data.pintuConfig){
              this.config.stime = res.data.pintuConfig.stime
              this.config.etime = res.data.pintuConfig.etime
              this.config.dayAwardNum = res.data.pintuConfig.dayAwardNum
              this.config.weekOutNum = res.data.pintuConfig.weekOutNum
              this.config.weekInNum = res.data.pintuConfig.weekInNum
              if(res.data.pintuConfig.id){
                this.config.id = res.data.pintuConfig.id
                this.getCardList()
              }
            }
            this.pintuCardBases = res.data.pintuCardBases
            if(res.data.pintuCardBases && res.data.pintuCardBases.length == 4){
              this.config.cardImg1 = res.data.pintuCardBases[0].cardImg
              this.config.cardName1 = res.data.pintuCardBases[0].cardName
              this.config.cardDesc1 = res.data.pintuCardBases[0].cardDesc
              this.config.card1Id = res.data.pintuCardBases[0].id

              this.config.cardImg2 = res.data.pintuCardBases[1].cardImg
              this.config.cardName2 = res.data.pintuCardBases[1].cardName
              this.config.cardDesc2 = res.data.pintuCardBases[1].cardDesc
              this.config.card2Id = res.data.pintuCardBases[1].id

              this.config.cardImg3 = res.data.pintuCardBases[2].cardImg
              this.config.cardName3 = res.data.pintuCardBases[2].cardName
              this.config.cardDesc3 = res.data.pintuCardBases[2].cardDesc
              this.config.card3Id = res.data.pintuCardBases[2].id

              this.config.cardImg4 = res.data.pintuCardBases[3].cardImg
              this.config.cardName4 = res.data.pintuCardBases[3].cardName
              this.config.cardDesc4 = res.data.pintuCardBases[3].cardDesc
              this.config.card4Id = res.data.pintuCardBases[3].id
            }
            this.pintuGroupSettings = res.data.pintuGroupSettings
            if(res.data.pintuPrizes && res.data.pintuPrizes.length) {
              this.snConf = res.data.pintuGroupSettings
              this.snConf.forEach((item,index) => {
                this.snConf[index].cardsLength = item.cardInfo.length

              })
            }
            this.pintuPrizes = res.data.pintuPrizes;
            if(!(res.data.pintuPrizes && res.data.pintuPrizes.length)) return
            let awardArr = this.pintuPrizes
            this.hb = []
            this.hsb = []
            this.zkk = []
            this.fbk = []
            awardArr.forEach((e,i)=>{
              if(e.awdType == 3){
                this.hb.push(e)
              }
              else if(e.awdType == 6){
                this.hsb.push(e)
              }
              else if(e.awdType == 7){
                this.zkk.push(e)
              }
              else if(e.awdType == 8){
                this.fbk.push(e)
              }

            })
            return
          }
          this.$message.error(res.msg)
        })
      },
      getList(type) {
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
      handleBaseSave(){
        this.$refs.actSetConfRef.validate(valid => {
          if(valid){
            let params = {
              "pintuConfig": {
                "stime": this.config.stime,
                "etime": this.config.etime,
                "weekOutNum": this.config.weekOutNum,
                "weekInNum": this.config.weekInNum,
                "dayAwardNum": this.config.dayAwardNum
              },
              "pintuCardBases": [
                {
                  "cardDesc": this.config.cardDesc1,
                  "cardImg": this.config.cardImg1,
                  "cardName": this.config.cardName1
                },
                {
                  "cardDesc": this.config.cardDesc2,
                  "cardImg": this.config.cardImg2,
                  "cardName": this.config.cardName2
                },
                {
                  "cardDesc": this.config.cardDesc3,
                  "cardImg": this.config.cardImg3,
                  "cardName": this.config.cardName3
                },
                {
                  "cardDesc": this.config.cardDesc4,
                  "cardImg": this.config.cardImg4,
                  "cardName": this.config.cardName4
                },
              ]
            }
            if(this.config.id){
              params.pintuConfig.id = this.config.id
              params.pintuCardBases.forEach((item,index) => {
                item.actId = this.config.id
                item.id = this.config[`card${index+1}Id`]
              })
            }
            console.log(params)
            this.$request.post('/hbact/hyr/ptsaas/actInfo/baseSave', params, true, res => {
              if (res.code === '200') {
                this.$message.success('保存成功')
                this.getDetail()
              } else {
                this.$message.error(res.msg)
              }
            })

          }
        })
      },
      addRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入大于0的整数'
        }).then(({ value }) => {
          console.log(value)
          if (value == 0) return this.$message.error('数字必须大于0')
          this.$request.post('/hbact/hyr/ptsaas/actInfo/prizeStockAdd', {
            id: item.id ,
            addNum: value
          }, true, res => {
            if (res.code === '200') {
              this.$message.success('增库成功')
              this.getDetail()
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
      addCardRepertory(item) {
        this.$prompt('请输入数字', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入大于0的整数'
        }).then(({ value }) => {
          console.log(value)
          if (value == 0) return this.$message.error('数字必须大于0')
          this.$request.post('/hbact/hyr/ptsaas/actInfo/cardStockAdd', {
            id: item.id ,
            addNum: value
          }, true, res => {
            if (res.code === '200') {
              this.$message.success('增库成功')
              this.getDetail()
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
      confirmSubmit() {
        let awardConfig = true
        if(this.$refs.hbConfRef){
          this.$refs.hbConfRef.forEach(item => {
            item.validate(valid => {
              if(valid){

              }else {
                awardConfig = false
              }
            })
          })
        }
        if(this.$refs.hsbConfRef){
          this.$refs.hsbConfRef.forEach(item => {
            item.validate(valid => {
              if(valid){

              }else {
                awardConfig = false
              }
            })
          })
        }
        if(this.$refs.zkkConfRef){
          this.$refs.zkkConfRef.forEach(item => {
            item.validate(valid => {
              if(valid){

              }else {
                awardConfig = false
              }
            })
          })
        }
        if(this.$refs.fbkConfRef){
          this.$refs.fbkConfRef.forEach(item => {
            item.validate(valid => {
              if(valid){

              }else {
                awardConfig = false
              }
            })
          })
        }
        this.$refs.awardConf.forEach(item => {
          item.validate(valid => {
            if(valid){

            }else {
              awardConfig = false
            }
          })
        })
        this.$refs.cardsConf.forEach(item => {
          item.validate(valid => {
            if(valid){

            }else {
              awardConfig = false
            }
          })
        })
       if(awardConfig){
         let arr = [...this.hb,...this.hsb,...this.zkk,...this.fbk]
         if(arr.length == 0){
           this.$message.error('请配置奖池')
           return
         }
         arr.forEach((i,k) => {
           arr[k].actId = this.config.id
         })
         let params = {
           actId: this.config.id,
           pintuGroupSettings:this.snConf.map(item => {
             return {
               snInfo: item.snInfo,
               cardInfo: item.cardInfo,
             }
           }),
           pintuPrizes:arr
         }
         console.log(params)
         this.$request.post('/hbact/hyr/ptsaas/actInfo/cardAwardSave', params, true, res => {
           if (res.code === '200') {
             this.$message.success('保存成功')
             this.getDetail()
             this.getBrandList()
           } else {
             this.$message.error(res.msg)
           }
         })
       }
      },
      // 选择奖品
      selectPrize(obj,title) {
        let newAwae = JSON.parse(JSON.stringify(this.defaultAwae))
        newAwae.awdPicture = obj.pic
        newAwae.awdName = obj.name
        newAwae.poolId = obj.id
        newAwae.awdCode = obj.id
        if(title == '选择红包'){
          newAwae.awdType = 3
          this.hb.push(newAwae)
        }
        if(title == '选择荷石币'){
          newAwae.awdType = 6
          this.hsb.push(newAwae)
        }
        if(title == '选择折扣卡'){
          newAwae.awdType = 7
          this.zkk.push(newAwae)
        }
        if(title == '选择翻倍卡'){
          newAwae.awdType = 8
          this.fbk.push(newAwae)
        }
        this.listVisible = false
      },
      deleteAward(list,index){
        this[list].splice(index,1)
      },
      handSizeChange(newSize) {
        this.params.pageSize = newSize
        this.getList()
      },
      handCurrentChange(newSize) {
        this.params.pageNo = newSize
        this.getList()
      },
      addItem(){
        const snItem = {
          snInfo:[],
          cardInfo:[],
          cardsLength:0
        }
        this.snConf.push(snItem)
      },
    }

  }
</script>
<style>
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
    width: 110px;
    height: 110px;
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
