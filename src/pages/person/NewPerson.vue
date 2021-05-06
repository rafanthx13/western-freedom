<template>
  <div class="container">
    <div class="box mx-6 my-3">
      <h1 class="title is-4">Insira uma nova Pessoa</h1>
      <section>
        <ValidationObserver ref="observer">
          <form>
            <ValidationProvider
              v-slot="{ errors }"
              name="Name"
              rules="required|max:50"
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

            <div class="card-image" style="width:500px; height:20%; display: inline-block;">
            <figure class="image is-4by3">
              <div v-if="!person.img_url">
                <img
                src="./../../assets/camera-symbol.jpg"
                alt="A xx"
              />
              </div>
              <img v-if="person.img_url"
                :src="person.img_url ? person.img_url : './../../assets/camera-symbol.jpg'"
                alt="A image"
              />
            </figure>
          </div>

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
                maxlength="500"
                type="textarea"
                v-model="person.description"
              ></b-input>
            </b-field>

            <b-field label="Data de Nascimento">
              <b-datepicker
                class="is-info"
                v-model="person.birth_date"
                locale="pt-br"
                icon="calendar-today"
                icon-prev="chevron-left"
                icon-next="chevron-right"
              >
              </b-datepicker>
            </b-field>

            <b-field label="Insira Tags para a Pessoa">
              <b-taginput
                v-model="person_tags"
                :data="filteredTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="true"
                field="name"
                icon="label"
                placeholder="Adicione as tags"
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
import Person from "../../api/Person";
import TagToPerson from "../../api/TagToPerson";
import TagXPerson from "../../api/TagXPerson";

import notificationMixin from './../../mixins/notifications'
import moment from 'moment'

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

  mixins: [notificationMixin],

  data() {
    return {
      person: {
        name: "",
        img_url: "",
        description: "",
        birth_date: new Date(),
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
      this.$refs.observer.validate().then((result) => {
        if (result) {
          const sendPerson = JSON.parse(JSON.stringify(this.person));
          sendPerson.birth_date = moment(sendPerson.birth_date).format('MM-DD-YYYY');
          let person_id = null
          Person.post(sendPerson)
            .then( (result) => {
              person_id = result.data.id
              let mapping = this.person_tags.map( (el) => {
                return { "id_tag_person": el.id, "id_person": person_id }
              })
              console.log(mapping)
              // TODO no Back, deverá receber uma lista e fazer vários posts
              TagXPerson.post(mapping)
                .then(() => {
                  this.notify_success("Pessoa criada com sucesso");
                })
                .catch((err) => {
                  console.log(err);
                  this.notify_error("Erro ao criar Pessoa");
                });
            })
            .catch((err) => {
              console.log(err);
              this.notify_error();
            });
        } else {
          this.notify_error("Dados invalidos");
        }
      })
      .catch((err) => {
        console.error(err);
        this.notify_error("Erro na validação");
      });
    },

    clear() {
      this.person.name = "";
      this.$refs.observer.reset();
    },

    // success() {
    //   this.$buefy.notification.open({
    //     message: "Something happened correctly!",
    //     type: "is-success",
    //   });
    // },

    // danger() {
    //   const notif = this.$buefy.notification.open({
    //     duration: 5000,
    //     message: `Something's not good, also I'm on <b>bottom</b>`,
    //     position: "is-bottom-right",
    //     type: "is-danger",
    //     hasIcon: true,
    //   });
    //   notif.$on("close", () => {
    //     this.$buefy.notification.open("Custom notification closed!");
    //   });
    // },

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
