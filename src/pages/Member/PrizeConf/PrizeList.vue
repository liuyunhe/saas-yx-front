<template>
  <div class="container">
    <common-list :type="type"></common-list>
  </div>
</template>
<script>
import commonList from './components/commonList'
export default {
  components: {
    commonList
  },
  props: ['type'],
  data() {
    return {

    }
  },
  created () {
    // if (!this.type) {
    //   this.type == 1
    // }
  }
}
</script>
<style lang="scss" scoped>

</style>
