import http from './http'
import store from '../store';

let news = store.getters.getRoutes.news;

export default class {

  static getAll(){
    return http.get(news.getAll);
  }

  static post(body){
    return http.post(news.post, body);
  }

  static put(body){
    return http.put(news.put + body.news_id, body);
  }

}
