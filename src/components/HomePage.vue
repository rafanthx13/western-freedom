<template>
    <div>
        <b-navbar id='home' name='id' type='is-light'>
        <template #brand>
            <b-navbar-item tag="router-link" :to="{ path: '/' }">
                <img
                    src="./../assets/caesar.png"
                    alt="Lightweight UI components for Vue.js based on Bulma"
                >
            </b-navbar-item>
        </template>

        <template #start>
            <b-navbar-dropdown label="Menu">
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/new-person' }">
                    New Person
                </b-navbar-item>
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/list-person' }">
                    List Person
                </b-navbar-item>
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/new-tag-person' }">
                    New Tag Person
                </b-navbar-item>
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/new-tag-news' }">
                    New Tag News
                </b-navbar-item>
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/list-tag-person' }">
                    List Tag Person
                </b-navbar-item>
                <b-navbar-item href="#" tag="router-link" :to="{ path: '/list-tag-news' }">
                    List Tag News
                </b-navbar-item>
            </b-navbar-dropdown>
        </template>

            <template #end>
                <b-navbar-item tag="div">
                    <div class="buttons">
                        <a class="button is-primary">
                            <strong>Sign up</strong>
                        </a>
                        <a class="button is-light">
                            Log in
                        </a>
                    </div>
                </b-navbar-item>
            </template>
        </b-navbar>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {

    }
</script>

<style lang="scss" scoped>

</style>
