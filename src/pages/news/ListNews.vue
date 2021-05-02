<template>
  <div class="container">

    <h1>List News</h1>

    <div class="box mx-5 my-5">
      <b-table :data="news" :striped="true">

         <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="title" label="Título" v-slot="props">
          {{ props.row.title }}
        </b-table-column>

        <b-table-column field="subtitle" label="Subtítulo" v-slot="props">
          {{ props.row.subtitle }}
        </b-table-column>

        <b-table-column field="id" label="Editar" width="40" centered v-slot="props">
          <b-button class="is-warning edit-button" @click="handleEdit(props.row)">
            <b-icon pack="fas" icon="user-edit"> </b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="id" label="Deletar" width="40" centered v-slot="props">
          <b-button class="is-danger delete-button" @click="handleDelete(props.row)">
            <b-icon pack="fas" icon="trash"> </b-icon>
          </b-button>
        </b-table-column>
      </b-table>
    </div>

  </div>
</template>

<script>

import News from "../../api/News";
import DeleteNewsModal from '../../components/modals/DeleteNewsModal'
import EditNewsModal from '../../components/modals/EditNewsModal'

  export default {

    data() {
      return {
        news: []
      }
    },

    created() {
        News.getAll()
          .then((result) => {
            this.news = result.data;
          })
          .catch(() => {
            console.log("error");
          });
    },

    methods: {
      handleDelete(row) {
      this.$buefy.modal.open({
        component: DeleteNewsModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        props: {row},
        events: {
          'isDeleted': idDeleted => {
            if(idDeleted){
              this.news = this.news.filter( (el) => {
                  return el.id != idDeleted
              })
            }
          }
        }
      })
    },

    handleEdit(row) {
      this.$buefy.modal.open({
        component: EditNewsModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
        props: { row },
        events: {
          'isEdited': (new_row) => {
              this.news = this.news.map(obj => this.news.find(o => o.id === obj.id) || new_row);
            }
          }
        });
    },

  }


  }
</script>

<style lang="scss" scoped>

</style>
