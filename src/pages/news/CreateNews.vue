<template>
  <div class="container">
    <div class="box mx-5 my-3">
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

            <!-- COMMENT -->
            <b-field label="Message">
              <b-input
                maxlength="200"
                type="textarea"
                v-model="news.comment"
              ></b-input>
            </b-field>

            <!-- DESCRIPTION -->
            <b-field label="Descrição">
              <b-input
                maxlength="200"
                type="textarea"
                v-model="news.description"
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
import TagToNews from "../../api/TagToNews";
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

  created() {
    TagToNews.getAll()
      .then((result) => {
        this.all_news_tags = result.data;
      })
      .catch(() => {
        console.log("error");
      });
  },

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
      isSelectOnly: false,
      all_news_tags: [],
      filteredTags: [],
    };
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
            console.log("xxxx", sendNews.date);
            sendNews.date = moment(sendNews.date, "DD/MM/YYYY").format(
              "MM-DD-YYYY"
            );
            console.log("depois de moment", sendNews.date);
            console.log(sendNews);
            News.post(sendNews)
              .then(() => {
                console.log("Success");
                this.success();
                this.clear();
              })
              .catch((err) => {
                console.log(err);
                this.danger();
              });
          } else {
            console.log("rrro aki");
          }
        })
        .catch((err) => {
          console.error(err);
          this.danger();
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
