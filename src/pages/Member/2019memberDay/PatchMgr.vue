<template>
  <div class="PatchMgr-container">
    <template v-for="(i,j) in config">
      <el-card>
        <div slot="header" class="clearfix">
          <span>拼图{{j+1}}碎片设置：</span>
        </div>
        <template v-for="(item,index) in i">
          <el-form ref="PatchConf" :model="item" label-width="100px" :rules="confRules">
            <div style="height: 90px">
              <el-form-item :label="`碎片${index+1}:`" prop="img" style="width: 220px;float: left;margin-right: 20px">
                <el-input v-model="item.img" style="display: none"></el-input>
                <el-upload :disabled="!newAct " class="avatar-uploader" :action="uploadURL" :headers="headerObj"
                           :on-success="(res)=>{uploadImgUrlSuccess(res,index,j)}" :show-file-list="false">
                  <img v-if="item.img" :src="item.img" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <div style="float: left;margin-right: 20px;height: 64px;line-height: 64px">
                <template v-if="index == 0 || index == 1">(尺寸：405*506)</template>
                <template v-if="index == 2">(尺寸：339*506)</template>
                <template v-if="index == 3 || index == 4">(尺寸：405*576)</template>
                <template v-if="index == 5">(尺寸：339*576)</template>
              </div>
              <div style="width: 230px;float: left;margin-right: 20px">
                <el-form-item label="投放数量：" prop="totalNum">
                  <el-input-number :disabled="!newAct " v-model="item.totalNum" :precision="0" :min="0" controls-position="right"/>
                </el-form-item>
              </div>
              <div v-if="item.id ? true : false" style="float: left;margin-right: 20px;height: 64px;line-height: 64px">
                剩余{{ item.totalNum - item.outNum }}个
              </div>
              <div style="width: 250px;float: left;margin-right: 20px">
                <el-form-item label="中奖概率：" prop="drawPert">
                  <el-input-number :disabled="!newAct " v-model="item.drawPert" :precision="1" :step="0.1" :min="0" controls-position="right"/>
                  %
                </el-form-item>
              </div>
              <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="addCardRepertory(item)" style="margin-top: 15px">增库</el-button>
              </span>
              <span v-if="!newAct">
                <span style="margin-right: 20px"></span>
                <el-button type="primary" @click="updateCardPert(item)" style="margin-top: 15px">修改中奖概率</el-button>
              </span>
            </div>
          </el-form>
        </template>
      </el-card>
      <div style="height: 30px"></div>
    </template>
    <div style="height: 40px;text-align: center;margin-top: 30px" v-if="newAct">
      <el-button type="primary" @click="confUpdate">保存</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "PatchMgr",
    data() {
      var validateNum = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入红包金额'))
        } else {
          callback()
        }
      }
      var validateDrawPert = (rule, value, callback) => {
        if (value == 0) {
          callback(new Error('请输入中奖概率'))
        } else {
          callback()
        }
      }
      return {
        uploadURL: '/api/wiseqr/attach/commonAliUpload',
        headerObj: {
          loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
          token: sessionStorage.getItem('access_token'),
          CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
        },
        confRules: {
          img: [{required: true, message: '请上传卡片图片', trigger: 'change'}],
          totalNum: [{required: true, validator: validateNum, trigger: 'blur'}],
          drawPert: [{required: true, validator: validateDrawPert, trigger: 'blur'}],
        },
        newAct: true,
        config: [
          [
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
          ],
          [
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
          ],
          [
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
          ],
          [
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
          ],
          [
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
            {
              img: "",
              totalNum: "",
              drawPert:""
            },
          ],
        ],
      }
    },
    created() {
      this.getDetail()
    },
    methods: {
      // 扫码奖励查询
      getDetail() {
        this.$request.post('/hbact/jh/saas/pintu/queryConfig', {}, true, res => {
          if(res.code == 200){
            if(res.data){
              this.newAct = false
              this.config = [
                res.data.slice(0,6),
                res.data.slice(6,12),
                res.data.slice(12,18),
                res.data.slice(18,24),
                res.data.slice(24,30)
              ]
            }
          }else {
            this.$message.error(res.msg);
          }
        })
      },
      confUpdate() {
        let patchConfig = true
        this.$refs.PatchConf.forEach(item => {
          item.validate(valid => {
            if (valid) {

            } else {
              patchConfig = false
            }
          })
        })
        if(!patchConfig) return
        let params = [...this.config[0],...this.config[1],...this.config[2],...this.config[3],...this.config[4]]
        console.log(params)
        this.$request.post('/hbact/jh/saas/pintu/addConfig', params, true, res => {
          if (res.code == '200') {
            this.$message({type: 'success', message: '操作成功!'});
            this.getDetail()
          } else {
            this.$message.error(res.msg);
          }
        })
      },
      uploadImgUrlSuccess(resule, index, group) {
        if (resule.ret === '200000')
        return (this.config[group][index].img = resule.data.accessUrl)
        this.$message.error(resule.message)
      },
      addCardRepertory(item) {
        this.$prompt('请输入数字：', '增库', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d{1,}$/,
          inputErrorMessage: '请输入大于0的整数'
        }).then(({value}) => {
          console.log(value)
          if (value == 0) return this.$message.error('数字必须大于0')
          this.$request.post(' /hbact/jh/saas/pintu/addPatchNum', {
            id: item.id,
            addNum: value
          }, false, res => {
            if (res.code === '200') {
              this.$message.success('增库成功')
              this.getDetail()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
      updateCardPert(item) {
        this.$prompt('请输入概率：', '修改概率', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /^\d+(\.\d{0,1})?$/,
          inputErrorMessage: '请输入大于等于0的数字且最多保留小数点后一位'
        }).then(({value}) => {
          console.log(value)
          if (value > 100) return this.$message.error('数字必须小于100')
          this.$request.post('/hbact/jh/saas/pintu/update/pert', {
            id: item.id,
            drawPert: value
          }, false, res => {
            if (res.code === '200') {
              this.$message.success('修改成功')
              this.getDetail()
            } else {
              this.$message.error(res.msg)
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '取消输入'
          })
        })
      },
    }
  }
</script>
<style>
  .PatchMgr-container .el-form-item--small .el-form-item__content, .el-form-item--small .el-form-item__label {
    line-height: 64px;
    height: 64px;
  }

  .PatchMgr-container .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .PatchMgr-container .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .PatchMgr-container .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 110px;
    height: 60px;
    line-height: 60px;
    text-align: center;
  }

  .PatchMgr-container .avatar {
    width: 110px;
    height: 60px;
    display: block;
  }
</style>
<style lang="scss" scoped>
  .PatchMgr-container {
    background: #fff;
    padding: 30px;
    box-sizing: border-box;
  }
</style>
