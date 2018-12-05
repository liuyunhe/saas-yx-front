<template>
    <div id="root">
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item>活动管理</el-breadcrumb-item>
            <el-breadcrumb-item>新建活动</el-breadcrumb-item>
            <el-breadcrumb-item>模板设置</el-breadcrumb-item>
        </el-breadcrumb>
        <el-menu mode="horizontal" :default-active="defaultActive" @select="switchMenu">
            <el-menu-item index="1">首页</el-menu-item>
            <el-menu-item index="6">答题页面</el-menu-item>
            <el-menu-item index="2">活动说明页面</el-menu-item>
            <el-menu-item index="3">我的奖品页面</el-menu-item>
            <el-menu-item index="4">中奖页面</el-menu-item>
            <el-menu-item index="5">未中奖页面</el-menu-item>
            <el-menu-item index="7">异常处理页面</el-menu-item>
        </el-menu>
        <el-card :body-style="{padding:'40px'}">
            <el-row>
                <el-col :span="8">
                    <phone-model 
                        :title="conf.title" 
                        :titleLength="30" 
                        :page = "page"
                        imgKey ="ACT_QUESTION" 
                        :imgData="conf.img"
                        :commonImg =  "conf.commonImg"
                        @edit="edit" />
                </el-col>
                <el-col :span="14">
                    <activity-info 
                        :title = "conf.title"
                        :desc = "conf.description"
                        @titleInput="titleInput" 
                        @descInput="descInput" 
                        v-show="page == 1"/>
                    <activity-image-editor 
                        v-if="page != 2 && page !=3"
                        :editData="editData" 
                        :type="editType" 
                        :itemRepeat = "itemRepeat"
                        @picChange = "editPic"/>
                </el-col>
            </el-row>
            <el-row class="tool-bar" style="margin-top: 20px">
            <el-col :span="8">
                <div style="height: 100px;"></div>
            </el-col>
            <el-col :span="14">
                <div class="publish">
                    <label for="">是否投放：</label>
                    <el-switch v-model="isPublish"></el-switch>
                </div>
                <div class="save">
                    <el-button type="primary" size="medium" width="100" @click="save">保存</el-button>
                </div>
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
props: ['id'],
  data() {
    return {
      defaultActive: "1",
      editData: [img.img.ACT_QUESTION['normal']['bg']],
      editType: "normal",
      itemRepeat: false,   //元素格子是否重复，重复是true， 不重复为false
      page: 1,
      isPublish: false,
      conf : {
        form: 'act-501',
        id: '',
        description: '',
        title: '',
        img: img.img.ACT_QUESTION,
        commonImg: img.commonImg,
        conf: {img: '', commonImg: '', title: '', desc: ''},
        name: '',
        note: ''
      }
    };
  },
  components: {
    phoneModel,
    activityInfo,
    activityImageEditor
  },
  created () {
      let that = this;
      that.getActDetail();
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
        let that = this;
        that.page = key;
        if(key == 4) {
            that.editData = [that.conf.commonImg.getBtn];
            that.editType = 'common';
        }else if(key == 1) {
            that.editData = [that.conf.img.normal.bg];
            that.editType = 'normal';
        }else if(key == 5) {
            that.editData = [
                that.conf.commonImg.noAward,
                that.conf.commonImg.knowBtn
            ];
            that.editType = 'common'
        }else if(key==6){
        	that.editData = [that.conf.img.question.Quesbg];
            that.editType = 'normal';
        }else if(key==7){
        	that.editData = [
                that.conf.commonImg.errorTip,
                that.conf.commonImg.errorBtn
            ];
            that.editType = 'common'
        }
    },
    titleInput(e) {
        let value = e.value;
        value ? this.conf.title = value : this.conf.title = "";
    },
    descInput (e) {
        let value = e.value;
        value ? this.conf.description = value : this.description = '';
    },
    edit(e){
        let that = this;
        let index = e.index;
        let type = index.indexOf('item') > -1 ? 'item' : 'normal';
        that.editType =  type;
        
        if(that.page!=6){
        	that.editData = type == 'item' ? that.itemRepeat ? [this.conf.img[type]['item0']] : this.conf.img[type] : [this.conf.img[type][index]];
        }else {
        	console.log(that.page)
        	that.editData=[this.conf.img['question'][index]]
        }
    },
    editPic (e) {
        let that = this, 
            type = e.type, 
            index = e.index, 
            url = e.url,
            itemRepeat = e.itemRepeat,
            item = 'item',
            conf = that.conf;
        if(!url) return;
        if(type == 'item' && itemRepeat){
            for(let i in conf.img[type]){
                conf.img[type][i].url = url;
            }
        }else if((type == 'item' && !itemRepeat) || type == 'normal') {
            conf.img[type][index].url = url;
        }else if(type == 'common'){
            console.log(index)
            conf.commonImg[index].url = url;
        }
        that.conf = conf;
    },
    getActDetail() {
        let that = this;
        let conf = null;
        if(!that.id) return;
        that.$request.post('/api/saotx/acttpl/detail', { id: that.id }, true, res => {
            if (res.ret === '200000') {
                conf = JSON.parse(res.data.conf);
                that.conf.img = JSON.parse(conf.img);
                that.conf.commonImg = JSON.parse(conf.commonImg);
                that.conf.description = res.data.note;
                that.conf.title = res.data.name;
                that.conf.id = res.data.id;
            if (res.data.statusName == '未投放') {
                that.isPublish = false
            } else {
                that.isPublish = true
            }
            } else {
            this.$message.error(res.message)
            }
        })
    },
    // 保存进入下一步
    save() {
      let that = this;
      if (!that.conf.title) return this.$message.warning('请输入模板名称');
      that.conf.conf.img = JSON.stringify(that.conf.img);
      that.conf.conf.commonImg = JSON.stringify(that.conf.commonImg);
      that.conf.conf.title = that.conf.title;
      that.conf.conf.desc = that.conf.desc;
      that.conf.conf = JSON.stringify(that.conf.conf);
      that.conf.name = that.conf.title;
      that.conf.note = that.conf.description;
      that.$request.post('/api/saotx/acttpl/saveOrModify', that.conf, true, res => {
        if (res.ret === '200000') {
          // 投放
          if (that.isPublish) {
            // 跳到活动基本信息页
            that.$router.push(
              '/market/actTpl/actSetConf?form=' + res.data.form + '&tplCode=' + res.data.tplCode
            )
          } else {
            // 不投放
            // 跳到活动模板
            that.$router.push('/market/actTpl')
          }
          that.$message.success('保存成功!')
          return
        }
        that.$message.error(res.message)
      })
    }
  }
};
</script>

<style lang="scss">
    #root{
        .tool-bar{
            .publish, .save{
                // text-align: center;
                padding: 20px;
            }
        }
    }
</style>

