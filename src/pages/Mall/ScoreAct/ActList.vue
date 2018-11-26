<template>
	<div class="act-list-root">
		<ul>
			<li v-for='(item,key) in actList' :key='key'>
				<div class="con">
					<img :src="item.gameImg" @click="getDetail(key)" alt="" />
					<div class="act-info">
						<div class="act-left">
							<p>{{item.gameName}}</p>
							<p>精彩送不停</p>
						</div>
						<div class="act-right">
							<el-switch v-model="item.status==1?true:false" @change='toggle(key)'>
							</el-switch>
						</div>
					</div>
				</div>
			</li>
			<li></li>
			<li></li>
			<li></li>
		</ul>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				state: true,
				actList: []
			}
		},
		created() {
			this.init();
		},
		methods: {
			init() {
				this.$request.post('/sc/saotx/game/getGames', {}, true, (res) => {
					if(res.code === 200) {
						this.actList = res.context;
					}
				})
			},
			getDetail(index) {
				var that = this;
				if(this.actList[index].type == 1) {
//					老虎机活动
					this.$router.push({
						path: '/mall/score/edit',
						query: {
							id: that.actList[index].id
						}
					})
				}

			},
			toggle(key) {
				var id = this.actList[key].id;
				if(this.actList[key].status == 0) {

					this.$confirm('确定要启用该活动？')
						.then(_ => {
							this.$set(this.actList[key], 'status', 1);
							this.$request.post('/sc/saotx/game/changeGameState', {
								id: id,
								status: 1
							}, true, (res) => {
								if(res.code === 200) {
									this.init();
								}
							})
						})
						.catch(_ => {})
				} else {

					this.$confirm('确定要禁用该活动？')
						.then(_ => {
							this.$set(this.actList[key], 'status', 0);
							this.$request.post('/sc/saotx/game/changeGameState', {
								id: id,
								status: 0
							}, true, (res) => {
								if(res.code === 200) {
									this.init();
								}
							})
						})
						.catch(_ => {})
				}

			},
		}
	}
</script>

<style lang='scss' scoped>
	.act-list-root {
		background: #fff;
		color: #515151;
		padding: 20px;
		border-radius: 4px;
		ul {
			width: 100%;
			overflow: hidden;
			li {
				width: 25%;
				height: 280px;
				float: left;
				box-sizing: border-box;
				padding: 10px;
				margin-bottom: 20px;
				cursor: pointer;
				.con {
					width: 100%;
					height: 100%;
					border: 1px solid #ccc;
					overflow: hidden;
					img {
						width: 100%;
						height: 180px;
						object-fit: cover;
					}
					.act-left {
						width: 65%;
						float: left;
					}
					.act-right {
						width: 30%;
						float: right;
						height: 60px;
						text-align: center;
						margin-top: 20px;
					}
					p {
						margin: 0;
						margin-left: 10px;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						display: -webkit-box;
						-webkit-line-clamp: 1;
						/*! autoprefixer: off */
						-webkit-box-orient: vertical;
						/* autoprefixer: on */
						&:nth-child(1) {
							font-weight: bold;
							font-size: 16px;
							margin: 10px 0 10px 10px;
						}
					}
				}
			}
		}
	}
</style>