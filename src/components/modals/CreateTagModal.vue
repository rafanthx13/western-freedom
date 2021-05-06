<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Criar Tag</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">

          <ValidationObserver ref="observer">
            <form>

              <ValidationProvider
                v-slot="{ errors }"
                name="Nome"
                rules="required"
              >
                <b-field label="Nome">
                  <b-input
                    type="text"
                    v-model="tag.name"
                    :error-messages="errors"
                  >
                  </b-input>
                </b-field>
              </ValidationProvider>

              <b-field label="Type">
                <b-select placeholder="Escolha o tipo da Tag" v-model="tag.type_tag">
                    <option v-for="type in listing_type_tag" :value="type" v-bind:key="type">
                      {{ type }}
                    </option>
                    <!-- <option value="2">Option 2</option> -->
                </b-select>
              </b-field>

            </form>
          </ValidationObserver>
        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" label="Criar" @click="newTag()" />
        </footer>
      </div>
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

setInteractionMode("eager");
extend("required", {
  ...required,
  message: (fieldName) => "É necessário inserir o campo " + fieldName,
});
extend("max", {
  ...max,
  message: "O campo não pode ser maior que 30",
});

import store from '../../store/index'
import Tag from "../../api/Tag";

export default {

  components: {
    ValidationProvider,
    ValidationObserver,
  },


  data() {
    return {
      listing_type_tag: [],
      tag: {
        name: '',
        type_tag: ''
      }

    }
  },

  created () {
    this.listing_type_tag = store.getters.getTypeTags.dropdown
  },

  methods: {

    newTag(){
      this.$refs.observer.validate().then((formIsValid) => {
        if (formIsValid) {
          Tag.post(this.tag)
            .then((result) => {
              this.$emit('isCreated', result.data)
              this.$emit('close')
            })
            .catch(() => {
              this.$emit('isCreated', false)
              this.$emit('close')
            });
        } else {
          console.log("Erro de Formulario");
        }
      })
      .catch((err) => {
        console.error(err);
        console.log("Erro de Formulario");
        this.danger();
      });
    },

  },
};
</script>

<style lang="scss" scoped>
</style>
