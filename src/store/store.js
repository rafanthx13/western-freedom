// Decide DEV/PROD
let URL; // BackEnd
if(window.location.hostname == 'localhost'){
  // local
  URL = 'http://localhost:8000/api'; // Django API
} else {
  // production
  URL = 'https://price-log-server.herokuapp.com'
}

const routes = {
    state: {
      URL: URL,
      person: {
        post: URL + '/person/',
        put: URL + '/person/',
        delete: URL + '/person/',
        getAll: URL + '/person/',
        getOne: URL + '/person/',
        getNewsFromOnePerson: URL + '/person'
      },
      news: {
        post: URL + '/news/',
        put: URL + '/news/',
        delete: URL + '/news/',
        getAll: URL + '/news/',
        getOne: URL + '/news/',
        getlist: URL + '/news/',
      },
      tags: {
        post: URL + '/tag/',
        put: URL + '/tag/',
        delete: URL + '/tag/',
        getAll: URL + '/tag/',
        getOne: URL + '/tag/',
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
      news_x_person: {
        post: URL + '/news_x_person',
        put: URL + '/news_x_person/',
        delete: URL + '/news_x_person/',
        getAll: URL + '/news_x_person',
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

  const navbar = {
    state: {
      dropdown: {
        'New Person': '/new-person',
        'List Person': '/list-person',
        'Create News': '/create-news',
        'List News': '/list-news',
        'List Tag': '/list-tag',
        'About Me': '/about-me'
      }
    },
    mutations: {},
    actions: {},
    getters: {
      getNavbar(state) {
        return state;
      }
    }

  };

  const listing_type_tags = {
    state: {
      dropdown: ['person', 'news']
    },
    mutations: {},
    actions: {},
    getters: {
      getTypeTags(state) {
        return state;
      }
    }

  };

  export default { routes, navbar, listing_type_tags };
