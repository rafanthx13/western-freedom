import Vue from 'vue';
import App from './App.vue';
import store from './store'
import router from './router';

// CSS and UI KIT
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import './assets/main.scss';
import './assets/global.css';
Vue.use(Buefy)

// IS PRODUCTION?
Vue.config.productionTip = false

// DATA BASE - FIREBASE
// import { auth } from './database/firebase';

// let app = '';
// auth.onAuthStateChanged(() => {
//   if (!app) {
//     app = new Vue({
//       store,
//       router,
//       render: h => h(App)
//     }).$mount('#app');
//   }
// });



new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
