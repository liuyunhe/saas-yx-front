<template>
  <div class="conteiner">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item>编辑等级</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-form ref="rigthsEditRef" :model="conf.mgrade" label-width="120px" :rules="rules">
        <el-form-item label="等级名称：" prop="gradeName">
          <el-input v-model="conf.mgrade.gradeName" :maxlength="8"></el-input>
        </el-form-item>
        <el-form-item label="需要成长值：" prop="gradeNum">
          <el-input-number :disabled="lowGrowth" v-model="conf.mgrade.gradeLower" :controls="false" :min="0" :max="999999999" :precision="0"></el-input-number>
          -
          <el-input-number v-model="conf.mgrade.gradeUpper" :controls="false" :min="0" :max="999999999" :precision="0"></el-input-number>
        </el-form-item>
        <el-form-item label="等级图标：" prop="gradeImg">
          <div class="img">
            <img :src="conf.mgrade.gradeImg">
          </div>
          <el-upload :action="uploadApi" :headers="headerObj" class="upload" :show-file-list="false" :on-success="uploadSuccess" :before-upload="beforeAvatarUpload" :on-error="uploadError">
            <el-button type="primary">更换图片</el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="用户权益：" prop="rights">
          <div>
            <el-checkbox v-model="rightsList[0].selected" disabled :true-label="1" :false-label="0">生日福利</el-checkbox>
            <div v-if="rightsList[0].selected" class="ml40">
              <div><el-checkbox v-model="rightsList[0].rightsBirSmsFlg" disabled :true-label="1" :false-label="0">生日短信(生日享受祝福短信)</el-checkbox></div>
              <div>
                <el-checkbox v-model="birthScoreFlg" :true-label="1" :false-label="0">赠送积分</el-checkbox>
                <el-input-number class="num-input" v-model="rightsList[0].rightsScore" @change="isNaN()" :disabled="!birthScoreFlg" :controls="false" :max="1000000" :min="0" :precision="0"></el-input-number>
                积分
              </div>
              <div>
                <el-checkbox v-model="birthGrowthFlg" :true-label="1" :false-label="0">赠送成长值</el-checkbox>
                <el-input-number class="num-input" v-model="rightsList[0].rightsGrowth" :disabled="!birthGrowthFlg" :controls="false" :min="0" :max="1000000" :precision="0"></el-input-number>
                成长值
              </div>
            </div>
          </div>
          <div>
            <el-checkbox v-model="rightsList[1].selected" :true-label="1" :false-label="0">积分加速</el-checkbox>
            <el-input-number :disabled="!rightsList[1].selected" v-model="rightsList[1].ritsSmallTimes" :controls="false" :min="1" :precision="2"></el-input-number> 倍
            <span class="ml20 tips">做任务、签到获取的积分根据配置进行翻倍</span>
          </div>
          <div>
            <el-checkbox v-model="rightsList[2].selected" :true-label="1" :false-label="0">成长值加速</el-checkbox>
            <el-input-number :disabled="!rightsList[2].selected" v-model="rightsList[2].ritsSmallTimes" :controls="false" :min="1" :precision="2"></el-input-number> 倍
            <span class="ml20 tips">做任务、签到获取的成长值根据配置进行翻倍</span>
          </div>
          <div>
            <el-checkbox v-model="rightsList[3].selected" :true-label="1" :false-label="0">积分商城兑换</el-checkbox>
            <el-input-number :disabled="!rightsList[3].selected" v-model="rightsList[3].ritsSmallTimes" :controls="false" :min="0" :max="10" :precision="2"></el-input-number> 折
            <span class="ml20 tips">积分商城兑换商品可以享受的折扣</span>
          </div>
          <div>
            <el-checkbox v-model="rightsList[4].selected" :true-label="1" :false-label="0">品鉴福利(获取品鉴资格)</el-checkbox>
          </div>
          <div v-if="lowGrowth">
            <el-checkbox v-model="rightsList[5].selected" :true-label="1" :false-label="0">升级奖励</el-checkbox>
            <!-- <span class="ml20 tips">每升一级可获得以下奖励</span> -->
            <div v-if="rightsList[5].selected" class="ml40">
              <div>
                <el-checkbox v-model="upGradeScoreFlg" :true-label="1" :false-label="0">赠送积分</el-checkbox>
                <el-input-number :disabled="!upGradeScoreFlg" v-model="rightsList[5].rightsScore" :controls="false" :max="1000000" :min="0" :precision="0"></el-input-number>
                积分
              </div>
              <div>
                <el-checkbox v-model="upGradeGrowthFlg" :true-label="1" :false-label="0">赠送成长值</el-checkbox>
                <el-input-number :disabled="!upGradeGrowthFlg" v-model="rightsList[5].rightsGrowth" :controls="false" :max="1000000" :min="0" :precision="0"></el-input-number>
                成长值
              </div>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div class="btn">
        <el-button type="primary" @click="save">保存</el-button>
        <el-button class="ml20" plain @click="$router.back(-1)">返回</el-button>
      </div>
    </el-card>
  </div>
