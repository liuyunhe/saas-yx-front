<template>
    <div id="root">
        <div class="phone-wrapper">
            <div class="phone-header">
                <h4>{{title}}</h4>
            </div>
            <div class="phone-body">
                <div class="cover" v-if="page != 0"></div>
                <img 
                    v-if="imgData.normal" 
                    v-for="(pic, index) in imgData.normal" 
                    :src="pic.url" 
                    title="点击编辑" 
                    :key="index + pic"
                    @mouseover="imgHover(index)"
                    @mouseout="unHover()"
                    @click="edit(index)"
                    :class="[index, {imgHover: hover == index}]"
                    :style="{
                        'max-width': pic.size[0] * 0.4 + 'px',
                        'max-height': pic.size[1] * 0.4 +'px',
                        'left': pic.pos[0] * 0.4 + 'px',
                        'top': pic.pos[1] * 0.4 + 'px'
                    }"/>
                <img 
                    v-if="imgData.item" 
                    v-for="(pic, index) in imgData.item" 
                    :src="pic.url" 
                    title="点击编辑" 
                    :key="index + pic"
                    :class="[index, {imgHover: hover == index}]"
                    @mouseover="imgHover(index)"
                    @mouseout="unHover()"
                    @click="edit(index)"
                    :style="{
                        'max-width': pic.size[0] * 0.4 + 'px',
                        'max-height': pic.size[1] * 0.4 +'px',
                        'left': pic.pos[0] * 0.4 + 'px',
                        'top': pic.pos[1] * 0.4 + 'px'
                    }"/>
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
            type: Number,
            default: 0
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
            background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/937@2x.png") center no-repeat;
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
            position: relative;
            & img{
                box-sizing: border-box;
                transition: all 0.2s linear;
                position: absolute;
            }
            .contentBg, .title, .contentBg{
                left: 50%!important;
                transform: translateX(-50%);
            }
            .imgHover {
                border: 2px dashed #999;
                // transform: scale(0.98, 0.98);
                filter: brightness(80%);
                cursor: pointer;
            }
        }
        .phone-footer{
            height: 64px;
            background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png") center no-repeat;
        }
    }
}
</style>
