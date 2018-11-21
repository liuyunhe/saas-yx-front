<template>
  <!-- 
  Author: chenxin
  Create Date: 2018-10-18
  Description: 活动投放设置
  -->
  <div class="actPutConf-container">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item>活动管理</el-breadcrumb-item>
      <el-breadcrumb-item>投放设置</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="form" :model="strategy" label-width="100px">
        <el-form-item label="品牌规格：">
          <el-select v-model="selectBrand" multiple collapse-tags placeholder="请选择" @change="getBrandSonList">
            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="selectSonBrand" multiple collapse-tags placeholder="请选择" @change="restrictSonBrand">
            <el-option v-if="brandSonList" v-for="item in brandSonList" :key="item.id" :label="item.allName" :value="item.sn">
            </el-option>
          </el-select>
          <el-button type="primary" @click="brandVisible = true" class="ml20">已选明细</el-button>
        </el-form-item>
        <el-form-item label="地区：">
          <el-select v-model="selectProvList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getCityList">
            <el-option v-for="item in provList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="selectCityList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="getAreaList">
            <el-option v-if="cityList" v-for="item in cityList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-select v-model="selectAreaList" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择" @change="selectAll">
            <el-option v-if="areaList" v-for="item in areaList" :key="item.code" :label="item.name" :value="item.code">
            </el-option>
          </el-select>
          <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox>
          <el-button type="primary" @click="regionVisible = true" class="ml20">已选明细</el-button>
        </el-form-item>
        <el-form-item>
          <div class="prize-conf">
            <div class="title">常规奖池</div>
            <el-tabs v-model="normalTabsValue" type="card" editable @edit="normalTabsEdit" class="put-conf">
              <el-tab-pane :key="item.name" v-for="(item, index) in normalTabs" :label="item.title" :name="item.name">
                <pond-conf :awae="normalConf[index]" :prizeType="prizeType"></pond-conf>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="special-rule-conf">
            <div class="title">
              <span>特殊规则设置</span>
              <el-switch v-model="specialRuleConfFlag">
              </el-switch>
            </div>
            <div class="con" v-if="specialRuleConfFlag">
              <el-row>
                <el-checkbox v-model="firstScanFlag">首扫必中奖</el-checkbox>
                <div class="conf" v-if="firstScanFlag">
                  <el-tabs v-model="firstScanTabsValue" type="card" editable @edit="firstScanTabsEdit">
                    <el-tab-pane :key="item.name" v-for="(item, index) in firstScanTabs" :label="item.title" :name="item.name">
                      <pond-conf :awae="firstScanConf[index]" :prizeType="prizeType"></pond-conf>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-row>
              <el-row>
                <el-checkbox v-model="nWinFlag">N次必中奖</el-checkbox>
                <div class="conf" v-if="nWinFlag">
                  <el-tabs v-model="nWinTabsValue" type="card" editable @edit="nWinTabsEdit">
                    <el-tab-pane :key="item.name" v-for="(item, index) in nWinTabs" :label="item.title" :name="item.name">
                      <pond-conf :awae="nWinConf[index]" :prizeType="prizeType" :nWin="true"></pond-conf>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-row>
              <el-row>
                <el-checkbox v-model="fixationPutFlag">定点投放奖</el-checkbox>
                <div class="conf" v-if="fixationPutFlag">
                  <el-form :model="specialAreas" label-width="100px" class="mb20">
                    <el-form-item label="品牌规格：">
                      <el-select v-model="specialBrand.brandArr" multiple placeholder="请选择">
                        <el-option v-for="item in specialBrandList" :key="item.id" :disabled="item.disabled" :label="item.name" :value="item.brandCode">
                        </el-option>
                      </el-select>
                      <el-select v-model="specialBrand.snArr" multiple placeholder="请选择">
                        <el-option v-if="brandSonList" v-for="item in specialBrandSonList" :disabled="item.disabled" :key="item.id" :label="item.name" :value="item.sn">
                        </el-option>
                      </el-select>
                      <el-button type="primary" @click="brandVisible = true" class="ml20">已选明细</el-button>
                    </el-form-item>
                    <el-form-item label="地区：">
                      <el-select v-model="specialAreas.provinceArr" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择">
                        <el-option v-for="item in specialProvList" :key="item.code" :disabled="item.disabled" :label="item.name" :value="item.code">
                        </el-option>
                      </el-select>
                      <el-select v-model="specialAreas.cityArr" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择">
                        <el-option v-if="cityList" v-for="item in specialCityList" :key="item.code" :disabled="item.disabled" :label="item.name" :value="item.code">
                        </el-option>
                      </el-select>
                      <el-select v-model="specialAreas.districtArr" :disabled="isDisabled" multiple collapse-tags filterable placeholder="请选择">
                        <el-option v-if="areaList" v-for="item in specialAreaList" :key="item.code" :disabled="item.disabled" :label="item.name" :value="item.code">
                        </el-option>
                      </el-select>
                      <!-- <el-checkbox v-model="isDisabled" label="全部地区" border></el-checkbox> -->
                      <el-button type="primary" @click="regionVisible = true" class="ml20">已选明细</el-button>
                    </el-form-item>
                    <el-form-item label="投放时间:">
                      <el-date-picker v-model="tfTimeArr" :picker-options="pickerOptions" format="yyyy-MM-dd HH:mm" value-format="yyyy-MM-dd HH:mm" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                      </el-date-picker>
                    </el-form-item>
                    <el-form-item label="发放时间:">
                      <!-- <el-time-picker is-range v-model="tfDurationArr" format="HH:mm" value-format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                      </el-time-picker> -->
                      <el-time-picker is-range v-model="tfDurationArr" format="HH:mm" value-format="HH:mm" range-separator="至" start-placeholder="开始时间" end-placeholder="结束时间" placeholder="选择时间范围">
                      </el-time-picker>
                    </el-form-item>
                  </el-form>
                  <el-tabs v-model="fixationPutTabsValue" type="card" editable @edit="fixationPutTabsEdit">
                    <el-tab-pane :key="item.name" v-for="(item, index) in fixationPutTabs" :label="item.title" :name="item.name">
                      <pond-conf :awae="fixationPutConf[index]" :prizeType="prizeType"></pond-conf>
                    </el-tab-pane>
                  </el-tabs>
                </div>
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <div class="prize-limit">
            <div class="title">
              <span>抽奖限制</span>
              <el-switch v-model="prizeLimitFlag">
              </el-switch>
            </div>
            <div class="con" v-if="prizeLimitFlag">
              <el-row>
                <el-col :span="6" class="label">每日中奖机会限制:</el-col>
                每人每日<el-input-number size="small" v-model="act.dwnum" :min="0" controls-position="right"></el-input-number>
                次抽奖后，不再有中奖机会
              </el-row>
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          是否立即发布
          <el-switch class="ml20" v-model="status">
          </el-switch>
          <el-row class="mt20">
            <el-button type="primary" @click="save">保存</el-button>
            <el-button @click="$router.push('/market/actMgr')">返回列表</el-button>
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
import pondConf from '@/components/pondConf.module'
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
