<template>
    <div>
        <Header />
        <router-view></router-view>
        <Footer />
    </div>
</template>

<script>

import Header from './template/Header.vue'
import Footer from './template/Footer.vue'

    export default {
      components: {
        Header,
        Footer
      },
    }
</script>

<style lang="scss" scoped>

</style>
