export default {
	data() {
		return {
			options: [],
			modelValue: '',
			dateValue: '',
			keywords: '',
			tableData: [],
			multipleSelection: [],
			nodata: false,
			total: 10,
			max: 10,
			page: 1,
			listShow: true,
			addTplShow: false,
			addShow: false,
			isAddBtn: false,
			isAddBtn1: false,
			activeName: 'first',
			actShow: true,
			appShow: true,
			tabShow: true,
			isAct: 1,
			isShowAct: false,
			isTop: false,
			uploadAdd: location.origin + '/api/saotx/attach/commonAliUpload',
			imgHead: {
				token: sessionStorage.getItem('access_token'),
				loginId: sessionStorage.getItem('access_loginId')
			},
			initList: {
				id: '',
				name: '',
				note: '',
				type: '',
				conf: {
					has: {
						title: {
							name: '',
							note: ''
						},
						yz: {
							detailFlag: true,
							bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png'
						},
						gzh: {
							name: 'XXX',
							note: '获得更多惊喜',
							qrIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
							bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png'
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
				conf: {
					has: {
						title: {
							name: '',
							note: ''
						},
						yz: {
							detailFlag: true,
							bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png'
						},
						gzh: {
							name: 'XXX',
							note: '获得更多惊喜',
							qrIcon: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/common/org_tpl/cc_bg_qrcode_default.png',
							bg: 'http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform_pc/img/detail_default.png'
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
			removeArr: []
		}
	},
	created() {
		this.init();
		this.initTpl();
	},
	methods: {
		myCallback(data) {
			this.page = data;
			this.init();
		},
		backMain() {
			this.addTplShow = false;
			this.addShow = false;
			this.listShow = true;
			var str=JSON.stringify(this.initList);
			this.addlist=JSON.parse(str);
		},
		search() {
			var that = this;
			var time = '';
			if(that.dateValue) {
				time = that.formatTime(that.dateValue).substr(0, 10)
			}
			this.$request.post(
				'/api/saotx/orgtpl/list', {
					ctime: time,
					keywords: that.keywords,
					pageNo: that.page,
					selfListPageSize: that.max,
					type: that.modelValue
				},
				true,
				res => {
					if(res.ret == '200000') {
						var data = res.data.list || [];

						if(data == null || data.length == 0) {
							that.tableData = data;
						} else {
							that.tableData = data;
							that.total = res.data.page.count;
							that.tableData.forEach((item) => {
								item.ctime = that.formatTime(item.ctime)
							})

						}
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		resetSearch() {
			this.dateValue = '';
			this.keywords = '';
			this.modelValue = '';
		},
		init() {
			var that = this;
			this.$request.post(
				'/api/saotx/orgtpl/list', {
					ctime: "",
					keywords: "",
					pageNo: that.page,
					selfListPageSize: that.max,
					type: ""
				},
				true,
				res => {
					if(res.ret == '200000') {
						var data = res.data.list || [];

						if(data == null || data.length == 0) {

						} else {
							that.tableData = data;
							that.total = res.data.page.count;
							that.tableData.forEach((item) => {
								item.ctime = that.formatTime(item.ctime)
							})
						}
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		initTpl() {
			var that = this;
			this.$request.post(
				'/api/saotx/orgtpl/listCommon', {},
				true,
				res => {
					if(res.ret == '200000') {
						var data = res.data.list || [];

						if(data == null || data.length == 0) {

						} else {
							that.options = data;
						}
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		handleSelectionChange(val) {
			var that = this;
			this.multipleSelection = val;
			val.forEach((item) => {
				that.removeArr.push(item.id)
			})
			that.removeArr = that.quc(that.removeArr)
		},
		quc(array) {
			var temp = []; //一个新的临时数组
			for(var i = 0; i < array.length; i++) {
				if(temp.indexOf(array[i]) == -1) {
					temp.push(array[i]);
				}
			}
			return temp;
		},
		formatTime(time) {
			var d = new Date(time);
			var m = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
			var da = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
			var h = d.getHours() < 10 ? '0' + d.getHours() : d.getHours();
			var mi = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes();
			var s = d.getSeconds() < 10 ? '0' + d.getSeconds() : d.getSeconds();
			var times = d.getFullYear() + '-' + m + '-' + da + ' ' + h + ':' + mi + ':' + s;
			return times;
		},
		addSure(item) {
			this.addlist.type = item.type;
			this.addTplShow = false;
			this.addShow = true;
			this.listShow = false;
		},
		tabPartClick(tab, event) {
			console.log(tab, event);
		},
		actClick() {
			this.actShow = !this.actShow;
			this.addlist.conf.has.activity.show = true;
		},
		uploadYz(res) {
			var data = res.data || {};
			var imgUrl = data && data.accessUrl;
			this.addlist.conf.has.yz.bg = imgUrl;
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
			var savelist = {};
			savelist.name = that.addlist.name;
			savelist.note = that.addlist.note;
			savelist.type = that.addlist.type
			savelist.conf = that.addlist.conf;;
			savelist.conf = JSON.stringify(savelist.conf);
			savelist.publish = 0;
			this.$request.post(
				'/api/saotx/orgtpl/saveOrModify', savelist,
				true,
				res => {
					if(res.ret == '200000') {
						alert('保存成功');
						that.addTplShow = false;
						that.addShow = false;
						that.listShow = true;
						var str=JSON.stringify(that.initList);
						that.addlist=JSON.parse(str);
						that.init();

					}
				},
				err => {
					console.log(err)
				}
			)
		},
		saveAdd() {
			var that = this;
			var savelist = {};
			savelist.name = that.addlist.name;
			savelist.note = that.addlist.note;
			savelist.type = that.addlist.type
			savelist.conf = that.addlist.conf;;
			savelist.conf = JSON.stringify(savelist.conf);
			savelist.publish = 1;
			this.$request.post(
				'/api/saotx/orgtpl/saveOrModify', savelist,
				true,
				res => {
					if(res.ret == '200000') {
						alert('保存成功');
						that.addTplShow = false;
						that.addShow = false;
						that.listShow = true;
						var str=JSON.stringify(that.initList);
						that.addlist=JSON.parse(str);
						that.init();

					}
				},
				err => {
					console.log(err)
				}
			)
		},
		editItem(item) {
			console.log(item.id)
			this.addTplShow = false;
			this.addShow = true;
			this.listShow = false;
			this.addlist.id = item.id;
			this.addlist.name = item.name;
			this.addlist.note = item.note;
			this.addlist.type = item.type;
			this.addlist.conf = JSON.parse(item.conf);
			console.log(this.addlist)

		},
		remove(idArr) {
			var that = this;
			this.$request.post(
				'/api/saotx/orgtpl/remBatch', {
					idArr: idArr
				},
				true,
				res => {
					if(res.ret == '200000') {
						alert('删除成功');
						that.removeArr = [];
						that.init();
					}
				},
				err => {
					console.log(err)
				}
			)
		},
		removeItem(item) {
			var that = this;
			console.log(item.id)
			var arr = [];
			arr.push(item.id)
			this.$confirm('确定要删除此条记录？')
				.then(_ => {
					that.remove(arr)
				})
				.catch(_ => {})
		},
		removeMul() {
			var that = this;
			if(that.removeArr.length == 0) {
				alert('请选择要删除的记录');
				return;
			}
			this.$confirm('确定要删除选中的的记录吗？')
				.then(_ => {
					that.remove(that.removeArr)
				})
				.catch(_ => {})
		}

	},
}