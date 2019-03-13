<template>
  <div class="content">
    <div class="phone-wrapper">
      <div class="phone-header">
        <h4>{{title}}</h4>
      </div>
      <div class="phone-body">
        <!-- 首页 -->
        <!-- <div class="page" :style="{background: `url(${imgArr} center no-repeat / cover)`}"> -->
        <div class="page" v-show="page != 2 && page !== 9">
          <img :src="imgData.normal.bg.url" class="bg" title="点击编辑" @mousemove="active()" @mouseout="unActive()">
          <div class="num" v-show="page == 1">
            <p class="total-num">红包总量：10000个</p>
            <p class="residue-num">红包剩余：8000个</p>
          </div>
          <img class="red-packet" @mousemove="active(index)"  @mouseout="unActive()" :src=" imgData.normal.redPacket.url" v-for="(item, index) in imgData.normal.redPacket.style" :key="index" :style="{'width': item.w, 'height': item.h, 'top': item.t, 'left': item.l}">
          <div class="prize-list" v-show="page == 1">
            <p>恭喜180****1156  获得88元红包</p>
            <p>恭喜180****1156  获得88元红包</p>
          </div>
        </div>
        <div class="page2 page" v-show="page == 2">
          <img :src="imgData.rules.bg.url" class="bg" title="点击编辑" @mousemove="active()" @mouseout="unActive()">
          <img :src="imgData.rules.rulesBtn.url" class="rules-btn">
          <div :style="{background: `url('${imgData.rules.btnImg.url}') no-repeat center / 100% 100%`}" class="btn">返回</div>
        </div>
        <div class="page3 page" v-show="page == 3">
          <img :src="imgData.downCount.bg.url" class="bg">
          <img :src="imgData.downCount.num3.url" :style="{
            'width': imgData.downCount.num3.size[0] * 0.4 + 'px',
            'height': imgData.downCount.num3.size[1] * 0.4 +'px',
            'left': imgData.downCount.num3.pos[0] * 0.4 + 'px',
            'top': imgData.downCount.num3.pos[1] * 0.4 + 'px'}">
        </div>
        <div class="page4 page" v-show="page == 4"><img class="bg" :src="commonImg.actNotes.url"></div>
        <div class="page5 page" v-show="page == 5"><img class="bg" :src="commonImg.myAward.url"></div>
        <div class="page6 page" v-show="page == 6">
          <img :src="imgData.tips.winningImg.url" :style="{
            'width': imgData.tips.winningImg.size[0] * 0.4 + 'px',
            'height': imgData.tips.winningImg.size[1] * 0.4 +'px',
            'left': imgData.tips.winningImg.pos[0] * 0.4 + 'px',
            'top': imgData.tips.winningImg.pos[1] * 0.4 + 'px'}">
          <img :src="imgData.tips.drawBtn1.url" :style="{
            'width': imgData.tips.drawBtn1.size[0] * 0.4 + 'px',
            'height': imgData.tips.drawBtn1.size[1] * 0.4 +'px',
            'left': imgData.tips.drawBtn1.pos[0] * 0.4 + 'px',
            'top': imgData.tips.drawBtn1.pos[1] * 0.4 + 'px'}">
        </div>
        <div class="page7 page" v-show="page == 7">
          <img :src="imgData.tips.notWinImg.url" :style="{
            'width': imgData.tips.notWinImg.size[0] * 0.4 + 'px',
            'height': imgData.tips.notWinImg.size[1] * 0.4 +'px',
            'left': imgData.tips.notWinImg.pos[0] * 0.4 + 'px',
            'top': imgData.tips.notWinImg.pos[1] * 0.4 + 'px'}">
          <img :src="imgData.tips.drawBtn2.url" :style="{
            'width': imgData.tips.drawBtn2.size[0] * 0.4 + 'px',
            'height': imgData.tips.drawBtn2.size[1] * 0.4 +'px',
            'left': imgData.tips.drawBtn2.pos[0] * 0.4 + 'px',
            'top': imgData.tips.drawBtn2.pos[1] * 0.4 + 'px'}">
        </div>
        <div class="page8 page" v-show="page == 8">
          <div class="tipsDialog">
            <img :src="imgData.tips.tipsImg.url" :style="{
              'width': imgData.tips.tipsImg.size[0] * 0.4 + 'px',
              'height': imgData.tips.tipsImg.size[1] * 0.4 +'px',
              'left': imgData.tips.tipsImg.pos[0] * 0.4 + 'px',
              'top': imgData.tips.tipsImg.pos[1] * 0.4 + 'px'}">
            <img :src="imgData.tips.tipsBtn1.url" :style="{
              'width': imgData.tips.tipsBtn1.size[0] * 0.4 + 'px',
              'height': imgData.tips.tipsBtn1.size[1] * 0.4 +'px',
              'left': imgData.tips.tipsBtn1.pos[0] * 0.4 + 'px',
              'top': imgData.tips.tipsBtn1.pos[1] * 0.4 + 'px'}">
            <img :src="imgData.tips.tipsBtn2.url" :style="{
              'width': imgData.tips.tipsBtn2.size[0] * 0.4 + 'px',
              'height': imgData.tips.tipsBtn2.size[1] * 0.4 +'px',
              'left': imgData.tips.tipsBtn2.pos[0] * 0.4 + 'px',
              'top': imgData.tips.tipsBtn2.pos[1] * 0.4 + 'px'}">
          </div>
        </div>
        <div class="page9 page" v-show="page == 9">
          <div class="text">
            <h3 class="title" v-html="shareConf.shareTitle ? shareConf.shareTitle : '扫码验真'"></h3>
            <div class="desc" v-html="shareConf.shareDesc ? shareConf.shareDesc : '扫码验真精彩送不停，更多好礼等级拿！'"></div>
            <div class="img"><img :src="imgData.share.icon.url"></div>
          </div>
        </div>
      </div>
      <div class="phone-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: ['title', 'titleLength', 'page', 'imgData', 'commonImg', 'shareConf'],
  data() {
    return {
      isHover: '',
      title: '',
    }
  },
  created() {
    // console.log(this.shareConf)
  },
  methods: {
    active(index) {
      if (index !== undefined) {
        this.isHover = 2
      } else {
        this.isHover = 1
      }
    },
    unActive() {
      this.isHover = ''
    }
  }
};
</script>
<style lang="scss" scoped>
.phone-wrapper {
  width: 300px;
  height: 614px;
  overflow: hidden;
  margin: 0 auto;
}
.phone-header {
  height: 66px;
  background: url("http://qoss.qrmkt.cn/new_platform/pc_front/937@2x.png")
    center no-repeat / cover;
  overflow: hidden;
  & h4 {
    margin-block-start: 0;
    margin-block-end: 0;
    color: white;
    text-align: center;
    margin-top: 42px;
  }
}
.phone-body {
  position: relative;
  height: 484px;
}
.phone-footer {
  height: 64px;
  background: url("http://qoss.qrmkt.cn/new_platform/pc_front/phone-footer@2x.png")
    center no-repeat/ cover;
}
.page {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
  }
  .bg {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  .num {
    position: absolute;
    top: 15px;
    right: 15px;
    p {
      font-size: 12px;
      line-height: 15px;
      color: #FFF7A6;
      margin: 0;
    }
  }
  .prize-list {
    position: absolute;
    width: 100%;
    bottom: 10px;
    text-align: center;
    color: #FFF7A6;
    font-size: 12px;
    line-height: 18px;
    p {
      margin: 0;
    }
  }
  .red-packet {
    position: absolute;
    display: block;
  }
}
.page2 {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.6);
  .bg {
    position: relative;
    display: block;
    width: 100%;
    height: 100%;
  }
  .rules-btn {
    position: absolute;
    top: 10px;
    left: 240px;
    width: 52px;
    height: 14px;
  }
  .btn {
    position: absolute;
    top: 422px;
    left: 42px;
    width: 216px;
    height: 39px;
    font-size: 26px;
    letter-spacing: 10px;
    line-height: 39px;
    text-align: center;
    color: #fff;
    padding-left: 10px;
    box-sizing: border-box;
  }
}
.page3,
.page6,
.page7,
.page8 {
  background: rgba(0, 0, 0, 0.6);
}
.page9 {
  background: url('http://qoss.qrmkt.cn/new_platform/red_share_bg.png') no-repeat center / 100% 100%;
  .text {
    position: absolute;
    top: 66px;
    left: 56px;
    width: 208px;
    height: 66px;
    color: #333;
    padding: 8px;
    box-sizing: border-box;
  }
  .title {
    margin: 0;
    font-size: 14px;
  }
  .desc {
    margin: 0;
    width: 150px;
    height: 32px;
    font-size: 12px;
    color: #898989;
    word-wrap: break-word;
    word-break: break-all;
    overflow:hidden;
    text-overflow:ellipsis;
  }
  .img {
    position: absolute;
    top: 18px;
    right: 6px;
    width: 40px;
    height: 40px;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>

