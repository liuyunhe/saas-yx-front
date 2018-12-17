<template>
  <div class="container">
    <el-card>
      <el-form>
        <el-form-item label="每人每周参与答题抽奖次数：">
          <el-input-number v-model="data.num" :precision="0" :min="0" controls-position="right"></el-input-number>
          次
        </el-form-item>
        <el-form-item label="答题投放奖品设置：">
          <span>必须配置一项奖品类型</span>
        </el-form-item>
        <common-conf class="mt20" :params="type1" :type="1"></common-conf>
        <common-conf class="mt20" :params="type201" :type="201"></common-conf>
        <common-conf class="mt20" :params="type202" :type="202"></common-conf>
        <common-conf class="mt20" :params="type3" :type="3"></common-conf>
        <common-conf class="mt20" :params="type6" :type="6"></common-conf>
      </el-form>
      <div class="mt20 mb20">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
import commonConf from './components/commonConf'
export default {
  components: {
    commonConf
  },
  data() {
    return {
      data: {},
      type1: [],
      type201: [],
      type202: [],
      type3: [],
      type6: []
    }
  },
  watch: {
    type1: function(val) {
      this.data.awards.map((item, index) => {
        if (item.awardType == 1) {
          this.data.awards.splice(index, 1)
        }
      })
      this.data.awards.push(...val)
    },
    type201: function(val) {
      this.data.awards.map((item, index) => {
        if (item.awardType == 201) {
          this.data.awards.splice(index, 1)
        }
      })
      this.data.awards.push(...val)
    },
    type202: function(val) {
      this.data.awards.map((item, index) => {
        if (item.awardType == 202) {
          this.data.awards.splice(index, 1)
        }
      })
      this.data.awards.push(...val)
    },
    type3: function(val) {
      this.data.awards.map((item, index) => {
        if (item.awardType == 3) {
          this.data.awards.splice(index, 1)
        }
      })
      this.data.awards.push(...val)
    },
    type6: function(val) {
      this.data.awards.map((item, index) => {
        if (item.awardType == 6) {
          this.data.awards.splice(index, 1)
        }
      })
      this.data.awards.push(...val)
    },
  },
  created() {
    this.getActDetail()
  },
  methods: {
    getActDetail() {
      this.$request.post('/api/saotx/md/queryExtAct', {flag: 2}, true, res => {
        if (res.ret === '200000') {
          this.data = res.data
          if (this.data.awards.length != 0) {
            this.data.awards.forEach(item => {
              switch (item.awardType) {
                case 1:
                  this.type1.push(item)
                  break;
                case 201:
                  this.type201.push(item)
                  break;
                case 202:
                  this.type202.push(item)
                  break;
                case 3:
                  this.type3.push(item)
                  break;
                case 6:
                  this.type6.push(item)
                  break;
              }
            })
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    save() {
      this.$request.post('/api/saotx/md/somExtAct', this.data, true, res => {
        if (res.ret === '200000') return this.$message.success('保存成功')
        this.$message.error(res.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
span {
  color: #999999;
}
</style>

