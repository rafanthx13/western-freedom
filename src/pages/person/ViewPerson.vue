<template>
  <div class="container box">
    <div class="columns">
      <!-- Column 1 : Person Profile -->
      <div class="column">
        <div class="card">
          <!-- Name -->
          <h1 class="title is-4 pt-4">{{ person.name }}</h1>
          <!-- Show Image -->
          <div class="card-image">
            <figure class="image is-4by3">
              <img :src="person.img_url" alt="Placeholder image" class="px-6"/>
            </figure>
          </div>
        </div>
        <div class="card-content">
          <div class="media">
            <div class="media-content">
              <!-- Position -->
              <p class="subtitle is-6">{{ person.position }}</p>
              <!-- Description -->
              <b-field label="Descrição">
                <section>
                  <p>{{ person.description }}</p>
                </section>
              </b-field>
            </div>
          </div>
        </div>
        <div class="content">
          <b-field label="Data de Nascimento">
            <p>{{ person.birth_date }} - {{ age }} anos</p>
          </b-field>
        </div>

        <div>
          <b-taglist>
            <b-tag
              type="is-info"
              v-for="(value, key) in person.person_tags"
              v-bind:key="key"
            >
              {{ value.name }}
            </b-tag>
          </b-taglist>
        </div>

        {{ this.start_date }}
        <b-button
          label="Adicionar Notícias"
          type="is-primary"
          @click="goToAddNewsToPerson()"
        />
        <br /><br />
        <b-button
          label="Deletar Notícias"
          type="is-primary"
          @click="goToADeleteNewsToPerson()"
        />
      </div>

      <!-- Column 2 : News -->
      <div class="column" style="padding: 0.75rem !important" :closable="false">
        <!-- <div class="title is-12 is-vertical"> -->
          <h1 class="title is-4 pt-4">Notícias</h1>

          <div class="mb-4" v-for="(value, key) in news" v-bind:key="key">
            <NewsTile v-bind:news="value" v-bind:key="key" />
          </div>

          <div class="tile is-parent is-danger" v-if="isEmpty">
            <article class="tile is-child notification is-danger">Sem Noticias</article>
          </div>

          <b-loading :is-full-page="false" v-model="isLoading" :can-cancel="false"></b-loading>

          <br />
      </div>

    </div>
  </div>
</template>

<script>
// import Person_x_News from "../../api/Person_x_News";
import News from "../../api/News";
import Person from "../../api/Person";
import moment from "moment";
import NewsTile from "../../components/NewsTile";
import fireHandler from './../../mixins/fireHandler'
import notificationMixin from './../../mixins/notifications'


export default {

  components: {
    NewsTile,
  },

  mixins: [fireHandler, notificationMixin],

  data() {
    return {
      activeTab: 0,
      person: {
        name: "",
        img_url: "",
        description: "",
        birth_date: null,
        position: "",
        person_tags: [],
      },
      start_date: '',
      age: 0,
      news: [],
      isLoading: false,
      isEmpty: false
    };
  },

  created() {
    this.isLoading = true
    if(!this.$route.params.model){
      Person.getOne(this.$route.params.id)
        .then((result) => {
          this.person = result.data
          this.age = moment().diff( moment(this.person.birth_date, "YYYY-MM-DD"), 'years');
          this.initializeViewPerson()
        })
        .catch((err) => {
          console.error(err)
          this.isLoading = false
          this.notify_error('Erro ao carregar as notícias')
        });
    } else {
      this.person = this.$route.params.model;
      this.age = moment().diff( moment(this.person.birth_date, "YYYY-MM-DD"), 'years');
      this.initializeViewPerson()
    }
  },

  methods: {

    initializeViewPerson(){
      this.person.birth_date = moment(this.person.birth_date, "YYYY-MM-DD").format(
        "DD/MM/YYYY"
      ); // recebe no format DD-MM-YYYY e converte para DD/MM/YYYY
      console.log('zzzzzzzzzzzz', this.person)
      News.getNewsFromOnePerson(this.person.id)
        .then((result) => {
          if(result.data){
            this.news = result.data
            this.isLoading = false
          } else {
            this.news = []
            this.isLoading = false
            this.isEmpty = true
          }
          // let listNews = this.getFireBaseList(result).map((el) => el.id_news)
          // if(listNews.length != 0){
          //   this.news = News.getlist(listNews)
          //   this.isLoading = false
          // } else {
          //   this.news = [] // sem noticias
          //   this.isLoading = false
          //   this.isEmpty = true
          // }
        })
        .catch((err) => {
          this.notify_error('Erro ao carregar as notícias')
          console.error(err);
          this.isLoading = false
        });
    },

    goToAddNewsToPerson() {
      this.$router.push({
        name: "AddNewsToPerson",
        params: { model: this.person, id: this.person.id, news: this.news, isAddNews: true },
      });
    },

    goToADeleteNewsToPerson(){
      this.$router.push({
        name: "DeleteNewsToPerson",
        params: { model: this.person, id: this.person.id, news: this.news, isAddNews: false },
      });
    }
  },
};
</script>

<style lang="scss" scoped>
</style>
