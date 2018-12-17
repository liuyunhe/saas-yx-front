<template>
  <div class="content">
    <el-card>
      <el-form label-width="100px">
        <div v-for="(item, index) in params" :key="index">
          <el-form-item :label="item.type === 202 ? '翻倍卡转赠' : '折扣卡转赠'">
            <el-radio v-model="item.give" :label="0">不可转赠</el-radio>
          </el-form-item>
          <el-form-item>
            <el-radio v-model="item.give" :label="1">可转赠</el-radio>
          </el-form-item>
          <el-form-item v-if="item.give == 1">
            <div>
              {{item.type === 202 ? '接收转赠翻倍卡数量：' : '接收转赠翻倍卡数量：'}}
              <el-radio v-model="item.isRecieveMax" :label="0">不限制</el-radio>
              <el-radio v-model="item.isRecieveMax" :label="1">指定</el-radio>
              <el-input-number style="width: 100px;" :disabled="item.isRecieveMax == 1 ? false : true" v-model="item.recieveMaxNum" :precision="0" :min="0" controls-position="right"></el-input-number>
              张
            </div>
          </el-form-item>
        </div>
      </el-form>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['params'],
  data() {
    return {
      
    }
  },
  mounted() {
    
  }
}
</script>
