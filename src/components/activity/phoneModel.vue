<template>
    <div id="root">
        <div class="phone-wrapper">
            <div class="phone-header">
                <h4>{{title}}</h4>
            </div>
            <div class="phone-body">
                <img 
                    v-if="imgData.normal" 
                    v-for="(pic, index) in imgData.normal" 
                    :src="pic.url" 
                    alt="点击编辑" 
                    :key="index + pic"
                    :class="index"
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
                    alt="点击编辑" 
                    :key="index + pic"
                    :class="index"
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
        }
    },
    data () {
        return {

        }
    },
    created () {

    },
    mounted () {

    },
    computed: {
    },
    methods: {

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
                position: absolute;
            }
            .contentBg, .title, .contentBg{
                left: 50%!important;
                transform: translateX(-50%);
            }
            .imgHover {
                border: 1px dashed #999;
            }
        }
        .phone-footer{
            height: 64px;
            background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png") center no-repeat;
        }
    }
}
</style>
