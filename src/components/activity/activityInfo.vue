<template>
    <div id="root">
        <el-form ref="infoForm" :model="info" label-width="100px" label-position="top" :rules="rules">
            <el-form-item label="活动名称：" prop="title">
                <el-input placeholder="请输入活动名称" v-model="info.title" @change="titleInput"></el-input>
            </el-form-item>
            <el-form-item label="活动描述：" prop="desc">
                <el-input placeholder="请输入活动名称" v-model="info.desc" type="textarea" @change="descInput"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    props: {
    },
    data () {
        return {
            info: {
                title: "",
                desc: ""
            },
            rules: {
                tite: [
                    {required: true, message: '请输入活动标题', trigger: 'blur'}, {min: 2, max: 15, message: '长度在2-15个字符', trigger: 'blur'}
                ],
                desc: [
                    {min: 2, max: 50, message: '活动描述在0-50个字符之间', trigger: 'blur'}
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
