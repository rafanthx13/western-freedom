<template>
  <div>
    <b-navbar id="home" name="id" type="is-light">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="../../assets/caesar.png"
            alt="Lightweight UI components for Vue.js based on Bulma"
          />
        </b-navbar-item>
      </template>

      <template #start>
        <b-navbar-dropdown label="Menu">

          <b-navbar-item href="#" v-for="(url, namePath) in navBar" v-bind:key="namePath" tag="router-link" :to="{ path: url }">
            {{ namePath }}
          </b-navbar-item>

        </b-navbar-dropdown>
      </template>

      <!-- <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light"> Log in </a>
          </div>
        </b-navbar-item>
      </template> -->

    </b-navbar>
  </div>
</template>

<script>
import store from '../../store/index'

export default {

  data() {
    return {
      navBar: store.getters.getNavbar.dropdown
    }
  },

};
</script>

<style lang="scss" scoped>
</style>
