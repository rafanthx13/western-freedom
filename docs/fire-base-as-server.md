# Fire Base

FIREBASE NAO É UM BANCO DE DADOS SOMENTE, É NODE + BD

Ou seja, vocE vi crialo, mas vai tambem criar as rotas pra acessar.

Aki vamos usar Cloud FireStore, que funciona como o MongoDB


````javascript
Para incluir apenas produtos específicos do Firebase, como Authentication e Cloud Firestore, use import nos módulos do Firebase:


// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from "firebase/app";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// If you enabled Analytics in your project, add the Firebase SDK for Analytics
import "firebase/analytics";

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";
````

onde

````

// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
var firebaseConfig = {
  apiKey: "AIzaSyDOCAbC123dEf456GhI789jKl01-MnO",
  authDomain: "myapp-project-123.firebaseapp.com",
  databaseURL: "https://myapp-project-123.firebaseio.com",
  projectId: "myapp-project-123",
  storageBucket: "myapp-project-123.appspot.com",
  messagingSenderId: "65211879809",
  appId: "1:65211879909:web:3ae38ef1cdcb2e01fe5f0c",
  measurementId: "G-8GSGZQ44ST"
};
````



Adicionar dados
O Cloud Firestore armazena dados nos Documentos que são armazenados nas Coleções. O Cloud Firestore cria coleções e documentos de modo implícito na primeira vez que você adiciona dados ao documento. Não é necessário criar coleções ou documentos explicitamente.

````
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

**AFINAL, É NOSQL***

**refs**
Uma referência é um objeto leve que aponta apenas para um local no banco de dados. É possível criar uma referência independentemente da existência de dados no banco de dados. A criação de uma referência não executa nenhuma operação de rede.

Você também pode criar referências a coleções:


var usersCollectionRef = db.collection('users');


https://firebase.google.com/docs/firestore/data-model#web (NOFIM)
````/
Aviso: a exclusão de um subgrupo não exclui as subcoleções.

Ao excluir um documento que tem subcoleções, essas subcoleções não são excluídas. Por exemplo, pode haver um documento localizado em coll/doc/subcoll/subdoc mesmo que o documento coll/doc não exista mais. Remova manualmente os documentos nas subcoleções ao excluir um documento pai, conforme explicado em Excluir coleções.
````/
