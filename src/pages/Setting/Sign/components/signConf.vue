<template>
  <div class="content">
    <div class="title ml20 mb20">基础设置</div>
    <el-form label-width="100px" :model="conf.sactBset" :rules="rules">
      <el-form-item label="活动名称：" prop="actName">
        <el-input v-model="conf.sactBset.actName" :max="15" :min="1"></el-input>
      </el-form-item>
      <el-form-item label="签到入口：" prop="signImg">
        <div class="start ml20">
          <p>初始状态</p>
          <div class="con">
            <img :src="conf.sactBset.initBtImage" title="初始状态">
          </div>
          <el-upload 
          :action="uploadApi" 
          :headers="headerObj" 
          class="upload" 
          :show-file-list="false" 
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="uploadError">
            <el-button type="primary" size="small" @click="imgIndex = 1">更换图片</el-button>
          </el-upload>
        </div>
        <div class="line"></div>
        <div class="end">
          <p>按下效果</p>
          <div class="con">
            <img :src="conf.sactBset.pressBtImage" title="按下效果">
          </div>
          <el-upload 
          :action="uploadApi" 
          :headers="headerObj" 
          class="upload" 
          :show-file-list="false" 
          :on-success="uploadSuccess"
          :before-upload="beforeAvatarUpload"
          :on-error="uploadError">
            <el-button type="primary" size="small" @click="imgIndex = 2">更换图片</el-button>
          </el-upload>
        </div>
      </el-form-item>
      <el-form-item label="签到规则：" prop="signNote">
        <!-- <el-input v-model="conf.sactBset.actNote" class="textarea" type="textarea" :rows="2"></el-input> -->
        <quill-editor ref="myTextEditor" v-model="conf.sactBset.signNote" :options="editorOption" placeholder="请输入活动说明，300字以内" @blur="onEditorBlur($event)"></quill-editor>
      </el-form-item>
      <el-form-item label="分享设置：" prop="share">
        <el-radio v-model="conf.sactBset.share" :label="1">开启分享</el-radio>
        <el-radio v-model="conf.sactBset.share" :label="0">关闭分享</el-radio>
      </el-form-item>
    </el-form>
    <div class="title ml20 mb20">签到设置</div>
    <el-form label-width="130px" :rules="signRules">
      <el-form-item label="常规签到奖励：" prop="awards">
        每日签到获得
        <el-input-number v-model="conf.sactBset.score" :controls="false" :min="0" :precision="0"></el-input-number>
        积分
        <el-input-number v-model="conf.sactBset.growth" :controls="false" :min="0" :precision="0"></el-input-number>
        成长值
      </el-form-item>
      <el-form-item label="连续签到奖励：" prop="signAwards">
        <el-radio v-model="conf.sactBset.continuSignFlg" :disabled="conf.sactBset.status" :label="0">关闭</el-radio>
        <el-radio v-model="conf.sactBset.continuSignFlg" :disabled="conf.sactBset.status" :label="1">开启</el-radio>
        <sign-item v-show="conf.sactBset.continuSignFlg === 1" :data="conf.contItems"></sign-item>
        <div class="tips">发布后不可切换</div>
      </el-form-item>
    </el-form>
    <div class="title ml20 mb20">抽奖设置</div>
      <el-form label-width="130px" :rules="draw">
        <el-form-item label="是否关联抽奖：" prop="drawChanceFlg">
          <el-radio v-model="conf.sactBset.drawChanceFlg" :label="0">不关联</el-radio>
          <el-radio v-model="conf.sactBset.drawChanceFlg" :label="1">关联</el-radio>
        </el-form-item>
        <el-form-item label="抽奖要求：" prop="drawSignDay" v-if="conf.sactBset.drawChanceFlg">
          累计签到
          <el-input-number v-model="conf.sactBset.drawSignDay" :controls="false" :min="1" :precision="0"></el-input-number>
          天，可参与抽奖
        </el-form-item>
      </el-form>
    <div class="title ml20 mb20">奖项设置</div>
    <el-form label-width="100px" :rules="prize">
      <el-form-item label="选择奖品：" prop="selected">
        <el-button icon="el-icon-plus" @click="getPrize"></el-button>
      </el-form-item>
      <!-- <el-form-item label="所选礼品：">
        <prize-conf></prize-conf>
      </el-form-item> -->
    </el-form>
    <p class="ml20">所选礼品：</p>
    <prize-conf v-if="conf.gameItems" :data="conf.gameItems" class="ml20"></prize-conf>
  </div>
