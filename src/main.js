import Vue from 'vue';
import App from './App.vue';
import Buefy from 'buefy'
import store from './store'
import 'buefy/dist/buefy.css'

import './assets/main.scss';
import './assets/global.css';

import router from './router';

Vue.use(Buefy)
Vue.config.productionTip = false

new Vue({
    store,
    router,
    render: h => h(App),
}).$mount('#app')
