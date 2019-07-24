<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置
  -->
  <div class="actPutConf-container">

    <el-card>
      <el-form ref="form" :model="strategy" label-width="100px">
        <el-form-item>
          <div class="prize-conf">
            <div class="title">常规奖池</div>
            <el-tabs v-model="normalTabsValue" type="card" editable @edit="normalTabsEdit" class="put-conf">
              <el-tab-pane :key="index" v-for="(item, index) in normalTabs" :label="item.title" :name="item.name">
                <pond-conf :astrict="astrictRedflg" :awae="normalConf[index]" :prizeType="prizeType"></pond-conf>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>


        <el-form-item>
          <el-row class="mt20">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="backList">返回列表</el-button>
          </el-row>
        </el-form-item>
      </el-form>
    </el-card>
    <el-dialog title="选择的品牌及对应的规格" :visible.sync="brandVisible" width="500px">
      <span>暂时不做</span>
    </el-dialog>
    <el-dialog title="常规奖池选择的地区明细" :visible.sync="regionVisible" width="500px">
      <span>暂时不做</span>
    </el-dialog>
  </div>
</template>
<script>
import pondConf from './pondConf.module'
import mix from './ActPutConf.mixins.js'
export default {
  components: {
    pondConf
  },
  mixins: [mix]
}
</script>
<style lang="scss" scoped>
.el-form {
  .prize-conf {
    max-width: 800px;
  }
}
.step-style {
	margin-bottom: 40px;
}
.title {
  height: 40px;
  padding-left: 20px;
  background: #f0f0f0;
}
.prize-conf {
  .el-tabs {
    border: 1px solid #ebeef5;
    .el-tab-pane {
      padding: 0 30px;
    }
  }
}
.conf {
  background-color: #fff;
  overflow: hidden;
}
.special-rule-conf,
.prize-limit {
  width: 100%;
  max-width: 800px;
  .title {
    position: relative;
    .el-switch {
      position: absolute;
      right: 20px;
      top: 50%;
      transform: translateY(-50%);
    }
  }
}
.special-rule-conf {
  .con {
    background: rgb(243, 247, 255);
    .el-row {
      padding: 0 20px;
    }
  }
}
.prize-limit {
  .con {
    padding: 0 20px;
    margin-top: 10px;
    .label {
      color: #707478;
      font-weight: 700;
    }
  }
}
</style>
