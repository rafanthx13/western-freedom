import { personCollection, postDoc } from './../database/firebase'

export default class {

  static getAll(){
    return personCollection.get()
  }

  static getOne(id){
    return personCollection.doc(id).get()
  }

  static post(body){
    return postDoc(personCollection, body)
  }

  static put(body){
    return personCollection.doc(body.id).set(body)
  }

  static delete(id){
    return personCollection.doc(id).delete()
  }

}
