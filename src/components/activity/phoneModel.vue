<template>
    <div id="root">
        <div class="phone-wrapper">
            <div class="phone-header">
                <h4>{{title}}</h4>
            </div>
            <div class="phone-body">
                <div class="cover" v-if="page != 1 && page !=6">
                    <img 
                        v-if="page != 2 && page != 3 && page != 4 && page != 7"
                        :src="commonImg.close.url" alt=""
                        class='close_icon'
                        :style="{
                            'width': commonImg.close.size[0] * 0.4 + 'px',
                            'height': commonImg.close.size[1] * 0.4 + 'px',
                            'left': commonImg.close.pos[0] * 0.4 + 'px',
                            'top': commonImg.close.pos[1] * 0.4 + 'px',
                        }"
                    >
                </div>
                 <!-- 第一页： 首页 -->
                <div class="page1">
                    <img 
                    v-if="imgData.normal" 
                    v-for="(pic, index) in imgData.normal" 
                    :src="pic.url + '?v=1.1'" 
                    title="点击编辑" 
                    :key="index + pic"
                    @mouseover="imgHover(index)"
                    @mouseout="unHover()"
                    @click="edit(index)"
                    :class="[index, {imgHover: hover == index}]"
                    :style="{
                        'width': pic.size[0] * 0.4 + 'px',
                        'height': pic.size[1] * 0.4 +'px',
                        'left': pic.pos[0] * 0.4 + 'px',
                        'top': pic.pos[1] * 0.4 + 'px'
                    }"/>
                <img 
                    v-if="imgData.item" 
                    v-for="(pic, index) in imgData.item" 
                    :src="pic.url + '?v=1.1'" 
                    title="点击编辑" 
                    :key="index + pic"
                    :class="[index, {imgHover: hover == index}]"
                    @mouseover="imgHover(index)"
                    @mouseout="unHover()"
                    @click="edit(index)"
                    :style="{
                        'width': pic.size[0] * 0.4 + 'px',
                        'height': pic.size[1] * 0.4 +'px',
                        'left': pic.pos[0] * 0.4 + 'px',
                        'top': pic.pos[1] * 0.4 + 'px'
                    }"/>
                </div>
                <!--答题页面-->
                <div class="page1" v-show="page == 6">              	
                    <img 
                    v-if="imgData.question" 
                    v-for="(pic, index) in imgData.question" 
                    :src="pic.url + '?v=1.1'" 
                    title="点击编辑" 
                    :key="index + pic"
                    @mouseover="imgHover(index)"
                    @mouseout="unHover()"
                    @click="edit(index)"
                    :class="[index, {imgHover: hover == index}]"
                    :style="{
                        'width': pic.size[0] * 0.4 + 'px',
                        'height': pic.size[1] * 0.4 +'px',
                        'left': pic.pos[0] * 0.4 + 'px',
                        'top': pic.pos[1] * 0.4 + 'px'
                    }"/>
                	<div class="text">
                		<div>1.中国的五大名山被称为“中国五岳”，五岳 中哪座山位于山西省？</div>
	                	<div class="line"></div>
	                	<div class="answer">
	                		<p>A. 西岳华山</p>
	                		<p>B. 北岳衡山</p>
	                	</div>
                	</div>
                </div>
                <div class="page page2" v-show="page == 2">
                    <img :src="commonImg.actNotes.url" alt="">
                </div>
                <div class="page page3" v-show="page == 3">
                    <img :src="commonImg.myAward.url" alt="">
                </div>
                <div class="page page4" v-show="page == 4 && flag=='ques'">
                	<img                     
                        :src="commonImg.close.url" alt=""
                        class='close_icon'
                        :style="{
                            'width': commonImg.close.size[0] * 0.4 + 'px',
                            'height': commonImg.close.size[1] * 0.4 + 'px',
                            'left': commonImg.close.pos[0] * 0.4 + 'px',
                            'top': commonImg.close.pos[1] * 0.4 + 'px',
                        }"
                    >
                	<img 
                		:src="commonImg.getAwardBg.url"alt=""
                		class="award-alert"
                		:style="{
                            'width': commonImg.getAwardBg.size[0] * 0.4 + 'px',
                            'height': commonImg.getAwardBg.size[1] * 0.4 + 'px'
                        }"
                		 />
                    <img 
                        :src="commonImg.award.url" alt="" 
                        class="award-pic" 
                        :style="{
                            'width': commonImg.award.size[0] * 0.4 + 'px',
                            'height': commonImg.award.size[1] * 0.4 + 'px'
                        }"
                    >
                    <div class="award-text">
                        <h2>奖品名称</h2>
                        <p>请在24小时内领取</p>
                    </div>
                    <img 
                        :src="commonImg.getBtn.url" alt="" 
                        class="award-btn"
                        :style="{
                            'width': commonImg.getBtn.size[0] * 0.4 + 'px',
                            'height': commonImg.getBtn.size[1] * 0.4 + 'px',
                            'top': commonImg.getBtn.pos[1] * 0.42 + 'px'
                        }"
                        >
                </div>
                <div class="page page4" v-show="page == 4 && flag=='pai'">
                	<img                     
                        :src="commonImg.close.url" alt=""
                        class='close_icon'
                        :style="{
                            'width': commonImg.close.size[0] * 0.4 + 'px',
                            'height': commonImg.close.size[1] * 0.4 + 'px',
                            'left': commonImg.close.pos[0] * 0.4 + 'px',
                            'top': commonImg.close.pos[1] * 0.4 + 'px',
                        }"
                    >
                	<img 
                		:src="commonImg.getAwardBgPai.url"alt=""
                		class="award-alert"
                		:style="{
                            'width': commonImg.getAwardBgPai.size[0] * 0.4 + 'px',
                            'height': commonImg.getAwardBgPai.size[1] * 0.4 + 'px'
                        }"
                		 />
                    <img 
                        :src="commonImg.award.url" alt="" 
                        class="award-pic" 
                        :style="{
                            'width': commonImg.award.size[0] * 0.4 + 'px',
                            'height': commonImg.award.size[1] * 0.4 + 'px'
                        }"
                    >
                    <div class="award-text">
                        <h2>奖品名称</h2>
                        <p>请在24小时内领取</p>
                    </div>
                    <img 
                        :src="commonImg.getBtnPai.url" alt="" 
                        class="award-btn"
                        :style="{
                            'width': commonImg.getBtnPai.size[0] * 0.4 + 'px',
                            'height': commonImg.getBtnPai.size[1] * 0.4 + 'px',
                            'top': commonImg.getBtnPai.pos[1] * 0.42 + 'px'
                        }"
                        >
                </div>
                <div class="page page5" v-if="page == 5 && flag=='ques'">
                    <img 
                        :src="commonImg.noAward.url" alt="" 
                        class="award-alert"
                        :style="{
                            'width': commonImg.noAward.size[0] * 0.4 + 'px',
                            'height': commonImg.noAward.size[1] * 0.4 + 'px'                            
                        }"
                        />
                    <p>很遗憾，未中奖</p>
                    <img 
                        :src="commonImg.knowBtn.url" alt="" 
                        class="award-btn"
                        :style="{
                            'width': commonImg.knowBtn.size[0] * 0.4 + 'px',
                            'height': commonImg.knowBtn.size[1] * 0.4 + 'px',
                            'top': commonImg.knowBtn.pos[1] * 0.42 + 'px'
                        }"
                    >
                </div>
                <div class="page page5" v-if="page == 5 && flag=='pai'">
                    <img 
                        :src="commonImg.noAwardPai.url" alt="" 
                       class="award-alert"
                        :style="{
                            'width': commonImg.noAwardPai.size[0] * 0.4 + 'px',
                            'height': commonImg.noAwardPai.size[1] * 0.4 + 'px'                            
                        }"
                        />
                    <p>很遗憾，未中奖</p>
                    <img 
                        :src="commonImg.knowBtnPai.url" alt="" 
                        class="award-btn"
                        :style="{
                            'width': commonImg.knowBtnPai.size[0] * 0.4 + 'px',
                            'height': commonImg.knowBtnPai.size[1] * 0.4 + 'px',
                            'top': commonImg.knowBtnPai.pos[1] * 0.42 + 'px'
                        }"
                    >
                </div>
                <div class="page page5" v-if="page == 7">
                    <img 
                        :src="commonImg.errorTip.url" alt="" 
                        class="award-pic no-award"
                        :style="{
                            'width': commonImg.errorTip.size[0] * 0.4 + 'px',
                            'height': commonImg.errorTip.size[1] * 0.4 + 'px',
                            'top': commonImg.errorTip.pos[1] * 0.32 + 'px'
                        }"
                        />
                    <p class='error-text'>时间到!</p>
                    <img 
                        :src="commonImg.errorBtn.url" alt="" 
                        class="award-btn errorBtn"
                        :style="{
                            'width': commonImg.errorBtn.size[0] * 0.4 + 'px',
                            'height': commonImg.errorBtn.size[1] * 0.4 + 'px',
                            'top': commonImg.errorBtn.pos[1] * 0.42 + 'px'
                        }"
                    >
                </div>
                
            </div>
            <div class="phone-footer"></div>
        </div>
    </div>
