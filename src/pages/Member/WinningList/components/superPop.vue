<template>
  <div class="container">
    <!-- 确认发货弹窗 -->
    <el-dialog :visible.sync="openDialog" width="400px" top="35vh" :close-on-click-modal="false" @close="reset">
      <h3>确认发货</h3>
      <el-form label-width="100px">
        <el-form-item label="物流订单号：">
          <el-input v-model="params.logisticalCode" placeholder="请输入物流订单号"></el-input>
        </el-form-item>
        <el-form-item label="物流公司：">
          <el-input v-model="params.logisticalCompany" placeholder="请输入物流公司"></el-input>
        </el-form-item>
        <div class="btn">
          <el-button type="primary" @click="confirm">确认</el-button>
          <el-button plain @click="openDialog = false">取消</el-button>
        </div>
      </el-form>
    </el-dialog>
    <!-- 订单跟踪弹窗 -->
    <div v-if="params.status == 2">
      <!-- <span>订单跟踪</span> -->
      <el-form class="mt20" :model="params" label-width="100px">
        <!-- <el-form-item label="发货时间：">
          <span class="mr20" v-if="params.sendTime">{{new Date(params.sendTime).Format('yyyy-MM-dd hh:mm:ss')}}</span>
          <span v-if="params.status == 2">状态：已发货</span>
        </el-form-item> -->
        <el-form-item label="认证照片：">
          <span v-if="!params.img.img">待上传</span>
          <div v-else>
            <img class="img" :title="scaleStyle ? '点击关闭' : ''" :style="scaleStyle" @click="restore" :src="params.img.img">
            <el-button type="primary" @click="scaleUp">查看大图</el-button>
          </div>
        </el-form-item>
        <div v-if="params.img.img">
          <el-form-item label="状态：">
            <span>{{statusList[params.img.authStatus]}}</span>
          </el-form-item>
          <el-form-item label="照片审核：" v-if="params.img.authStatus == 11">
            <el-radio v-model="saveParams.authStatus" :label="12">审核通过</el-radio>
            <el-radio v-model="saveParams.authStatus" :label="14">审核不通过</el-radio>
            <el-input v-model="saveParams.authDesc" :disabled="saveParams.authStatus == 12 ? true : false" style="display: inline-block; width: 230px; margin-left: 10px;" placeholder="不通过原因描述"></el-input>
          </el-form-item>
          <el-form-item label="不通过原因：" v-if="params.img.authStatus == 14">
            <span style="color: #FF0000">{{params.authDesc}}</span>
          </el-form-item>
        </div>
        <div class="btn">
          <el-button type="primary" v-if="params.img.img && params.img.authStatus == 11" @click="save">保存</el-button>
          <el-button plain @click="$router.go(-1)">返回</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  props: ['openDialog', 'params'],
  data() {
    return {
      deliverDialogVisible: false,
      orderDialogVisible: false,
      radio: '',
      scaleStyle: null,
      statusList: {
        11: '待审核',
        12: '审核通过',
        14: '审核不通过'
      },
      saveParams: {
        orderCode: this.params.orderCode,
        authStatus: 12,
        authDesc: ''
      }
    }
  },
  created () {
    // if (this.params.status === 2) return
    // this.deliverDialogVisible = true
  },
  methods: {
    confirm() {
      if (!this.params.province && !this.params.city && !this.params.detail) return this.$message.error('请完善收货人信息')
      if (!this.params.logisticalCompany || !this.params.logisticalCode) return this.$message.error('请输入物流信息')
      this.$request.post('/api/wiseqr/md/modifyOrder', this.params, true, res => {
        if (res.ret === '200000') {
          this.$message.success('物流信息上传成功')
          this.deliverDialogVisible = false
          this.$emit('refresh')
          return
        }
        this.$message.error(res.message)
      })
    },
    scaleUp() {
      this.scaleStyle = {
        'position': 'fixed',
        'top': '50%',
        'left': '50%',
        'transform': 'translate(-50%, -50%) scale(5)',
        'display': 'block',
        'z-index': '9999999',
        'cursor': 'pointer'
      }
    },
    restore() {
      this.scaleStyle = null
    },
    save() {
      if (this.saveParams.authStatus == 14 && !this.saveParams.authDesc) return this.$message.error('请输入不通过原因!')
      this.$request.post('/api/wiseqr/md/authOrder', this.saveParams, true, res => {
        if (res.ret === '200000') {
          this.$message.success('保存成功!')
          // this.orderDialogVisible = false
          this.$emit('refresh')
          return
        }
        this.$message.error(res.message)
      })
    },
    reset() {
      this.$emit('taggle')
    }
  }
}
</script>
<style lang="scss" scoped>
h3 {
  text-align: center;
  margin: 0 0 20px 0;
}
.el-dialog /deep/ .el-dialog__header {
  padding: 0;
}
.btn {
  padding-left: 200px;
  text-align: left;
}
.img {
  vertical-align: bottom;
  max-width: 200px;
  // max-height: 150px;
  // transition: all 1s;
  // transform: rotate(90deg);
}

</style>
