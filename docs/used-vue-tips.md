# Tips do vue utilizadas no projeto

Não somente dicas, mas atalhos ou soluçôes de problema durante o desenvolvimento

## Index

+ Mixins: métodos globais, basta importar o mixin que ja tem o método
+ Chamar e recebr arguemnto de rotas

## Buefy : Hard Works

+ Modal com buefy: Abrir, fechar e passar valores
+ Table com Buefy e com checkable
+ Tag input
+  icones (precisa do cmd)


## Obrigar a dar Reload ao ir de um componente para si mesmo

Se vocÊ está em ListNewsPerson e vai para ListNewsTags as vezes nâo recarregava. Para corrigir foi necessário por o seguinte trecho no `router-view` de `App.vue`: `:key="$route.fullPath"`. Assim ficou:

````html
<router-view :key="$route.fullPath"></router-view>
````

## Vue Snipets no VSCode

vbase : gera scaffold

## Passagem de argumentos de forma programática

Chamando uma rota

````javascript
 this.$router.push({
        name: "Profile",
        params: { model: model_data }
      });
````

Recebendo dados da rota

````javascript
this.$route.params.model
````

## Mixins - Adicionar trecho de código

Acaba que serve como um adendo aos componentes no vue

## Como fazer

**CRIANDO** Arquivo JS do mixin `notificationMixin.js`:
+ Deve serguir um certo formato, parecido com a parte do script do Vue
+ O código dentor dele pode referir a qualquer coisa, e nâo rpecisa declarar a origem de nada
+ EXEMPLO: No arquivo abaixo estou exportando dois métodos, que depende do buefy, mas que nao precisam ser importados aki

````javascript
var notificationsMixin = {
  methods: {
    success() {
      this.$buefy.notification.open({
        message: "Something happened correctly!",
        type: "is-success",
      });
    },
    danger() {
      const notif = this.$buefy.notification.open({
        duration: 5000,
        message: `Something's not good, also I'm on <b>bottom</b>`,
        position: "is-bottom-right",
        type: "is-danger",
        hasIcon: true,
      });
      notif.$on("close", () => {
        this.$buefy.notification.open("Custom notification closed!");
      });
    },
  }
}

export default notificationsMixin
````

**CHAMANDO** Mixin no compoentne Vue
+ VocÊ importa e auyomaticamente vai receber o método do mixin como se fosse o próprio método

````vue
import notificationMixin from './../../mixins/notifications'`
....
export default {
  mixins: [notificationMixin],
  ....
  method1: ......
    this.success()
````
Using Notifications

````vue
import notificationMixin from './../../mixins/notifications'

mixins: [notificationMixin],

this.notify_success("Tag adicionada com sucesso")

this.notify_error('Erro ao criar Tag')

````

## Export default e sem default

**Se vocÊ usa com default, nâo pode usar {}**

````javascript
export default {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
  appId: '',
  measurementId: '',
}
````

Chamando

````javascript
import firebaseConfig from './firebaseConfig'
````
**Se nao usamos o default, temos que colocar chaves para criar e para chamar**

**E consequentemente não usamos default, se nao dá erro**

````javascript
export {
  // createDate,
  postDoc,
  // postDocWhithCreateDate,
  db,
  auth,
  newsCollection,
  personCollection,
  tagCollection,
  personXTagsCollection
}
````

Chamando

````javascript
import { personCollection, postDoc } from './../database/firebase'
````

## ENV VARIABLE IN VUE

Tanto Fazendo locamente quanto no deploy, **TODAS AS VARIAVEIS DE AMBIENTE DEVEM COMEÇAR COM 'VUE_APP_'

LEIA CALMAMENTE ISSO:
https://cli.vuejs.org/guide/mode-and-env.html#using-env-variables-in-client-side-code

````env
VUE_APP_ROOT_API=
VUE_APP_API_KEY=
VUE_APP_AUTH_DOMAIN=
VUE_APP_DATABASE_URL=
VUE_APP_PROJECT_ID=
VUE_APP_STORAGE_BUCKET=
VUE_APP_MESSAGING_ID=
VUE_APP_APP_ID=
VUE_APP_MEASUREMENT_ID=
````

Assim, as variáveis do Netlify podem ser colocados no Deploy, **MAS NÃO FICA SEGURO



## Acessando campos de error Axios

````js
axios.get('/api/xyz/abcd')
  .catch(function (error) {
    if (error.response) {
      // Request made and server responded
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    } else if (error.request) {
      // The request was made but no response was received
      console.log(error.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message);
    }

  });
````
## Tetar propriedade de OBjeto JS deep

Existe b['re']['alfa']['u'] = 4

Agora se eu testo

b?.re?.alfa?.u
4
b?.re1?.alfa?.u
undefined
