<template>
  <div class="container">
    <div class="box mx-5 my-3">
      <section>
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:30"
            >
              <b-field label="Nome">
                <b-input
                  v-model="person.name"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="ImageSrc"
              rules="required"
            >
              <b-field label="URL de Imagem">
                <b-input
                  v-model="person.img_url"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <ValidationProvider
              v-slot="{ errors }"
              name="position"
              rules="required"
            >
              <b-field label="Cargo/Profissão">
                <b-input
                  v-model="person.position"
                  :error-messages="errors"
                ></b-input>
              </b-field>
            </ValidationProvider>

            <b-field label="Descrição">
              <b-input
                maxlength="200"
                type="textarea"
                v-model="person.description"
              ></b-input>
            </b-field>

            <b-field label="Data de Nascimento">
              <b-datepicker
                v-model="person.birth_date"
                :first-day-of-week="1"
                placeholder="Click to select..."
              >
                <!-- <b-button
                  label="Today"
                  type="is-primary"
                  icon-left="calendar-today"
                  @click="person.birth_date = new Date()"
                />
                <b-button
                  label="Clear"
                  type="is-danger"
                  icon-left="close"
                  outlined
                  @click="person.birth_date = null"
                />
                <b-button
                  @click="$refs.datepicker.toggle()"
                  icon-left="calendar-today"
                  type="is-primary"
                /> -->
              </b-datepicker>
            </b-field>

            <b-field label="Enter some tags">
              <b-taginput
                v-model="person_tags"
                :data="filteredTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="true"
                field="name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags"
              >
              </b-taginput>
            </b-field>

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
import Person from "../../../api/Person";
import TagToPerson from "../../../api/TagToPerson";
import TagXPerson from "../../../api/TagXPerson";

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

export default {
  components: {
    ValidationProvider,
    ValidationObserver,
  },

  data() {
    return {
      person: {
        name: "",
        img_url: "",
        description: "",
        birth_date: null,
        position: "",
      },
      filteredTags: [],
      person_tags: [],
      all_person_tags: [],
    };
  },

  created() {
    TagToPerson.getAll()
      .then((result) => {
        this.all_person_tags = result.data;
      })
      .catch(() => {
        console.log("error");
      });
  },

  methods: {
    submit() {
      let person_id = null
      this.$refs.observer.validate().then((result) => {
        if (result) {
          Person.post(this.person)
            .then( (result) => {
              person_id = result.data.id
              let mapping = this.person_tags.map( (el) => {
                return { "id_tag_person": el.id, "id_person": person_id }
              })
              console.log(mapping)
              // TODO no Back, deverá receber uma lista e fazer vários posts
              TagXPerson.post(mapping)
                .then(() => {
                  console.log("Success");
                  this.success();
                  this.clear();
                })
                .catch((err) => {
                  console.log(err);
                  this.danger();
                });
            })
            .catch((err) => {
              console.log(err);
              this.danger();
            });
          // TagsToPerson //erson_tgs tem a lista d objetos


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

    getFilteredTags(text) {
      this.filteredTags = this.all_person_tags.filter((option) => {
        return (
          option.name.toString().toLowerCase().indexOf(text.toLowerCase()) >= 0
        );
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
