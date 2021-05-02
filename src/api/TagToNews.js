import http from './http'
import store from '../store';

let tag = store.getters.getRoutes.tags_to_news;

export default class {

  static getAll(){
    return http.get(tag.getAll);
  }

  static post(body){
    return http.post(tag.post, body);
  }

  static put(id, body){
    return http.put(tag.put + id, body);
  }

  static delete(id){
    return http.delete(tag.delete + id);
  }

}
