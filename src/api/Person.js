import http from './http'
import store from '../store';

let person = store.getters.getRoutes.person;

export default class {

  static getAll(){
    return http.get(person.getAll);
  }

  static getOne(id){
    return http.get(person.getOne + id);
  }

  static post(body){
    return http.post(person.post, body);
  }

  static put(body){
    return http.put(person.put + body.id, body);
  }

  static delete(id){
    return http.delete(person.delete + id);
  }

}
