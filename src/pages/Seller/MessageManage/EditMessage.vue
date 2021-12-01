<template>
  <div class="msg-container">
    <el-card>
      <el-form label-width="120px" :model="form" :rules="rules" ref="form">
        <div class="title">基本信息：</div>
        <el-form-item :size="'small'" label="消息主标题：" prop="title">
          <el-input placeholder="请输入消息主标题，最长10个字" v-model="form.title" maxlength="10"   style="width: 300px" />
        </el-form-item>
        <el-form-item :size="'small'" label="消息副标题：" prop="subTitle">
          <el-input placeholder="请输入消息副标题，最长20个字" v-model="form.subTitle" maxlength="20"  style="width: 300px" />
        </el-form-item>
        <el-form-item :size="'small'" label="消息内容：" prop="msgContent">
          <el-input type="textarea" placeholder="请输入消息内容，最长100个字" v-model="form.msgContent" maxlength="100"   style="width: 300px" />
        </el-form-item>
        <div class="title">接收条件：</div>
        <el-form-item label="目标销区：" prop="saleZoneCode">
          <el-select size="small" v-model="form.saleZoneCode" placeholder="请选择">
            <el-option
                v-for="(item,index) in saleZone"
                :key="index"
                :label="item.zoneName"
                :value="item.zoneCode">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择接收人:" prop="msgTarget">
          <el-radio-group v-model="form.msgTarget">
            <el-radio label="1" >零售户</el-radio>
            <el-radio label="2" >消费者</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="选择档位：" prop="shopGearList">
          <el-select size="small" multiple v-model="form.shopGearList" placeholder="请选择" @change="(value)=>{handleSelectChange(value,'shopGearList')}">
            <el-option value="0" label="全部">全部</el-option>
            <el-option value="1" label="1档">1档</el-option>
            <el-option value="2" label="2档">2档</el-option>
            <el-option value="3" label="3档">3档</el-option>
            <el-option value="4" label="4档">4档</el-option>
            <el-option value="5" label="5档">5档</el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择等级：" prop="shopLevelList">
          <el-select size="small" multiple v-model="form.shopLevelList" placeholder="请选择" @change="(value)=>{handleSelectChange(value,'shopLevelList')}">
            <el-option value="0" label="全部">全部</el-option>
            <el-option value="1" label="1级">1级</el-option>
            <el-option value="2" label="2级">2级</el-option>
            <el-option value="3" label="3级">3级</el-option>
            <el-option value="4" label="4级">4级</el-option>
            <el-option value="5" label="5级">5级</el-option>
            <el-option value="6" label="6级">6级</el-option>
            <el-option value="7" label="7级">7级</el-option>
            <el-option value="8" label="8级">8级</el-option>
          </el-select>
          <el-button type="primary" @click="onCheckNum" >查看人数</el-button>
        </el-form-item>
        <el-form-item label="是否立即发送:" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio label="1" >是</el-radio>
            <el-radio label="0" >否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="confUpdate('form')" style="width: 100px">提交</el-button>
          <router-link to="/seller/messagemgr" replace>
            <el-button  @click="" style="width: 100px">返回</el-button>
          </router-link>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "AddMessage",
  props:['id'],
  data(){
    return{
      showNum:false,
      form:{
        id:'',
        title:'',
        subTitle:'',
        msgContent:'',
        saleZoneCode: null,
        msgTarget:null,
        status:'1',
        shopGearList:[],
        shopLevelList:[]
      },
      rules: {
        title: [{required:true, message:'请输入消息主标题', trigger:'blur'}],
        subTitle: [{required:true, message:'请输入消息副标题', trigger:'blur'}],
        msgContent: [{required:true, message:'请输入消息内容', trigger:'blur'}],
        saleZoneCode: [{required:true, message:'请选择销区', trigger:'change'}],
        msgTarget: [{required:true, message:'请选择接收人', trigger:'change'}],
        status: [{required:true, message:'请选择是否发送',trigger:'change'}],
        shopGearList: [{required:true, message:'请选择档位', trigger:'change'}],
        shopLevelList: [{required:true, message:'请选择等级', trigger:'change' }]
      },
      saleZoneCode: sessionStorage.getItem('isAllSaleZone') == 1 ? null : sessionStorage.getItem('saleZoneCode'),
      saleZone:[],

    }
  },
  created() {
    this.getSaleZone()
    this.$request.post('/saasHbseller/msg/system/detail', {id:this.id}, false, (res) => {
      if (res.code == '200') {
        this.form.id = res.data.msgDetail.id
        this.form.title = res.data.msgDetail.title
        this.form.subTitle = res.data.msgDetail.subTitle
        this.form.msgContent = res.data.msgDetail.msgContent
        this.form.saleZoneCode = res.data.msgDetail.saleZoneCode
        this.form.msgTarget = res.data.msgDetail.msgTarget + ''
        this.form.status = res.data.msgDetail.status + ''
        let shopGearList = res.data.gears
        let shopLevelList = res.data.levels
        if(shopGearList.length == 5) {
          this.form.shopGearList = ['0']
        }else  {
          this.form.shopGearList = shopGearList.map(i=>i.shopGear+'')
        }
        if(shopLevelList.length == 8) {
          this.form.shopLevelList = ['0']
        }else  {
          this.form.shopLevelList = shopLevelList.map(i=>i.shopLevel+'')
        }
      } else {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
      }

    })

  },
  methods:{
    onCheckNum(){
      if(!this.form.saleZoneCode) {
        this.$message({
          message: '请选择销区',
          type: 'warning'
        });
        return
      }
      if(!this.form.msgTarget) {
        this.$message({
          message: '请选择接收人',
          type: 'warning'
        });
        return
      }
      if(!this.form.shopGearList.length) {
        this.$message({
          message: '请选择档位',
          type: 'warning'
        });
        return
      }
      if(!this.form.shopLevelList.length) {
        this.$message({
          message: '请选择等级',
          type: 'warning'
        });
        return
      }
      const params = {
        saleZoneCode:this.form.saleZoneCode,
        msgTarget:this.form.msgTarget,
        shopGears:this.form.shopGearList.join(','),
        shopLevels:this.form.shopLevelList.join(',')
      }
      console.log(params)
      if(params.shopGears === '0'){
        params.shopGears = ['1','2','3','4','5'].join(',')
      }
      if(params.shopLevels === '0'){
        params.shopLevels = ['1','2','3','4','5','6','7','8'].join(',')
      }
      this.$request.post('/saasHbseller/msg/system/totalNum', params, false, (res) => {
        if (res.code == '200') {
          this.$alert(`当前人数${res.data.totalNum}`, '查看人数', {
            confirmButtonText: '确定',
          })
        }else {
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      })


    },
    handleSelectChange(value,key){
      console.log(value)
      if(value.indexOf('0') >= 0 ){
        console.log(11110)
        this.form[key] = []
        this.form[key].push('0')
      }
    },
    getSaleZone() {
      this.$request.post('/api/saleZone/userSzList', {}, true, (res) => {
        if (res.code == '200') {
          this.saleZone = res.data || []
        }
      })
    },
    confUpdate(form){
      this.$refs[form].validate((valid) => {
        if (valid) {
          const params = Object.assign({},this.form)
          if(params.shopGearList.length == 1 && params.shopGearList[0] === '0'){
            params.shopGearList = ['1','2','3','4','5']
          }
          if(params.shopLevelList.length == 1 && params.shopLevelList[0] === '0'){
            params.shopLevelList = ['1','2','3','4','5','6','7','8']
          }
          this.$request.post('/saasHbseller/msg/system/update', params, true, (res) => {
            if (res.code == '200') {
              this.$message({
                message: '更新成功！',
                type: 'success'
              })
              this.$router.push('/seller/messagemgr')
            } else {
              console.log(res)
              this.$message({
                message: res.msg,
                type: 'warning'
              });
            }
          })
        }
      })
    }
  }
}
</script>

<style scoped>
.space {position:relative;width:100%;height:20px;}
.el-input, .el-select {
  width: 200px;
}
.title {
  height: 20px;
  line-height: 20px;
  font-size: 16px;
  font-weight: bolder;
  margin-bottom: 20px;
}
</style>
