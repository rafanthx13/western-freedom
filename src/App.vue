<template>
  <div id="app">
    <NavBar />
    <!-- :key="$route.fullPath" foi adicionado para obrigar reload de um mesmo compoennte (Funcionou) -->
    <router-view :key="$route.fullPath"></router-view>
    <Footer />
  </div>
</template>

<script>
import NavBar from './components/layout/NavBar'
import Footer from './components/layout/Footer'

export default {
  name: 'App',
  components: {
    NavBar,
    Footer
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
