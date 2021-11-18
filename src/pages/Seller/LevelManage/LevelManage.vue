<template>
  <div class="container">
    <el-card v-loading="loading" :body-style="{ padding: '30px 0 0'}">
      <template v-for="(item,index) in dataList">
        <el-card :body-style="{ padding: '0px' }" style="width: 250px;float: left;margin-left: 30px;margin-bottom: 30px">
          <div class="lv-title">{{ item.levelName }}</div>
          <div class="img-container">
            <img class="lv-icon" :src="item.levelIconUrl">
          </div>
          <div class="lv-tips">需要等级值{{item.levelScoreMin}}</div>
          <div style="padding: 14px;">
            <div style="margin-bottom: 10px;height: 24px;color: #999;display: none">
              <span style="float: left">等级权益</span>
              <span style="float: right">{{item.shopLevel}}</span>
            </div>

            <div class="bottom clearfix">
              <el-switch
                  v-model="item.status"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                  @change="(value) => {handleChange(item.id,value)}"
                  :active-value="1"
                  :inactive-value="0">
              </el-switch>
              <el-button type="text" class="button" style="margin-top: 4px" @click="$router.push(`/seller/editLevel?id=${item.id}`)">编辑</el-button>
            </div>
          </div>
        </el-card>
      </template>

    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading:true,
      dataList:[],
      handleChange(id,value){
        console.log(id,value)
        let path = ''
        if(value === 0) {
          path = '/saasHbseller/shopLevel/close'
        }else {
          path = '/saasHbseller/shopLevel/open'
        }
        this.$request.post(path, {id}, false, res => {
          if (res.code == '200') {
            this.getInfo()
            return
          }
          this.$message.error(res.msg)
          this.getInfo()
        })
      }
    }
  },
  created() {
    this.getInfo()
  },
  methods: {
    getInfo() {
      this.$request.post('/saasHbseller/shopLevel/query', {}, true, res => {
        if (res.code == '200') {
          this.dataList = res.data.dataList
          this.loading = false
          return
        }
        this.$message.error(res.msg)
      })
    }
  },

};
</script>
<style lang="scss" scoped>
.lv-title {
  text-align: center;
  font-size: 14px;
  line-height: 50px;
}

.lv-tips {
  text-align: center;
  line-height: 50px;
  border-bottom: 1px solid #ebeef5;
}

.button {
  padding: 0;
  float: right;
}
.img-container{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}
.lv-icon {
  width: 60px;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both
}
</style>
