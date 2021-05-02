<template>
  <div class="container box">
    <div class="columns">
      <!-- Column 1 : Person Profile -->
      <div class="column">
        <div class="card">
          <!-- Insert IMG URL -->
          <b-field label="ImgURL">
            <b-input type="text" value="Kevin Garvey" v-model="person.img_url"></b-input>
          </b-field>
          <!-- Show Image -->
          <div class="card-image">
            <figure class="image is-4by3">
              <img
                :src="person.img_url"
                alt="Placeholder image"
              />
            </figure>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <!-- Name -->
              <b-field label="Name" >
                <b-input type="text" v-model="person.name"></b-input>
              </b-field>
              <!-- Profission -->
              <b-field label="ImgURL" >
                <b-input type="text" v-model="person.position"></b-input>
              </b-field>
            </div>
          </div>
        </div>
        <div class="content">
          <!-- Descrição -->
          <b-field label="Descrição">
              <b-input
                maxlength="200"
                type="textarea"
                v-model="person.description"
              ></b-input>
            </b-field>
          <br />
          <!-- Birth Date -->
            <b-field label="Data de Nascimento">
              <b-datepicker
                v-model="person.birth_date"
                :first-day-of-week="1"
                placeholder="Click to select..."
              >
              </b-datepicker>
            </b-field>
            <b-field label="Enter some tags">
              <b-taginput
                v-model="person_tags"
                :data="filteredTags"
                autocomplete
                :allow-new="false"
                :open-on-focus="true"
                field="name"
                icon="label"
                placeholder="Add a tag"
                @typing="getFilteredTags"
                rounded
                type="is-info"
              >
              </b-taginput>
            </b-field>

          <!-- <b-taglist>
            <b-tag type="is-info">First</b-tag>
            <b-tag type="is-info">Second</b-tag>
            <b-tag type="is-info">Third</b-tag>
            <b-tag type="is-info">Fourth</b-tag>
            <b-tag type="is-info">Fifth</b-tag>
          </b-taglist> -->
        </div>
      </div>

      <!-- Column 2 : News -->
      <div class="column" style="padding: 0.75rem !important">
        <div class="tile is-12 is-vertical">
          <h1 class="is-title is-1">Notícias</h1>

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

  created(){
    this.person = this.$route.params.model
  },

  data() {
    return {
      activeTab: 0,
      person: {
        name: "",
        img_url: "",
        description: "",
        birth_date: null,
        position: "",
      },
    }
  },

};
</script>

<style lang="scss" scoped>
</style>
