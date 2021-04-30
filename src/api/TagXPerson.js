import http from './http'
import store from '../store';

let tags_x_person = store.getters.getRoutes.tags_x_person;

export default class {

  static getAll(){
    return http.get(tags_x_person.getAll);
  }

  static post(body){
    return http.post(tags_x_person.post, body);
  }

  static put(body){
    return http.put(tags_x_person.put + body.tags_x_person_id, body);
  }

}
