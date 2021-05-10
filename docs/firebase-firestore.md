# Fire Base

## O que é o FireBase em Resumo

FIREBASE NÃO É UM BANCO DE DADOS SOMENTE, É UM BD + ROTAS

Apesar de que ainda é recomendável fazer um server, somente com ele é possível já ter um backend, para aplicações menores

**web**

Basicamente é serviço em nuvem do Google para desenvolvedores móveis. É um back-end inteiro para aplicativos Android, iOS e aplicações web, com aparência limpa e de uso descomplicado.

O **Firebase** é uma plataforma dedicada e SDK para a produção de aplicativos. E para fazer o uso desse serviço, os desenvolvedores precisam apenas adicionar algumas linhas de código em seus aplicativos. Saiba mais [aqui](https://firebase.google.com/).

## Instalar

Vá no site da firebase (google) e crie um projeto.

Depois busque pelas credenciais para acessar no seu projeto, algo como:

```javascript
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: 
  authDomain: 
  databaseURL: 
  projectId: 
  storageBucket:
  messagingSenderId: 
  appId:
  measurementId: 
};

```

## `firebase.js`

O arquivo a seguir inicializa o firebase; gera as referencias ao banco e a algumas coleções

```javascript
import firebase from "firebase/app"
import 'firebase/firestore' // database module
import 'firebase/auth' // auth module

import firebaseConfig from './firebaseConfig' // SECRET KEY
firebase.initializeApp(firebaseConfig)

// auth ref
const auth = firebase.auth()

// config db ref
const db = firebase.firestore()
const settings = {
  timestampsInSnapshots: true
};
db.settings(settings);
db.enablePersistence(); //opcional, nao sei o que faz

// collection references
const newsCollection = db.collection('news')
const personCollection = db.collection('person')
const tagCollection = db.collection('tag')

export {
  db,
  auth,
  newsCollection,
  personCollection,
  tagCollection,
}

```

## Estrutura do FireStore e dos dados

Coleções tem vários documentos. Cada documento tem um id único (uma string random, ou um nome que você quiser definir). Os documentos tem dados como um JSON

**Tipos de dados**

```javascript
var docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")), // essa é a unica forma de gerar uma data valida par ao firebase
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};
```

## Adicionar Dados


O Cloud Firestore armazena dados nos Documentos que são armazenados nas Coleções. O Cloud Firestore cria coleções e documentos de modo implícito na primeira vez que você adiciona dados ao documento. Não é necessário criar coleções ou documentos explicitamente.

````javascript
db.collection("users").add({
    first: "Ada",
    last: "Lovelace",
    born: 1815
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
````

Agora, adicione outro documento à coleção users. Observe que esse documento inclui um par de valores-chave (nome do meio) que não aparece no primeiro documento. Os documentos em uma coleção podem conter diferentes conjuntos de informações.



### `doc()`

`doc()` tem duas funções:

+ 1 - Especifica rum documento de id único `doc(uid)`
+ 2 - Criar um id único novo a ser usado `doc()`

Com `doc()` temos uma referencia ao documento a ser trabalhado



### `set()`

Define os dados de um documento. É óbvio que antes temos que especificar qual documento. Isso é feito com `doc()`.

Se você escolher um doc já existente, então, fará uma **SOBREPOSIÇÃO EM TODO  SEU CONTEUDO**

**OBS!**: É um Promise que não retorna nada, ou seja, sem o result. de   `(result) => {}`

**Criar doc e depois seta**

```

// Add a new document with a generated id.
var newCityRef = db.collection("cities").doc();
// Com newCityRef podemos acessar newCityRef.id e pegar o id desse documento gerado

// later...
newCityRef.set(data);

```

**Inserir dados em um documento pre-especificado**

```javascript

  // Add a new document in collection "cities"
db.collection("cities").doc("LA").set({
    name: "Los Angeles",
    state: "CA",
    country: "USA"
})
.then(() => {
    console.log("Document successfully written!");
})
.catch((error) => {
    console.error("Error writing document: ", error);
});
```



**Uso no app**

```javascript
// News.js
static put(body){
    return newsCollection.doc(body.id).set(body)
  }
  
// EditNews.js
News.put(sendNews)
    .then(() => {
        this.notify_success("Notícia editada com sucesso")
        this.$router.push({ name: "ListNews" });
    })
    .catch((err) => {
        console.error(err);
        this.notify_error('Erro ao editar Notícias')
    });
```



**POSTDOC**

```javascript
// Criar doc e inseri seu id dentro dele
const postDoc = (collection, body, createDateToday=true) => {
  let new_doc = collection.doc()
  let uid = new_doc.id
  body.id = uid
  if(createDateToday){
    body.created_date = firebase.firestore.Timestamp.fromDate(new Date())
  }
  return new_doc.set(body)
}
```



### `add()`

Criar um doc aleatório e insere dados nele. Possui como retorno o proprio doc criado

```javascript
  db.collection("cities").add({
    name: "Tokyo",
    country: "Japan"
})
.then((docRef) => {
    console.log("Document written with ID: ", docRef.id);
})
.catch((error) => {
    console.error("Error adding document: ", error);
});
```



## Atualizar dados



## Deletar Dados

**EXCLUIR DOC**



Tem que especificar qual doc

```js
db.collection("cities").doc("DC").delete().then(() => {
    console.log("Document successfully deleted!");
}).catch((error) => {
    console.error("Error removing document: ", error);
});
test.firestore.js
```

**Excluir campo**

é feito com `update` usando ` firebase.firestore.FieldValue.delete()`

```js
var cityRef = db.collection('cities').doc('BJ');

// Remove the 'capital' field from the document
var removeCapital = cityRef.update({
    capital: firebase.firestore.FieldValue.delete()
});
```

**Exclusão de um doc que tem subcollections**

```
Aviso: a exclusão de um subgrupo não exclui as subcoleções.

Ao excluir um documento que tem subcoleções, essas subcoleções não são excluídas. Por exemplo, pode haver um documento localizado em coll/doc/subcoll/subdoc mesmo que o documento coll/doc não exista mais. Remova manualmente os documentos nas subcoleções ao excluir um documento pai, conforme explicado em Excluir coleções.
```



## Ler Dados



### Receber um documento

retorna com `result.data()`

### Receber uma lista

Tem que aplicar `doc.data()` para cada elemento

```js
// funcao para pegar lista dos dados
getFireBaseList(fireBaseListSnapshot) {
      let alist = []
      fireBaseListSnapshot.forEach(doc => {
        alist.push(doc.data())
      })
      return alist
    },
// ou
result.map(el => el.data())
        
// seu uso
Tag.getNewsTags()
      .then((result) => {
        this.all_news_tags = this.getFireBaseList(result)
      })
```



### Limitações de operações sobre listas: `in`, `not-in` e `array-contains-any`:

- `in`, `not-in` e `array-contains-any` aceitam até 10 valores de comparação.
- Você pode usar no máximo uma cláusula `array-contains` por consulta. Não é possível combinar `array-contains` com `array-contains-any`.
- É possível usar no máximo uma cláusula `in`, `not-in` ou `array-contains-any` por consulta. Não é possível combinar esses operadores na mesma consulta.
- Você não pode combinar `not-in` com `!=`.
- Não é possível ordenar sua consulta por um campo incluído em uma cláusula `in` ou de igualdade (`==`).

## Observações



### Buscar dados ordenado

Importante: ao contrário dos "IDs de push" do Firebase Realtime Database, os **IDs gerados automaticamente pelo Cloud Firestore não têm ordenação automática. Para ordenar seus documentos por data de criação, você precisa armazenar nos documentos um carimbo de data/hora como um campo MANUALMENTE**.







## Exemplo na aplicaçâo

```javascript
//src/api/Tag.js
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

```