</template>
<script>
export default {
  props: ['id', 'lowGrowth', 'highGrowth'],
  data() {
    var validateGradeNum = (rule, value, callback) => {
      if (this.conf.mgrade.gradeLower >= this.conf.mgrade.gradeUpper) {
        callback(new Error('成长值下限必须大于成长值上限'))
      } else if (!this.conf.mgrade.gradeUpper) {
        callback(new Error('请输入成长值'))
      } else if (this.highGrowth) {
        if (this.conf.mgrade.gradeUpper >= this.highGrowth) {
          callback(new Error('成长值上限不能大于上一级的成长值上限'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
    var validateGradeImg = (rule, value, callback) => {
      if (!this.conf.mgrade.gradeImg) {
        callback(new Error('请上传等级图标'))
      } else {
        callback()
      }
    }
    var validateRights = (rule, value, callback) => {
      callback()
    }
    return {
      uploadApi: '/api/wiseqr/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      conf: {
        mgrade: {
          // id: 1,
          gradeName: '',
          gradeLower: null,
          gradeUpper: null,
          gradeImg: 'http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/pc_front/rifhts-default-img.png'
        },
        mgrsList: []
      },
      rules: {
        gradeName: [{ required: true, message: '请输入等级名称', trigger: 'blur' }],
        gradeNum: [{ required: true, validator: validateGradeNum, trigger: 'blur' }],
        gradeImg: [{ required: true, validator: validateGradeImg, trigger: 'change' }],
        rights: [{ required: true, validator: validateRights}]
      },
      high: sessionStorage.getItem('max'),
      birthScoreFlg: 0,
      birthGrowthFlg: 0,
      upGradeScoreFlg: 0,
      upGradeGrowthFlg: 0,
      rightsList: [
        {
          selected: 1,
          rightsName: '生日权益',
          rightsCode: 'BIRTHDAY_RIGHT',
          rightsBirSmsFlg: 1,
          rightsScore: '',
          rightsGrowth: ''
        },
        {
          selected: 0,
          rightsName: '积分加速',
          rightsCode: 'SCORE_ACCELERATE',
          ritsSmallTimes: '',
        },
        {
          selected: 0,
          rightsName: '成长值加速',
          rightsCode: 'GROWTH_ACCELERATE',
          ritsSmallTimes: '',
        },
        {
          selected: 0,
          rightsName: '积分商城兑换',
          rightsCode: 'SCORE_MALL_EXCHANGE',
          ritsSmallTimes: '',
        },
        {
          selected: 0,
          rightsName: '品鉴福利',
          rightsCode: 'TASTING_RIGHT',
        },
        {
          selected: 0,
          rightsName: '升级奖励',
          rightsCode: 'UPGRADE_AWARDS_BIGHT',
          rightsScore: '',
          rightsGrowth: ''
        }
      ]
    }
  },
  watch: {
    birthScoreFlg(val) {
      val ? '' : this.rightsList[0].rightsScore = 0
    },
    birthGrowthFlg(val) {
      val ? '' : this.rightsList[0].rightsGrowth = 0
    },
    upGradeScoreFlg(val) {
      val ? '' : rightsList[5].rightsScore = 0
    },
    upGradeGrowthFlg(val) {
      val ? '' : rightsList[5].rightsGrowth = 0
    }
  },
  created() {
    
  },
  mounted() {
    this.getRightsDetail()
    if (!this.id) this.lowGrowth ? this.conf.mgrade.gradeLower = +this.lowGrowth + 1 : ''
  },
  methods: {
    // 获取详情
    getRightsDetail() {
      if (!this.id) return
      const loading = this.$loading({
        target: '.el-card'
      })
      this.$request.post('/api/wiseqr/mbgrade/detail', {id: this.id}, true, res => {
        if (res.ret === '200000') {
          this.conf = res.data
          this.lowGrowth ? this.conf.mgrade.gradeLower = +this.lowGrowth + 1 : ''
          loading.close()
          if (!this.conf.mgrsList) return
          res.data.mgrsList.forEach(item => {
            switch (item.rightsCode) {
              case 'BIRTHDAY_RIGHT':
                this.rightsList[0] = item
                this.$set(this.rightsList[0], 'selected', 1)
                this.rightsList[0].rightsScore ? this.birthScoreFlg = 1 : this.birthScoreFlg = 0
                this.rightsList[0].rightsGrowth ? this.birthGrowthFlg = 1 : this.birthGrowthFlg = 0
                break;
              case 'SCORE_ACCELERATE':
                this.rightsList[1] = item
                this.$set(this.rightsList[1], 'selected', 1)
                break;
              case 'GROWTH_ACCELERATE':
                this.rightsList[2] = item
                this.$set(this.rightsList[2], 'selected', 1)
                break;
              case 'SCORE_MALL_EXCHANGE':
                this.rightsList[3] = item
                this.$set(this.rightsList[3], 'selected', 1)
                break;
              case 'TASTING_RIGHT':
                this.rightsList[4] = item
                this.$set(this.rightsList[4], 'selected', 1)
                break;
              case 'UPGRADE_AWARDS_BIGHT':
                this.rightsList[5] = item
                this.$set(this.rightsList[5], 'selected', 1)
                this.rightsList[5].rightsScore ? this.upGradeScoreFlg = 1 : this.upGradeScoreFlg = 0
                this.rightsList[5].rightsGrowth ? this.upGradeGrowthFlg = 1 : this.upGradeGrowthFlg = 0
                break;
            }
          })
          return
        }
        this.$message.error(res.message)
      })
    },
    // 保存
    save() {
      this.$refs.rigthsEditRef.validate(valid => {
        if (!valid) return this.$message.error('请完善表单数据!')
        // let selectList = this.rightsList.filter(item => {
        //   return item.selected == 1
        // })
        let selectList = []
        this.rightsList.forEach((d, i) => {
          switch (i) {
            case 0:
              if (d.selected && (d.rightsBirSmsFlg || d.rightsGrowth || d.rightsScore)) {
                selectList.push(d)
              }
              break;
            case 1:
            case 2:
            case 3:
              if (d.selected && d.ritsSmallTimes) {
                selectList.push(d)
              }
              break;
            case 4:
              if (d.selected) {
                selectList.push(d)
              }
              break;
            case 5:
              if (d.selected && (d.rightsGrowth || d.rightsScore)) {
                selectList.push(d)
              }
              break;
          }
        })
        if (selectList.length == 0) return this.$message.error('请选择用户权益!')
        this.conf.mgrsList = selectList
        this.$request.post('/api/wiseqr/mbgrade/saveOrupdate', this.conf, true, res => {
          if (res.ret === '200000') {
            this.$message.success('保存成功')
            this.$router.push('/customer/lvl')
            return
          }
          this.$message.error(res.message)
        })
      })
    },
    uploadSuccess (res, file, fileList) {
        this.conf.mgrade.gradeImg = res.data.accessUrl
    },
    uploadError (err) {
        let that = this;
        console.log(err)
        alert('图片上传失败')
    },
    beforeAvatarUpload(file) {
      const IMGTYPE = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/bmp' || file.type === 'image/gif'
      if (!IMGTYPE) {
        this.$message.error('上传图片只能是 JPG 、 PNG 、 GIF 、 BMP 格式!')
      }
      return IMGTYPE
    },
  }
}
</script>
<style lang="scss" scoped>
.el-input {
  max-width: 300px;
}
.img {
  position: relative;
  display: inline-block;
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  img {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    max-width: 90%;
    max-height: 90%;
  }
}
.upload {
  display: inline-block;
  vertical-align: text-bottom;
  margin-left: 10px;
}
.icon-name {
  display: inline-block;
}
.ml40 {
  margin-left: 40px;
}
.btn {
  // text-align: center;
  margin-left: 120px;
}
.el-checkbox {
  margin-bottom: 10px;
}
.tips {
  color: #999999;
  font-size: 12px;
}
</style>

