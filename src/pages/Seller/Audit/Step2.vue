<template>
  <div>
    <mgr :step="step"></mgr>
  </div>
</template>

<script>
  import mgr from './Component.mgr'
  export default {
    components: {
      mgr
    },
    data() {
      return {
        step: 2
      }
    }
  }
</script>

<style>
</style>
