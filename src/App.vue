<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <HomePage />
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import HomePage from '@/components/HomePage.vue';

export default {
  name: 'App',
  components: {
    // HelloWorld,
    HomePage
  }
}
</script>

<style>
#app {
  font-family: 'Roboto', Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}


</style>
