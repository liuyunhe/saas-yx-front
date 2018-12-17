<template>
  <el-card>
    <div slot="header" class="clearfix">
      <span v-if="type == 1">实物</span>
      <span v-if="type == 2">折扣卡</span>
      <span v-if="type == 3">红包</span>
      <span v-if="type == 3" style="color: #999;">投入总金额：xx元  剩余总金额：xx元</span>
      <span v-if="type == 6">积分</span>
    </div>
    <el-form>
      <el-form-item>
        <span v-if="type == 1">选择实物：</span>
        <span v-if="type == 2">选择折扣卡：</span>
        <span v-if="type == 3">选择翻倍卡：</span>
        <span v-if="type == 6">选择荷石币：</span>
        <el-button icon="el-icon-plus" @click="getDoubleCardList"></el-button>
      </el-form-item>
      <el-form-item v-if="params" v-for="(item, index) in params" :key="index">
        <span v-if="type == 1">实物名称</span>
        <span v-if="type == 2">折扣值</span>
        <span v-if="type == 3">面额</span>
        <span v-if="type == 6">面额</span>
        <span style="display: inline-block; width: 70px">{{item.awardName}}</span>
        投放数量：
        <el-input-number v-model="item.totalNum" :precision="0" :min="0" controls-position="right"></el-input-number>
        <span class="mr20" v-if="item.id" style="font-size: 12px; color: #aaa;">
          剩余数量：{{item.totalNum - item.stockNum}}个
        </span>
        中奖概率：
        <el-input-number v-model="item.probability" style="width: 90px" :precision="0" :min="0" :max="100" controls-position="right"></el-input-number>%
        <el-button class="ml20" type="danger" @click="del(item, index)">删除</el-button>
        <el-button type="primary" v-if="item.id" @click="add(item.id, index)">增库</el-button>
      </el-form-item>
    </el-form>
    <el-dialog title="选择折扣卡" :close-on-click-modal="false" :visible.sync="dataListVisible" width="800px">
      <el-table class="mb20" ref="doubleCardTable" :data="dataList" tooltip-effect="dark" style="width: 100%" @select-all="handleSelectionAllChange" @select="handleSelectionChange">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="name" label="姓名"></el-table-column>
        <el-table-column prop="valueAlias" label="倍数"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="scope.row.icon" width="50" alt="">
          </template>
        </el-table-column>
      </el-table>
      <el-button type="primary" size="medium" @click="confirmChecked">选择勾选的折扣卡</el-button>
    </el-dialog>
  </el-card>
</template>
<script>
export default {
  props: ['type', 'params'],
  data() {
    return {
      
    }
  },
  created() {
    console.log(this.type)
  },
}
</script>
