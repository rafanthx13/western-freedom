<template>
  <div class="container">

    <h1>List News</h1>

    <div class="box mx-5 my-5">
      <b-table :data="news" :striped="true" show-detail-icon  detailed
            detail-key="id"
            detail-transition="fade">

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
            <b-icon pack="mdi" icon="account-edit"> </b-icon>
          </b-button>
        </b-table-column>

        <b-table-column field="id" label="Deletar" width="40" centered v-slot="props">
          <b-button class="is-danger delete-button" @click="handleDelete(props.row)">
            <b-icon pack="mdi" icon="delete"> </b-icon>
          </b-button>
        </b-table-column>

        <template #detail="props">
          <article class="media">
            <div class="media-content">
              <div class="content">
                <p>URL: <a :href="props.row.url">{{ props.row.url }}</a></p>
                <p>Fonte: {{ props.row.source }}</p>
                <p>Descrição: {{ props.row.description }}</p>
                <p>Comentário: {{ props.row.comment }}</p>
                <p>Data: {{ props.row.date }}</p>

                <p class="is-flex-direction-row" style="justify-content: center !important;">
                  <b-taglist centered>
                    <b-tag
                      type="is-info"
                      v-for="(value, key) in props.row.news_tag"
                      v-bind:key="key"
                    >
                      {{ value.name }}
                    </b-tag>
                  </b-taglist>
                </p>
              </div>
            </div>
          </article>
        </template>

      </b-table>
    </div>

     <b-loading is-full-page v-model="isLoading" :can-cancel="true"></b-loading>

  </div>
</template>

<script>

import News from "../../api/News";
import DeleteNewsModal from '../../components/modals/DeleteNewsModal'
// import EditNewsModal from '../../components/modals/EditNewsModal'

  export default {

    data() {
      return {
        news: [],
        isLoading: false
      }
    },

    created() {
      this.isLoading = true
        News.getAll()
          .then((result) => {
            this.news = result.data;
            this.isLoading = false
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
      this.$router.push({
        name: "EditNews",
        params: { news: row }
      });
    },

  }


  }
</script>

<style lang="scss" scoped>

</style>
