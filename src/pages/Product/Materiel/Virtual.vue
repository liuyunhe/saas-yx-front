<template>
  <div>
    <materiel-table ref="tableDatas" :metraFlag="metraFlag" @showForm="showForm" v-if="table"></materiel-table>
    <materiel-form :metraFlag="metraFlag" :materielId="id" @showTable="showTable" v-if="!table"></materiel-form>
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
      showTable(refresh) {
        this.id = "";
        this.table = true;
        if(refresh) {
          this.$refs.tableDatas.listMateriel();
        }
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
