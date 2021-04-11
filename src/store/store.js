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
      tag: {
        post: URL + '/tag',
        put: URL + '/tag/',
        delete: URL + '/tag/',
        getAll: URL + '/tag',
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
