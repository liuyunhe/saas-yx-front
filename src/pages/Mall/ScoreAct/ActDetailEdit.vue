<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 新建活动模板
  -->
  <div class="addActTamConf-container">
    <el-card>
      <el-tabs v-model="activeName">
        <el-tab-pane label="首页" name="home" class="clearfix">
          <div class="ipone">
            <div class="header">
              <p>{{addActParams.name}}</p>
            </div>
            <div class="content phone">
              <div class="bg bg-home":style="{backgroundImage:'url('+configItem.bgImgUrl+')'}"@click="showEditConIndex = 1"></div>
              <div class="top"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" @click="showEditConIndex = 2"></div>
              <div class="game-con">
                <img :src="configItem.gameBg" alt=""@click="showEditConIndex = 3" />
              </div>
              <div class="game-btn">
                <img :src="configItem.gameBtn" alt=""@click="showEditConIndex = 4" />
              </div>
              <div class="game-rule">
              	<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/rule.png" alt="" />
              </div>
              
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
          	<div class="first-set">
          		<el-form :model="addActParams" :rules="addActRules" ref="ruleForm" label-width="100px" label-position="top">
              <el-form-item label="页面名称" prop="name">
                <el-input v-model="configItem.title" placeholder="请输入页面名称"></el-input>
              </el-form-item>
              <el-form-item label="页面说明">
                <el-input type="textarea" :rows="3" v-model="configItem.description" placeholder="请输入页面描述" maxlength="50" resize="none"></el-input>
              </el-form-item>
            </el-form>
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-bg-img" v-if="showEditConIndex == 1">
                  <p class="img-title">背景图片:</p>
                  <div class="img-con"><img :src="configItem.bgImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upBgImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-top-img" v-if="showEditConIndex == 2">
                  <p class="img-title">活动标题:</p>
                  <div class="img-con"><img :src="configItem.headerImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upTopImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 3">
                  <div>
                    <p class="img-title">底盘：</p>
                    <div class="img-con"><img :src="configItem.gameBg" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upGameImgSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>
                <div class="edit-game-img" v-if="showEditConIndex == 4">
                  <div>
                    <p class="img-title">初始状态：</p>
                    <div class="img-con"><img :src="configItem.gameBtn" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upGameBtnSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                    
                  </div>
                  <div>
                  	<p class="img-title">按下效果：</p>
                    <div class="img-con"><img :src="configItem.gameBtnActive" alt=""></div>
                    <div class="btn-con">
                      <el-upload :action="uploadURL" :headers="headerObj" :on-success="upGameBtnActiveSuccess" :show-file-list="false">
                        <el-button size="small" type="primary">更换图片</el-button>
                      </el-upload>
                    </div>
                  </div>
                </div>

                <p class="tips" v-if="showEditConIndex == 1">* 图片建议尺寸为 750*890px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 2">* 图片建议尺寸为 424*225px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 3">* 图片建议尺寸为 748*616px格式为jpg\bmp\png\gif</p>
                <p class="tips" v-if="showEditConIndex == 4">* 图片建议尺寸为 448*125px格式为jpg\bmp\png\gif</p>
              </div>

            </el-card>

          	</div>
          </div>
        	
        </el-tab-pane>

        <el-tab-pane label="中奖页面" name="winning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img :src="configItem.bgImgUrl"></div>
              <div class="winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <div class="price-alert">
                  	<img class="pic" :src="configItem.drawImgUrl" alt="">
                  	<p>恭喜您获得双肩包</p>
                  	<div class="price-left":style="{backgroundImage:'url('+configItem.drawBtnLeftUrl+')'}">立即领取</div>
                  	<div class="price-right":style="{backgroundImage:'url('+configItem.drawBtnRightUrl+')'}">再玩一次</div>
                  </div>
                </div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">中奖背景图:</p>
                  <div class="img-con"><img :src="configItem.drawImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">左边按钮:</p>
                  <div class="img-con"><img :src="configItem.drawBtnLeftUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningBtnLeftSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-winning-img">
                  <p class="img-title">右边按钮:</p>
                  <div class="img-con"><img :src="configItem.drawBtnRightUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upWinningBtnRightSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
        <el-tab-pane label="未中奖页面" name="notWinning" class="clearfix">
          <div class="ipone">
            <div class="header"></div>
            <div class="content">
              <div class="bg"><img :src="configItem.bgImgUrl"></div>
              <div class="not-winning">
                <div class="prize-con">
                  <div class="close">X</div>
                  <div class="price-alert not-price-alert">
                  	<img class="pic" :src="configItem.cryImgUrl" alt="">
                  	<p class='cry-text'>大奖与您插肩而过
                  		<br />
                  		请再接再励
                  	</p>
                  	<div class="price-right":style="{backgroundImage:'url('+configItem.cryBtnRightUrl+')'}">再玩一次</div>
                  </div>
                  
          
                </div>
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
            <el-card class="edit-img" shadow="hover">
              <div slot="header" class="clearfix">
                <span>编辑图片</span>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">图片:</p>
                  <div class="img-con"><img :src="configItem.cryImgUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningImgSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
              <div class="edit-con">
                <div class="edit-notWinning-img">
                  <p class="img-title">按钮:</p>
                  <div class="img-con"><img :src="configItem.cryBtnRightUrl" alt=""></div>
                  <div class="btn-con">
                    <el-upload :action="uploadURL" :headers="headerObj" :on-success="upNotWinningBtnRightSuccess" :show-file-list="false">
                      <el-button size="small" type="primary">更换图片</el-button>
                    </el-upload>
                  </div>
                </div>
                <p class="tips">* 图片建议尺寸为 330*70px格式为jpg\bmp\png\gif</p>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
    
        <el-tab-pane label="活动设置" name="set" class="clearfix">
          <div class="ipone">
            <div class="header">
              <p>{{addActParams.name}}</p>
            </div>
            <div class="content phone">
              <div class="bg bg-home":style="{backgroundImage:'url('+configItem.bgImgUrl+')'}"></div>
              <div class="top"><img :src="configItem.headerImgUrl" alt="" title="点击编辑" ></div>
              <div class="game-con">
                <img :src="configItem.gameBg" alt="" />
              </div>
              <div class="game-btn">
                <img :src="configItem.gameBtn" alt="" />
              </div>
              <div class="game-rule">
              	<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/rule.png" alt="" />
              </div>
              <div class="rule-bg">
              	{{addActParams.gameDesc}}
              </div>
            </div>
            <div class="footer"></div>
          </div>
          <div class="edit-box">
           	<div class="second-set">
        		<div class="title">基础设置</div>
        		<div class="base-set">
		            <span class='require-icon'>*</span>活动名称： <el-input v-model="addActParams.gameName" placeholder="请输入活动名称"size='small'class='act-name'></el-input>		         
        			<br /><br /><br />
        			<span class='require-icon'>*</span>活动图片：
        			<div class="act-img">
        				<el-upload :action="uploadURL" :headers="headerObj" :on-success="upBanner" :show-file-list="false">
        					<div class="addIcon">+</div>
        					<img :src="addActParams.banner" alt=""class='bannerUrl'v-if="addActParams.banner!=''" />
                    	</el-upload>
        			</div>
        			<br /><br /><br />
        			消耗积分：<el-input v-model="addActParams.score" placeholder="请输入需要消耗的积分"size='small'class='act-score'></el-input>积分	
        			<br /><span class='space'></span><span>（用户参与活动每次需要消耗的积分数）</span>
        			<br /><br /><br />
        			<span class='require-icon'>*</span>参与次数： 每人每天可参与<el-input v-model="addActParams.times" size='small'class='act-num'></el-input>次
        			<br /><br /><br />
        			<span class='require-icon'>*</span>活动说明： <el-input v-model="addActParams.gameDesc"type="textarea"resize="none" rows="3" placeholder="请输入活动说明"size='small'class='act-dec'></el-input>		         
        			<div class="title award-title">奖项设置</div>
        			<br /><br />
        			<span class='require-icon'>*</span>选择奖品： <el-button type="info" plain class='select-award'@click="selectAward">+</el-button>
        			<el-dialog
					  title="选择奖品"
					  :visible.sync="dialogVisible"
					  width="70%">
					  <div class="search-con">
					  	礼品名称：&nbsp;&nbsp;
					  	<el-input v-model="aName" size='small'class='search-name'placeholder='请输入奖品名称'></el-input>
						&nbsp;&nbsp;&nbsp;&nbsp;礼品类型：
						<el-select v-model="aTypeDe" filterable placeholder="请选择" size='small'>
							<el-option v-for="item in aTypeDeList" :key="item.code" :label="item.name" :value="item.code">
							</el-option>
						</el-select>
						<br /><br />
						<el-button type="primary"@click='searchAward' >查询</el-button>
						<br />
						<br />
						<el-table :data="tableData"v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
							<el-table-column type="selection" >
							</el-table-column>
							<el-table-column prop="productId" label="礼品ID" >
							</el-table-column>
							<el-table-column prop="productName" label="礼品名称" >
							</el-table-column>
							<el-table-column prop="image" label="礼品图片" >
								<template   slot-scope="scope">            
			                    	<img :src="scope.row.image"  min-width="70" height="70" />
			                	</template> 
							</el-table-column>
							<el-table-column prop="giftType" label="礼品分类" >
							</el-table-column>
							<el-table-column prop="shopQuantity" label="库存" >
							</el-table-column>
						</el-table>
						<el-pagination layout="total,prev, pager, next,jumper" background :total="total" @current-change="myCallback" :page-size="max" class="pagination-css">
						</el-pagination>
					  </div>
					  <span slot="footer" class="dialog-footer">
					    <el-button @click="dialogVisible = false">取 消</el-button>
					    <el-button type="primary" @click="sureSelect">确 定</el-button>
					  </span>
					</el-dialog>
        			<br /><br />
        			<div>所选礼品：</div>
        			<ul>
        				<li v-for='(item,key) in priceList':key='key'>
        					<div><img :src="item.image" alt="" /></div>
        					<div>{{item.productName}}</div>
        					<div>奖品数量：<input type="number"v-model="item.quantity" :disabled='item.abled':max='item.shopQuantity'min='1'class='award-num' />个
        					</div>
        					<div><span class='require-icon'>*</span>中奖概率：<input type="number"max='100'min='0' v-model="item.probability"class='award-percent'@change='checkAll' />%</div>
        					<div><el-button type="primary"@click='remove(key)'>删除</el-button></div>
        					<div><el-button type="primary"@click='addQuantity(key)'>增库</el-button></div>
        					<el-dialog
					  				title="增加库存"
					  				:visible.sync="addQuantityShow"
					  				width="50%">
					  				增加库存： <el-input type='number'min='0'max='99999' v-model="addQ" placeholder="请输入增加数量"size='small'class='act-name'maxLength='5'></el-input> 件
					  				<br />	
					  				<span slot="footer" class="dialog-footer">
					    				<el-button @click="addQuantityShow = false">取 消</el-button>
					    				<el-button type="primary" @click="sureAdd">确 定</el-button>
					  				</span>
					  				</el-dialog>
        				</li>
        			</ul>
        		</div>
        	</div>
          </div>
        	
        </el-tab-pane>
        <div class="btn">
          
          <el-button size="small" type="primary" @click="saveActTpl">保存</el-button>
        </div>
      </el-tabs>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'home',
      addActParams: {
        cssStyle: '',
        id:'',
        gameId:'',
        gameName:'',
        banner:'',
        gameDesc:'',
        score:'',
        times:''
      },
      addActRules: {
        name: [
          { required: true, message: '请输入页面名称', trigger: 'blur' },
          { max: 15, message: '长度不能超过 15 个字符', trigger: 'blur' }
        ]
      },
      configItem: {
        title: '',
        description: '',
        headerImgUrl:
          'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/tigger-title.png',
        bgImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/tigger-bg.png',
        gameBg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/tigger-pan.png',
        gameBtn:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/tigger-btn.png',
        gameBtnActive:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/tigger-btn.png',
        drawImgUrl:
          'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/hasPrice.png',
        drawBtnLeftUrl:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/hasPrice-left.png',
        drawBtnRightUrl:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/hasPrice-right.png',
        cryImgUrl: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/notPrice.png',
        cryBtnLeftUrl:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/notPrice-left.png',
        cryBtnRightUrl:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/notPrice-right.png'
      },
      
      uploadURL: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      showEditConIndex: 1, // 显示图片编辑器的序号
      priceList:[],
      dialogVisible:false,
      aName:'',
      aList:'',
      aType:'',
      aTypeList:[],
      aTypeDe:'',
      aTypeDeList:[{
      	name:'虚拟',
      	code:1
      },{
      	name:'实物',
      	code:2
      },{
      	name:'红包',
      	code:3
      },{
      	name:'积分',
      	code:4
      }],
      tableData:[],
      selectedPriceList:[],
      loading:false,
      total:10,
      max:3,
      page:1,
      addQuantityShow:false,
      addQ:0,
      awardId:''
    }
  },
  computed: {},
  created() {
  	var id=parseInt(this.$route.query.id);
  	this.addActParams.id=id;
    this.getActDetail()
  },
  methods: {
    getActDetail() {
      if (this.addActParams.id) {
        this.$request.post('/sc/saotx/game/getGameById', { id: this.addActParams.id }, true, res => {
          if (res.code === 200) {
			this.addActParams=res.context;
			this.priceList=res.context.items || [];
			this.priceList.forEach((item)=>{
				item.curId=item.id;
				item.abled=true;
				item.id='';
				
			})
			if(!res.context.cssStyle){
				
			}else {
				this.configItem=JSON.parse(res.context.cssStyle);
			}
          } else {
            this.$message.error(res.message)
          }
        })
      }
    },
    searchAward(){
    	var that=this;
    	this.$request.post('/sc/saotx/mall/product/listActs', {
    		pageNo:that.page,
    		pageSize:that.max,
    		productName:that.aName,
    		giftType:that.aTypeDe
    	}, true, res => {
          if (res.ret === '200000') {
          	this.tableData=res.data.list || [];
          	that.total = res.data.page.count;
          } else {
            this.$message.error(res.message)
          }
        })
    },
    selectAward(){
    	var that=this;
    	this.aName='';
    	this.aTypeDe='';
    	this.dialogVisible = true;
    	this.$request.post('/sc/saotx/mall/product/listActs', {
    		pageNo:that.page,
    		pageSize:that.max,
    		productName:this.aName,
    		giftType:this.aTypeDe
    	}, true, res => {
          if (res.ret === '200000') {
          	this.tableData=res.data.list || [];
          	that.total = res.data.page.count;
          } else {
            this.$message.error(res.message)
          }
        })
    },
    myCallback(data){
    	this.page = data;
			this.selectAward();
    },
    addQuantity(key){
    	this.addQuantityShow=true;
    	this.addQ=0;
    	this.awardId=this.priceList[key].curId;
    },
    sureAdd(){
    	this.$request.post('/sc/saotx/game/addQuality', {
    		id:this.awardId,
    		shopQuantity:parseInt(this.addQ)
    	}, true, res => {
          if (res.code === 200) {
          	this.addQuantityShow=false;
          	this.getActDetail();
          } else {
            this.$message.error(res.msg);
            this.addQuantityShow=false;
          }
        })
    },
	//  选择奖品
    handleSelectionChange(val){
    	this.selectedPriceList=val;
    },
    sureSelect(){
    	let arr=[]
    	this.priceList.forEach((item)=>{
    		arr.push(item.productId)
    	})
    	this.selectedPriceList.forEach((item,index)=>{
    		if(arr.indexOf(item.productId)==-1){
    			this.priceList.push({
    			orgId:item.orgId,
    			gameId:this.addActParams.gameId,
    			gameName:this.addActParams.gameName,
    			productId:item.productId,
    			productName:item.productName,
    			image:item.image,
    			status:this.addActParams.status,
    			probability:'',
    			quantity:'',
    			type:item.giftType,
    			score:item.score,
    			bingo_image:item.image,
    			shopQuantity:item.shopQuantity,
    			curId:1,
    			abled:false
    		})
    			this.dialogVisible = false;
    		}else {
    			this.$message.warning('请不要选择重复的奖品');
    		}
    		
    	})
    	//  	根据hangleSelectionChange选择的list,格式化this.secondSet.priceList
    },
    remove(key){
    	this.priceList.splice(key,1);
    },
    checkAll(){
    	var allPro=0;
    	this.priceList.forEach((item)=>{
    		allPro+=parseInt(item.probability);
    	})
    	if(allPro>100){
    		this.$message.error('总中奖概率不能超过100%');
    		return allPro;
    	}
    },
    // 保存进入下一步
    saveActTpl() {
      if (!this.configItem.title) return this.$message.warning('请输入页面名称')//加判断：活动名称、活动图片、参与次数、活动说明、以及奖品列表
      if(!this.addActParams.gameName) return this.$message.warning('请输入活动名称')
      if(!this.addActParams.banner) return this.$message.warning('请添加活动图片')
      if(!this.addActParams.times) return this.$message.warning('请输入活动次数')
      if(!this.addActParams.gameDesc) return this.$message.warning('请输入活动说明')
      if(this.priceList.length==0) return this.$message.warning('请选择奖品')
      var flag=1;var flag1=1;
      this.priceList.forEach((item)=>{
      	if(!item.quantity) return flag=0
      	if(!item.probability) return flag1=0;
      })
      if(!flag){
      	return this.$message.warning('请选择奖品数量');
      }
      if(!flag1){
      	return this.$message.warning('请选择奖品的中奖概率');
      }
      if(this.checkAll()) return 1;
      this.addActParams.cssStyle = JSON.stringify(this.configItem);
      this.priceList.forEach((item,index)=>{
      	item.score=parseInt(item.score);
      	item.times=parseInt(item.times);
      })
      this.addActParams.items=this.priceList;
      this.$request.post('/sc/saotx/game/saveGame', this.addActParams, true, res => {
        if (res.code == '200') {
          this.$message.success('保存成功!')
          this.getActDetail();
          var that=this;
          setTimeout(()=>{
          	that.$router.push({
          		path:'/mall/score'
          	})
          },1000);
          return
        }
        this.$message.error(res.message)
      })
    },

    // 上传背景
    upBgImgSuccess(resule) {
      console.log(resule)
      if (resule.ret === '200000') return (this.configItem.bgImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传头部标题
    upTopImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.headerImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传游戏图片
    upGameImgSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.gameBg = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upGameBtnSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.gameBtn = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upGameBtnActiveSuccess(resule) {
      if (resule.ret === '200000')
        return (this.configItem.gameBtnActive = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传未中奖图片
    upNotWinningImgSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.cryImgUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传未中奖按钮图片
    upNotWinningBtnRightSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.cryBtnRightUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    // 上传中奖按钮图片
    upWinningBtnLeftSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.drawBtnLeftUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upWinningBtnRightSuccess(resule) {
      if (resule.ret === '200000') return (this.configItem.drawBtnRightUrl = resule.data.accessUrl)
      this.$message.error(resule.message)
    },
    upWinningImgSuccess(){
    	if (resule.ret === '200000') return (this.configItem.drawImgUrl = resule.data.accessUrl)
      	this.$message.error(resule.message)
    },
    
    upBanner(resule) {
    	if (resule.ret === '200000') return (this.addActParams.banner = resule.data.accessUrl)
      	this.$message.error(resule.message)
    },
    }
}
</script>
<style lang="scss" scoped>
.addActTamConf-container {
	position: relative;
}
.act-set {
	position: absolute;
	right:50px;
	top:20px;
	z-index: 3;
}
.search-name {
	width:200px;
}
.second-set {
	.title {
		font-weight: bold;
	}
	.award-title {
		margin-top: 20px;
	}
	.base-set {
		margin-top: 20px;
		.require-icon {
			color:red;
		}
		.act-name {
			width:300px;
		}
		.act-img {
			width:300px;
			height: 100px;
			
			border:1px dashed #ccc;
			display: inline-block;
			vertical-align: top;
			position: relative;
			.addIcon {
				width:300px;
				height: 100px;
				position: absolute;
				left: 0;
				top:0;
				font-size: 30px;
				color:#ccc;
				line-height: 100px;
				text-align: center;
			}
			.bannerUrl {
				width:300px;
				height: 100px;
				object-fit: cover;
				position: absolute;
				left: 0;
				top:0;
			}
		}
		.act-score {
			width:290px;
			text-align: right;
			margin-right: 10px;
		}
		.space {
			display: inline-block;
			width:60px;
		}
		.act-num {
			width:200px;
		}
		.act-dec {
			width:300px;
			vertical-align: top;
		}
		.select-award {
			font-size: 20px;
		}
		ul{
			margin-top: 20px;
			li {
				width:630px;
				height: 60px;
				border:1px solid #CCCCCC;
				overflow: hidden;
				>div {
					float: left;
					height: 100%;
					img {
						width:40px;
						height: 40px;
						margin-top: 8px;
						object-fit: cover;
					}
					&:nth-child(1){
						width:60px;
						text-align: center;
					}
					&:nth-child(2){
						width:150px;
						text-align: center;
						line-height: 60px;
					}
					&:nth-child(3){
						width:140px;
						text-align: center;
						line-height: 60px;
						.award-num {
							width:30px;
							height: 20px;
							margin-right: 5px;
						}
					}
					&:nth-child(4){
						width:150px;
						text-align: center;
						line-height: 60px;
						.award-percent {
							width:35px;
							height: 20px;
							margin-right: 5px;
						}
					}
					&:nth-child(5){
						width:60px;
						text-align: center;
						line-height: 60px;
					}
					&:nth-child(6){
						width:60px;
						text-align: center;
						line-height: 60px;
					}
				}
			}
		}
	}
}
.el-tabs {
  padding: 0 20px;
  .el-tab-pane {
    padding: 30px;
    .ipone {
      float: left;
      width: 299px;
      margin: 0 20px;
      .header {
        position: relative;
        width: 100%;
        height: 66px;
        background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/937@2x.png')
          center no-repeat;
        p {
          position: absolute;
          bottom: 0;
          width: 100%;
          text-align: center;
          color: #fff;
          margin: 0;
        }
      }
      .phone {
      	position: relative;
      }
      .content {
        position: relative;
        width: 100%;
        height: 483px;
        // background-color: red;
        overflow:hidden;
        .bg {
          width: 100%;
          height: 100%;
          transition: all 0.2s;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .bg-home {
        	width:100%;
        	height: 500px;
        	transition: all 0.2s;
        	background-size: 100% 100%;
        	background-repeat:no-repeat;
        	background-position:center;
        	position: absolute;
        	
        	top:0;
        	left: 0;
        	z-index: 2;
        	img {
        		width:100%;
        		height: auto;
        	}
        }
        .top {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 100px;
          z-index: 5;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .game-con {
          position: absolute;
          left: 50%;
          top:150px;
          width:100%;
          height: 170px;
          transform: translateX(-50%);
          z-index: 3;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .game-btn {
        	position: absolute;
        	left: 50%;
        	top:290px;
        	width:160px;
        	height: 30px;
        	transform: translateX(-50%);
        	z-index: 4;
        	img {
            width: 100%;
            height: 100%;
          }
        }
        .game-rule {
        	width:100%;
        	height: 200px;
        	position: absolute;
        	left: 0;
        	top:320px;
        	z-index: 3;
        	img {
        		width:100%;
        		height: 100%;
        	}
        }
        .rule-bg {
        	width: 100%;
        	height: 50px;
        	position: absolute;
        	bottom:0;
        	left: 0;
        	background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/rule-bg.png')no-repeat bottom / 100% auto;
        	z-index: 6;
        	overflow: auto;
        	padding: 3px 10px 3px 10px;
        	color:#fff;
        	font-size: 12px;
        	line-height: 16px;
        	box-sizing: border-box;
        	p {
        		margin: 0;
        		
        	}
        }
        .winning,
        .not-winning {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          .prize-con {
            width: 100%;
            height: 100%;
            color: #fff;
            text-align: center;
            .close {
              position: absolute;
              transform: translate(232px, 56px);
              width: 20px;
              height: 20px;
              line-height: 20px;
              text-align: center;
              border: 1px solid #fff;
              border-radius: 50%;
            }
            .price-alert {
            	width:100%;
            	height: 220px;
            	overflow: hidden;
            	position: absolute;
            	left: 10px;
            	top:80px;
            	.pic {
	              width:100%;
	              height: 100%;
	              object-fit: cover;
	            }
	            .price-left {
	            	width:70px;
	            	height: 30px;
	            	background-position: center;
	            	background-repeat: no-repeat;
	            	background-size: contain;
	            	position: absolute;
	            	left: 60px;
	            	bottom:20px;
	            	line-height: 30px;
	            }
	            .price-right {
	            	width:70px;
	            	height: 30px;
	            	background-position: center;
	            	background-repeat: no-repeat;
	            	background-size: contain;
	            	position: absolute;
	            	right: 70px;
	            	bottom:20px;
	            	line-height: 30px;
	            	color:#666;
	            }
	            p {
	            	text-align: center;
	            	color:#666;
	            	line-height: 34px;
	            	width:100%;
	            	position: absolute;
	            	left: 0;
	            	top:115px;
	            }
	            .cry-text {
	            	top:100px;
	            	line-height: 28px;
	            }
            }
            .not-price-alert {
            	.price-right {
            		width:100px;
            		left: 100px;
            		line-height: 28px;
            	}
            }
            
          }
        }
        .not-winning {
          .prize-con {
            .pic {
              margin-right: 0;
            }
          }
        }
      }
      .footer {
        width: 100%;
        height: 64px;
        background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png')
          center no-repeat;
      }
    }
    .edit-box {
      float: left;
      width: 50%;
      margin: 0 20px;
      .edit-con {
        // 公共样式
        .img-con {
          width: 30%;
          height: 130px;
          line-height: 130px;
          text-align: center;
          border: 1px solid #ccc;
          margin: 0 10px;
        }
        .btn-con {
          position: relative;
          .el-button {
            position: absolute;
            bottom: 0;
          }
        }
        .edit-bg-img {
          display: flex;
          img {
            align-items: center;
            height: 100%;
          }
        }
        .edit-top-img {
          display: flex;
          .img-con {
            width: 40%;
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
          }
        }
        .edit-game-img > div {
          display: flex;
          margin-bottom: 10px;
          .img-con {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
          }
        }
        .edit-winning-img {
          display: flex;
          img {
            width: 100%;
          }
        }
        .edit-notWinning-img {
          display: flex;
          .img-con {
            display: flex;
            justify-content: center;
            align-items: center;
            img {
              width: 100%;
            }
          }
        }
      }
      .tips {
        color: #999;
        margin-top: 10px;
        margin-bottom: 10px;
      }
    }
  }
}
// 只有首页有效果

.el-tabs .el-tab-pane:first-child {
  .bg:hover,
  .top:hover
  .game-con:hover,
  .game-btn:hover
  {
    transform: scale(0.99);
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
  }
  .top:hover {
  	cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
    transform: translateX(-50%) scale(0.99);
  }
  .game-btn:hover {
    transform: translateX(-50%) scale(0.99);
  }
  .game-con:hover {
    cursor: pointer;
    filter: brightness(60%);
    border: 2px dotted #fff;
    box-sizing: border-box;
    transform: translateX(-50%) scale(0.99);
  }
  
}
.btn {
  text-align: center;
  p {
    font-size: 16px;
    margin-bottom: 20px;
  }
  .el-button {
    width: 130px;
    height: 40px;
  }
}
</style>

