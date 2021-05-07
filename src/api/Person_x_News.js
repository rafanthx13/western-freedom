import http from './http'
import store from '../store';

let news_x_person = store.getters.getRoutes.news_x_person;

export default class {

  static getAll(){
    return http.get(news_x_person.getAll);
  }

  static getAllfromId(id){
    return http.get(news_x_person.getAll + '?id_person=' +id);
  }

  // nao pode ser apenas usar !=, você deve filtrar todas as noticias menos a que ele já tem. É um trabalho em News para tirar essa parte
  static getAllfromNotId(id){
    return http.get(news_x_person.getAll + '?id_person!=' +id);
  }

  static post(body){
    return http.post(news_x_person.post, body);
  }

  static put(body){
    return http.put(news_x_person.put + body.news_x_person_id, body);
  }

  static delete(id){
    return http.delete(news_x_person.delete + id);
  }



}
