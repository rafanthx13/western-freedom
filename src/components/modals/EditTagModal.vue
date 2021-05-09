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
              type="text"
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

          <b-field label="Type">
            <b-select placeholder="Escolha o tipo da Tag" v-model="row.type_tag">
                <option v-for="type in listing_type_tag" :value="type" v-bind:key="type">
                  {{ type }}
                </option>
            </b-select>
          </b-field>

        </section>
        <footer class="modal-card-foot">
          <b-button type="is-primary" label="Editar" @click="editTag()" />
        </footer>
      </div>
  </div>
</template>

<script>

import Tag from "../../api/Tag";
import store from '../../store/index'

export default {

  props: ["row"],

  created(){
    this.listing_type_tag = store.getters.getTypeTags.dropdown
  },

  methods: {

    editTag() {
      Tag.put(this.row.id, this.row)
        .then(() => {
          console.log('DEU TUDO CERTO')
          this.$emit('isDeleted', this.row)
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
