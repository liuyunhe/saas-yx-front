<template>
  <div class="content">
    <el-form-item label="中奖时段：">
      <el-date-picker
        @change="handleTimeLimit"
        v-model="queryParams.queryTimeArr"
        format="yyyy-MM-dd"
        :clearable="false"
        value-format="yyyy-MM-dd"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
      ></el-date-picker>
    </el-form-item>
  </div>
</template>
<script>
export default {
  props: {
    queryParams: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      nowDate: '',
      oldDate: '',
      // queryTimeArr: []
    }
  },
  created() {
    this.getNowDate()
  },
  methods: {
     getNowDate() {
      let nowDate = new Date().getTime()
      let oldDate = (nowDate - (60 * 60 * 24 * 29 * 1000))
      this.nowDate = new Date(nowDate).Format('yyyy-MM-dd')
      this.oldDate = new Date(oldDate).Format('yyyy-MM-dd')
      this.queryParams.queryTimeArr = [this.oldDate, this.nowDate]
      this.handleTimeLimit()
      this.$emit('init', [this.nowDate, this.oldDate])
    },
    handleTimeLimit() {
      if (!this.queryParams.queryTimeArr) {
        this.queryParams.stime = "";
        this.queryParams.etime = "";
      } else {
        let stime = new Date(this.queryParams.queryTimeArr[0]).getTime();
        let etime = new Date(this.queryParams.queryTimeArr[1]).getTime();
        if ((etime - stime) / 1000 / 3600 / 24 > 30) {
          this.$message.error("中奖时段间隔查询不能超过30天");
          this.queryParams.queryTimeArr = [this.oldDate, this.nowDate];
        }
        this.queryParams.stime = this.queryParams.queryTimeArr[0];
        this.queryParams.etime = this.queryParams.queryTimeArr[1];
      }
    }
  }
};
</script>
