<template>
  <div class="container">
    <el-card>
      <el-form>
        <el-form-item label="荷石币消耗：">
          消耗
          <el-input-number v-model="data.num" :precision="0" :min="0" controls-position="right"></el-input-number>
          荷石币可抽一次奖
          <span class="ml20">
            每周首次抽奖免费
          </span>
        </el-form-item>
        <el-form-item label="大转盘投放奖品设置：">
          <span>必须配置一项奖品类型</span>
        </el-form-item>
        <common-conf v-if="status" class="mt20" :params="type1" :type="1"></common-conf>
        <common-conf v-if="status" class="mt20" :params="type201" :type="201"></common-conf>
        <!-- <common-conf v-if="status" class="mt20" :params="type202" :type="202"></common-conf> -->
        <common-conf v-if="status" class="mt20" :params="type3" :type="3"></common-conf>
        <common-conf v-if="status" class="mt20" :params="type6" :type="6"></common-conf>
      </el-form>
        <div class="mt20 mb20 btn">
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
      type6: [],
      status: false,
      flag: false
    }
  },
  computed: {
    awards() {
      return this.data.awards
    }
  },
  watch: {
    awards(val) {
      if (val.length > 7) {
        this.$message.warning('奖品设置项最多不能超过7条')
      }
    },
    // type1: function(val) {
    //   if (!this.flag) return
    //   this.data.awards.map((item, index) => {
    //     if (item.awardType == 1) {
    //       this.data.awards.splice(index, 1)
    //     }
    //   })
    //   this.data.awards.push(...val)
    // },
    // type201: function(val) {
    //   if (!this.flag) return
    //   this.data.awards.map((item, index) => {
    //     if (item.awardType == 201) {
    //       console.log(this.data.awards)
    //       this.data.awards.splice(index, 1)
    //       console.log(this.data.awards)
    //     }
    //   })
    //   this.data.awards.push(...val)
    //   console.log(val)
    // },
    // type202: function(val) {
    //   if (!this.flag) return
    //   this.data.awards.map((item, index) => {
    //     if (item.awardType == 202) {
    //       this.data.awards.splice(index, 1)
    //     }
    //   })
    //   this.data.awards.push(...val)
    // },
    // type3: function(val) {
    //   if (!this.flag) return
    //   this.data.awards.map((item, index) => {
    //     if (item.awardType == 3) {
    //       this.data.awards.splice(index, 1)
    //     }
    //   })
    //   this.data.awards.push(...val)
    // },
    // type6: function(val) {
    //   if (!this.flag) return
    //   this.data.awards.map((item, index) => {
    //     if (item.awardType == 6) {
    //       this.data.awards.splice(index, 1)
    //     }
    //   })
    //   this.data.awards.push(...val)
    // },
  },
  created() {
    this.getActDetail()
  },
  methods: {
    getActDetail() {
      this.$request.post('/api/wiseqr/md/queryExtAct', {flag: 1}, true, res => {
        this.status = true
        if (res.ret === '200000') {
          this.data = res.data
          // this.data.awards = []
          if (res.data.awards.length != 0) {
            res.data.awards.forEach(item => {
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
            this.flag = true
          }
          return
        }
        this.$message.error(res.message)
      })
    },
    save() {
      this.data.awards = []
      this.data.awards.push(...this.type1, ...this.type201, ...this.type202, ...this.type3, ...this.type6)
      if (this.data.awards.length > 7) return
      this.$request.post('/api/wiseqr/md/somExtAct', this.data, true, res => {
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
  .btn {
    text-align: center;
  }
</style>
