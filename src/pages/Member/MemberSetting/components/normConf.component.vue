<template>
  <el-card>
    <el-form :model="item" v-for="(item, index) in params" :key="index" inline>
      <el-form-item label="规格:">
        <el-select v-model="item.snArr" class="ml20" style="width: 240px;" multiple placeholder="请选择" collapse-tags @change="handleRepeat(index)">
          <el-option v-if="item" :disabled="item.disable" v-for="item in brandList[index]" :key="item.id" :label="item.allName" :value="item.sn"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="扫码获得:">
        <el-input-number v-model="item.score" :precision="0" :min="0" controls-position="right"></el-input-number> 荷石币
        <el-input-number v-model="item.luck" :precision="0" :min="0" controls-position="right"></el-input-number> 幸运值
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-if="index == 0" @click="add">新增</el-button>
        <el-button type="danger" v-else @click="del(index)">删除</el-button>
      </el-form-item>
    </el-form>
  </el-card>
</template>
<script>
export default {
  props: ['params'],
  data() {
    return {
      brandList: [],
      oldSnArr: [],
      defaultList: []
    }
  },
  created () {
    this.getBrandRules()
  },
  methods: {
     // 获取规格
    getBrandRules() {
      this.$request.post('api/saotx/prod/list', {brandCodeArr: ["BRAND-7D41JAAAAA"], pageSize: "-1"}, true ,res => {
        if (res.ret === '200000') {
          // this.brandList = res.data.list
          res.data.list.map(item => {
            item['disable'] = false
          })
          this.defaultList = res.data.list
          this.params.forEach( () => {
            this.brandList.push(JSON.parse(JSON.stringify(this.defaultList)))
          })
          this.disableOption()
          return
        }
        this.$message.error(res.message)
      })
    },
    // 处理地区不能重复的问题
    disableOption() {
      this.params.map((item, index) => {
        let checked = item.snArr
        this.oldSnArr[index] = checked
        this.brandList.map((d, i) => {
          if (i !== index) {
            d.map(y => {
              checked.map(x => {
                if (x == y.sn) {
                  y.disable = true
                }
              })
            })
          }
        })
      })
    },
    // 选择地区 其它项禁用
    handleRepeat(i) {
      // 当前项新的(没有选择地区)
      if (this.oldSnArr[i].length == 0) {
        this.disableOption()
      } else {
        // 取消地区
        if (this.oldSnArr[i].length > this.params[i].snArr.length) {
          let result = ''
          let newSnArr = this.params[i].snArr
          this.oldSnArr[i].forEach((oldSn, j) => {
            let newSn = this.oldSnArr[i][j]
            let isExist = false
            newSnArr.forEach((newSn, y) => {
              if (oldSn == newSn) {
                isExist = true
              }
            })
            if (!isExist) {
              result = newSn
            }
          })
          console.log(result)
          this.brandList.forEach(item => {
            item.forEach(d => {
              if (d.sn == result) {
                d.disable = false
              }
            })
          })
          // 添加地区
        } else if (this.oldSnArr[i].length < this.params[i].snArr.length) {
          let result = ''
          let oldASnArr = this.oldSnArr[i]
          this.params[i].snArr.forEach((newSn, j) => {
            let oldSn = this.params[i][j]
            let isExist = false
            oldASnArr.forEach((oldSn, y) => {
              if (newSn == oldSn) {
                isExist = true
              }
            })
            if (!isExist) {
              result = newSn
            }
          })
          this.brandList.forEach((item, x) => {
            if ( i !== x) {
              item.forEach(d => {
                if (d.sn == result) {
                  d.disable = true
                }
              })
            }
          })
        }
      }
    },
    add() {
      this.params.push({
        snArr: [],
        score: null,
        luck: null,
      })
      this.brandList.push(JSON.parse(JSON.stringify(this.defaultList)))
      this.oldSnArr.push([])
      this.disableOption()
    },
    del(index) {
      this.$confirm('是否删除该项规则?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.params.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
    }
  }
}
</script>
