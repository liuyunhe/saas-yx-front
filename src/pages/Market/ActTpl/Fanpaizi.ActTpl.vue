<template>
    <div class="root">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建活动</el-breadcrumb-item>
            <el-breadcrumb-item>模板设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-menu mode="horizontal" :default-active="defaultActive" @select="switchMenu">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="2">活动说明页</el-menu-item>
            <el-menu-item index="3">我的奖品页</el-menu-item>
            <el-menu-item index="4">中奖页</el-menu-item>
            <el-menu-item index="5">未中奖页</el-menu-item>
        </el-menu>
        <el-card>
            <el-row>
                <el-col :span="8">
                    <phone-model :title="title"></phone-model>
                </el-col>
                <el-col :span="14">
                    <activity-info @titleInput="titleInput"></activity-info>
                    <activity-image-editor></activity-image-editor>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import phoneModel from "@/components/activity/phoneModel";
import activityInfo from "@/components/activity/activityInfo";
import activityImageEditor from "@/components/activity/activityImageEditor";
export default {
  data() {
    return {
      defaultActive: "1",
      title: '活动标题'
    };
  },
  components: {
    phoneModel,
    activityInfo,
    activityImageEditor
  },
  methods: {
    switchMenu(key, keyPath) {
    },
    titleInput(e) {
        let value = e.value;
        e.value ? this.title = e.value : this.title = "活动标题";
    }
  }
};
</script>
