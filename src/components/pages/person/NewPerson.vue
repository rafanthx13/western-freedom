<template>
    <div class='container'>
        <div class='box mx-5 my-3'>
            <section>
              <ValidationObserver ref="observer">
                <form>

                  <ValidationProvider v-slot="{ errors }" name="Cidade" rules="required|max:30">
                  <b-field label="Nome">
                      <b-input v-model="person.name" :error-messages="errors"></b-input>
                  </b-field>
                  </ValidationProvider>

                  <ValidationProvider v-slot="{ errors }" name="Cidade" rules="required">
                  <b-field label="URL de Imagem">
                      <b-input v-model="person.img_url" :error-messages="errors"></b-input>
                  </b-field>
                  </ValidationProvider>

                  <b-button type="is-primary" @click="submit" class='my-3'>Enviar</b-button>

                </form>
              </ValidationObserver>
            </section>
        </div>
    </div>
</template>

<script>

import Person from "../../../api/Person";

import { required, max } from "vee-validate/dist/rules";
import {
  extend,
  ValidationObserver,
  ValidationProvider,
  setInteractionMode,
} from "vee-validate";

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

  data() {
    return {
      person: {
        name: '',
        img_url: '',
      }
    }
  },

  methods: {

    submit() {
      this.$refs.observer.validate().then(result => {
        if (result) {
          Person.post(this.person).then( () => {
            console.log('Success')
            this.success()
            this.clear()
          }).catch(err => {
            console.log(err)
            this.danger()
          })
        }
      }).catch((err) => {
        console.error(err)
        this.danger()
      });
    },

    clear() {
      this.person.name = ''
      this.person.img_url = ''
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

}
</script>

<style lang="scss" scoped>

</style>
