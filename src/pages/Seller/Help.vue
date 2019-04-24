<template>
  <div>
    <el-card class="box-card">
      <el-form :model="form" :rules="rules" ref="form" label-width="150px">
        <el-form-item label="活动名称" prop="name">
          <el-input size="small" v-model="form.actName"></el-input>
        </el-form-item>
        <el-form-item label="助力时间" prop="hstimeStr">
          <el-date-picker v-model="form.hstimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期"></el-date-picker>
          至
          <el-date-picker v-model="form.hetimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动时间" prop="actStimeStr">
          <el-date-picker v-model="form.actStimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择开始日期"></el-date-picker>
          至
          <el-date-picker v-model="form.actEtimeStr" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择结束日期"></el-date-picker>
        </el-form-item>
        <el-form-item label="活动规则" prop="note">
          <el-input size="small" type="textarea" v-model="form.note" :autosize="{ minRows: 3, maxRows: 10}"></el-input>
        </el-form-item>
        <el-form-item label="助力类型" prop="htype">
          <el-radio size="small" v-model="form.htype" :label="1">累计助力</el-radio>
          <el-radio size="small" v-model="form.htype" :label="2">拉新助力</el-radio>
          <p class="form-note">
            提示：累计助力为零售户在活动时间内所有店铺粉丝数量；<br>
            <span class="pl36">拉新助力为零售户在活动时间内新增粉丝数量，不含活动之前的粉丝数量。</span>
          </p>
        </el-form-item>
        <el-form-item label="抽奖机会设置">
          <table class="award-table" border="1">
            <thead>
              <td>粉丝数量（人）</td>
              <td>抽奖机会（次）</td>
              <td></td>
            </thead>
            <tr v-for="(item, index) in form.exchanges" :key="item.key">
              <td>
                <input type="hidden" v-model="item.id"/>
                <input type="number" v-model="item.srange"/>
              </td>
              <td>
                <input type="number" v-model="item.num"/>
              </td>
              <td>
                <el-button size="small" type="primary" @click="addItem" v-if="index===0">新增</el-button>
                <el-button size="small" type="danger" @click="removeItem(item.key)"  v-if="index!==0">删除</el-button>
              </td>
            </tr>
          </table>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="somAct('form')">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    var validName = (rule, value, callback) => {
      if( !this.form.actName ) {
        callback(new Error('活动名称不能为空！'));
      } else if( this.form.actName.length >= 30 ) {
        this.form.actName = this.form.actName.substr(0, 30)
        callback(new Error('活动名称长度不能大于30个字符！'));
      } else {
        callback();
      }
    };
    var validNote = (rule, value, callback) => {
      if( !this.form.note ) {
        callback(new Error('活动规则不能为空！'));
      } else if( this.form.note.length >= 500 ) {
        this.form.note = this.form.note.substr(0, 500)
        callback(new Error('活动规则长度不能大于200个字符！'));
      } else {
        callback();
      }
    };
    var validHtime = (rule, value, callback) => {
      if( !this.form.hstimeStr || !this.form.hetimeStr ) {
        callback(new Error('助力时间不能为空！'));
      } else if( this.form.hstimeStr >= this.form.hetimeStr ) {
        callback(new Error('助力开始时间必须小于助力结束时间！'));
      } else {
        callback();
      }
    };
    var validActtime = (rule, value, callback) => {
      if( !this.form.actStimeStr || !this.form.actEtimeStr ) {
        callback(new Error('活动时间不能为空！'));
      } else if( this.form.actStimeStr >= this.form.actEtimeStr ) {
        callback(new Error('活动开始时间必须小于活动结束时间！'));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      form: {
        id: '',
        actName: '',
        note: '',
        htype: '',
        hstimeStr: '',
        hetimeStr: '',
        actStimeStr: '',
        actEtimeStr: '',
        exchanges: []
      },
      rules: {
        actName: [{required:true, validator:validName, trigger:'change'}],
        note: [{required:true, validator:validNote, trigger:'change'}],
        hstimeStr: [{required:true, validator:validHtime, trigger:'blur'}],
        hetimeStr: [{required:true, validator:validHtime, trigger:'blur'}],
        actStimeStr: [{required:true, validator:validActtime, trigger:'blur'}],
        actEtimeStr: [{required:true, validator:validActtime, trigger:'blur'}]
      }
    }
  },
  created() {
    this.curAct()
  },
  methods: {
    curAct () {
      this.$request.post('/lsh/seller-manager/help/curAct', {}, true, (res)=>{
        if (res.ok) {
          let datas = res.data || {}
          let exchanges = datas.exchanges || [];
          for (let i=0; i<exchanges.length; i++) {
            exchanges[i].key = new Date().Format("yyyyMMddhhmmssS") + Math.random()
          }
          this.form = datas;
          this.form.hstime = ''
          this.form.hetime = ''
          this.form.actStime = ''
          this.form.actEtime = ''
        } else {
          this.$message.error(res.msg);
        }
      })
    },
    somAct (form) {
      let exchanges = this.form.exchanges;
      if(exchanges.length==0) {
        this.$message.error("抽奖机会设置不能为空！")
        return false
      }
      for(let i=0; i<exchanges.length; i++) {
        let item = exchanges[i]
        if(!item.srange||!item.num||item.srange<1||item.num<1) {
          this.$message.error("第"+(i+1)+"行设置中粉丝数量、抽奖机会不能为空且必须大于0！")
          return false
        }
      }
      this.$refs[form].validate((valid) => {
        if (valid) {
          this.$request.post('/lsh/seller-manager/help/somAct', this.form, true, (res)=>{
            if (res.ok) {
              this.curAct()
            } else {
              this.$message.error(res.msg)
            }
          })
        }
      })
    },
    // 动态增加一行配置
    addItem () {
      // 目前只支持红包类型。所以awardType默认写死为3
      let item = {id: '', srange: '', num: ''}
      item.key = new Date().Format("yyyyMMddhhmmssS") + Math.random();
      this.form.exchanges.push( item );
    },
    // 删除一行配置
    removeItem (key) {
      if (this.form.exchanges.length<=1) {
        this.$message.error('抽奖机会设置不能为空！')
        return false
      }
      console.log(key)
      for (let i=0; i<this.form.exchanges.length; i++) {
        if (this.form.exchanges[i].key==key) {
          this.form.exchanges.splice(i, 1)
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .space {position:relative;width:100%;height:20px;}
  .pl36 {padding-left:36px;}
  .form-note {font-size: 12px;color:#aaa;line-height:20px;}
  .el-input, .el-textarea {
    width: 600px;
  }
  .el-date-editor {
    width: 288px;
  }
  .award-table {
    margin-top: 10px;
    width: 600px;
    text-align: center;
    border-color:#ebeef5;
    border-collapse: collapse;
    color: #707478;
    thead {
      background: #ebeef5;
    }
    td {
      width: 33%;
      input {
        color: #888;
        outline:none;
        text-align: center;
        width: 90%;
        height: 24px;
        padding: 0 5px;
        border: none;
        background:transparent;
      }
      input::focus {
        outline:none;
        background-color: transparent;
      }
      input::selection{background:transparent;}
      input::-moz-selection{background:transparent;}
      input.one-cell-two {
        width: 35%;
      }
    }
  }
</style>
