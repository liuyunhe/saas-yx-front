<template>
  <div>
    <el-select v-model="selectBrand" multiple collapse-tags placeholder="请选择" @change="getBrandSonList">
      <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
      </el-option>
    </el-select>
    <el-select v-model="selectSonBrand" no-data-text="请选择品牌" multiple collapse-tags placeholder="请选择" @change="done">
      <el-option v-for="item in brandSonList" :key="item.id" :label="item.allName" :value="item.sn">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: ['data','saleZone','id'],
  data() {
    return {
      selectBrand: [],
      selectSonBrand: [],
      brandList: [],
      brandSonList: []
    }
  },
  watch:{
    saleZone(a,b){     //a是value的新值，b是旧值
      console.log(a,b)
      this.saleZone = a;
    },
  },
  created() {
    this.getBrandList()
    this.handleBrand()
  },
  methods: {
    handleBrand() {
      if (this.data.brandArr.length !== 0) {
        this.selectBrand = this.data.brandArr
        this.getBrandSonList()
      } if (this.data.snArr.length !== 0) {
        this.selectSonBrand = this.data.snArr
      }
    },
    // 获取品牌列表
    getBrandList() {

      this.$request.post('/api/wiseqr/prod/listBrand', { pageSize: '-1' }, true, res => {
        if (res.ret === '200000') {
          this.brandList = res.data.list
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取子品牌列表
    getBrandSonList() {
      if (this.brandList.length == 0) {
        setTimeout(() => {
          this.getBrandSonList()
        }, 1000)
      }
      if(this.saleZone){
        this.$request.post(
          '/api/actSale/product/sn', {
            id: this.id,
            brandCode : this.selectBrand.join(","),
          },
          false,
          res => {
            if (res.code === '200') {
              this.brandSonList = res.data
              this.done()
              return
            }
            this.$message.error(res.msg)
          }
        )
      }else {
        this.$request.post( '/api/wiseqr/prod/list', { brandCodeArr: this.selectBrand, pageSize: '-1' }, true, res => {
            if (res.ret === '200000') {
              this.brandSonList = res.data.list
              this.done()
              return
            }
            this.$message.error(res.message)
          }
        )
      }
    },
    // 选择完成
    done() {
      this.$emit('done', {selectB: this.selectBrand, selectSB: this.selectSonBrand})
    }
  }
}
</script>
