import http from './http'
import store from '../store';

let news = store.getters.getRoutes.news;
let person = store.getters.getRoutes.person;

export default class {

  static getAll(){
    return http.get(news.getAll);
  }

  static getOne(){
    return http.get(news.getOne);
  }

  static post(body){
    return http.post(news.post, body);
  }

  static put(body){
    return http.put(news.put + body.id + '/', body);
  }

  static delete(id){
    return http.delete(news.delete  + id + '/');
  }

  static getNewsFromOnePerson(id){
    return http.get(person.getAll  + id + '/news/');
  }

  static getAllNewsExceptOnePerson(id){
    return http.get(person.getAll  + id + '/less/');
  }

  //

  static addOnePersonToNews(id, body){
    return http.post(news.getAll  + id + '/addperson/', body);
  }

  static deleteOnePersonFromNews(id, body){
    return http.post(news.getAll  + id + '/removeperson/', body);
  }





}
