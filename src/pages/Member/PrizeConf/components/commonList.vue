<template>
  <div class="container">
    <el-card>
      <el-col class="mb20">
        <el-button type="primary" v-if="type == 1" @click="addPrize">新建实物礼品</el-button>
        <el-button type="primary" v-if="type == 2" @click="addPrize">新建虚拟礼品</el-button>
        <el-button type="primary" v-if="type == 3" @click="addPrize">新建红包礼品</el-button>
        <el-button type="primary" v-if="type == 6" @click="addPrize">新建积分礼品</el-button>
      </el-col>
      <el-form inline :model="queryParams">
        <el-form-item label="关键字">
          <el-input type="text" v-model="queryParams.keywords"></el-input>
        </el-form-item>
        <el-form-item label="礼品分类" v-if="type == 2">
          <el-select v-model="queryParams.subType" placeholder="请选择分类">
            <el-option label="翻倍卡" :value="202"></el-option>
            <el-option label="折扣卡" :value="201"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-col class="mb20">
        <el-button type="primary" @click="query(0)">查询</el-button>
        <el-button plain @click="query(1)">重置</el-button>
      </el-col>
    </el-card>
    <el-card class="mt20">
      <el-table class="mb20" v-loading="loading" border :data="listData">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" label="礼品分类" v-if="type == 2">
          <template slot-scope="scope">
            {{scope.row.subType == 201 ? '折扣卡' : '翻倍卡'}}
          </template>
        </el-table-column>
        <el-table-column align="center" prop="name" label="礼品名称"></el-table-column>
        <el-table-column align="center" label="礼品图片">
          <template slot-scope="scope">
            <img width="100" :src="scope.row.icon" alt="">
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="text" @click="editPrize(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination background @current-change="handleCurrentChange" :current-page="queryParams.pageNo" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['type'],
  data() {
    return {
      loading: true,
      queryParams: {
        type: this.type,
        keywords: '',
        subType: '',
        pageNo: 1,
        pageSize: 10
      },
      total: null,
      listData: []
    }
  },
  watch: {
    type: function(val) {
      this.queryParams.type = val
      this.getPrizeList()
    }
  },
  created () {
    if (!this.type) {
      this.$router.push('/memberday/material/prizeList?type=1')
      return
    }
    this.getPrizeList()
  },
  methods: {
    getPrizeList() {
      this.$request.post('/api/wiseqr/md/listMaterial', this.queryParams, true, res => {
        if (res.ret === '200000') {
          this.listData = res.data.list
          this.total = res.data.page.count
          this.loading = false
        }
      })
    },
    query(flag) {
      this.queryParams.pageNo = 1
      if (flag) {
        this.queryParams.keywords = ''
        this.queryParams.subType = ''
      }
      this.getPrizeList()
    },
    editPrize(id) {
      this.$router.push('/memberday/material/prizeConf?type=' + this.type + '&id=' + id)
    },
    addPrize() {
      this.$router.push('/memberday/material/prizeConf?type=' + this.type)
    },
    // 每当 页码值发生变化，会触发这个函数
    handleCurrentChange(newPage) {
      this.queryParams.pageNo = newPage
      this.getPrizeList()
    },
  }
}
</script>
