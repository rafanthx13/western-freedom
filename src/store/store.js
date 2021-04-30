// Decide DEV/PROD
let URL; // BackEnd
if(window.location.hostname == 'localhost'){
  // local
  URL = 'http://localhost:3000';
} else {
  // production
  URL = 'https://price-log-server.herokuapp.com'
}

const routes = {
    state: {
      URL: URL,
      person: {
        post: URL + '/person',
        put: URL + '/person/',
        delete: URL + '/person/',
        getAll: URL + '/person',
      },
      news: {
        post: URL + '/news',
        put: URL + '/news/',
        delete: URL + '/news/',
        getAll: URL + '/news',
      },
      tags_to_person: {
        post: URL + '/tags_to_person',
        put: URL + '/tags_to_person/',
        delete: URL + '/tags_to_person/',
        getAll: URL + '/tags_to_person',
      },
      tags_to_news: {
        post: URL + '/tags_to_news',
        put: URL + '/tags_to_news/',
        delete: URL + '/tags_to_news/',
        getAll: URL + '/tags_to_news',
      },
      tags_x_person: {
        post: URL + '/tags_x_person',
        put: URL + '/tags_x_person/',
        delete: URL + '/tags_x_person/',
        getAll: URL + '/tags_x_person',
      },

    },
    mutations: {},
    actions: {},
    getters: {
      getRoutes(state) {
        return state;
      }
    }

  };

  export default { routes };
