<template>
  <div class="container">
    <div class="box mx-5 my-3">
      <section>
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Title"
              rules="required|max:30"
            >
              <b-field label="Titulo">
                <b-input
                  v-model="news.title"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider v-slot="{ errors }" name="URL" rules="required">
              <b-field label="URL da Noticia">
                <b-input v-model="news.url" :error-messages="errors"></b-input>
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

            <!-- TAGS -->
            <b-field label="Enter some tags">
              <b-taginput
                v-model="news.news_tag"
                :data="filteredTags"
                autocomplete
                :allow-new="allowNew"
                :open-on-focus="openOnFocus"
                field="name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags"
              >
              </b-taginput>
            </b-field>

            <!-- DATE -->
            <b-field label="Select a date">
        <b-datepicker v-model="news.date"
            :first-day-of-week="1"
            placeholder="Click to select...">

            <b-button
                label="Today"
                type="is-primary"
                icon-left="calendar-today"
                @click="date = new Date()" />

            <b-button
                label="Clear"
                type="is-danger"
                icon-left="close"
                outlined
                @click="date = null" />
        </b-datepicker>
    </b-field>
          </form>
        </ValidationObserver>
      </section>
    </div>
  </div>
</template>

<script>
import News from "../../../api/News";
import TagToNews from "../../../api/TagToNews";

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

/*
news
+ id
+ title
+ commment
+ person_id
+ url
+ date
*/
export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  created() {
    TagToNews.getAll()
      .then((result) => {
        this.all_tags = result.data;
        this.filteredTags = result.data;
        // this.all_tags = this.all_tags.map( (el) => {
        //   return el.name
        // })
        // console.log(this.all_tags)
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
        comment: "",
        news_tag: [], // tags finais para emviar completas
        news: new Date(),
      },
      isSelectOnly: false,
      all_tags: [],
      allowNew: false,
      openOnFocus: false,
      filteredTags: null
    };
  },

  methods: {
    getFilteredTags(text) {
      this.filteredTags = this.all_tags.filter((option) => {
        return (
          option.name
            .toString()
            .toLowerCase()
            .indexOf(text.toLowerCase()) >= 0
        );
      });
    },

    submit() {
      this.$refs.observer
        .validate()
        .then((result) => {
          if (result) {
            News.post(this.person)
              .then(() => {
                console.log("Success");
                this.success();
                this.clear();
              })
              .catch((err) => {
                console.log(err);
                this.danger();
              });
          }
        })
        .catch((err) => {
          console.error(err);
          this.danger();
        });
    },

    clear() {
      this.person.name = "";
      this.person.img_url = "";
      this.$refs.observer.reset();
    },

    success() {
      this.$buefy.notification.open({
        message: "Something happened correctly!",
        type: "is-success",
      });
    },

    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      notif.$on("close", () => {
        this.$buefy.notification.open("Custom notification closed!");
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
