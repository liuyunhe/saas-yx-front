<template>
  <div class="pond">
    <el-form ref="form" :model="pondConf" label-width="100px">
      <el-form-item label="奖品类型:">
        <el-select size="medium" v-model="pondConf.awardType" multiple placeholder="请选择">
          <el-option v-for="item in prizeList" :key="item.type" :label="item.name" :value="item.type">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="奖品名称:">
        <el-col :span="10">
          <el-input size="medium" v-model="pondConf.prizeName" placeholder="请输入奖品名称"></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="选择物品:">
        <el-button size="medium">选择</el-button>
      </el-form-item>
      <el-form-item label="投放数量:">
        <el-input-number size="small" v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 个
      </el-form-item>
      <el-form-item label="中奖概率:">
        <el-input-number size="small" v-model="pondConf.remainNum" :min="0" :max="100" controls-position="right"></el-input-number> %
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.hasWarn">阈值预警</el-checkbox>
        <span v-if="pondConf.hasWarn">
          <el-input-number size="small" v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 个
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isGiveScore">同时送积分</el-checkbox>
        <span v-if="pondConf.isGiveScore">
          <el-button size="medium" class="ml20 mr20">选择</el-button>
          <el-input-number size="small" v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 积分
        </span>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="pondConf.isGiveScore">中奖后引导关注公众号</el-checkbox>
        <el-checkbox v-model="pondConf.hasPdMaxOut">每天出奖总次数限制</el-checkbox>
        <span v-if="pondConf.hasPdMaxOut">
          <el-input-number size="small" v-model="pondConf.remainNum" :min="0" controls-position="right"></el-input-number> 次
        </span>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: ['awae', 'prizeType'],
  data() {
    return {
      pondConf: this.awae,
      prizeList: this.prizeType
    }
  }
}
</script>
