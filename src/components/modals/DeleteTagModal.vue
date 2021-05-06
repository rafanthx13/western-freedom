<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Remover Tag</p>
          <button type="button" class="delete" @click="$emit('close')" />
        </header>
        <section class="modal-card-body">
          <b-field label="Id">
            <b-input
              type="number"
              v-model="row.id"
              disabled
            >
            </b-input>
          </b-field>

          <b-field label="Name">
            <b-input
              type="text"
              :value="row.name"
              disabled
            >
            </b-input>
          </b-field>

          <b-field label="Tipo de Tag">
            <b-input
              type="text"
              :value="row.type_tag"
              disabled
            >
            </b-input>
          </b-field>

        </section>

        <footer class="modal-card-foot" centered>
          <b-button label="Deletar" class="is-primary" @click="deleteTag()" />
        </footer>

      </div>
  </div>
</template>

<script>

import Tag from "../../api/Tag";

export default {

  props: ["row"],

  methods: {

    deleteTag() {
      let tag_id = this.row.id
        Tag.delete(tag_id)
          .then(() => {
            console.log('DEU TUDO CERTO')
            this.$emit('isDeleted', tag_id)
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
