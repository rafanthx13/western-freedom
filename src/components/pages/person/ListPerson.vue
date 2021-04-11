<template>
  <div class="container">
    <h2>List Person</h2>
    <div class="box mx-5 my-5">
      <b-table :data="persons" :columns="columns" :striped="true"></b-table>
    </div>
  </div>
</template>

<script>

  import Person from "../../../api/Person";

  export default {

    created(){
      Person.getAll().then( (result) => {
        this.persons = result.data;
      }).catch( () => {
        console.log('error');
      });
    },

    data() {
      return {
        persons: [],
        columns: [
          { field: 'id', label: 'ID', width: 40 },
          { field: 'name', label: 'Nome', centered: true},
          { field: 'img_url', label: 'URL Imagem', centered: true},
        ]
      };
    },



  }
</script>

<style lang="scss" scoped>

</style>
