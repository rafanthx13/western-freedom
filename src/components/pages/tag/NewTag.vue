<template>
  <div class="container">
    <h1>Adicionar nova Tag {{ type_tag }}</h1>
    <section class="box">
      <ValidationObserver ref="observer">
        <form>

          <ValidationProvider v-slot="{ errors }" name="Cidade" rules="required|max:30">
            <b-field label="Nome">
              <b-input v-model="tag.name" :error-messages="errors" required></b-input>
            </b-field>
          </ValidationProvider>

          <b-button type="is-primary" @click="submit" class='my-3'>Enviar</b-button>

        </form>
      </ValidationObserver>

    </section>
  </div>
</template>

<script>
import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

import TagToNews from "../../../api/TagToNews";
import TagToPerson from "../../../api/TagToPerson";

setInteractionMode('eager')
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

  props: {
    type_tag: {
      type: String,
      default: 'Person', // or 'News'
    },
  },

  data() {
    return {
      tag: {
          name: ''
      },
    };
  },

  methods: {

    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          if(this.type_tag == 'Person'){
            TagToPerson.post(this.tag).then( () => {
              console.log('Success')
              this.success()
              this.clear()
            }).catch(err => {
              console.log(err)
              this.danger()
            })
          } else {
            TagToNews.post(this.tag).then( () => {
              console.log('Success')
              this.success()
              this.clear()
            }).catch(err => {
              console.log(err)
              this.danger()
            })
          }
        }
      }).catch((err) => {
        console.error(err)
      });
    },

    clear() {
      this.tag.name = ''
      this.$refs.observer.reset()
    },

    success() {
      this.$buefy.notification.open({
          message: 'Something happened correctly!',
          type: 'is-success'
      })
    },

    danger() {
      const notif = this.$buefy.notification.open({
          duration: 5000,
          message: `Something's not good, also I'm on <b>bottom</b>`,
          position: 'is-bottom-right',
          type: 'is-danger',
          hasIcon: true
      })
      notif.$on('close', () => {
          this.$buefy.notification.open('Custom notification closed!')
      })
    }

  },
};
</script>

<style lang="scss" scoped></style>
