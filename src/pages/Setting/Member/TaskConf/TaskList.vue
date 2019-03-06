<template>
  <div class="container">
    <el-card>
      <div class="conf-act-list">
        <ul>
          <li v-for="(item, index) in actList" @click="goToDetail(item)" :key="index">
            <div class="img" :style="{'background': `url(${item.taskImg}) no-repeat center / 100% 100%`}"></div>
            <div class="con">
              <div class="text">
                <div class="title">{{item.taskName}}</div>
                <div class="switch">
                  <el-switch v-model="item.status" :active-value="1" :inactive-value="0"></el-switch>
                </div>
              </div>
              <div class="desc">{{item.taskDetail}}</div>
            </div>
          </li>
        </ul>
      </div>
      <el-table class="mt20" border :data="actTable" style="width: 100%">
        <el-table-column type="index" width="50" label="序号" align="center"></el-table-column>
        <el-table-column prop="date" label="任务名称" align="center"></el-table-column>
        <el-table-column prop="name" label="获得积分数" align="center"></el-table-column>
        <el-table-column prop="name" label="获得成长值" align="center"></el-table-column>
        <el-table-column prop="name" label="更新时间" align="center"></el-table-column>
        <el-table-column prop="name" label="状态" align="center">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.status" :active-value="1" :inactive-value="0"></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text">编辑</el-button>
            <el-button type="text">查看明细</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      actList: [],
      actTable: []
    }
  },
  created() {
    this.getTaskList()
  },
  methods: {
    getTaskList() {
      this.$request.post('/sc/saotx/act/findList', {}, true, res => {
        if (res.ret === '200000') return this.actList = res.data
      })
    },
    goToDetail(item) {
      this.$router.push(`/setting/memberConf/task/sign?code=${item.taskCode}&id=${item.id}`)
    }
  }
}
</script>
<style lang="scss" scoped>
.conf-act-list li {
  display: inline-block;
  width: 300px;
  height: 280px;
  border: 1px solid #ccc;
  cursor: pointer;
  box-sizing: border-box;
  border-radius: 2px;
  .img {
    display: block;
    width: 100%;
    height: 180px;
  }
  .con {
    position: relative;
    width: 100%;
    height: 100px;
    border-top: 1px solid #ccc;
    box-sizing: border-box;
    padding: 20px;
    .text {
      margin: 6px 0 10px;
      .title {
        font-size: 16px;
        font-weight: bold;
      }
      .switch {
        position: absolute;
        height: 20px;
        top: 50%;
        right: 20px;
        transform: translateY(-50%);
      }
    }
    .desc {
      color: #515151;
    }
  }
}
.conf-act-list li + .conf-act-list li {
  margin-left: 20px;
}
</style>


