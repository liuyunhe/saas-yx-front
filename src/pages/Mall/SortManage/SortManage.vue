<template>
  <section class="sort-manage-container">
    <div class="add-new-category">
      <el-button type="primary" size="small fr"  @click="">新建一级分类</el-button>
    </div>


    <el-tree
        default-expand-all
        :data="queryListTree"
        node-key="id"
        :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <img v-if="node.level ==1" :src="node.data.icon" width="40" style="vertical-align: middle;">
        <span style="margin-left: 15px">{{ node.data.name }}</span>
        <span>
          <el-button
              type="text"
              @click="() => append(data)">
            Append
          </el-button>
          <el-button
              type="text"

              @click="() => remove(node, data)">
            Delete
          </el-button>
          <el-button type="text" v-if="node.level !==4" @click="addChildSort(node.data)">新增子分类</el-button>
          <el-button type="text" v-if="node.data.statusType == 1">禁用</el-button>
          <el-button type="text" v-if="node.data.statusType == 0">启用</el-button>
          <el-button type="text">编辑</el-button>
          <el-button type="text">删除</el-button>
        </span>
      </span>
    </el-tree>
  </section>

</template>

<script>
  let id = 1000;
  export default {
    name: "SortManage",
    data() {

      return {

        queryListTree:[],
      }
    },
    created(){
      this.getQueryListTree()
    },
    methods: {
      //从后台拿取商品分类树
      getQueryListTree(){
        this.$request.post('/sc/saotx/mall/cate/queryListTree',{}, true, (res) => {
          if (res.ret == '200000') {
            this.queryListTree = [...res.data]
          }
        })
      },
      addChildSort(data){
        console.log(data)
        let params = {
          "name":"新子级",
          "idx":10,
          "pid":data.id
        }
        this.$request.post('/sc/saotx/mall/cate/saveOrModify',params, true, (res) => {
          if (res.ret == '200000') {
           this.getQueryListTree()
          }
        })
      },
      append(data) {
        const newChild = { id: id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      },

    }
  }
</script>

<style lang="scss" scoped>
  .sort-manage-container{
    padding: 20px;
    max-width: 1200px;
    background: #fff;
  }
  .add-new-category{
    margin-bottom: 30px;
    &:after{
      content: "";
      display:  block;
      width: 0;
      height: 0;
      clear: both;
    }
  }
</style>