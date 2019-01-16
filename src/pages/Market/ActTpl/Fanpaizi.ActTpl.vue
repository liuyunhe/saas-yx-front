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
                    <phone-model 
                        :title="conf.title" 
                        :titleLength="30" 
                        :page = "page"
                        imgKey ="ACT_FANPAIZI" 
                        :imgData="conf.img"
                        :commonImg =  "conf.commonImg"
                        @edit="editPhone" />
                </el-col>
                <el-col :span="14">
                    <activity-info 
                        :title = "conf.title"
                        :desc = "conf.description"
                        @titleInput="titleInput" 
                        @descInput="descInput" 
                        v-if="page == 1"/>
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
props: ['id', 'edit'],
  data() {
    return {
      defaultActive: "1",
      editData: [img.img.ACT_FANPAIZI['normal']['bg']],
      editType: "normal",
      itemRepeat: true,   //元素格子是否重复，重复是true， 不重复为false
      page: 1,
      isPublish: false,
      conf : {
        actCode: '',
        form: 'act-104',
        id: '',
        description: '',
        title: '',
        img: img.img.ACT_FANPAIZI,
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
        }
    },
    titleInput(e) {
        let value = e.value;
        value ? this.conf.title = value : this.title = "活动标题";
    },
    descInput (e) {
        let value = e.value;
        value ? this.conf.description = value : this.description = '';
    },
    editPhone(e){
        let that = this;
        let index = e.index;
        let type = index.indexOf('item') > -1 ? 'item' : 'normal';
        that.editType =  type;
        that.editData = type == 'item' ? that.itemRepeat ? [this.conf.img[type]['item0']] : this.conf.img[type] : [this.conf.img[type][index]];
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
        if (that.edit) {
            that.$request.post('/api/saotx/act/pubTpl', {actCode: this.edit}, true, res => {
                if (res.ret === '200000') {
                    conf = JSON.parse(res.data.conf);
                    that.conf.img = JSON.parse(conf.img);
                    that.conf.commonImg = JSON.parse(conf.commonImg);
                    that.conf.description = conf.desc;
                    that.conf.title = conf.title
                    that.conf.id = res.data.id;
                    that.conf.actCode = res.data.actCode
                if (res.data.statusName == '未投放') {
                    that.isPublish = false
                } else {
                    that.isPublish = true
                }
                } else {
                this.$message.error(res.message)
                }
            })
            return 
        }
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
    //   if (that.conf.title.length > 15) return this.$message.warning('模板名称不能超过15个字符');
    //   if (that.conf.description.length > 50) return this.$message.warning('模板描述不能超过50个字符');
        
      that.conf.conf.img = JSON.stringify(that.conf.img);
      that.conf.conf.commonImg = JSON.stringify(that.conf.commonImg);
      that.conf.conf.title = that.conf.title;
      that.conf.conf.desc = that.conf.description;
      that.conf.conf = JSON.stringify(that.conf.conf);
      that.conf.name = that.conf.title;
      that.conf.note = that.conf.description;
      if (this.edit) {
        this.$request.post('/api/saotx/act/mpubTpl', that.conf, true, res => {
            if (res.ret === '200000') {
              this.$message.success('保存成功')
              this.$router.push('/market/actMgr')
            } else {
              this.$message.error(res.message)
            }
        })
        return
      }
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

