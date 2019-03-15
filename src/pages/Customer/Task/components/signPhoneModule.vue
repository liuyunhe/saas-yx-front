<template>
  <div class="content">
    <div class="phone-wrapper" v-if="conf.imgObj">
      <div class="phone-header">
        <h4>{{ conf.title }}</h4>
      </div>
      <div class="phone-body">
        <div v-if="page == 1 || page == 8">
          <img
            class="bg page1-bg"
            :src="conf.imgObj.page1.bg.url"
            @click="sendImgType(conf.imgObj.page1.bg.type)"
            :style="{
              width: conf.imgObj.page1.bg.size[0] * 0.4 + 'px',
              height: conf.imgObj.page1.bg.size[1] * 0.4 + 'px',
              left: conf.imgObj.page1.bg.pos[0] * 0.4 + 'px',
              top: conf.imgObj.page1.bg.pos[1] * 0.4 + 'px'
            }"
          />
          <img
            :src="conf.imgObj.page1.rulesBtn.url"
            class="rules-btn"
            @click="sendImgType(conf.imgObj.page1.rulesBtn.type)"
            :style="{
              width: conf.imgObj.page1.rulesBtn.size[0] * 0.4 + 'px',
              height: conf.imgObj.page1.rulesBtn.size[1] * 0.4 + 'px',
              left: conf.imgObj.page1.rulesBtn.pos[0] * 0.4 + 'px',
              top: conf.imgObj.page1.rulesBtn.pos[1] * 0.4 + 'px'
            }"
          />
          <img
            :src="conf.imgObj.page1.drawBtn.url"
            alt=""
            class="draw-btn"
            @click="sendImgType(conf.imgObj.page1.drawBtn.type)"
            :style="{
              width: conf.imgObj.page1.drawBtn.size[0] * 0.4 + 'px',
              height: conf.imgObj.page1.drawBtn.size[1] * 0.4 + 'px',
              left: conf.imgObj.page1.drawBtn.pos[0] * 0.4 + 'px',
              top: conf.imgObj.page1.drawBtn.pos[1] * 0.4 + 'px'
            }"
          />
          <div
            class="calendar"
            @click="sendImgType(conf.imgObj.page1.calendarHeader.type)"
          >
            <div
              class="header"
              :style="{
                width: conf.imgObj.page1.calendarHeader.size[0] * 0.4 + 'px',
                height: conf.imgObj.page1.calendarHeader.size[1] * 0.4 + 'px',
                left: conf.imgObj.page1.calendarHeader.pos[0] * 0.4 + 'px',
                top: conf.imgObj.page1.calendarHeader.pos[1] * 0.4 + 'px',
                background: `url(${
                  conf.imgObj.page1.calendarHeader.url
                }) no-repeat center / 100% 100%`,
                'line-height':
                  conf.imgObj.page1.calendarHeader.size[1] * 0.4 + 'px'
              }"
            >
              您已经连续签到 <span>3</span> 天
            </div>
            <div
              class="con"
              :style="{
                width: conf.imgObj.page1.calendarCon.size[0] * 0.4 + 'px',
                height: conf.imgObj.page1.calendarCon.size[1] * 0.4 + 'px',
                left: conf.imgObj.page1.calendarCon.pos[0] * 0.4 + 'px',
                top: conf.imgObj.page1.calendarCon.pos[1] * 0.4 + 'px',
                background: `url(${
                  conf.imgObj.page1.calendarCon.url
                }) no-repeat center / 100% 100%`
              }"
            >
              <div class="data-module">
                <div class="header">{{ nowMonth }}</div>
                <div class="body">
                  <div class="item" v-for="(item, i) in weekArr" :key="i">
                    {{ item }}
                  </div>
                  <div class="item" v-for="(item, i) in days" :key="i"></div>
                  <div
                    class="item"
                    v-for="(item, i) in dayArr"
                    :key="i"
                    :style="signDayArr.includes(i + 1) ? conf.activeStyle : {}"
                  >
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="mask" v-show="page == 8"></div>
        </div>
        <div v-if="page !== 1 && page < 7">
          <div
            class="bg"
            :style="{
              width: '300px',
              height: '484px',
              background: 'rgba(0, 0, 0, 0.8)'
            }"
          >
            <img
              v-for="(item, index) in conf.imgObj['page' + page]"
              :key="index"
              :src="item.url"
              :style="{
                width: item.size[0] * 0.4 + 'px',
                height: item.size[1] * 0.4 + 'px',
                left: item.pos[0] * 0.4 + 'px',
                top: item.pos[1] * 0.4 + 'px'
              }"
            />
          </div>
        </div>
        <div v-if="page == 7">
          <div class="share-bg">
            <div class="text">
              <h3
                class="title"
                v-html="
                  conf.share.shareTitle ? conf.share.shareTitle : '扫码验真'
                "
              ></h3>
              <p
                class="desc"
                v-html="
                  conf.share.shareDesc
                    ? conf.share.shareDesc
                    : '扫码验真精彩送不停，更多好礼等级拿！'
                "
              ></p>
              <dic class="img"><img :src="conf.imgObj.page7.icon.url + '?' + new Date().getTime()"/></dic>
            </div>
          </div>
        </div>
      </div>
      <div class="phone-footer"></div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    conf: {
      type: Object,
      required: true
    },
    page: {}
  },
  data() {
    return {
      nowMonth: `${new Date().getFullYear()}.${new Date().getMonth() + 1}`,
      weekArr: ["日", "一", "二", "三", "四", "五", "六"],
      dayArr: [],
      days: null,
      activeStyle: {
        background: "#F0CB28",
        color: "#FCF8F8"
      },
      signDayArr: [1, 2, 4, 5, 6, 7, 10, 20]
    };
  },
  watch: {
    // page(val) {
    //   // this.imgObj = this.conf.imgObj['page' + val]
    //   console.log(this.imgObj)
    // }
  },
  created() {
    // this.imgObj = this.conf.imgObj.page1
    // console.log(this.conf.imgObj)
    this.days = new Date(this.nowMonth + ".1").getDay();
    this.handleDayNum();
  },
  methods: {
    handleDayNum() {
      let month = new Date().getMonth() + 1,
        year = new Date().getFullYear(),
        num = 0;
      switch (month) {
        case 2:
          if (
            year % 4 !== 0 ||
            (year % 100 == 0 && year % 400 !== 0) ||
            year % 3200 == 0
          ) {
            num = 28;
          } else {
            num = 29;
          }
          break;
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          num = 31;
          break;
        case 4:
        case 6:
        case 9:
        case 11:
          num = 30;
          break;
      }
      this.forDay(num);
    },
    forDay(num) {
      this.dayArr = [];
      for (let i = 1; i <= num; i++) {
        this.dayArr.push(i);
      }
      // console.log(this.dayArr)
    },
    handleImg() {},
    sendImgType(type) {
      if (this.page == 8) return;
      this.$emit("changeImg", type);
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
  background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/937@2x.png")
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
  overflow: hidden;
  img {
    display: block;
    position: absolute;
  }
}
.phone-footer {
  height: 64px;
  background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png")
    center no-repeat/ cover;
}
.calendar {
  position: absolute;
  top: 150px;
  left: 24px;
  width: 252px;
  height: 237px;
  font-family: PingFangSC-Regular;
  // background: red;
  .header {
    text-align: center;
    font-size: 12.8px;
    span {
      font-weight: 600;
      color: #f30f04;
    }
  }
  .con {
    position: absolute;
  }
}
.data-module {
  width: 100%;
  height: 100%;
  // background: #ccc;
  border-radius: 10px;
  color: #222222;
  .header {
    // width: 100%;
    height: 31px;
    line-height: 31px;
    font-size: 12.8px;
    margin: 0 20px;
    text-align: center;
    border-bottom: 1px solid #999999;
    box-sizing: border-box;
  }
  .body {
    width: 100%;
    height: 163px;
    padding: 8px 21px 0;
    box-sizing: border-box;
    // display: flex;
    .item {
      float: left;
      width: 20px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      // background: skyblue;
      margin-right: 5px;
      margin-left: 5px;
      margin-bottom: 2px;
      border-radius: 50%;
      transition: all 0.2s linear;
    }
  }
  .title {
    font-weight: bold;
  }
}
.share-bg {
  width: 300px;
  height: 484px;
  background: url("http://qrmkt.oss-cn-beijing.aliyuncs.com/new_platform/red_share_bg.png")
    no-repeat center / 100% 100%;
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
    overflow: hidden;
    text-overflow: ellipsis;
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
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 300px;
  height: 484px;
  z-index: 999;
}
.page1-bg:hover,
.rules-btn:hover,
.draw-btn:hover,
.calendar:hover {
  // outline: #999999 dashed thin;
  filter: contrast(50%);
  cursor: pointer;
}
</style>
