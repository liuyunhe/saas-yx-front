<template>
	<div class="ques-edit-root">
		<el-breadcrumb separator-class="el-icon-arrow-right">
	      <el-breadcrumb-item>题目设置</el-breadcrumb-item>
	    </el-breadcrumb>
	    <el-card>
	    	<el-steps :active="stepActive" finish-status="success"align-center class='step-style'>
			  <el-step title="基础设置"></el-step>
			  <el-step title="题目设置"></el-step>
			  <el-step title="投放设置"></el-step>
			</el-steps>
			<div class="title">{{titleName}}</div>
           	<el-form label-width="100px"class='ques-part'>
		        <el-form-item label="题目名称">
		          <el-input v-model="detailData.quesTitle"class='ques-input'></el-input>
		        </el-form-item>
		        <el-form-item label="题目答案">
		          <span>(限最多四个)</span>
		        </el-form-item>
		        <el-form-item label=""v-for='(item,key) in detailData.actAnsw':key='key'>
		          <el-checkbox v-model="item.answFlag"class='answer-checkbox'></el-checkbox>
		          <el-input size="small" v-model="item.answName" placeholder="请输入答案"class='answer'></el-input>
		          <span class='add'v-show='addFlag'@click='add(key)'>+</span>
		          <span class='remove'v-show='key>1'@click='remove(key)'>-</span>
		          
		        </el-form-item>
		        <el-form-item>
		          <el-button type="primary" @click="nextStep">保存</el-button>
		          <el-button @click="back">返回题目列表</el-button>
		        </el-form-item>
		      </el-form>
	    </el-card>
	</div>
</template>

<script>
	export default {
	  props: ['id', 'actCode'],
	  data() {	    
	    return {	      
	      stepActive:1,
	      keywords:'',
	      tableData:[],
	      loading:false,
	      max:10,
	      total:10,
	      titleName:'',
	      detailData:{
	      	quesTitle:'',
	      	actAnsw:[]
	      },
	      addFlag:false
	    }
	  },
	  watch: {
	  	detailData:{
	  		handler(val){
	  			if(val.actAnsw.length>3){
	  				this.addFlag=false;
	  			}else {	  				
	  				this.addFlag=true;
	  			}
	  		},
	  		deep:true
	  	}
	  		
	  },
	  created() {
	  	if(this.id){
	  		this.titleName='编辑题目';
	  	}else {
	  		this.titleName='新增题目';
	  	}
	  	this.getDetail();
	  },
	  methods: {
	  	add(key){
	  		this.detailData.actAnsw.splice(key+1, 0, {
	  			answFlag: false,
				answName: "",
	  		});
	  	},
	  	remove(key){
	  		this.detailData.actAnsw.splice(key,1)
	  	},
	    getDetail() {
	      if (!this.id) return
	      this.$request.post('/api/saotx/actquest/detail', { actQuest: {
	      	id:parseInt(this.id)
	      } }, true, res => {
	        if (res.ret == '200000') {
	          this.detailData=res.data.bean;
	          this.detailData.actAnsw.forEach((item)=>{
	          	item.answFlag==1?item.answFlag=true:item.answFlag=false;
	          })
	          return
	        }
	        this.$message.error(res.messgae)
	      })
	    },
	    back(){
	    	this.$router.push('/market/actTpl/quesActSetConf?id='+id+'&actCode='+actCode)
	    },
	    nextStep() {
	      this.$refs.actSetConfRef.validate(valid => {
	        if (!valid) return this.$message.error('请完善表单数据!')
	        if (!this.id) {
	          this.confData.form = this.form
	          this.confData.tplCode = this.tplCode
	        }
	        this.$request.post('/api/saotx/act/saveOrModify', this.confData, true, res => {
	          if (res.ret === '200000') {
	            return this.$router.push(
	              '/market/actTpl/actPutConf?id=' + res.data.id + '&actCode=' + res.data.actCode
	            )
	          }
	          this.$message.error(res.message)
	        })
	      })
	    }
	  }
	}
</script>

<style lang="scss" scoped>
	.step-style {
		margin-bottom: 40px;
	}
	.title {
		font-size: 16px;
		text-align: center;
		line-height: 40px;
		font-weight: bold;
		margin-bottom: 20px;
	}
	.ques-input {
		width:350px;
	}
	.ques-part {
		width:550px;
		margin: 0 auto;
	}
	.answer {
		width:350px;
	}
	.answer-checkbox {
		margin-left: -28px;
		margin-right: 10px;
	}
	.remove,.add {
		display: inline-block;
		width:20px;
		height: 20px;
		line-height: 16px !important;
		font-size: 18px;
		text-align: center;
		border-radius: 50%;
		border:1px solid red;
		vertical-align: middle;
		color:red;
		box-sizing: border-box;
		cursor: pointer;
		margin-left: 5px;
	}
	.add {
		color:green;
		border:1px solid green;
		
	}
</style>