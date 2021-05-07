<template>
  <div>
    <h1 class="title is-4">
      {{ isAddNews ? "Adicionar Notícias a" : "Deletar Notícias de" }}
      {{ person.name }}
    </h1>
    <div class="box mx-6">
      <b-table
        :data="news"
        ref="table"
        checkable
        :checked-rows.sync="checkedRows"
        checkbox-position="right"
        show-detail-icon  detailed
        detail-key="id"
        detail-transition="fade"
      >
        <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
          {{ props.row.id }}
        </b-table-column>

        <b-table-column field="title" label="Title" sortable v-slot="props">
          {{ props.row.title }}
        </b-table-column>

        <b-table-column field="url" label="url" sortable v-slot="props">
          {{ props.row.url }}
        </b-table-column>

        <b-table-column field="date" label="date" sortable v-slot="props">
          {{ props.row.date }}
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

        <template #bottom-left>
          <b>Total de Notícias Selecionadas</b>: {{ checkedRows.length }}
        </template>

      </b-table>

      <b-button type="is-primary" @click="submitNewsToPerson" class="my-3">
        {{ this.isAddNews ? "Adicionar Notícias" : "Deletar Notícias" }}
      </b-button>

    </div>
  </div>
</template>

<script>
import News from "../../api/News";
import Person from "../../api/Person";
import Person_x_News from "../../api/Person_x_News";
import notificationMixin from "./../../mixins/notifications";

export default {

  data() {
    return {
      news: [],
      person: {},
      checkedRows: [],
      isAddNews: true,
      association_person_to_news: [],
    };
  },

  mixins: [notificationMixin],

  created() {
    if (this.$route.params.model) {
      this.isAddNews = this.$route.params.isAddNews;
      console.log("Entrou por Params");
      // If veio de ListView
      this.person = this.$route.params.model;
      if (this.isAddNews) {
        console.log("Params: Add Noticias");
        // ADD: Busca as que nao tem (aproveitando que ja sabemos quais temos)
        let listHasNews = this.$route.params.news.map((el) => el.id);
        News.getAllExceptList(listHasNews)
          .then((result) => {
            this.news = result.data;
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        console.log("Params: Deletar Noticias");
        // DELETE: Recebe as que vinheram do ViewPeron []
        this.news = this.$route.params.news;
        Person_x_News.getAllfromId(this.person.id) // busca ID de noticias que tem
          .then((result) => {
            this.association_person_to_news = result.data;
          })
          .catch((err) => {
            console.log(err);
          });
      }
    } else {
      console.log("Entrou por URL");
      this.isAddNews = this.$route.name == "AddNewsToPerson";
      // If veio de URL: Busca Pessoa e Notícias
      Person.getOne(this.$route.params.id) // busca pessoa
        .then((result) => {
          this.person = result.data;
          Person_x_News.getAllfromId(this.person.id) // busca ID de noticias que tem
            .then((result) => {
              this.association_person_to_news = result.data;
              if (this.isAddNews) {
                console.log("URL: Add Noticias");
                // ADD: Busca as que nao tem (aproveitando que ja sabemos quais temos)
                let listHasNews = result.data.map((el) => el.id_news);
                News.getAllExceptList(listHasNews)
                  .then((result) => {
                    this.news = result.data;
                  })
                  .catch(() => {
                    console.log("error");
                  });
              } else {
                console.log("URL: DELETE Noticias");
                // DELETE: Busca as noticais de acordo com os ID pegos
                let listNews = result.data.map((el) => el.id_news);
                if (listNews.length != 0) {
                  News.getlist(listNews) // filtrar as noticais desse cara
                    .then((result) => {
                      this.news = result.data;
                    })
                    .catch((err) => {
                      console.err(err);
                    });
                } else {
                  this.news = []; // sem noticias
                }
              }
            })
            .catch(() => {
              console.log("error");
            });
        })
        .catch(() => {
          console.log("error");
        });
    }
  },

  methods: {

    submitNewsToPerson() {
      if (this.checkedRows) {
        if (this.isAddNews) {
          // URL : Add News
          // console.log("tem algo", this.checkedRows);
          for (let checkedNews of this.checkedRows) {
            // console.log("Noticia a ser adiciona", checkedNews);
            let body = { id_news: checkedNews.id, id_person: this.person.id };
            Person_x_News.post(body)
              .then(() => {
                // this.news.push([checkedNews]) // tirar noticia por que agora ele tem
                this.checkedRows = this.checkedRows.filter((row) => {
                  return row.id != checkedNews.id;
                });
                this.news = this.news.filter((row) => {
                  return row.id != checkedNews.id;
                });
              })
              .catch((err) => {
                console.log(err);
                this.notify_error("Erro ao adicionar Notícia");
              });
          }
          this.notify_success(
            this.checkedRows.length > 1
              ? "Notícias adicionadas com sucesso"
              : "Noticia adicionada com sucesso"
          );
        } else {
          // URL : delete News :: association_person_to_news juntar com as que selecionei
          // Delete corretamente [x] | Atualizar Lista e AFTER []
          let list_of_Ids_to_be_deleted = this.checkedRows.map((obj) => obj.id);
          let news_to_delete = this.association_person_to_news.filter((row) => {
            return !(row.id_news in list_of_Ids_to_be_deleted);
          });
          // console.log('list_of_Ids_to_be_deleted', list_of_Ids_to_be_deleted)
          // console.log('association_person_to_news', this.association_person_to_news)
          // console.log('news_to_delete', news_to_delete)
          for (let link_news_to_person of news_to_delete) {
            // console.log('Executou DELETE para:', link_news_to_person)
            Person_x_News.delete(link_news_to_person.id)
              .then((result) => {
                this.news = result.data;
                this.news = this.news.filter((row) => {
                  return row.id != link_news_to_person.id_news;
                });
                this.checkedRows = this.checkedRows.filter((row) => {
                  return row.id != link_news_to_person.id_news;
                });
                this.notify_success("Notícia(s) deleta(s) com sucesso");
              })
              .catch((err) => {
                console.error(err);
                this.notify_error("Erro ao deletar Notícias");
              });
          }
          this.notify_success(
            news_to_delete.length > 1
              ? "Notícias deletadas com sucesso"
              : "Noticia deletada com sucesso"
          );
        }
      } else {
        // console.log("errror NO CHECKED");
      }
    },
  },

};
</script>

<style lang="scss" scoped>
</style>
