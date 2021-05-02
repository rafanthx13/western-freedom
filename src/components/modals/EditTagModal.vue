<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Editar Tag</p>
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
              v-model="row.name"
            >
            </b-input>
          </b-field>


        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" label="Editar" @click="editTag()" />
        </footer>
      </div>
  </div>
</template>

<script>

import TagToPerson from "../../api/TagToPerson";
import TagToNews from "../../api/TagToNews";

export default {
  props: ["row", "type_tag"],

  methods: {
    editTag() {
      let tag_id = this.row.id
      let new_row = this.row
      console.log(tag_id, new_row)
      if(this.type_tag == 'person'){
        TagToPerson.put(tag_id, new_row)
          .then(() => {
            console.log('DEU TUDO CERTO')
            this.$emit('isDeleted', new_row)
            this.$emit('close')
          })
          .catch(() => {
            console.log("DEU TUDO ERRADAO");
            this.$emit('isDeleted', false)
            this.$emit('close')
          });
      } else {
        TagToNews.put(tag_id, new_row)
          .then(() => {
            console.log('DEU TUDO CERTO')
            this.$emit('isDeleted', new_row)
            this.$emit('close')
          })
          .catch(() => {
            console.log("DEU TUDO ERRADAO");
            this.$emit('isDeleted', false)
            this.$emit('close')
          });
      }
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
