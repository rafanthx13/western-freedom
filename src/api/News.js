import http from './http'
import store from '../store';

let news = store.getters.getRoutes.news;

export default class {

  static getAll(){
    return http.get(news.getAll);
  }

  static getOne(id){
    return http.get(news.getOne + id);
  }

  static getlist(listId){
    let acc = ''
    for (let aid of listId){
      acc += 'id=' + aid + '&'
    }
    acc = acc.slice(0,-1) // remove last &
    return http.get(news.getlist + '?' + acc);
  }

  static post(body){
    return http.post(news.post, body);
  }

  static put(body){
    return http.put(news.put + body.news_id, body);
  }

  static delete(id){
    return http.delete(news.delete + id);
  }



}
