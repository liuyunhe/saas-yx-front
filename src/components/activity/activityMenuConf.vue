<template>
  <div class="content">
    <el-menu mode="horizontal" :default-active="defaultActive" @select="switchMenu">
      <el-menu-item v-for="(item, index) in menuArr" :key="index" :index="index + 1">{{item}}</el-menu-item>
    </el-menu>
  </div>
</template>
<script>
export default {
  props: {
    menuArr: {
      type: [Object, Array],
      required: true
    },
    page: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      defaultActive: 1
    }
  },
  methods: {
    switchMenu(key) {
      this.$emit('updataPage', key)
    }
  }
}
</script>

