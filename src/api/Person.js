import http from './http'
import store from '../store';

let person = store.getters.getRoutes.person;

export default class {

  static getAll(){
    return http.get(person.getAll);
  }

  static post(body){
    return http.post(person.post, body);
  }

  static put(body){
    return http.put(person.put + body.person_id, body);
  }

}
