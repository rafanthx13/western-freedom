import { newsCollection, postDoc } from '../database/firebase'

export default class {

  static post(body){
    return postDoc(newsCollection, body)
  }

  static getAll(){
    return newsCollection.get()
  }

  // TODO: Tornar ela uma promisse; not-in e in serem parametros para ecnonomizar e precisar de só 1 async function
  // FireStore só aceita pegar até 10 elmeento no not in/in. Se tiver mais, fara mais consultas a cada 10 elementos
  static getAllExceptList(listId){
    let alist = []
    let lengthList = listId.length

    async function getMyList(minylist) {
      // console.log('consulta minylist :>> ', minylist);
      const result = await newsCollection.where('id', 'not-in', minylist).get()
      for(const doc of result.docs){
        // console.log(doc.id, '=>', doc.data());
        alist.push(doc.data())
      }
    }

    if(lengthList < 10){
      // console.log('listId :>> ', listId);
      getMyList(listId)
      // console.log('RETORNO < 10', alist)
      return alist

    } else {
      let count = 0
      let limit = 10
      while(limit <=  lengthList-1){
        let minylist = listId.slice(count*10, limit)
        // console.log('lengthList', lengthList, '||', 'count', count, 'lengthList - (count*10)', lengthList - (count*10));
        limit = lengthList - ((count+2)*10) <= 0 ? lengthList-1 : limit + 10 // determina se termina
        count += 1
        // get
        getMyList(minylist)
      }
      // console.log('RETORNO > 10', alist)
      return alist
    }
  }

  static getlist(listId){
    let alist = []
    let lengthList = listId.length

    async function getMyList(minylist) {
      // console.log('consulta minylist :>> ', minylist);
      const result = await newsCollection.where('id', 'in', minylist).get()
      for(const doc of result.docs){
        // console.log(doc.id, '=>', doc.data());
        alist.push(doc.data())
      }
    }

    if(lengthList < 10){
      // console.log('listId :>> ', listId);
      getMyList(listId)
      // console.log('RETORNO < 10', alist)
      return alist

    } else {
      let count = 0
      let limit = 10
      while(limit <=  lengthList-1){
        let minylist = listId.slice(count*10, limit)
        // console.log('lengthList', lengthList, '||', 'count', count, 'lengthList - (count*10)', lengthList - (count*10));
        limit = lengthList - ((count+2)*10) <= 0 ? lengthList-1 : limit + 10 // determina se termina
        count += 1
        // get
        getMyList(minylist)
      }
      // console.log('RETORNO > 10', alist)
      return alist
    }
  }

  static put(body){
    return newsCollection.doc(body.id).set(body)
  }

  static delete(id){
    return newsCollection.doc(id).delete()
  }



}
