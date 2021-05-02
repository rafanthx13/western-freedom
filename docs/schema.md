# Schema

A ideia é ser um agregador de noticias desfavoráveis, provando quem é a favor da nação brasileira e quem é vendido

## VUE TIPS UTILIZADAS

+ Mixins: métodos globais, basta importar o mixin que ja tem o método
+ Modal com buefy: Abrir, fechar e passar valores
+ Table com Buefy
+ <!-- :key="$route.fullPath" foi adicionado para obrigar reload de um mesmo compoennte (Funcionou) -->
    <router-view :key="$route.fullPath"></router-view>

## Project

FrontEnd Components Packages : BUEFY (Vue + Bulma)

https://buefy.org/documentation/start
+ Espaçamento: https://bulma.io/documentation/helpers/spacing-helpers/#configuration
+ Textos e Ftamanhod e fonte: https://bulma.io/documentation/elements/title/

Colors

https://www.color-hex.com/color-palette/191

Images

https://game-icons.net/1x1/delapouite/caesar.html

Usar editor config

Example project

https://github.com/buefy/buefy

db-json-server-local

json-server --watch db.json

## Vue Extensions

Vue VSCode Snippets
+ vbase = gera template

## BD

person
+ id @required
+ name @required
+ description
+ birth_date
+ position @required
+ img_url @required

news
+ id
+ title
+ commment
+ source
+ description
+ person_id
+ url
+ date

tags_to_person
+ id
+ name

tags_to_news
+ id
+ name

person_tag
+ id
+ id_person
+ id_tag_person

news_tag
+ id
+ id_news
+ id_tag_news

tags_to_news
+ id
+ id_news
+ id_person

## TODO

BD: Fire Base
+ Pesquisar "Como fazer por JOIN no NOSQL"


+ Notify if get-alldão erro em listatgem


Página Home
+ Deverá te rvários cards em ordme daquelas pessoas que tiveram uma última reclamaçâo, cerca de 10 de forma anárquica
  - Ter no fim a opçâo de listagme completa: PAGINADA, em outra págiana

+ Construir um Footer
+ Fazer uma página Home
+ Fazer um sistema de login/senha para cadastrar as coisas



###################

TODO:
+ TAGS
  - Criar Tags [x]
  - Lista de Tags [x]
  - Editar / Excluir Tags (Usar Modal para Edit/Delete) [x]
+ ONLY PESSOA
  - Criar Pessoa [x] {ADD: Img in URL}
    - Incluir tags [x]
  - Lista de Pessoas [x] {ADD: Sem URL}
    - Editar Pessoa [] (ADD: Será numa tela diferente da de criaçâo, com o formato do profile, mas que vai poder editar quais noticias vao ficar)
    - Excluir Pessoa [x] (Usando Modal)
  - Profile Pessoa [] (Ver ProfilePerson: Perfil + Lista de Notícias)
    - Depende de Noticia X Pessoa []
    - Componente NewsTile
+ ONLY NEWS (com News)
  - Criar News [x]
    - Adicionar tags [x]
    - Adicionar pessoas como Tags []
  - Listar News [x]
    - Editar News
    - Excluir News [x]
+ Home
  - Cards Random de Pessoas, 12 delas
+ Search
  - Buscar por tag_person ou tag_news

TODO: OTHERS
+ REFACT
  - NavBar listing urls [x]
  - Separar o que é page/ da pasta component/ pois, compinete são pedaços somente [x]
  - Emvez de template, Layout [x]


TODO: APRENDIZGEM E OTIMIZAÇÂO
+ Metodos glovais ou se há alguma forma de importalos, como 'success' e 'danger' que sao cahamdaos a todo hora. [x]
   - [Resolvido com Mixin: exporta métodos/variaveis/qualquer outra coisa entre calsses, como um extends de java]
+ global css to edit/delete inlisting

FIXME:
+ Listas, se troca de news para person, nao carrega [x] [resolvido no router-view]

OUTROS ESTUDOS
+ NUXT
+ TypeScript com Vue

TODO:
+ BD: Perosn social_media



== como fazer passagem de argumentos entre rotas

PASSAR DE FORMA PROGRAMATICA

 this.$router.push({
        name: "Profile",
        params: { model: model_data }
      });

RECERB EM QUALQUER LUGAR

this.$route.params.model.ImgName

============ UTILZIR MIXIN

Acaba que serve como um adenddo aso componentes do vuw

## Como fazer

Arquivo JS:
+ Deve serguir um certo formato, parecido com a parte do script do Vue
+ O código dentor dele pode referir a qualquer coisa, e nâo rpecisa declarar a origem de nada
+ EXEMPLO: No arquivo abaixo estou exportando dois métodos, que depende do buefy, mas que nao precisam ser importados aki
`````
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

CHAMANDO MIXIN
+ VocÊ importa e atuomaticamente vai ter o método do mixni como seu próprio método
+ Assim basta chamar normalmente com se o método tive-se sido criado nesse arquivo
````
import notificationMixin from './../../mixins/notifications'`
....
export default {
  mixins: [notificationMixin],
  ....
  method1: ......
    this.success()
````


