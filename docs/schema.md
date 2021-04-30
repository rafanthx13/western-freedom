# Schema

A ideia é ser um agregador de noticias desfavoráveis, provando quem é a favor da nação brasileira e quem é vendido

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
  - Editar / Excluir Tags (Usar Modal para Edit/Delete)
+ ONLY PESSOA
  - Criar Pessoa [x] {ADD: Img in URL}
    - Incluir tags [x]
  - Lista de Pessoas [x] {ADD: Sem URL}
    - Editar Pessoa [] (Mesma tela de Criação)
    - Excluir Pessoa [] (Usando Modal)
  - Profile Pessoa [] (Ver ProfilePerson: Perfil + Lista de Notícias)
    - Depende de Noticia X Pessoa []
    - Componente NewsTile
+ ONLY NEWS (com News)
  - Criar News []
    - Adicionar tags []
    - Adicionar pessoas como Tags []
  - Listar News
    - Editar News
    - Excluir News
+ Home
  - Cards Random de Pessoas, 12 delas
+ Search
  - Buscar por tag_person ou tag_news

TODO: OTHERS
+ REFACT
  - NavBar listing urls
  - Separar o que é page/ da pasta component/ pois, compinete são pedaços somente
  - Emvez de template, Layout


TODO: APRENDIZGEM E OTIMIZAÇÂO
+ Metodos glovais ou se há alguma forma de importalos, como 'success' e 'danger' que sao cahamdaos a todo hora. CENTRALIZÁ-LOS.
  - Mensagem template para as notificaçôes
+ É melhor 'console.log(err)' ou outra coisa?

FIXME:
+ List tas, se troca de news para person, nao carrega

OUTROS ESTUDOS
+ NUXT
+ TypeScript com Vue

