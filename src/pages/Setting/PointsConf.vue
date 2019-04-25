<template>
  <div class="container">
    <el-card class="content">
      <el-form label-width="120px">
        <el-form-item label="积分过期设置：">
          <div>
            <el-radio v-model="isVaild" :label="0">永久有效</el-radio>
          </div>
          <div>
            <el-radio v-model="isVaild" :label="1">积分有效期为</el-radio>
            <el-select :disabled="!isVaild" v-model="selectedYear">
              <el-option v-for="(item, index) in yearList" :key="index" :label="item.name" :value="item.val"></el-option>
            </el-select>
            <el-popover
              placement="bottom"
              width="400"
              trigger="hover">
              <p>
                例如，设置为“1年”，即表示在今年（2018）获得的用户积分将在2018年12月31号23:59:59失效
                <br>
                <span :style="{
                  'margin-top': '10px',
                  'color': '#0000FF'
                }">
                  修改有效期只作用于未来获得的积分，请谨慎修改以防争议
                </span>
              </p>
              <el-button class="tips" slot="reference" circle plain> ? </el-button>
            </el-popover>
          </div>
        </el-form-item>
        <el-form-item label="积分值配置：">
          <el-input-number v-model="data.orgPorList[2].propValue" :controls="false" :min="0" :max="9999999999" :precision="0"></el-input-number> 
          积分 = ￥1.00
        </el-form-item>
        <el-form-item label="积分名称设置：">
          <el-input placeholder="请输入积分名称" v-model="data.orgPorList[1].propValue"></el-input>
          例如： 积分 = 金叶币
        </el-form-item>
      </el-form>
      <el-button class="btn" type="primary" @click="save">保存</el-button>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      yearList: [
        { name: '', val: 1},
        { name: '', val: 1},
        { name: '3年后', val: 1},
        { name: '4年后', val: 1},
        { name: '5年后', val: 1},
      ],
      selectedYear: '',
      isVaild: null,
      data: {
        orgPorList:[
          {propKey:'score_expiratione_time',propValue:'',propDesc:'积分有效期'},
          {propKey:'score_protion_value',propValue:'',propDesc:'积分值配置'},
          {propKey:'score_name_config',propValue:'',propDesc:'积分名称配置'}
        ]
      },

    }
  },
  created() {
    this.handleTime()
  },
  mounted() {
    const loading = this.$loading({target: '.el-card'})
    this.getDetail(() => loading.close())
  },
  methods: {
    getDetail(callback) {
      this.$request.post('/api/wiseqr/mber/scoreDetail', {}, true, res => {
        if (res.ret === '200000') {
          if (res.data.orgPorList.length != 0) this.data = res.data

          if (this.data.orgPorList[0].propValue == '-1') {
            this.isVaild = 0
          } else if (this.data.orgPorList[0].propValue && this.data.orgPorList[0].propValue != '-1') {
            this.isVaild = 1
            this.selectedYear = this.data.orgPorList[0].propValue
          }
          callback && callback()
          return
        }
        this.$message.error(res.message)
      })
    },
    handleTime() {
      let nowYear = new Date().getFullYear()
      this.yearList[0].name = `明年(${nowYear + 1})`
      this.yearList[1].name = `后年(${nowYear + 2})`
      this.yearList[0].val = nowYear + 1 + ''
      this.yearList[1].val = nowYear + 2 + ''
      this.yearList[2].val = nowYear + 3 + ''
      this.yearList[3].val = nowYear + 4 + ''
      this.yearList[4].val = nowYear + 5 + ''
    },
    save() {
      if (this.isVaild == 0) {
        this.data.orgPorList[0].propValue = '-1'
      } else if (this.isVaild == 1) {
        this.data.orgPorList[0].propValue = this.selectedYear
      }
      this.data.orgPorList[1].propValue += ''
      let qualifiedList = this.data.orgPorList.filter(item => {
        return item.propValue
      })
      if (qualifiedList.length != 3) return this.$message.error('请完善数据!')
      this.$request.post('/api/wiseqr/mber/saveScore', this.data, true, res => {
        if (res.ret === '200000') return this.$message.success('保存成功')
        this.$message.error(res.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  width: 200px;
}
.tips {
  width: 30px;
  height: 30px;
  margin-left: 10px;
  border-color: #606266;
}
.btn {
  margin-left: 120px;
}
</style>

