<template>
    <div id="root">
        <el-form ref="infoForm" :model="info" :rules="rules" :hideRequiredAsterisk="state.require" label-width="100px" label-position="top">
            <el-form-item label="活动名称：" prop="title">
                <el-input placeholder="请输入活动名称" v-model="info.title" @change="titleInput" maxlength="titleLength"></el-input>
                <span class="words-tips">{{info.title.length}}/{{titleLength}}</span>
            </el-form-item>
            <el-form-item label="活动描述：" prop="desc">
                <el-input placeholder="请输入活动名称" v-model="info.desc" type="textarea" @change="descInput" maxlength="50" resize="false"></el-input>
                <span class="words-tips">{{info.desc.length}}/{{descLength}}</span>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
        titleLength: {
            type: Number,
            default: 15
        },
        descLength: {
            type: Number,
            default: 50
        }
    },
    data () {
        return {
            state: {
                require: true
            },
            info: {
                title: "",
                desc: ""
            },
            rules: {
                title: [
                    {required: true, message: '请输入活动标题', trigger: 'blur'}, {min: 2, max: this.titleLength, message: `长度在2-${this.titleLength}个字符`, trigger: 'blur'}
                ],
                desc: [
                    {min: 0, max: this.descLength, message: `活动描述在0-${this.descLength}个字符之间`, trigger: 'blur'}
                ]
            }
        }
    },
    created () {

    },
    methods: {
        titleInput (value) {
            this.$emit('titleInput', {value: value});
            console.log(value)
        },
        descInput (value) {
            this.$emit('descInput', {value: value})
            console.log(value)
        }
    }
}
</script>
<style lang="scss">
#root{
    .words-tips{
        color: #999;
        position: absolute;
        right: 0;
    }
}
</style>
