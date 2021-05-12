<template>
  <div>
      <div class="modal-card" style="width: auto">
        <header class="modal-card-head">
          <p class="modal-card-title">Remover Notícia</p>
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

          <b-field label="Subtitle">
            <b-input
              type="text"
              :value="row.title"
              disabled
            >
            </b-input>
          </b-field>

            <b-field label="Subtitulo">
              <b-input
                type="text"
                :value="row.subtitle"
                disabled
              >
              </b-input>
             </b-field>

        </section>
        <footer class="modal-card-foot" centered>
          <b-button label="Deletar" @click="deleteNews()" />
        </footer>
      </div>
  </div>
</template>

<script>

import News from "../../api/News";


export default {
  props: ["row"],

  methods: {
    deleteNews() {
      let news_id = this.row.id
      News.delete(news_id)
        .then(() => {
          this.$emit('isDeleted', news_id)
          this.$emit('close')
        })
        .catch((err) => {
          console.error(err)
          this.$emit('isDeleted', false)
          this.$emit('close')
        });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
