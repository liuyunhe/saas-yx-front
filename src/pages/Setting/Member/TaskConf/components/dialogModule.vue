<template>
  <div class="content">
    <el-form :inline="true">
      <el-form-item label="关键词">
        <el-select v-model="selectedNum">
          <el-option v-for="(item, index) in optionArr" :key="index" :label="item.name" :value="item.id"></el-option>
        </el-select>
        <el-input v-model="queryStr"></el-input>
      </el-form-item>
      <el-form-item label="礼品类型">
        <el-select v-model="giftType" class="type" placeholder="请选择礼品类型">
          <el-option v-for="(val, key) in giftType" :key="key" :label="val" :value="key"></el-option>
        </el-select>
      </el-form-item>
    </el-form>
    <el-button class="mb20" type="primary" @click="getPrize">查询</el-button>
    <el-table v-loading="loading" @select="selected" @select-all="selected" ref="multipleTable" :border="true" :data="prizeList" tooltip-effect="dark" style="width: 100%">
      <el-table-column type="selection" width="55" align="center"></el-table-column>
      <el-table-column prop="id" label="礼品ID" align="center"></el-table-column>
      <el-table-column prop="productName" label="礼品名称" align="center"></el-table-column>
      <el-table-column label="礼品图片" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.image" height="40px" alt="">
        </template>
      </el-table-column>
      <el-table-column label="礼品类型" align="center">
        <template>
          活动奖品
        </template>
      </el-table-column>
      <el-table-column label="礼品分类" align="center">
         <template slot-scope="scope">
          {{giftType[scope.row.giftType]}}
        </template>
      </el-table-column>
      <el-table-column prop="shopQuantity" label="库存" align="center"></el-table-column>
    </el-table>
    <el-pagination class="mt20" background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="queryParmes.pageNo" :page-size="queryParmes.pageSize" layout="total, prev, pager, next, jumper" :total="total"></el-pagination>
    <div class="selectedText">
      <p>当前已选{{selectedTotalGoods}}个商品</p>
    </div>
    <div class="btn">
      <el-button type="primary" @click="confirm">确定</el-button>
      <el-button plain="">取消</el-button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      queryParmes: {
        pageNo: 1,
        pageSize: 5,
        productId: null,
        productName: '',
        giftType: null
      },
      queryStr: '',
      optionArr: [
        { name: '礼品名称', id: 1 },
        { name: '礼品id', id: 2 },
      ],
      giftTypeArr: [
        {name: '虚拟', code: 1},
        {name: '实物', code: 2},
        {name: '红包', code: 3},
        {name: '积分', code: 4},
      ],
      selectedNum: 1,
      selectedTotalGoods: 0,
      selectedGoodsArr: [],
      dataObj: [
        { id: 1, name: '123', pic: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png', type: '活动奖品', sort: '实物', stock: 123 },
        { id: 1, name: '123', pic: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png', type: '活动奖品', sort: '实物', stock: 123 },
        { id: 1, name: '123', pic: 'http://weiopn.oss-cn-beijing.aliyuncs.com/saas_platform/test/55C8950F6B444C8887925C80B3B97B03.png', type: '活动奖品', sort: '实物', stock: 123 }
      ],
      total: 3,
      prizeList: [],
      giftType: {
        1: '虚拟',
        2: '实物',
        3: '红包',
        4: '积分'
      },
      loading: true
    }
  },
  created() {
    this.getPrize()
  },
  methods: {
    getPrize() {
      this.loading = true
      if (this.selectedNum == 1) {
        this.queryParmes.productName = this.queryStr
        this.queryParmes.productId = ''
      } else {
        this.queryParmes.productId = this.queryStr
        this.queryParmes.productName = ''
      }
      this.$request.post('/sc/saotx/mall/product/listActs', this.queryParmes, true, res => {
        if (res.ret === '200000') {
          this.loading = false
          this.prizeList = res.data.list
          this.total = res.data.page.count
        }
      })
    },
    confirm() {
      this.$emit('getSelectedGoodsArr', this.selectedGoodsArr)
    },
    // selectedAll(selection) {
    //   console.log(selection)
    // },
    selected(selection) {
      this.selectedTotalGoods = selection.length
      this.selectedGoodsArr = selection
    },
    handleCurrentChange(newPage) {
      this.queryParmes.pageNo = newPage
      this.getPrize()
    },
  }
}
</script>
<style lang="scss" scoped>
.el-select {
  width: 120px;
}
.el-input {
  width: 200px;
}
.type {
  width: 200px;
}
img {
  vertical-align: middle;
}
.selectedText {
  position: relative;
  p {
    position: absolute;
    top: -25px;
    margin: 0;
  }
}
.btn {
  margin-top: 10px;
  text-align: center;
}
</style>
