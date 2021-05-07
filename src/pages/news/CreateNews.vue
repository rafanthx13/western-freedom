<template>
  <div class="container">
    <div class="box mx-5 my-3">
      <h1><h1 class="title is-4">{{ is_create ? 'Insira uma nova Notícia ' : 'Editar Notícia'}}</h1></h1>
      <section>
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Title"
              rules="required"
            >
              <b-field label="Titulo">
                <b-input
                  v-model="news.title"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Subtitle"
              rules="required"
            >
              <b-field label="Subtítulo">
                <b-input
                  v-model="news.subtitle"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors }" name="URL" rules="required">
              <b-field label="URL da Noticia">
                <b-input v-model="news.url" :error-messages="errors"></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="Fonte"
              rules="required"
            >
              <b-field label="Fonte">
                <b-input
                  v-model="news.source"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <!-- DESCRIPTION -->
            <b-field label="Descrição">
              <b-input
                maxlength="500"
                type="textarea"
                v-model="news.description"
              ></b-input>
            </b-field>

            <!-- COMMENT -->
            <b-field label="Comentário (Análise) da Notícia">
              <b-input
                maxlength="500"
                type="textarea"
                v-model="news.comment"
              ></b-input>
            </b-field>

            <!-- TAGS -->
            <b-field label="Tags de notícias">
              <b-taginput
                v-model="news.news_tag"
                :data="filteredTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="true"
                field="name"
                icon="label"
                placeholder="Adicione as Tags"
                @typing="getFilteredTags"
              >
              </b-taginput>
            </b-field>

            <!-- DATE -->
            <b-field label="Selecione a data da notícia">
              <b-datepicker
                v-model="news.date"
                locale="pt-br"
                icon="calendar-today"
              >
              </b-datepicker>
            </b-field>

            <!-- SUBMIT  -->
            <b-button type="is-primary" @click="submit" class="my-3"
              >Enviar</b-button
            >
          </form>
        </ValidationObserver>
      </section>
    </div>
  </div>
</template>

<script>
import News from "../../api/News";
import Tag from "../../api/Tag";
import moment from "moment";

import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

setInteractionMode("eager");
extend("required", {
  ...required,
  message: (fieldName) => "É necessário inserir o campo " + fieldName,
});
extend("max", {
  ...max,
  message: "O campo não pode ser maior que 30",
});

import notificationMixin from "./../../mixins/notifications";

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  mixins: [notificationMixin],

  data() {
    return {
      news: {
        title: "",
        url: "",
        subtitle: "",
        description: "",
        comment: "",
        news_tag: [], // tags finais para emviar completas
        date: new Date(),
      },
      is_create: true,
      isSelectOnly: false,
      all_news_tags: [],
      filteredTags: [],
    };
  },

  created() {
    if(this.$route.params.news){
      this.news = this.$route.params.news
      this.news.date = new Date(this.news.date)
      this.is_create = false
    }
    Tag.getNewsTags()
      .then((result) => {
        this.all_news_tags = result.data;
      })
      .catch((err) => {
        console.log(err);
        this.notify_error('Erro ao buscar Tags de Notícias')
      });
  },

  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.all_news_tags.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
    },

    submit() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          const sendNews = JSON.parse(JSON.stringify(this.news));
          sendNews.date = moment(sendNews.date).format('MM-DD-YYYY')
          if(this.is_create){
            News.post(sendNews)
              .then(() => {
                this.notify_success("Notícia criada com sucesso")
                this.clear();
              })
              .catch((err) => {
                console.log(err);
                this.notify_error('Erro ao criar Notícias')
              });
          } else {
            News.put(sendNews)
              .then(() => {
                this.notify_success("Notícia editada com sucesso")
                this.clear();
              })
              .catch((err) => {
                console.log(err);
                this.notify_error('Erro ao editar Notícias')
              });
          }
        } else {
          this.notify_error("Erro na validação dos dados");
        }
      })
      .catch((err) => {
        console.error(err);
        this.notify_error("Erro na validação");
      });
    },

    clear() {
      this.news.name = "";
    },

  },
};
</script>

<style lang="scss" scoped>
</style>
