<template>
    <div id="root">
        <div class="phone-wrapper">
            <div class="phone-header">
                <h4>{{title}}</h4>
            </div>
            <div class="phone-body">
                <img v-if="picData" v-for="(pic, index) in picData" :src="pic.url" alt="点击编辑" :key="index + pic"/>
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
        picData: {
            type: [Array, Object],
            default: null
        }
    },
    data () {
        return {

        }
    },
    created () {

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
        }
        .phone-footer{
            height: 64px;
            background: url("http://weiopn.oss-cn-beijing.aliyuncs.com/pc_data_front/img/phone-footer@2x.png") center no-repeat;
        }
    }
}
</style>
