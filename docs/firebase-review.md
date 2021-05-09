
## Estrutura de Dados

Coleçôes tem documentos e documentos tem dados

## Tipos de dados

var docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: firebase.firestore.Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }


## Adicionar Dados

Há 3 funções que criam/adicionam dados no FireBase
+ `doc(id)`: Cria a referência ao documento
+ `doc().set(json)`: Define um documento com um id especificado (string)
  - Se o documento não existir, ele será criado. Se o documento existir, o conteúdo dele será substituído pelos dados recém-fornecidos da seguinte forma, a menos que você especifique que os dados devem ser incorporados ao documento existente:
  - ```` db.collection("cities").doc("new-city-id").set(data); ````
  - ````
  // Add a new document with a generated id.
var newCityRef = db.collection("cities").doc();

// later...
newCityRef.set(data);
````
  - ````
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

````
+ `add(json)`: Cria documento com ID aleartório (fuzzy-hash)
  - ````
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
````



````
Importante: ao contrário dos "IDs de push" do Firebase Realtime Database, os IDs gerados automaticamente pelo Cloud Firestore não têm ordenação automática. Para ordenar seus documentos por data de criação, você precisa armazenar nos documentos um carimbo de data/hora como um campo.
````


set()
Seu retorno é uma promisse nula, ou seja, pega ele com then/cath, mas nao retnra nada, ou seja, o resutl é vazio
