<template>
  <div class="container">
    <el-card>
      <el-form ref="form" :model="data.mbTask" label-width="100px" :rules="rules">
        <el-form-item label="任务名称：" prop="taskName">
          <el-input v-model="data.mbTask.taskName"></el-input>
        </el-form-item>
        <el-form-item label="任务图片：" prop="taskImg">
          <el-upload class="avatar-uploader" :before-upload="beforeAvatarUpload" :action="uploadApi" :headers="headerObj" :on-success="uploadSuccess" :show-file-list="false">
            <img v-if="data.mbTask.taskImg" :src="data.mbTask.taskImg" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            <div slot="tip" class="el-upload__tip">上传图片的最佳尺寸：750像素*270像素；格式png，jpg；大小不超过2M</div>
          </el-upload>
        </el-form-item>
        <el-form-item label="品牌规格：" prop="brand">
          <el-select v-model="selectBrand" multiple collapse-tags placeholder="请选择" @change="getBrandSonList">
            <el-option v-for="item in brandList" :key="item.id" :label="item.name" :value="item.brandCode">
            </el-option>
          </el-select>
          <el-select v-model="selectSonBrand" no-data-text="请选择品牌" multiple collapse-tags placeholder="请选择" @change="updataList">
            <el-option v-for="item in brandSonList" :key="item.id" :label="item.allName" :value="item.sn">
            </el-option>
          </el-select>
          <el-button type="primary" @click="allSelected">全选</el-button>
        </el-form-item>
        <div v-if="sizeList.length != 0">
          <el-form-item v-for="(item, index) in sizeList" :key="index" label="规格：" prop="item">
            <el-input style="width: 200px" v-model="item.name" :disabled="true"></el-input>
            商品价格：
            <el-input-number v-model="item.price" disabled="true" :controls="false"></el-input-number>
            元
            <span class="ml20">获得</span>
            <el-input-number v-model="item['score']" :controls="false" :min="0" :precision="0"></el-input-number>
            积分
            <el-input-number v-model="item['growth']" :controls="false" :min="0" :precision="0"></el-input-number>
            成长值
            <el-button class="ml20" type="danger" @click="del(index)">删除</el-button>
          </el-form-item>
        </div>
        <el-form-item label="任务说明：" prop="taskDetail">
          <el-input v-model="data.mbTask.taskDetail" type="textarea" :rows="2" placeholder="请输入内容" :maxlength="15"></el-input>
        </el-form-item>
        <el-form-item label="扫码限制：">
          每人每天最多可获得 
          <el-input-number v-model="data.mbTask.growthUpperLimit" :controls="false" :min="0" :precision="0"></el-input-number>
          成长值
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="save">保存</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['id'],
  data() {
    var validateImg = (rules, value, callback) => {
      if (this.data.mbTask.taskImg) {
        callback()
      } else {
        callback(new Error('请选择任务图片'))
      }
    }
    var validate = (rules, value, callback) => {
      callback()
    }
    return {
      rules: {
        taskName: [{required: true, message: '请输入任务名称', trigger: 'blur'}],
        taskImg: [{required: true, validator: validateImg}],
        taskDetail: [{required: true, message: '请输入任务说明', trigger: 'blur'}],
        brand: [{required: true, validator: validate}],
        item: [{required: true, validator: validate}]
      },
      uploadApi: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      selectBrand: [],
      selectSonBrand: [],
      brandList: [],
      brandSonList: [],
      sizeList: [],
      allLen: null,
      data: {
        mbTask: {
          taskName: '',
          taskImg: '',
          taskDetail: '',
          growthUpperLimit: null
        },
        taskSnList: []
      }
    }
  },
  created() {
    this.getBrandList()
  },
  mounted() {
    this.getDetail()
  },
  methods: {
    // 获取任务详情
    getDetail() {
      if (!this.id) return this.$router.push('/customer/task')
      const loading = this.$loading({
        target: '.el-card'
      })
      this.$request.post('/api/saotx/mber/detTaskById', {id: this.id}, true, res => {
        if (res.ret === '200000') {
          this.data = res.data
          if (res.data.taskSnList.length != 0) {
            this.sizeList = JSON.parse(JSON.stringify(res.data.taskSnList))
            this.adverseSelection(() => loading.close())
          } else {
            loading.close()
          }
        }
      })
    },
    // 保存
    save() {
      this.$refs.form.validate(valid => {
        if (!valid) return this.$message.error('请完善表单数据!')
        var arr = this.sizeList.filter(item => {
          return (!item.score || !item.growth)
        })
        if (arr.length != 0) return this.$message.error('请完善表单数据!')
        this.data.taskSnList = this.sizeList
        this.$request.post('/api/saotx/mber/saveBasic', this.data, true, res => {
          if (res.ret === '200000') {
            this.$message.success('保存成功')
            this.$router.push('/customer/task')
            return
          } else {
            this.$message.error(res.message)
          }
        })
      })
    },
    // 更新列表
    updataList() {
      if (this.sizeList.length > this.selectSonBrand.length) {
        // 删除
        this.sizeList.forEach((item, index) => {
          if (!this.selectSonBrand.includes(item.sn)) {
            this.sizeList.splice(index, 1)
            return
          }
        })
      } else {
        // 添加
        let nowList = this.brandSonList.filter( item => {
          return item.sn == this.selectSonBrand[this.selectSonBrand.length - 1]
        })
        this.sizeList.push(JSON.parse(JSON.stringify(nowList[0])))
      }
    },
    // 删除
    del(i) {
      this.$confirm('是否删除该项?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.sizeList.splice(i, 1)
        this.selectSonBrand.splice(i, 1)
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
    },
    // 默认勾选规格对应的品牌
    adverseSelection(callback) {
      let brandList = [],
          sonList = []
      this.data.taskSnList.map(item => {
        brandList.push(item.brandCode)
        sonList.push(item.sn)
      })
      // 去重
      brandList = [... new Set(brandList)]
      this.selectBrand = brandList
      this.getBrandSonList(() => {
        this.selectSonBrand = sonList
        callback && callback()
      })
    },
    // 全部选择
    allSelected() {
      if (this.allLen == this.selectSonBrand.length) return
      this.brandList.forEach(item => {
        this.selectBrand.push(item.brandCode)
      })
      this.getBrandSonList(() => {
        let sonList = [],
            str = JSON.stringify(this.sizeList)
        this.brandSonList.forEach(item => {
          if (str.indexOf(item.sn) == -1) {
            sonList.push(item)
          }
        })
        this.sizeList.push(...sonList)
        this.allLen = this.sizeList.length
        this.selectSonBrand = []
        this.sizeList.forEach(item => {
          this.selectSonBrand.push(item.sn)
        })
      })
    },
    // 获取品牌列表
    getBrandList() {
      this.$request.post('/api/saotx/prod/listBrand', { pageSize: '-1' }, true, res => {
        if (res.ret === '200000') {
          this.brandList = res.data.list
          return
        }
        this.$message.error(res.message)
      })
    },
    // 获取子品牌列表
    getBrandSonList(callback) {
      this.$request.post( '/api/saotx/prod/list', { brandCodeArr: this.selectBrand, pageSize: '-1' }, true, res => {
          if (res.ret === '200000') {
            this.brandSonList = res.data.list
            callback && callback()
            return
          }
          this.$message.error(res.message)
        }
      )
    },
    uploadSuccess (res, file, fileList) {
      if (res.ret === '200000') {
        this.data.mbTask.taskImg = res.data.accessUrl
        this.$refs.form.validateField('taskImg', valid => {})
        return
      }
      this.$message.error(res.message)
    },
    uploadError (err) {
        let that = this;
        console.log(err)
        alert('图片上传失败')
    },
    beforeAvatarUpload(file) {
      const IMGTYPE = file.type === 'image/jpeg' || file.type === 'image/png'
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!IMGTYPE) {
        this.$message.error('上传图片只能是 JPG 、 PNG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return IMGTYPE && isLt2M
    },
  }
}
</script>
<style lang="scss" scoped>
.el-input-number {
  width: 100px;
}
.el-textarea,
.el-input {
  width: 300px;
}
.btn {
  margin-left: 100px;
}
.img {
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  img {
    max-width: 90%;
    max-height: 90%;
  }
}
.upload {
  display: inline-block;
  vertical-align: bottom;
  margin-left: 20px;
}
// .tips {
//     font-size: 12px;
//     color: #606266;
//     margin-top: 7px;
// }
.avatar-uploader /deep/ .el-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader /deep/ .el-upload:hover {
  border-color: #409EFF;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  max-width: 90%;
  max-height: 90%;
}
</style>
