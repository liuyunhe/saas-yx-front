<!-- Description: 自定义活动基础设置-->
<template>
  <el-card class="market-qr">
    <el-container>
      <el-header>体验码不够用？请联系智新物码客服 <span class="tel">010-64700731</span></el-header>
      <el-main>
        <el-row :gutter="20">
          <el-col :span="5" v-for="qr in marketqr" :key="qr.id">
            <div class="grid-content">
              <img :src="qr.ossUrl" />
              <span>{{qr.code}}</span>
            </div>
          </el-col>
        </el-row>
      </el-main>
      <!-- 分页组件 -->
      <el-pagination background layout="total, prev, pager, next, jumper"
          @size-change="sizeChange" @current-change="currentChange"
          :current-page="form.pageNo" :page-size="form.pageSize"
          :total="pagination.total">
      </el-pagination>
    </el-container>
  </el-card>
</template>
<script>
  export default {
    data() {
      return {
        loading: false,
        form: {
          pageNo: 1,
          pageSize: 15
        },
        marketqr: [],
        pagination: {
          total: 0
        },
      }
    },
    created() {
      this.getMarketQr();
    },
    methods: {
      currentChange(pageNo) {
        this.getMarketQr(event, pageNo);
      },
      sizeChange(pageSize) {
        this.getMarketQr(event, null, pageSize);
      },
      // 获取体验店码二维码
      getMarketQr(_event, pageNo, pageSize) {
        let _pageNo = 1;
        if(pageNo) _pageNo = pageNo;
        this.form.pageNo = _pageNo;
        let _pageSize = 15;
        if(pageSize) _pageSize = pageSize;
        this.form.pageSize = _pageSize;

        this.loading = true;
        this.$request.post('/api/saotx/guest/listqr', this.form, true, res => {
          this.loading = false;
          if (res.ret === '200000') {
            this.marketqr = res.data.list || [];
            let page = res.data.page || {};
            this.initPagination(page);
          }
        })
      },
      initPagination(page) {
        if(page) {
          this.pagination.total = page.count;
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .market-qr {
    .tel {
      color: #449ad0;
    }

    .el-row {
      margin-bottom: 20px;
      &:last-child {
        margin-bottom: 0;
      }
    }
    .el-col {
      width: 18%;
      margin: 0 10px 20px;
      border-radius: 4px;
      box-shadow: 0px 0px 10px rgba(102, 102, 102, 0.349019607843137);
    }
    .grid-content {
      border-radius: 4px;
      text-align: center;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
