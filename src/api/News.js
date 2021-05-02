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
    console.log('listId', listId)
    let acc = ''
    for (let aid of listId){
      console.log('aid', aid)
      acc += 'id=' + aid + '&'
    }
    // remove last &
    acc = acc.slice(0,-1)
    console.log('acc', acc)
    console.log('saiu a url', news.getlist + acc )
    return http.get(news.getlist + '?' + acc);
  }

  static post(body){
    return http.post(news.post, body);
  }

  static put(body){
    return http.put(news.put + body.news_id, body);
  }

}
