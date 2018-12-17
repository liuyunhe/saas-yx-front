<template>
  <div class="content">
    <el-card>
      <div slot="header" class="clearfix">
        <span>幸运值</span>
      </div>
      <el-form :model="params">
        <el-form-item>
          每分享一次可获得
          <el-input-number style="width: 100px;" v-model="params.shareLuck" :precision="0" :min="0" controls-position="right"></el-input-number>
          幸运值
        </el-form-item>
        <el-form-item>
          每周每人最多可获得
          <el-input-number style="width: 100px;" v-model="params.shareMaxpwLuck" :precision="0" :min="0" controls-position="right"></el-input-number>
          幸运值
        </el-form-item>
      </el-form>
    </el-card>
    <double-card v-if="double" class="mt20" :params="double"></double-card>
    <discount-card v-if="discount" class="mt20" :params="discount"></discount-card>
  </div>
</template>
<script>
import doubleCard from './doubleCard.component'
import discountCard from './discountCard.component'
export default {
  props: ['params', 'double', 'discount'],
  components: {
    doubleCard,
    discountCard
  },
  data() {
    return {

    }
  }
}
</script>
