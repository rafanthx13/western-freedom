<template>
  <div class="container">
    <div class="box mx-6 my-3">
      <h1 class="title is-4">{{ is_create ? 'Insira uma nova Pessoa ' : 'Editar pessoa'}}</h1>
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
                v-model="person.person_tags"
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
import Tag from "../../api/Tag";
// import TagXPerson from "../../api/TagXPerson";

import notificationMixin from './../../mixins/notifications'
import fireHandler from './../../mixins/fireHandler'
import moment from 'moment'

import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";
// import router from '../../router';

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

  mixins: [notificationMixin, fireHandler],

  data() {
    return {
      person: {
        name: "",
        img_url: "",
        description: "",
        birth_date: new Date(),
        position: "",
        person_tags: [],
      },
      filteredTags: [],

      all_person_tags: [],
      is_create: true
    };
  },

  created() {
    if(this.$route.params.model){
      this.person = this.$route.params.model
      this.person.birth_date = new Date(this.person.birth_date)
      this.is_create = false
    }
    Tag.getPersonTags()
      .then((result) => {
        this.all_person_tags = this.getFireBaseList(result);
      })
      .catch(() => {
        console.log("error");
      });
  },

  methods: {
    submit() {
      this.$refs.observer.validate().then((result) => {
        if (result) {
          // Necessario pois no componente datepicker nao pode receber outro valor que nao seja um new Date()
          const sendPerson = JSON.parse(JSON.stringify(this.person))
          sendPerson.birth_date = moment(sendPerson.birth_date).format('MM-DD-YYYY')
          if(this.is_create){
            Person.post(sendPerson)
            .then( () => {
              this.notify_success('Sucesso no cadastro de pessoa');
            })
            .catch((err) => {
              console.log(err);
              this.notify_error('Error');
            });
          } else {
            Person.put(sendPerson)
            .then( () => {
              this.notify_success('Sucesso ao editar pessoa');
              this.$router.push({ name: "ListPerson" });
            })
            .catch((err) => {
              console.log(err);
              this.notify_error('Error');
            });
          }

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
