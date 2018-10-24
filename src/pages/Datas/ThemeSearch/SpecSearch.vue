<template>
  <div class="form-group">
         <el-select
             v-model="org"
             clearable="true"
             filterable
             remote
             reserve-keyword
             placeholder="请输入关键词"
             :remote-method="remoteMethod"
             :loading="loading">
             <el-option
                 v-for="item in orgList"
                 :key="item.value"
                 :label="item.label"
                 :value="item.value">
             </el-option>
         </el-select>
    </div>
</template>
 
<script>
  export default {
    data() {
      return {
        //远程搜索组件
        orgList: [
        {
        	value:'dddf',
        	label:'werwr',
        },
        {
        	value:'dddf',
        	label:'werwr',
        }
        ],
        list: [],
        loading: false,
        allOrds: [],
        org:''
      }
    },
    mounted() {
            this.initData();
    },
    methods: {
      initData() {
          
       },
       remoteMethod(query) {
          if (query !== '') {
              this.loading = true;
              setTimeout(() => {
                  this.loading = false;
                  this.orgList = this.list.filter(item => {
                      return item.label.toLowerCase()
                                .indexOf(query.toLowerCase()) > -1;
                        });
                    }, 200);
                } else {
                    this.orgList = [];
                }
            }
     }
      
    }
</script>
