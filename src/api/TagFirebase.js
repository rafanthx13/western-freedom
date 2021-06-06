import { tagCollection, postDoc } from './../database/firebase'

export default class {

  static post(body){
    return postDoc(tagCollection, body)
  }

  static getAll(){
    return tagCollection.get()
  }

  static getPersonTags(){
    return tagCollection.where('type_tag', '==', 'person').get()
  }

  static getNewsTags(){
    return tagCollection.where('type_tag', '==', 'news').get()
  }

  static put(id, body){
    return tagCollection.doc(id).set(body)
  }

  static delete(id){
    return tagCollection.doc(id).delete()
  }

}
