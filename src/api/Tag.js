import http from './http'
import store from '../store';

let tags = store.getters.getRoutes.tags;

export default class {

  static getAll(){
    return http.get(tags.getAll);
  }

  static getOne(){
    return http.get(tags.getOne);
  }

  static post(body){
    return http.post(tags.post, body);
  }

  static put(body){
    return http.put(tags.put + body.id + '/', body);
  }

  static delete(id){
    return http.delete(tags.delete + id + '/');
  }

}
