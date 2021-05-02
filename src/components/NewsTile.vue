<template>
  <div>
    <article class="tile is-child notification is-primary">
      <p class="title">{{ news.title }}</p>
      <section class="has-text-black">
        <b-collapse :open="false" aria-id="contentIdForA11y1">
          <template #trigger>
            <b-button
              label="Click me!"
              type="is-primary"
              aria-controls="contentIdForA11y1"
            />
          </template>
          <div class="notification">
            <div class="content">
              <h3>{{ news.subtitle }} <a href="#">link</a></h3>
              <p>
                {{ news.comment }}
              </p>
              <b-tabs v-model="activeTab">
                <b-tab-item label="Comment">
                  {{ news.comment }}
                </b-tab-item>
                <b-tab-item label="Tags">
                  Lorem <br />
                  ipsum <br />
                  dolor <br />
                  sit <br />
                  amet.
                </b-tab-item>
              </b-tabs>
            </div>
          </div>
        </b-collapse>
      </section>
    </article>
  </div>
</template>


<script>

/*
[ { "id": 1,
 "person_id": 1,
  "title": "abc",
  "comment": "defgh",
   "url": "https://en.wikipedia.org/wiki/Joice_Hasselmann",
    "date": "02/04/2021" },

 { "id": 2, "person_id": 4, "title": "dsad", "comment": "defgh", "url": "https://en.wikipedia.org/wiki/Joice_Hasselmann", "date": "02/04/2021" } ]
*/
export default {
  props: {
    news: {
      type: Object,
    },
  },
};
</script>

<style lang="scss" scoped>
</style>
