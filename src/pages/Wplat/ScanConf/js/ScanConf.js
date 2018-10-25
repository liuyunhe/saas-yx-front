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
				snArr: [],
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
			removeArr: [],
			loading: true
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
			var str = JSON.stringify(this.initList);
			this.addlist = JSON.parse(str);
			this.selectBrand = [];
		},
		search() {
			var that = this;
			var time = '';
			that.loading = true;
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
							that.loading = false;
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
							that.loading = false;
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
			var idArr = [];
			val.forEach((item) => {
				idArr.push(item.id)
			})
			that.removeArr = idArr;
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
			var that = this;
			this.addlist.type = item.type;
			this.addTplShow = false;
			this.addShow = true;
			this.listShow = false;
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
		remove(idArr) {
			var that = this;
			this.$request.post(
				'/api/saotx/orgtpl/remBatch', {
					idArr: idArr
				},
				true,
				res => {
					if(res.ret == '200000') {
						this.$message({
							message: '删除成功',
							type: 'success'
						});
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
				this.$message({
					message: '请选择要删除的记录',
					type: 'warning'
				});
				return;
			}
			this.$confirm('确定要删除选中的的记录吗？')
				.then(_ => {
					that.remove(that.removeArr)
				})
				.catch(_ => {})
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
					}
				},
				err => {
					console.log(err)
				}
			)
		}

	},
}