<template>
  <div>
    <materiel-table :metraFlag="metraFlag" @showForm="showForm" v-show="table"></materiel-table>
    <materiel-form :metraFlag="metraFlag" :materielId="id" @showTable="showTable" v-show="!table"></materiel-form>
  </div>
</template>

<script>
  import materielTable from './Table'
  import materielForm from './Form'
  export default {
    components: {
      materielTable, materielForm
    },
    data() {
      return {
        table: true,
        metraFlag: 'virtual',
        id: "", // form表单中使用
      }
    },
    methods:{
      showTable() {
        this.id = "";
        this.table = true;
      },
      showForm(materielId) {
        this.id = materielId;
        this.table = false;
      }
    }
  }
</script>

<style>
</style>
