import http from './http'
import store from '../store';

let tags = store.getters.getRoutes.tags;

export default class {

  static getAll(){
    return http.get(tags.getAll);
  }

  static getPersonTags(){
    return http.get(tags.getAll + '?type_tag=person')
  }

  static getNewsTags(){
    return http.get(tags.getAll + '?type_tag=news')
  }

  static post(body){
    return http.post(tags.post, body);
  }

  static put(id, body){
    return http.put(tags.put + id, body);
  }

  static delete(id){
    return http.delete(tags.delete + id);
  }

}
