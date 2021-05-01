<template>
  <div class="container box">
    <div class="columns">
      <!-- Column 1 -->
      <div class="column">
        <div class="card">
          <b-field label="URL_Image">
            <b-input value="Kevin Garvey" v-model="person.url_image"></b-input>
        </b-field>
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="person.url_image"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <p class="title is-4">John Smith</p>
              <p class="subtitle is-6">@johnsmith</p>
            </div>
          </div>
        </div>
        <div class="content">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
          iaculis mauris.
          <!-- <a>@bulmaio</a>. <a href="#">#css</a>
          <a href="#">#responsive</a> -->
          <br />
          <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
          <b-taglist>
            <b-tag type="is-info">First</b-tag>
            <b-tag type="is-info">Second</b-tag>
            <b-tag type="is-info">Third</b-tag>
            <b-tag type="is-info">Fourth</b-tag>
            <b-tag type="is-info">Fifth</b-tag>
          </b-taglist>
        </div>
      </div>

      <!-- Column 2 -->
      <div class="column" style="padding: 0.75rem !important">
        <div class="tile is-12 is-vertical">
          <article class="tile is-child notification is-primary">
            <p class="title">Vertical...</p>
            <p class="subtitle">Top tile</p>
          </article>
          <article class="tile is-child notification is-primary">
            <p class="title">Vertical...</p>
            <p class="subtitle">Top tile</p>

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
                    <h3>Subtitle</h3>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      <br />
                      Nulla accumsan, metus ultrices eleifend gravida, nulla
                      nunc varius lectus, nec rutrum justo nibh eu lectus.
                      <br />
                      Ut vulputate semper dui. Fusce erat odio, sollicitudin vel
                      erat vel, interdum mattis neque.
                    </p>

                    <b-tabs v-model="activeTab">
                      <b-tab-item label="Pictures">
                        Lorem ipsum dolor sit amet.
                      </b-tab-item>

                      <b-tab-item label="Music">
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
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      activeTab: 0,
      person: {
        url_image: ''
      },
    }
  },

};
</script>

<style lang="scss" scoped>
</style>
