<template>
	<div class="scan-root">
		<div class="scan-list" v-show='listShow'>

			<div class="scan-content">
				<div class="top">
					<el-button type="primary" size='small' class='pri-btn' @click='addTplShow=true;'>新建扫码落地页</el-button>
					<br /><br /> 模板类型:
					<el-select v-model="modelValue" placeholder="请选择" size='small' style='width:200px'>
						<el-option v-for="item in options" :key="item.name" :label="item.name" :value="item.type">
						</el-option>
					</el-select>
					&nbsp;&nbsp;创建时间:
					<el-date-picker v-model="dateValue" size='small' type="date" placeholder="选择日期" class='date-select'>
					</el-date-picker>
					&nbsp;&nbsp;关键字:
					<el-input v-model="keywords" size='small' placeholder="请输入内容" class='keyword-input'></el-input>
					<br /><br />
					<div class="input-btns">
						<el-button type="primary" size='small' class='pri-btn' @click='search'>查询</el-button>
						<el-button type="primary" size='small' class='pri-btn' @click='resetSearch'>重置</el-button>
					</div>
				</div>
				<div class="bottom">
					<el-table :data="tableData" v-loading="loading" style="width: 100%" @selection-change="handleSelectionChange">
						<el-table-column type="selection" >
						</el-table-column>
						<el-table-column prop="name" label="模板名称" align="center">
						</el-table-column>
						<el-table-column prop="note" label="模板说明" align="center">
						</el-table-column>
						<el-table-column prop="snName" label="适用产品" align="center">
						</el-table-column>
						<el-table-column prop="ctime" label="创建时间" align="center">
						</el-table-column>
						<el-table-column prop="creatorName" label="创建人" align="center">
						</el-table-column>
						<el-table-column prop="statusName" label="状态" align="center">
						</el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button @click="use(scope.row)" type="text" size="small" v-show='scope.row.status==2?true:false'>启用</el-button>
								<el-button @click="removeItem(scope.row)" type="text" size="small">删除</el-button>
								<el-button type="text" size="small" @click="editItem(scope.row)">编辑</el-button>
							</template>
						</el-table-column>
					</el-table>
					<br />
					<el-button type="primary" @click='removeMul' size='small'>批量删除</el-button>
					<!--<div class="itemDec">当前第{{page}}页，本页{{max}}条记录，总共{{total}}条记录</div>-->
					<el-pagination layout="total,prev, pager, next,jumper" background :total="total" @current-change="myCallback" :page-size="max" class="pagination-css">
					</el-pagination>
				</div>

			</div>

		</div>
		<el-dialog title="模板选择":visible.sync="addTplShow"width='70%':close-on-click-modal="false">
			<div class="add-tpl" v-show='addTplShow'>
				<ul class="clearfix">
					<li v-for='(item,key) in options'>
						<img :src="item.icon" alt="" />
						<el-button type="primary" size="small" @click='addSure(item)'class='sure-btn'>使用模板</el-button>
					</li>
				</ul>
			</div>
		</el-dialog>		
		<div class="add-part" v-show='addShow'>
			<span @click='backMain' class='backMain'>返回</span>
			<div class="title">扫码落地页配置</div>
			<el-tabs v-model="activeName" @tab-click="tabPartClick">
				<el-tab-pane label="模板设置" name="third">
					<div class="tplInfo">
							<span class='left-name'>
								<span class='require'>*</span>模板名称：
							</span>
							
							<el-input v-model="addlist.name" placeholder="请输入模板名称"maxlength='15'class='tpl-name'size='small'></el-input>
							<br /><br /> 
							<span class='left-name'>
								模板说明：
							</span>							
							<el-input v-model="addlist.note" placeholder="请输入模板说明"maxlength='20'class='tpl-name'size='small'></el-input>
							<br /><br />
							<span class='left-name'>
							请选择品牌：
							</span>
							<el-select class="filter-item" multiple v-model="selectBrand" placeholder="请选择品牌"size='small'>
								<el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
								</el-option>
							</el-select>
							<br /><br />
							<span class='left-name'>
							请选择规格：
							</span>
							<el-select size='small' class="filter-item" multiple v-model="addlist.snArr"@visible-change='snCallback' placeholder="请选择规格">
								<el-option v-for="item in snList" :key="item.id" :label="item.allName" :value="item.sn">
								</el-option>
							</el-select>
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
												<el-input v-model="addlist.conf.has.title.name" size='small' placeholder="请输入页面名称"maxlength='15'></el-input>
											</div>
											<br />
											<div class="detail">
												<div>页面描述:</div>
												<el-input v-model="addlist.conf.has.title.note" size='small' placeholder="请输入页面描述"maxlength='20'></el-input>
											</div>
											<br />
										</div>
										<el-button slot="reference"></el-button>
									</el-popover>
									<span class='click-tip'v-show='!addlist.conf.has.title.name'>点击编辑页面名称</span>
									{{addlist.conf.has.title.name}}
								</div>
							</div>
							<div class="yz" :style="{backgroundImage:'url('+addlist.conf.has.yz.bg+')'}" @mouseenter="!addlist.conf.has.activity.show?isAddBtn=true:isAddBtn=false;" @mouseleave="isAddBtn=false">
								<el-popover placement="right" width="400" trigger="click" class='yz-click'>
									<div class="yz-info">
										<p>验真模块配置</p>
										<br />
										<div class="detail">详情按钮显示
											<el-checkbox v-model="addlist.conf.has.yz.detailFlag"></el-checkbox>
										</div>
										<div class="back">
											背景图片：<img :src="addlist.conf.has.yz.bg" alt=""v-show='addlist.conf.has.yz.bg' /><div class="img-div"v-show='!addlist.conf.has.yz.bg'></div>
											<el-upload class="avatar-uploader" size='small' :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz">
												<el-button type="primary">更换图片</el-button>
											</el-upload>
										</div>
										<p class='tip-text'>*图片建议尺寸为750*460px,格式为*.jpg\*.bmp\*.png\*.gif</p>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<div class="left"></div>
								<div class="right">
									<p>某品牌产品<span v-show='addlist.conf.has.yz.detailFlag'>详情</span></p>
									<p>此码为正确编码</p>
									<p>首扫时间：2018-09-23 12:34:56</p>
									<p>扫码次数：2次</p>
									<div class="tip">本页面含有烟草产品信息,未满18岁请勿继续访问</div>
								</div>
								<el-popover placement="right" width="400" popper-class='list-pop' trigger="click" :class='{"add-btn":true,"isTop":isTop}' v-show='isAddBtn'>
									<el-tag type="info">验真信息</el-tag>
									<el-tag @click.native="actClick" v-show='actShow'>活动中心</el-tag>
									<el-tag @click.native="actClick" v-show='!actShow' type="info">活动中心</el-tag>
									<el-tag type="info">公众号</el-tag>
									<br/><br />
									<el-button slot="reference">+</el-button>
								</el-popover>
							</div>

							<div :class="{'activity':true, 'border-show':borderShow}" v-show='addlist.conf.has.activity.show'@click='showBorder'>
								<div class="remove-btn"@click='addlist.conf.has.activity.show=false'>-</div>
								<el-popover placement="right" width="400" trigger="click" class='act-click'>
									<div class="act-info">
										<p>活动模块配置</p>
										<div class="select-tpl">
											<p>选择模板</p>
											<br />
											<ul>
												<li :class='{active:addlist.conf.has.activity.tpl==1}' @click="addlist.conf.has.activity.tpl=1">
													<img src="../../../assets/img/lunbo.png" alt="" />
													<p>轮播海报</p>
												</li>
												<li :class='{active:addlist.conf.has.activity.tpl==0}' @click="addlist.conf.has.activity.tpl=0">
													<img src="../../../assets/img/yihangyige.png" alt="" />
													<p>一行一个</p>
												</li>
											</ul>
										</div>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<p>精彩活动不间断</p>
								<div class="banner">活动图片banner</div>
							</div>
							<div class="qr" :style="{backgroundImage:'url('+addlist.conf.has.gzh.bg+')'}" @mouseenter="!addlist.conf.has.activity.show?isAddBtn=true:isAddBtn=false;isTop=false" @mouseleave="isAddBtn=false;isTop=false">
								<el-popover placement="right" width="400" trigger="click" class='qr-click'>
									<div class="qr-info">
										<p>公众号模块配置</p>
										<br />
										<div class="name">
											<span>公众号名称：</span>
											<el-input size='mini' v-model="addlist.conf.has.gzh.name" class='gInput' placeholder="请输入内容"maxlength='10'></el-input>
										</div>
										<br />
										<div class="name">
											<span>说明：</span>
											<el-input size='mini' v-model="addlist.conf.has.gzh.note" class='gInput' placeholder="请输入内容"maxlength='20'></el-input>
										</div>
										<div class="back">
											二维码：<img :src="addlist.conf.has.gzh.qrIcon" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz1">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
										</div>
										<p class='tip-text'>*图片建议尺寸为178*178px,格式为*.jpg\*.bmp\*.png\*.gif</p>
										<div class="back">
											背景图片：<img :src="addlist.conf.has.gzh.bg" alt=""v-show='addlist.conf.has.gzh.bg' />
											<div class="img-div"v-show='!addlist.conf.has.gzh.bg'></div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz2">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
										</div>
										<p class='tip-text'>*图片建议尺寸为750*364px,格式为*.jpg\*.bmp\*.png\*.gif</p>
									</div>
									<el-button slot="reference"></el-button>
								</el-popover>
								<img :src="addlist.conf.has.gzh.qrIcon" alt="" />
								<p class='guanzhu-text'>关注公众号<span>{{addlist.conf.has.gzh.name}}</span>{{addlist.conf.has.gzh.note}}</p>
								
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
												<el-input v-model="addlist.conf.not.title.name" placeholder="请输入页面名称"maxlength='15'></el-input>
											</div>
											<br />
											<div class="detail">
												<div>页面描述:</div>
												<el-input v-model="addlist.conf.not.title.note" placeholder="请输入页面描述"maxlength='20'></el-input>
											</div>
											<br />
										</div>
										<el-button slot="reference"></el-button>
									</el-popover>
									<span class='click-tip' v-show='!addlist.conf.not.title.name'>点击编辑页面名称</span>
									{{addlist.conf.not.title.name}}
								</div>
							</div>
							<div class="not-yz" :style="{backgroundImage:'url('+addlist.conf.not.yz.bg+')'}">
								<el-popover placement="right" width="400" trigger="click" class='not-yz-click'>
									<div class="not-yz-info">
										<p>未扫码页面顶部配置</p>
										<br />
										<div class="back">
											logo图片：<img :src="addlist.conf.not.yz.logoIcon" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz3">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<p class='tip-text'>*图片建议尺寸为217*199px,格式为*.jpg\*.bmp\*.png\*.gif</p>
											<br /><br />
											<div>提示语：</div>
											<br />
											<el-input v-model="addlist.conf.not.yz.tip" placeholder="请输入内容"maxlength='20'></el-input>
											<br /> 按钮图片：
											<img :src="addlist.conf.not.yz.btnIcon" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz4">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<p class='tip-text'>*图片建议尺寸为354*63px,格式为*.jpg\*.bmp\*.png\*.gif</p>
											<br /> 背景图片：
											<img :src="addlist.conf.not.yz.bg" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz5">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<p class='tip-text'>*图片建议尺寸为750*462px,格式为*.jpg\*.bmp\*.png\*.gif</p>
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
											<div>公众号名称：</div>
											<el-input size='mini' v-model="addlist.conf.not.gzh.name" class='gInput' placeholder="请输入内容"maxlength='10'></el-input>
										</div>
										<br />
										<div class="name">
											<div>说明：</div>
											<el-input size='mini' v-model="addlist.conf.not.gzh.note" class='gInput' placeholder="请输入内容"maxlength='20'></el-input>
										</div>
										<div class="back">
											二维码：<img :src="addlist.conf.not.gzh.qrIcon" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz6">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
										</div>
										<p class='tip-text'>*图片建议尺寸为178*178px,格式为*.jpg\*.bmp\*.png\*.gif</p>
										<div class="back">
											背景图片：<img :src="addlist.conf.not.gzh.bg" alt="" />
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz7">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
										</div>
										<p class='tip-text'>*图片建议尺寸为750*460px,格式为*.jpg\*.bmp\*.png\*.gif</p>
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

<script src="./js/ScanConf.js"></script>

<style lang="scss" scoped>
	@import './css/ScanConf.scss';
</style>