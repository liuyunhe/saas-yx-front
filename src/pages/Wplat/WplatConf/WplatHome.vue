<template>
	<div class="wplat-root">
		<el-tabs v-model="activeName" @tab-click="handleClick">
			<el-tab-pane label="扫码落地页面" name="first">
				<div class='left'>
					<img src="http://qoss.qrmkt.cn/new_platform/pc/has.png" alt="" />
				</div>
				<div class="right">
					<h2>扫码落地页，可根据产品规格进行自定义配置，赶快去设置吧</h2>
					<el-button type="primary" class='set' @click='goSet'>去设置扫码落地页</el-button>
				</div>
			</el-tab-pane>
			<el-tab-pane label="未扫码页面" name="second">
				<div class='no-scan-page'>
					<div class='not'>
						<div class="phone">
							<div class="phone-top">
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
								<div class="not-title">
									{{addlist.conf.not.title.name}}
								</div>
							</div>
							<div class="not-yz" :style="{backgroundImage:'url('+addlist.conf.not.yz.bg+')'}">
								<el-popover placement="right" width="400" trigger="click" class='not-yz-click'>
									<div class="not-yz-info">
										<p>未扫码页面顶部配置</p>
										<br />
										<div class="back">
											logo图片：
											<div class="img-div"v-show='addlist.conf.not.yz.logoIcon'><img :src="addlist.conf.not.yz.logoIcon" alt="" /></div>
											<div class="img-div"v-show='!addlist.conf.not.yz.logoIcon'><p>+</p></div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz3">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 170*170px格式为jpg\bmp\png\gif</div>
											<br /><br />
											<span>提示语：</span>&nbsp;&nbsp;&nbsp;
											<el-input v-model="addlist.conf.not.yz.tip" placeholder="请输入内容"maxlength='20'class='gInput'></el-input>
											<br /><br /> 按钮图片：
											<div class="img-div"v-show='addlist.conf.not.yz.btnIcon'><img :src="addlist.conf.not.yz.btnIcon" alt="" /></div>
											<div class="img-div"v-show='!addlist.conf.not.yz.btnIcon'><p>+</p></div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz4">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 364*72px格式为jpg\bmp\png\gif</div>
											<br /> 背景图片：
											<div class="img-div"v-show='addlist.conf.not.yz.bg'><img :src="addlist.conf.not.yz.bg" alt="" /></div>
											<div class="img-div"v-show='!addlist.conf.not.yz.bg'><p>+</p></div>
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
											<el-input size='mini' v-model="addlist.conf.not.gzh.name" class='gInput' placeholder="请输入内容"maxlength='10'></el-input>
										</div>
										<br />
										<div class="name">
											<span>说明：</span>
											<el-input size='mini' v-model="addlist.conf.not.gzh.note" class='gInput' placeholder="请输入内容"maxlength='20'></el-input>
										</div>
										<div class="back">
											二维码：&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
											<div class="img-div"v-show='addlist.conf.not.gzh.qrIcon'><img :src="addlist.conf.not.gzh.qrIcon" alt="" /></div>
											<div class="img-div"v-show='!addlist.conf.not.gzh.qrIcon'><p>+</p></div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz6">
												<el-button size='small' type="primary">更换图片</el-button>
											</el-upload>
											<div slot="tip" class="el-upload__tip">* 图片建议尺寸为 234*234px格式为jpg\bmp\png\gif</div>
										</div>
										
										<div class="back">
											背景图片：&nbsp;&nbsp;&nbsp;&nbsp;
											<div class="img-div"v-show='addlist.conf.not.gzh.bg'><img :src="addlist.conf.not.gzh.bg" alt="" /></div>
											<div class="img-div"v-show='!addlist.conf.not.gzh.bg'><p>+</p></div>
											<el-upload class="avatar-uploader" :headers='imgHead' :action="uploadAdd" :show-file-list="false" :on-success="uploadYz7">
												<el-button size='small' type="primary"v-show='addlist.conf.not.gzh.bg'>更换图片</el-button>
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
									<img src="http://qoss.qrmkt.cn/new_platform/pc/menu.png" alt="" />
								</div>
							<div class="phone-bottom"></div>
						</div>
						
					</div>
					<div class="save">
						<div class="save-con">							
							<el-button type="primary" @click='save'>保存</el-button>
							<el-button type="primary" @click='init'>取消</el-button>
						</div>		
					</div>
				</div>
			</el-tab-pane>
		</el-tabs>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				activeName: 'first',
				uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
				imgHead: {
					token: sessionStorage.getItem('access_token'),
					loginId: sessionStorage.getItem('access_loginId')
				},
				addlist: {
					conf: {						
						not: {
							title: {
								name: '验真首页',
								note: ''
							},
							yz: {
								logoIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_head_qrcode_default.png',
								tip: '扫描烟包上的二维码，验证XXX真品',
								btnIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_btn_default.png',
								bg: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_info_default.png'
							},
							gzh: {
								name: 'XXX',
								note: '获取更多惊喜',
								qrIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
								bg: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_qr_default.png'
							}
						}
					}
				},
				initList: {				
					conf: {
						not: {
							title: {
								name: '验真首页',
								note: ''
							},
							yz: {
								logoIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_head_qrcode_default.png',
								tip: '扫描烟包上的二维码，验证XXX真品',
								btnIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_btn_default.png',
								bg: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_info_default.png'
							},
							gzh: {
								name: 'XXX',
								note: '获取更多惊喜',
								qrIcon: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
								bg: 'http://qoss.qrmkt.cn/saas_platform/common/org_tpl/cc_bg_qr_default.png'
							}
						}
					}
				},

			};
		},
		mounted(){
			this.init()
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab, event);
			},
			goSet (){
				this.$router.push({
					path:'/weplat/down'
				})
			},
			init(){
//				获取保存的json，如果有则展示，没有则展示默认的
				this.$request.post(
					'/api/saotx/orgtpl/detailUnscan', {},
					true,
					res => {
						if(res.ret == '200000') {
							if(res.data==null){
								let stringJson=JSON.stringify(this.initList.conf.not)
								this.addlist.conf.not=JSON.parse(stringJson);
							}else {
								let stringJson=res.data;
								this.addlist.conf.not=JSON.parse(res.data);
								
							}
	
						}else {
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
				var savelist = {};
				let stringJson=JSON.stringify(this.addlist.conf.not)
				savelist=JSON.parse(stringJson);
				let savelistJson = JSON.stringify(savelist);
//				savelist.publish = 0;
				this.$request.post(
					'/api/saotx/orgtpl/somUnscan', {
						cnt:savelistJson
					},
					true,
					res => {
						if(res.ret == '200000') {
							this.$message({
								message: '保存成功',
								type: 'success'
							});
							that.init();
	
						}else {
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
		}
	};
</script>

<style lang="scss" scoped>
	.wplat-root {
		background: #fff;
		border-radius: 4px;
		min-height: 500px;
		color: #666;
		padding: 20px 20px 20px 20px;
		position: relative;
		
		.jump-set {
			a {
				font-size: 16px;
				color: #666;
				line-height: 30px;
				height: 30px;
				text-shadow: 0 0 3px #ccc;
				position: absolute;
				right:30px;
				top:15px;
				cursor: pointer;
				z-index: 3;
				&:hover {
					color:#ccc;
					text-shadow: 0 0 3px #666;
				}
			}
			
		}
		.left {
			float: left;
			width: 300px;
			padding-left: 20px;
			img {
				width: 100%;
				margin-top: 10px;
			}
		}
		.right {
			height: 200px;
			margin-left: 320px;
			h2 {
				text-align: center;
				padding-top: 100px;
			}
			.set {
				transform: translateX(-50%);
				margin-left: 50%;
				margin-top: 20px;
			}
		}
		.no-scan-page {
			padding-left: 20px;
			padding-top: 25px;
			min-height: 670px;
		}
	}
	p {
    margin: 0;
}
.require {
    color:red;
}
.tip-text {
    font-size: 12px;
    color:#aaa;
}
.title-info,.not-title {
    label {
        text-align: left;
    }
    p {
        padding: 0 10px 0 10px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
    }
}
.guanzhu-text {
    font-size: 12px;
    margin-top: 21px;
    color:#fff;
}
.img-div {
            width:100px;
            height: 100px;
            border:1px dashed #d9d9d9;
            border-radius: 4px;
            display: inline-block;
            vertical-align: middle;
            background: #fff;
            font-size: 60px;
            text-align: center;
            color:#d9d9d9;
            font-weight: 100;
            p {
                padding-top: 30px;
                border:none;
            }
        }

.not-yz-info {
    .back {
        margin: 10px 0 10px 0;
        img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            vertical-align: middle;
        }
        .avatar-uploader {
            display: inline-block;
            vertical-align: middle;
        }
    }
    p {
        padding: 0 10px 0 10px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
        
    }
    .gInput {
        width: 250px;
    }
    
}

.not-qr-info {
    .back {
        margin: 10px 0 10px 0;
        img {
            width: 100px;
            height: 100px;
            object-fit: contain;
            vertical-align: middle;
        }
        .avatar-uploader {
            display: inline-block;
            vertical-align: middle;
        }
    }
    p {
        padding: 0 10px 0 10px;
        line-height: 30px;
        border-bottom: 1px solid #eee;
        
    }
    .gInput {
        width: 250px;
    }
    .name {
        span {
            display: inline-block;
            width:85px;
            text-align: justify;
        }
        
    }
}

.tplInfo {
    padding-top: 20px;
    min-height: 400px;
}
.tpl-name {
    width:300px;
    height: 40px;
}
.filter-item {
    width:300px;
}
.left-name {
    width:100px;
    display: inline-block;
    vertical-align: middle;
}
.clearfix:after {
    content: " ";
    display: block;
    ;
    line-height: 0;
    height: 0;
    visibility: hidden;
    clear: both;
}

.wplat-root {
    .pri-btn {
        margin-bottom: 10px;
    }   
        .title {
            margin-bottom: 20px;
            font-size: 18px;
        }
        .not {
            .phone {
                float: left;
                margin-right: 45px;
            }
            .tplInfo {
                float: left;
            }
            .phone-top {
                width: 300px;
                height: 66px;
                background: url(../../../assets/img/phone_top.png) no-repeat center / contain;
                .not-title {
                    width: 100%;
                    height: 100%;
                    line-height: 85px;
                    text-align: center;
                    color: #fff;
                    font-size: 14px;
                    position: relative;
                }
                .title-click {
                    width: 300px;
                    height: 66px;
                    position: absolute;
                    top: 0;
                    left: 0;
                    z-index: 2;
                    opacity: 0;
                    button {
                        width: 300px;
                        height: 66px;
                    }
                }
            }
            .menu-part {
                width:300px;
                height: 50px;
                img {
                    width:100% ;
                }
            }
            .phone-bottom {
                width: 300px;
                height: 64px;
                background: url(../../../assets/img/phone_bottom.png) no-repeat center / contain;
            }
            .not-yz {
                width: 300px;
                height: 215px;
                position: relative;
                margin-bottom: 10px;
                background-repeat: no-repeat;
                background-size: 300px 215px;
                text-align: center;
                border: 1px solid #fff;
                &:hover {
                    border: 1px dashed #0099FF;
                }
                .not-img {
                    width: 68px;
                    height: 69px;
                    margin-top: 60px;
                    margin-bottom: 10px;
                }
                .btn-img {
                    width: 145px;
                    height: 30px;
                    margin-top: 5px;
                }
                .not-yz-click {
                    button {
                        width: 300px;
                        height: 215px;
                    }
                    width:300px;
                    height: 215px;
                    position: absolute;
                    top:0;
                    left:0;
                    z-index: 2;
                    opacity: 0;
                }
                .right {
                    width: 300px;
                    height: 130px;
                    padding-left: 70px;
                    padding-top: 10px;
                }
                .left {
                    width: 57px;
                    height: 110px;
                    position: absolute;
                    left: 10px;
                    top: 10px;
                    background: #fff;
                }
            }
            .not-qr {
                width: 300px;
                height: 204px;
                background: #ccc;
                position: relative;
                text-align: center;
                background-repeat: no-repeat;
                background-size: 300px 204px;
                border: 1px solid #fff;
                overflow: hidden;
                &:hover {
                    border: 1px dashed #0099FF;
                }
                .not-qr-click {
                    button {
                        width: 300px;
                        height: 204px;
                    }
                    width:300px;
                    height: 204px;
                    position: absolute;
                    top:0;
                    left:0;
                    z-index: 2;
                    opacity: 0;
                }
                img {
                    width: 93px;
                    height: 93px;
                    margin-top: 45px;
                }
                span {
                    color: #FF4D51;
                }
            }
        }
    .scan-content {
        border: none;
        /*padding: 10px 10px 10px 10px;
            padding-bottom: 20px;
            background: #fff;
            border-radius: 4px;*/
        color: #666;
        .date-select {
            padding-left: 10px;
        }
        .keyword-input {
            width: 200px;
        }
        .input-btns {
            margin-top: 10px;
        }
    }
}
.save {
    width:100%;
    height: 50px;
    background: #fff;
    position: absolute;
    bottom: 0;
    left: 0;
    .save-con {
        display: inline-block;
        margin: 0 auto;
        position: absolute;
        left: 50%;
        top:0;
        margin-left: -97px;
    }
}

</style>