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

      <template #end>
        <b-navbar-item tag="div">
          <div class="buttons">
            <a class="button is-primary" @click="modalSignUp">
              <strong>Sign up</strong>
            </a>
            <a class="button is-light" @click="modalLogin"> Log in </a>
          </div>
        </b-navbar-item>
      </template>

    </b-navbar>
  </div>
</template>

<script>
import LoginModal from '../../components/login/LoginModal'
import SignUpModal from '../../components/login/SignUpModal'
import store from '../../store/index'

export default {

  data() {
    return {
      navBar: store.getters.getNavbar.dropdown
    }
  },

  methods: {

    modalLogin(){
      this.$buefy.modal.open({
        component: LoginModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
      })
    },

    modalSignUp(){
      this.$buefy.modal.open({
        component: SignUpModal,
        parent: this,
        hasModalCard: true,
        customClass: "custom-class custom-class-2",
        trapFocus: true,
      })
    },

  },

};
</script>

<style lang="scss" scoped>
</style>
