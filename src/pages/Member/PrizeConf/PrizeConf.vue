<template>
  <div class="container">
    <common-conf :params="params"></common-conf>
  </div>
</template>
<script>
import commonConf from './components/commonConf'
export default {
  components: {
    commonConf
  },
  props: ['type', 'id'],
  data() {
    return {
      params: {
        type: this.type,
        id: this.id
      }
    }
  }
}
</script>
