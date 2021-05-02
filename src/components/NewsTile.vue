<template>
  <article
    class="tile is-child notification is-primary"
    style="padding-right: 24px; background-color: #836ac3"
  >
    <div>
      <b-collapse :open="false" aria-id="newsCollapse">
        <template #trigger>
          <span class="my-2 is-size-4" aria-controls="newsCollapse">{{
            news.title
          }}</span>
        </template>
        <div class="notification has-text-black mt-4">
          <div class="content">
            <span class="is-size-6"
              >{{ news.subtitle }} subtitle
              <br/>
              <a :href="news.url">{{ news.source }}l
              <b-icon
                pack="fas"
                icon="external-link-alt"
                size="is-small">
            </b-icon>
            </a></span
            >
            <p style="text-align: start;">{{ news.description }} DESCRIPTION</p>
            <b-tabs v-model="activeTab">
              <b-tab-item label="Comentário">
                {{ news.comment }}
              </b-tab-item>

              <b-tab-item label="Tag de Notícias">
                <b-taglist>
                  <b-tag type="is-info" v-for="(value, key) in news.news_tag" v-bind:key="key">
                    {{ value.name }}
                  </b-tag>
                </b-taglist>
              </b-tab-item>
            </b-tabs>
          </div>
        </div>
      </b-collapse>
    </div>
  </article>
</template>


<script>
export default {
  props: {
    news: {
      type: Object,
    },
  },

  data() {
    return {
      activeTab: "Comentário",
      news_tags: [],
    };
  },
};
</script>

<style lang="scss" scoped>
</style>