</template>
<script>
import prizeConf from './prizeConf'
import signItem from './signItem'
import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    prizeConf,
    signItem,
    quillEditor
  },
  props: {
    conf: {
      type: Object,
      required: true
    }
  },
  data() {
    var validateDesc = (rule, value, callback) => {
      if (!this.conf.sactBset.signNote) {
        callback(new Error('请输入活动说明'))
      } else {
        callback()
      }
    }
    var tips = (rule, value, callback) => {
      // callback()
    }
    return {
      rules: {
        actName: [{ required: true, message: '请输入活动名称', trigger: 'blur' },],
        signNote: [{ required: true, validator: validateDesc }],
        signImg: [{required: true, validator: tips}],
        share: [{required: true, validator: tips}]
        
      },
      signRules: {
        awards: [{required: true, validator: tips}],
        signAwards: [{required: true, validator: tips}]
      },
      draw: {
        draw: [{required: true, validator: tips}],
        drawChanceFlg: [{required: true, validator: tips}],
        drawSignDay: [{required: true, validator: tips}]
      },
      prize: {
        selected: [{required: true, validator: tips}]
      },
      // 富文本设置
      editorOption: {
        modules: {
          toolbar: [
            [{ header: 1 }, { header: 2 }],
            [{ list: 'ordered' }, { list: 'bullet' }],
            ['bold', 'italic', 'underline', 'strike', , 'blockquote'],
            [{ color: [] }, { background: [] }, { align: [] }]
          ]
        },
        placeholder: '请输入活动说明'
      },
      uploadApi: '/api/saotx/attach/commonAliUpload',
      headerObj: {
        loginId: sessionStorage.getItem('access_loginId') || '2d07e7953a2a63ceda6df5144d1abec3',
        token: sessionStorage.getItem('access_token'),
        CLIENTSESSIONID: sessionStorage.getItem('CLIENTSESSIONID')
      },
      imgIndex: 0,
      showFile: false,
      // conf: {
      //   sactBset: {
      //     id: null,
      //     actCode: '', // 模板编码
      //     actName: '', // 活动名称
      //     actNote: '', // 签到规则
      //     share: null, // 分享：0-不分享；1-分享
      //     score: null, // 常规-积分
      //     growth: null, // 常规-成长值
      //     drawChanceFlg: null, // 是否关联抽奖：0不关联，1关联
      //     continuSignFlg: null, // 连续签到奖励是否开启：0否, 1是
      //     initBtImage: 'http://qoss.qrmkt.cn/common/qd/center-sign-btn.png', // 按钮初始图片
      //     pressBtImage: 'http://qoss.qrmkt.cn/common/qd/center-signEnd-btn.png', // 按钮按下图片
      //     drawSignDay: null, //累计签到N天可参与抽奖
      //     pageInfo: '', // 模板配置JSON字符串
      //   },
      //   contItems: [
      //     {
      //       actCode: '',
      //       continuSignDay: null, // 累计签到N天可获得奖励
      //       continuSignFlg: 1, // 连续签到奖励是否开启：0否，1是
      //       extraScore: null, // 额外-获得积分
      //       extraGrowth: null // 额外-获得成长值
      //     }
      //   ],
      //   gameItems: [
      //     {
      //       gameId: '',
      //       gameName: '',
      //       productId: '',
      //       probability: null,
      //       quantity: null,
      //       allquantity: null, // 总库存
      //       type: null
      //     }
      //   ]
      // }
    }
  },
  created() {
    if (this.conf.sactBset.drawChanceFlg != 0 && this.conf.sactBset.drawChanceFlg != 1) this.conf.sactBset.drawChanceFlg = 0
  },
  methods: {
    getPrize() {
      this.$emit('getPrize')
    },
    onEditorBlur() {},
    updataImg(i) {

    },
    uploadSuccess (res, file, fileList) {
      let that = this;
      let url = res.data.accessUrl;
      this.imgIndex == 1 ? 
      this.conf.sactBset.initBtImage = url :
      this.conf.sactBset.pressBtImage = url
    },
    uploadError (err) {
        let that = this;
        console.log(err)
        this.$message.error('图片上传失败')
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
.quill-editor {
  width: 420px;
}
.el-input {
  width: 300px;
}
.textarea /deep/ .el-textarea__inner{
  width: 300px;
  font-family:"Microsoft" !important;
}
.title {
  font-weight: bold;
  height: 30px;
  line-height: 30px;
  background: #d9d9d9;
  margin-left: 0;
  padding-left: 10px;
  border-radius: 2px;
}
.start,
.end {
  display: inline-block;
  width: 150px;     
  p {
    margin: 0;
    line-height: 2;
    text-align: center;
  }
  .con {
    position: relative;
    width: 100%;
    height: 100px;
    box-sizing: border-box;
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
}
.el-upload .el-button {
  display: inline-block;
  width: 150px;
}
.line {
  display: inline-block;
  margin: 0 20px;
  width: 1px;
  height: 130px;
  background: #ccc;
}
.el-input-number {
  width: 100px;
}
.el-form-item {
  position: relative;
  .tips {
    position: absolute;
    left: -110px;
    top: 34px;
    font-size: 12px;
    color: rgb(153, 153, 153);
    line-height: 1;
  }
}
</style>

