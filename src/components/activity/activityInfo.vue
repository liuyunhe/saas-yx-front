<template>
    <div id="root">
        <el-form ref="infoForm" :model="info" :rules="rules" :hideRequiredAsterisk="state.require" label-width="100px" label-position="top">
            <el-form-item label="活动名称：" prop="title">
                <el-input placeholder="请输入活动名称" v-model="info.title" @input="titleInput" maxlength="15"></el-input>
                <span class="words-tips">{{info.title.length}}/{{titleLength}}</span>
            </el-form-item>
            <el-form-item label="活动描述：" prop="desc">
                <el-input placeholder="请输入活动名称" v-model="info.desc" type="textarea" @input="descInput" maxlength="50" resize="false"></el-input>
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
        },
        title: {
            type: String
        },
        desc: {
            type: String
        }
    },
    data () {
        return {
            state: {
                require: true
            },
            info: {
                title: '',
                desc: ''
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
        let that = this;
        this.$watch('title', v => {
            that.info.title = v;
        });
        this.$watch('desc', v => {
            that.info.desc = v;
        })
    },
    methods: {
        titleInput (value) {
            this.$emit('titleInput', {value: value});
        },
        descInput (value) {
            this.$emit('descInput', {value: value})
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
