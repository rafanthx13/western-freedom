import http from './http'
import store from '../store';

let tag = store.getters.getRoutes.tag;

export default class {

  static getAll(){
    return http.get(tag.getAll);
  }

  static post(body){
    return http.post(tag.post, body);
  }

  static put(body){
    return http.put(tag.put + body.tag_id, body);
  }

}
