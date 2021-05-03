<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Remoção de Pessoa</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">

          <b-field label="Name">
            <b-input
              type="text"
              :value="name"
              disabled
            >
            </b-input>
          </b-field>

          <b-field label="Cargo">
            <b-input
              type="text"
              v-model="position"
              disabled
            >
            </b-input>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <b-button label="Deletar" type="is-primary" @click="deletePerson()" />
        </footer>
      </div>
  </div>
</template>

<script>

import Person from "./../../api/Person";

export default {
  props: ["id", "name", "position"],

  methods: {
    deletePerson() {
      console.log(this.id)
      Person.delete(this.id)
      .then(() => {
        console.log('DEU TUDO CERTO')
        this.$emit('isDeleted', this.id)
        this.$emit('close')
      })
      .catch(() => {
        console.log("DEU TUDO ERRADAO");
        this.$emit('isDeleted', false)
        this.$emit('close')
      });

    }
  },
};
</script>

<style lang="scss" scoped>
</style>