</template>
<script>
export default {
    props: {
        title: {
            type: String,
            default: "活动标题"
        },
        imgData: {
            type: [Array, Object],
            default: null
        },
        imgKey: {
            type: String,
            default: ""
        },
        page: {
            type: [Number, String],
            default: 1
        },
        commonImg: {
            type: [Array, Object]
        },
        flag:{
        	type: String,
            default: ""
        }
    },
    data () {
        return {
            hover: ''
        }
    },
    created () {

    },
    mounted () {
		this.edit('bg')
    },
    computed: {
    },
    methods: {
        imgHover (index) {
            this.hover = index;
        },
        unHover () {
            this.hover = ''
        },
        edit (index) {
            this.$emit('edit', {index: index});
        }
    }
}
</script>
<style lang="scss">
#root{
    .phone-wrapper{
        width: 300px;
        height: 614px;
        .phone-header{
            height: 66px;
            background: url("http://qoss.qrmkt.cn/new_platform/pc_front/937@2x.png") center no-repeat / cover;
            overflow: hidden;
            & h4{
                margin-block-start: 0;
                margin-block-end: 0;
                color: white;
                text-align: center;
                margin-top: 42px;
            }
        }
        .phone-body{
            height: 484px;
            /*margin-left: 1px;*/
            position: relative;
            .cover{
                position: absolute;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background: rgba($color: #000000, $alpha: 0.8);
                z-index: 1;
                
            }
            & img{
                box-sizing: border-box;
                transition: all 0.2s linear;
                position: absolute;
                object-fit:contain;
            }
            .contentBg, .contentBg{
                left: 50%!important;
                transform: translateX(-50%);
            }
            .imgHover {
                border: 2px dashed #999;
                // transform: scale(0.98, 0.98);
                filter: brightness(80%);
                cursor: pointer;
            }
            .page {
                position: absolute;
                z-index: 2;
                width: 100%;
                height: 100%;
                left: 0;
                top: 0;
                
                &.page2>img, &.page3>img{
                    width: 100%;
                    height: 100%;
                }
                .award-alert {
                	left: 50%;
                    top:100px;
                    transform: translateX(-50%);
                }
                .award-pic{
                    left: 47%;
                    top: 150px;
                    transform: translateX(-50%);
                    &.no-award{
                        left: 50%;
                    }
                }
                .close_icon {
                	z-index: 5;
                }
                .award-text{
                    color: white;
                    text-align:  center;
                    position:absolute;
                    top:240px;
                    left:50%;
                    transform:translate(-50%);
                    z-index:3;
                    & h2, & p{
                        margin: 5px;
                    }
                }
                .award-btn{
                    left: 50%;
                    transform: translateX(-50%);
                }
                &.page5 p{
                    position: absolute;
                    width: 100%;
                    font-weight: bold;
                    font-size: 16px;
                    color: #fff;
                    text-align: center;
                    top: 265px;
                }
            }
            
            .errorBtn {
            	top:360px !important
            }
            .page1{
                	.text {
	                	position: absolute;
	                	left: 0;
	                	top:50px;
	                	
	                	padding: 40px;
	                	color:#fff;
	                	.line {
	                		width:100%;
	                		height: 1px;
	                		background: #fff;
	                		margin-top: 60px;
	                		margin-bottom: 30px;
	                	}
	                	.answer {
	                		p {
	                			padding-left: 20px;
	                			margin-bottom: 20px;
	                		}
	                	}
	                }
	                .QuesActive,.QuesWrong {
	                	z-index: 3;
	                }
	                
                }
                .error-text{
	                	top:260px !important;
	                	color:#fff !important;
	                }
        }
        .phone-footer{
            height: 64px;
            background: url("http://qoss.qrmkt.cn/new_platform/pc_front/phone-footer@2x.png") center no-repeat/ cover;
        }
    }
}
</style>
