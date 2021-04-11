<template>
  <div class="container">
    <h2>{{ type_tag }}</h2>
    <div class="box mx-5 my-5">
      <b-table :data="tags" :columns="columns" :striped="true"></b-table>
    </div>
  </div>
</template>

<script>

  import TagToNews from "../../../api/TagToNews";
  import TagToPerson from "../../../api/TagToPerson";

  export default {

    props: {
      type_tag: {
        type: String,
        default: 'Person', // or 'News'
      },
    },

    created(){
      if(this.type_tag == 'Person'){
        TagToPerson.getAll().then( (result) => {
          this.tags = result.data;
        }).catch( () => {
          console.log('error');
        });
      } else {
        TagToNews.getAll().then( (result) => {
          this.tags = result.data;
        }).catch( () => {
          console.log('error')
        });
      }
    },

    data() {
      return {
        tags: [],
        columns: [
          { field: 'id', label: 'ID', width: 40 },
          { field: 'name', label: 'Nome', centered: true}
        ]
      };
    },



  }
</script>

<style lang="scss" scoped>

</style>
