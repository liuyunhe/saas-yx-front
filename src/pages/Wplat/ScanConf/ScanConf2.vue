<template>
	<div class="scan-root">
		<div class="add-part">
			<div class="title">扫码落地页配置</div>
			<el-tabs v-model="activeName" @tab-click="tabPartClick">
				<el-tab-pane label="模板设置" name="third">
					<div class="tplInfo">
						<span class='left-name'>
								<span class='require'>*</span>模板名称：
						</span>

						<el-input v-model="addlist.name" placeholder="请输入模板名称" maxlength='15' class='tpl-name' size='small'></el-input>
						<br /><br />
						<span class='left-name'>
								模板说明：
							</span>
						<el-input v-model="addlist.note" placeholder="请输入模板说明" maxlength='20' class='tpl-name' size='small'></el-input>
						<br /><br />
						<span class='left-name'>
							请选择品牌：
							</span>
						<el-select class="filter-item" multiple v-model="selectBrand" placeholder="请选择品牌" size='small'>
							<el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
							</el-option>
						</el-select>
						<br /><br />
						<span class='left-name'>
							请选择规格：
							</span>
						<el-select size='small' class="filter-item" multiple v-model="addlist.snArr" @visible-change='snCallback' placeholder="请选择规格">
							<el-option v-for="item in snList" :key="item.id" :label="item.allName" :value="item.sn">
							</el-option>
						</el-select>
					</div>
				</el-tab-pane>
				<el-tab-pane label="Loading页设置" name="fourth">
					<div class="phone">
						<div class="has loading-show">
							<div class="phone-top"></div>
							<div class="loading-bg">
								<img :src="addlist.conf.loading.bg" alt="" />
							</div>
							<div class="phone-bottom"></div>
						</div>
						<div class="loading-edit">
							<p class='title'>Loading页配置</p>
							<div class='edit-con'>
								<span class='labels'>loading页状态：</span>
						        <el-radio v-model="addlist.conf.loading.flag" :label="1">开启</el-radio>
						  		<el-radio v-model="addlist.conf.loading.flag" :label="0">关闭</el-radio>
							</div>
							<div class='edit-con'>
								<span class='labels'>更换图片：</span>
								<div class="img-div"><img :src="addlist.conf.loading.bg" alt="" /></div>
						        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadLoad">
									<el-button type="primary" v-if='addlist.conf.loading.bg'>更换图片</el-button>
								</el-upload>
								<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
							</div>
							<div class='edit-con'>
								<span class='labels'>加载进度条设置：</span>
								<el-color-picker v-model="addlist.conf.loading.color" class='color-select'></el-color-picker>
							</div>
						</div>
						
					</div>
				</el-tab-pane>
				<el-tab-pane label="扫码落地页面设置" name="first">
					<div class='has clearfix'>
						<div class="phone">
							<div class="phone-top">
								<div class="title">
									<el-popover placement="right" width="400" trigger="click" class='title-click'>
										<div class="title-info">
											<p>标题配置</p>
											<br />
											<div class="detail">
												<div><span class='require'>*</span>页面名称:</div>
												<el-input v-model="addlist.conf.has.title.name" size='small' placeholder="请输入页面名称" maxlength='15'></el-input>
											</div>
											<br />
											<div class="detail">
												<div>页面描述:</div>
												<el-input v-model="addlist.conf.has.title.note" size='small' placeholder="请输入页面描述" maxlength='20'></el-input>
											</div>
											<br />
										</div>
										<el-button slot="reference"></el-button>
									</el-popover>
									<span class='click-tip' v-show='!addlist.conf.has.title.name'>点击编辑页面名称</span> {{addlist.conf.has.title.name}}
								</div>
							</div>
							<div class="yz">
								<el-popover placement="right" width="426" trigger="click" class='yz-click'v-if='addlist.conf.has.yz.botFlag'>
									<div class="yz-info">
										<p>验真模块配置</p>
										<div class="detail">
											<span class='labels'>宣传图</span>
											<el-checkbox v-model="addlist.conf.has.yz.botFlag"></el-checkbox>
										</div>
										<div class='edit-con'v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'>宣传图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.botImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadBot">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
										</div>
										<div class="edit-con">
											<span class='labels'>详情按钮</span>
											<el-checkbox v-model="addlist.conf.has.yz.detailFlag"></el-checkbox>
											<span class='color-labels'>扫码落地页风格</span>
											<el-color-picker v-model="addlist.conf.has.yz.color" class='color-select'></el-color-picker>
										</div>
										<div class='edit-con'v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'>产品图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.productImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadPro">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*510px格式为jpg\bmp\png\gif</div>
										</div>
										<div class='edit-con'v-show='!addlist.conf.has.yz.botFlag'>	
											<span class='labels'>产品图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.productImgBig" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadProBig">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*860px格式为jpg\bmp\png\gif</div>
										</div>
										<div class="edit-con">
											<span class='labels'>提示语：</span>
											<el-input size='mini' v-model="addlist.conf.has.yz.note" class='note' placeholder="请输入内容" maxlength='20'></el-input>
										</div>
										<div class="edit-con">
											<span class='labels'>一键反馈</span>
											<el-checkbox v-model="addlist.conf.has.yz.feedbackFlag"></el-checkbox>
										</div>
										<div class='edit-con'>
											<span class='labels'>反馈图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.feedbackImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadFeed">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<el-popover placement="right" width="426" trigger="click" class='yz-click-big'v-if='!addlist.conf.has.yz.botFlag'>
									<div class="yz-info">
										<p>验真模块配置</p>
										<div class="detail">
											<span class='labels'>宣传图</span>
											<el-checkbox v-model="addlist.conf.has.yz.botFlag"></el-checkbox>
										</div>
										<div class='edit-con'v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'>宣传图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.botImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadBot">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
										</div>
										<div class="edit-con">
											<span class='labels'>详情按钮</span>
											<el-checkbox v-model="addlist.conf.has.yz.detailFlag"></el-checkbox>
											<span class='color-labels'>扫码落地页风格</span>
											<el-color-picker v-model="addlist.conf.has.yz.color" class='color-select'></el-color-picker>
										</div>
										<div class='edit-con'v-show='addlist.conf.has.yz.botFlag'>
											<span class='labels'>产品图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.productImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadPro">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*510px格式为jpg\bmp\png\gif</div>
										</div>
										<div class='edit-con'v-show='!addlist.conf.has.yz.botFlag'>	
											<span class='labels'>产品图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.productImgBig" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadProBig">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*860px格式为jpg\bmp\png\gif</div>
										</div>
										<div class="edit-con">
											<span class='labels'>提示语：</span>
											<el-input size='mini' v-model="addlist.conf.has.yz.note" class='note' placeholder="请输入内容" maxlength='20'></el-input>
										</div>
										<div class="edit-con">
											<span class='labels'>一键反馈</span>
											<el-checkbox v-model="addlist.conf.has.yz.feedbackFlag"></el-checkbox>
										</div>
										<div class='edit-con'>
											<span class='labels'>反馈图片：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.feedbackImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadFeed">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*1204px格式为jpg\bmp\png\gif</div>
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<div class="img-top"v-show='addlist.conf.has.yz.botFlag'>
									<img :src="addlist.conf.has.yz.productImg" alt="" />
								</div>
								<div class="img-top-big"v-show='!addlist.conf.has.yz.botFlag'>
									<img :src="addlist.conf.has.yz.productImgBig" alt="" />
								</div>
								<div class="yz-text">
									<p :style="{color:''+addlist.conf.has.yz.color+''}">尊敬的用户</p>
									<p :style="{color:''+addlist.conf.has.yz.color+''}">您扫描的【硬荷花】是正品</p>
									<p>首扫时间：2018-09-23 12:34:56<span v-show='addlist.conf.has.yz.detailFlag':style="{color:''+addlist.conf.has.yz.color+'',border:'1px solid '+addlist.conf.has.yz.color+''}">详情</span></p>
									<div class="tip">{{addlist.conf.has.yz.note}}</div>
								</div>
								<div class="bot-img"v-show='addlist.conf.has.yz.botFlag'>
									<img :src="addlist.conf.has.yz.botImg" alt="" />
								</div>
							</div>
							<div class="qr">
								<el-popover placement="right" width="400" trigger="click" class='qr-click'>
									<div class="qr-info">
										<p>活动底图配置（未配置活动情况下显示）</p>
										<br />
										<div class='edit-con'>
											<span class='labels'>活动底图：</span>
											<div class="img-div"><img :src="addlist.conf.has.yz.feedbackImg" alt="" /></div>
									        <el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadFeed">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*120px格式为jpg\bmp\png\gif</div>
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<img :src="addlist.conf.has.gzh.bg" alt="" />
							</div>
							<div class="menu-part">
								<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/menu.png" alt="" />
							</div>
							<div class="phone-bottom"></div>

						</div>
					</div>
				</el-tab-pane>

				<el-tab-pane label="未扫码页面设置" name="second">
					<div class='not'>
						<div class="phone">
							<div class="phone-top">
								<div class="not-title">
									<el-popover placement="right" width="400" trigger="click" class='title-click'>
										<div class="title-info">
											<p>标题配置</p>
											<br />
											<div class="detail">
												<div><span class='require'>*</span>页面名称:</div>
												<el-input v-model="addlist.conf.not.title.name" placeholder="请输入页面名称" maxlength='15'></el-input>
											</div>
											<br />
											<div class="detail">
												<div>页面描述:</div>
												<el-input v-model="addlist.conf.not.title.note" placeholder="请输入页面描述" maxlength='20'></el-input>
											</div>
											<br />
										</div>
										<el-button slot="reference"></el-button>
									</el-popover>
									<span class='click-tip' v-show='!addlist.conf.not.title.name'>点击编辑页面名称</span> {{addlist.conf.not.title.name}}
								</div>
							</div>
							<div class="not-yz" :style="{backgroundImage:'url('+addlist.conf.not.yz.bg+')'}">
								<el-popover placement="right" width="400" trigger="click" class='not-yz-click'>
									<div class="not-yz-info">
										<p>未扫码页面顶部配置</p>
										<br />
										<div class="back">
											logo图片：
											<div class="img-div" v-show='addlist.conf.not.yz.logoIcon'><img :src="addlist.conf.not.yz.logoIcon" alt="" /></div>
											<div class="img-div" v-show='!addlist.conf.not.yz.logoIcon'>
												<p>+</p>
											</div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz3">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 170*170px格式为jpg\bmp\png\gif</div>
											<br /><br />
											<span>提示语：</span>&nbsp;&nbsp;&nbsp;
											<el-input v-model="addlist.conf.not.yz.tip" placeholder="请输入内容" maxlength='20' class='gInput'></el-input>
											<br /><br /> 按钮图片：
											<div class="img-div" v-show='addlist.conf.not.yz.btnIcon'><img :src="addlist.conf.not.yz.btnIcon" alt="" /></div>
											<div class="img-div" v-show='!addlist.conf.not.yz.btnIcon'>
												<p>+</p>
											</div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz4">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 364*72px格式为jpg\bmp\png\gif</div>
											<br /> 背景图片：
											<div class="img-div" v-show='addlist.conf.not.yz.bg'><img :src="addlist.conf.not.yz.bg" alt="" /></div>
											<div class="img-div" v-show='!addlist.conf.not.yz.bg'>
												<p>+</p>
											</div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz5">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*538px格式为jpg\bmp\png\gif</div>
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<div class="not-yz">
									<img :src="addlist.conf.not.yz.logoIcon" alt="" class='not-img' />
									<p>{{addlist.conf.not.yz.tip}}</p>
									<div class="button-img">
										<img :src="addlist.conf.not.yz.btnIcon" alt="" class='btn-img' />
									</div>
								</div>
							</div>
							<div class="not-qr" :style="{backgroundImage:'url('+addlist.conf.not.gzh.bg+')'}">
								<el-popover placement="right" width="400" trigger="click" class='not-qr-click'>
									<div class="not-qr-info">
										<p>未扫码页面底部配置</p>
										<br />
										<div class="name">
											<span>公众号名称：</span>
											<el-input size='mini' v-model="addlist.conf.not.gzh.name" class='gInput' placeholder="请输入内容" maxlength='10'></el-input>
										</div>
										<br />
										<div class="name">
											<span>说明：</span>
											<el-input size='mini' v-model="addlist.conf.not.gzh.note" class='gInput' placeholder="请输入内容" maxlength='20'></el-input>
										</div>
										<div class="back">
											二维码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<div class="img-div" v-show='addlist.conf.not.gzh.qrIcon'><img :src="addlist.conf.not.gzh.qrIcon" alt="" /></div>
											<div class="img-div" v-show='!addlist.conf.not.gzh.qrIcon'>
												<p>+</p>
											</div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz6">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 234*234px格式为jpg\bmp\png\gif</div>
										</div>

										<div class="back">
											背景图片：&nbsp;&nbsp;&nbsp;&nbsp;
											<div class="img-div" v-show='addlist.conf.not.gzh.bg'><img :src="addlist.conf.not.gzh.bg" alt="" /></div>
											<div class="img-div" v-show='!addlist.conf.not.gzh.bg'>
												<p>+</p>
											</div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz7">
												<el-button size='small' type="primary" v-show='addlist.conf.not.gzh.bg'>更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 750*510px格式为jpg\bmp\png\gif</div>
										</div>

									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<img :src="addlist.conf.not.gzh.qrIcon" alt="" />
								<p class='guanzhu-text'>关注公众号<span>"{{addlist.conf.not.gzh.name}}"</span>{{addlist.conf.not.gzh.note}}</p>

							</div>
							<div class="menu-part">
								<img src="http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/menu.png" alt="" />
							</div>
							<div class="phone-bottom"></div>
						</div>

					</div>
				</el-tab-pane>

			</el-tabs>
			<div class="save">
				<div class="save-con">
					<el-button type="primary" @click='saveAdd'>保存并启用</el-button>
					<el-button type="primary" @click='save'>保存</el-button>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
	export default {
		props: [],
		data() {
			return {
				activeName: 'third',
				uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				brandList: [],
				brandNameList: [],
				selectBrand: [],
				snList: [],
				initList: {
					id: '',
					name: '',
					note: '',
					type: '',
					snArr: [],
					conf: {
						loading:{
							flag:1,
							bg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/loading-bg.png',
							color:'#ccc'
						},
						has: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								botFlag:true,
								botImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-bot.png',
								detailFlag: true,
								color:'#00ffff',
								productImgBig:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-img.png',
								productImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-imgB.png',
								note: '本页面含有烟草产品信息，未满十八周岁请勿继续访问',	
								feedbackFlag:true,
								feedbackImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/not.png',
							},
							gzh: {
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
							},
							activity: {
								show: false,
								tpl: 1 //1为轮播
							}
						},
						not: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								logoIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_head_qrcode_default.png',
								tip: '扫描烟包上的二维码，验证XXX真品',
								btnIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_btn_default.png',
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_info_default.png'
							},
							gzh: {
								name: 'XXX',
								note: '获取更多惊喜',
								qrIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qr_default.png'
							}
						}
					},
					publish: 0
				},
				addlist: {
					id: '',
					name: '',
					note: '',
					type: '',
					snArr: [],
					conf: {
						loading:{
							flag:1,
							bg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/loading-bg.png',
							color:'#ccc'
						},
						has: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								botFlag:true,
								botImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-bot.png',
								detailFlag: true,
								color:'#00ffff',
								productImgBig:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-img.png',
								productImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/scan-002-imgB.png',
								note: '本页面含有烟草产品信息，未满十八周岁请勿继续访问',	
								feedbackFlag:true,
								feedbackImg:'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/not.png',
							},
							gzh: {								
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
							}
							
						},
						not: {
							title: {
								name: '',
								note: ''
							},
							yz: {
								logoIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_head_qrcode_default.png',
								tip: '扫描烟包上的二维码，验证XXX真品',
								btnIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_btn_default.png',
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_info_default.png'
							},
							gzh: {
								name: 'XXX',
								note: '获取更多惊喜',
								qrIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
								bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qr_default.png'
							}
						}
					},
					publish: 0
				},
				loading: true,
			}
		},

		created() {
			this.$request.post(
				'/api/saotx/prod/listBrand', {
					pageSize: -1
				},
				true,
				res => {
					if(res.ret == '200000') {
						var data = res.data.list || [];
						this.brandList = data;
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		methods: {
			snCallback(flag) {
				var that = this;
				if(flag) {
					if(that.selectBrand.length == 0) {
						that.$message({
							message: '请先选择品牌',
							type: 'warning'
						});
					} else {
						this.$request.post(
							'/api/saotx/prod/list', {
								pageSize: -1,
								brandCodeArr: that.selectBrand
							},
							true,
							res => {
								if(res.ret == '200000') {
									var data = res.data.list || [];
									that.snList = data;
								}
							},
							err => {
								console.log(err)
							}
						)
					}
				} else {
					console.log(that.addlist.snArr)
				}

			},
			tabPartClick(tab, event) {
				console.log(tab, event);
			},
			uploadBot(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.botImg = imgUrl;
			},
			uploadLoad(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.loading.bg = imgUrl;
			},
			uploadPro(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.productImg = imgUrl;
			},
			uploadProBig(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.productImgBig = imgUrl;
			},
			uploadFeed(res){
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.yz.feedbackImg = imgUrl;
			},
			uploadYz1(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.gzh.qrIcon = imgUrl;
			},
			uploadYz2(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.has.gzh.bg = imgUrl;
			},
			uploadYz3(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.not.yz.logoIcon = imgUrl;
			},
			uploadYz4(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.not.yz.btnIcon = imgUrl;
			},
			uploadYz5(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.not.yz.bg = imgUrl;
			},
			uploadYz6(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.not.gzh.qrIcon = imgUrl;
			},
			uploadYz7(res) {
				var data = res.data || {};
				var imgUrl = data && data.accessUrl;
				this.addlist.conf.not.gzh.bg = imgUrl;
			},
			save() {
				var that = this;
				if(!that.addlist.name) {
					this.$message({
						message: '请填写模板名称',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.title.name) {

					this.$message({
						message: '请填写已扫码页面的页面名称',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.not.title.name) {
					this.$message({
						message: '请填写未扫码页面的页面名称',
						type: 'warning'
					});
					return;
				}
				var savelist = {};
				savelist.id = that.addlist.id;
				savelist.name = that.addlist.name;
				savelist.note = that.addlist.note;
				savelist.type = that.addlist.type
				savelist.conf = that.addlist.conf;
				savelist.snArr = that.addlist.snArr;
				savelist.conf = JSON.stringify(savelist.conf);
				savelist.publish = 0;
				this.$request.post(
					'/api/saotx/orgtpl/saveOrModify', savelist,
					true,
					res => {
						if(res.ret == '200000') {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							that.addTplShow = false;
							that.addShow = false;
							that.listShow = true;
							var str = JSON.stringify(that.initList);
							that.addlist = JSON.parse(str);
							this.selectBrand = [];
							that.init();

						} else {
							this.$message({
								message: res.message,
								type: 'warning'
							});
						}
					},
					err => {
						console.log(err)
					}
				)
			},
			saveAdd() {
				var that = this;
				if(!that.addlist.name) {
					this.$message({
						message: '请填写模板名称',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.has.title.name) {
					this.$message({
						message: '请填写已扫码页面的页面名称',
						type: 'warning'
					});
					return;
				}
				if(!that.addlist.conf.not.title.name) {
					this.$message({
						message: '请填写未扫码页面的页面名称',
						type: 'warning'
					});
					return;
				}
				var savelist = {};
				savelist.id = that.addlist.id;
				savelist.name = that.addlist.name;
				savelist.note = that.addlist.note;
				savelist.type = that.addlist.type
				savelist.conf = that.addlist.conf;
				savelist.snArr = that.addlist.snArr;
				savelist.conf = JSON.stringify(savelist.conf);
				savelist.publish = 1;
				this.$request.post(
					'/api/saotx/orgtpl/saveOrModify', savelist,
					true,
					res => {
						if(res.ret == '200000') {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							that.addTplShow = false;
							that.addShow = false;
							that.listShow = true;
							var str = JSON.stringify(that.initList);
							that.addlist = JSON.parse(str);
							this.selectBrand = [];
							that.init();

						} else {
							this.$message.error(res.message);
						}
					},
					err => {
						console.log(err)
					}
				)
			},
			editItem(item) {
				var that = this;
				this.addTplShow = false;
				this.addShow = true;
				this.listShow = false;
				this.activeName = 'third'
				this.$request.post(
					'/api/saotx/orgtpl/detail', {
						id: item.id
					},
					true,
					res => {
						if(res.ret == '200000') {
							var data = res.data || [];
							that.addlist.id = data.id;
							that.addlist.name = data.name;
							that.addlist.note = data.note;
							that.addlist.type = data.type;
							that.addlist.conf = JSON.parse(item.conf);
							var list = [];
							var blist = [];
							data.snArr.forEach((item, i) => {
								list.push({
									allName: data.snNameArr[i],
									sn: item
								})
							})
							data.brandNameArr.forEach((val, j) => {
								blist.push({
									name: val,
									brandCode: data.brandArr[j]
								})
							})
							that.snList = list;
							that.addlist.snArr = data.snArr;
							that.brandList = blist;
							that.selectBrand = data.brandArr;

						} else {
							this.$message.error(res.message);
						}
					},
					err => {
						console.log(err)
					}
				)

				this.$request.post(
					'/api/saotx/prod/listBrand', {
						pageSize: -1
					},
					true,
					res => {
						if(res.ret == '200000') {
							var data = res.data.list || [];
							that.brandList = data;

						}
					},
					err => {
						console.log(err)
					}
				)

			},
			use(item) {
				this.$request.post(
					'/api/saotx/orgtpl/use', {
						id: item.id
					},
					true,
					res => {
						if(res.ret == '200000') {

							this.$message({
								message: '已启用',
								type: 'success'
							});
							this.init();
						} else {
							this.$message.error(res.message);
						}
					},
					err => {
						console.log(err)
					}
				)
			}

		},
	}
</script>

<style lang="scss" scoped>
	@import './css/ScanConf2.scss';
</style>