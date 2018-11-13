<template>
    <div id="root">
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
        <el-card :body-style="{padding:'40px'}">
            <el-row>
                <el-col :span="8">
                    <phone-model :title="conf.title" :titleLength="30" imgKey ="ACT_FANPAIZI" :imgData="conf.img" @edit="edit" />
                </el-col>
                <el-col :span="14">
                    <activity-info @titleInput="titleInput" @descInput="descInput"></activity-info>
                    <activity-image-editor :editData="editData" :type="editType"></activity-image-editor>
                </el-col>
            </el-row>
        </el-card>
    </div>
</template>

<script>
import phoneModel from "@/components/activity/phoneModel";
import activityInfo from "@/components/activity/activityInfo";
import activityImageEditor from "@/components/activity/activityImageEditor";
import img from './imageConf'
export default {
  data() {
    return {
      defaultActive: "1",
      editData: null,
      editType: "",
      conf : {
          title: '活动标题',
          desc: '',
          img: img.img.ACT_FANPAIZI,
          commonImg: img.commonImg
      }
    };
  },
  components: {
    phoneModel,
    activityInfo,
    activityImageEditor
  },
  created () {
    //   console.log(this.conf.pic)
  },
  mounted () {
      console.log(this)
    //   console.log(this.conf.pic)
  },
  computed: {

  },
  methods: {
    switchMenu(key, keyPath) {
    },
    titleInput(e) {
        let value = e.value;
        e.value ? this.conf.title = e.value : this.title = "活动标题";
    },
    descInput (e) {
        let value = e.value;
        e.value ? this.conf.desc = e.value : this.desc = '';
    },
    edit(e){
        let index = e.index;
        let type = index.indexOf('item') > -1 ? 'item' : 'normal';
        this.editType =  type;
        this.editData = type == 'item' ? this.conf.img[type] : this.conf.img[type][index];
    }
  }
};
</script>
