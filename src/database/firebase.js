import firebase from "firebase/app"
import 'firebase/firestore' // database module
import 'firebase/auth' // auth module
import firebaseConfig from './firebaseConfigDefault' // SECRET KEY


console.log('AKI EH ANTES DE CHAMAR O FIREBASE', process.env)
firebase.initializeApp(firebaseConfig)

// utils
const db = firebase.firestore()
const auth = firebase.auth()

const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);
db.enablePersistence(); //opcional, nao sei o que faz

// collection references
const newsCollection = db.collection('news')
const personCollection = db.collection('person')
const tagCollection = db.collection('tag')
const person_x_newsCollection = db.collection('person_x_news')

// FUNCTION: post Document in collection with id and createDate (optional)
const postDoc = (collection, body, createDateToday=true) => {
  let new_doc = collection.doc()
  let uid = new_doc.id
  body.id = uid
  if(createDateToday){
    body.created_date = firebase.firestore.Timestamp.fromDate(new Date())
  }
  return new_doc.set(body)
}

export {
  postDoc,
  db,
  auth,
  newsCollection,
  personCollection,
  tagCollection,
  person_x_newsCollection
}
