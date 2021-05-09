import http from './http'
import store from '../store';

import { person_x_newsCollection, postDoc } from './../database/firebase'

let news_x_person = store.getters.getRoutes.news_x_person;

export default class {

  static getAll(){
    return person_x_newsCollection.get()
  }

  static getAllfromId(id){
    return person_x_newsCollection.where('id_person', '==', id).get()
    // return http.get(news_x_person.getAll + '?id_person=' +id);
  }

  // nao pode ser apenas usar !=, você deve filtrar todas as noticias menos a que ele já tem. É um trabalho em News para tirar essa parte
  static getAllfromNotId(id){
    return person_x_newsCollection.where('id_person', '!=', id).get()
    // return http.get(news_x_person.getAll + '?id_person!=' +id);
  }

  static post(body){
    return postDoc(person_x_newsCollection, body)
  }

  static put(body){
    return person_x_newsCollection.doc(body.id).set(body)
  }

  static delete(id){
    return person_x_newsCollection.doc(id).delete()
  }



}
