<template>
	<div class="ques-list-root">
		<el-breadcrumb separator-class="el-icon-arrow-right">
	      <el-breadcrumb-item>题目设置</el-breadcrumb-item>
	    </el-breadcrumb>
	    <el-card>
	    	<el-steps :active="stepActive" finish-status="success"align-center class='step-style'>
			  <el-step title="基础设置"></el-step>
			  <el-step title="题目设置"></el-step>
			  <el-step title="投放设置"></el-step>
			</el-steps>
			<!--新建和查询部分-->
			<el-button type="primary" size="small" @click="addQues()">新增题目</el-button>
			<el-upload :action="uploadURL" :headers="headerObj" :on-success="addBatch"accept='.xlsx' :show-file-list="false"class='upload-txt'>
                <el-button size="small" type="primary">批量导入</el-button>
            </el-upload>
			<!--<el-button type="primary" size="small" @click="addQues()">初始化题目</el-button>-->
			<br />
           	 关键字：<el-input size="small" v-model="keywords" placeholder="请输入关键词"class='keywords'></el-input>
           	<el-button type="primary" size="small" @click="search()"class='search'>查询</el-button>
           	<el-button type="primary" size="small" @click="reset()"class='search'>重置</el-button>
           	
	    </el-card>
	    <el-card class='table-part'>
	    	<el-table :data="tableData" v-loading="loading" style="width: 100%"border>
	    		
				<el-table-column type="index" label="序号" align="center">
				</el-table-column>
				<el-table-column prop="quesTitle" label="题目名称" align="center">
				</el-table-column>
				<el-table-column type="expand"label="答案">
			      <template slot-scope="props">
			        <el-form label-position="left" inline class="demo-table-expand">
			          <el-form-item label="题目名称：">
			            <span>{{ props.row.quesTitle }}</span>
			          </el-form-item>
			          <br />
			          <el-form-item label="题目答案：">			            
			          </el-form-item>	
			          <ul class='aws-part'>
			          	<li v-for='(item,key) in props.row.actAnsw':key='key'>{{item.answName}} <span v-show='item.answFlag==1'></span></li>
			          </ul>
			        </el-form>
			      </template>
			    </el-table-column>

				<el-table-column label="操作" align="center"width='200px'>
					<template slot-scope="scope">							
						<el-button type='primary' size="small" @click="editItem(scope.row)">编辑</el-button>
						<el-button @click="removeItem(scope.row)" type="danger" size="small">删除</el-button>
					</template>
				</el-table-column>
			</el-table>
			<el-pagination layout="total,prev, pager, next,jumper" background :total="total" @current-change="myCallback" :page-size="max" class="pagination-css">
			</el-pagination>
			<div class='next-div'>
				<el-button type="primary" @click="nextStep">下一步</el-button>
			</div>
		    
	    </el-card>
	</div>
	
</template>

<script>
	export default {
	  props: ['id', 'actCode','form'],
	  data() {	    
	    return {	      
	      stepActive:1,
	      keywords:'',
	      tableData:[],
	      loading:false,
	      max:5,
	      total:10,
	      headerObj: {
	        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
	        token: sessionStorage.getItem('access_token'),
	        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
	      },
	      uploadURL: '/api/saotx/actquest/import?actCode='+this.actCode,
	    }
	  },
	  watch: {
	  },
	  created() {
	  	this.getList();
	  },
	  methods: {
	  	myCallback(data){
	  		this.page = data;
			this.getList();
	  	},
	  	addQues(){
	  		this.$router.push(
	            '/market/actTpl/quesEdit?id='+this.id+'&actCode='+this.actCode+'&form='+this.form
	        )
	  	},
	  	reset(){
	  		this.page=1;
	  		this.keywords='';
	  		this.search();
	  	},
	  	addBatch(resule){
	  		if (resule.ret === '200000') {
	  			this.page=1;
	  			this.keywords='';
	  			this.getList();
	  			return this.$message.success('导入成功!')
	  		}
      		this.$message.error(resule.message)
	  	},
	  	editItem(item){
	  		this.$router.push(
	            '/market/actTpl/quesEdit?quesId=' + item.id+'&id='+this.id+'&actCode='+this.actCode+'&form='+this.form	        )
//	  		'/market/actTpl/quesEdit
	  	},
	  	search(){
	  		this.getList();
	  	},
	  	removeItem(item){
	  		var that = this
	      this.$confirm('确定要删除该问题？')
	        .then(_ => {
	          that.deleteQues(item)
	        })
	        .catch(_ => {})
	  	},
	  	deleteQues(item){
	  		this.$request.post('/api/saotx/actquest/delete', {
	  			actQuest:{
	        		id:item.id,
	        		quesId:item.quesId,
	        		actCode:item.actCode,
	        		quesTitle:item.quesTitle,
	        		quesType:item.quesType
	        	},
	        	actAnsw:item.actAnsw
	  		}, true, res => {
		        if (res.ret == '200000') {
		        	this.$message.success('删除成功!')
		        	this.getList();
		        	return
		        }
		        this.$message.error(res.messgae)
		    })
	  	},
	  	getList(){
	  		this.$request.post('/api/saotx/actquest/list', {
	  			pageNo: this.page,
				pageSize: this.max,
				keywords:this.keywords,
				actCode:this.actCode
	  		}, true, res => {
		        if (res.ret == '200000') {
		        	this.total = res.data.page.count;
		       		this.tableData=res.data.list;
		        	return
		        }
		        this.$message.error(res.messgae)
		    })
	  	},
	    getDetail() {
	      if (!this.id) return
	      this.$request.post('/api/saotx/act/detail', { id: this.id }, true, res => {
	        if (res.ret == '200000') {
	          if (this.clone == '1') {
	            for (let key in this.confData) {
	              this.confData[key] = res.data.act[key]
	            }
	            console.log(this.confData)
	          } else {
	            this.confData = res.data.act
	          }
	          this.confData.idx = this.confData.idx + ''
	          this.actTime.push(this.confData.stimeStr)
	          this.actTime.push(this.confData.etimeStr)
	          return
	        }
	        this.$message.error(res.messgae)
	      })
	    },
	    nextStep() {
	        this.$router.push(
	            '/market/actTpl/actPutConf?id=' + this.id + '&actCode=' + this.actCode +'&form='+this.form
	        )
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	.step-style {
		margin-bottom: 40px;
	}
	.keywords {
		width:150px;
		margin-top: 20px;
	}
	.search {
		margin-top: 20px;
	}
	.table-part {
		margin-top: 10px;
	}
	.pagination-css {
		margin-top: 20px;
	}
	.aws-part {
		display: inline-block;
		margin-left: -10px;
		li {
			line-height: 32px;
			span{
				display: inline-block;
				vertical-align: middle;
				width:20px;
				height: 20px;
				background: url('http://weiopn.oss-cn-beijing.aliyuncs.com/new_platform/right_1.png') no-repeat center / contain;
			}
		}
	}
	.next-div {
		display: flex;
		justify-content: center;
		margin-top: 30px;
	}
	.upload-txt {
		display: inline-block;
	}
</style>