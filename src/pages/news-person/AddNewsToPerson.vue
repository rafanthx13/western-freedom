<template>
  <div>
    <!-- Table with Checkable and Collapse -->
    <h1>ADD NEWS TO {{ person.name }}</h1>

    <b-table
      :data="news"
      ref="table"
      checkable
      :checked-rows.sync="checkedRows"
      checkbox-position="right"
    >


      <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
        {{ props.row.id }}
      </b-table-column>

      <b-table-column
        field="title"
        label="Title"
        sortable
        v-slot="props"
      >
        {{ props.row.title }}
      </b-table-column>

      <b-table-column
        field="url"
        label="url"
        sortable
        v-slot="props"
      >
        {{ props.row.url }}
      </b-table-column>

      <b-table-column
        field="date"
        label="date"
        sortable
        v-slot="props"
      >
        {{ props.row.date }}
      </b-table-column>

      <template #bottom-left>
          <b>Total checked</b>: {{ checkedRows.length }}
      </template>
    </b-table>

    <b-button type="is-primary" @click="submitNewsToPerson" class="my-3"
      >Adicionar</b-button
    >


  </div>
</template>

<script>
import News from "../../api/News";
import Person from "../../api/Person";
import NewsXPerson from "../../api/Person_x_News";

export default {

  data() {
    return {
      news: [],
      person: {},
      checkedRows: [],
    }
  },

  created () {
    // console.log(this.$route.params)
    if(this.$route.params.model){
      // veio direto do profile
      this.person = this.$route.params.model
    } else {
      // nao veio do profile, entao pega o profile do BD
      Person.getOne(this.$route.params.id)
        .then((result) => {
          this.person = result.data;
        })
        .catch(() => {
          console.log("error");
        });

    }
    News.getAll()
    .then((result) => {
      this.news = result.data;
    })
    .catch(() => {
      console.log("error");
    });

  },

  methods: {
    submitNewsToPerson() {
      if(this.checkedRows){
        console.log('tem algo', this.checkedRows)
        for (let checkedNews of this.checkedRows){
          console.log(checkedNews)
          let body = { 'id_news': checkedNews.id, 'id_person': this.person.id}
          NewsXPerson.post(body)
          .then((result) => {
            this.news = result.data;
          })
          .catch(() => {
            console.log("error");
          });
        }
      } else {
        console.log('errror NO CHECKED')
      }

    }
  },

};
</script>

<style lang="scss" scoped>
</style>
