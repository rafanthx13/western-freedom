# TODO

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

TODO:
+ BD: Perosn social_media

### 03.05.2021 - Segunda-Feira -TODO

+ Refatorar de 2 tabelas de ag para uma só com o type.
+ Gerenciar deletaçao de tag/enidade para suas respectivas entidades/tags
  + Ao deletar usuário, deletar a associaçâo das notícias. Remover a associaçâo de ID
+ Feat: Por em todo lugar as notificaçêos e fazer seu template no mixin
+ Em CreateNews, adicionar tag como pessoa para já associar
+ Na parte de adicionar notícias, refazer ela para poder editar/adicionar/deletar as noiticias relacionadas a uma pessoa atraves de put. O checkalbe deve habilitar tirar noiticia e adicionar noticia
+ Loading nas coisas que usam AJAX
+ Editar pessoa/notícia será a mesma de criação
+ Usar somente mdi nos icones (mdi) lembre-se que depende de chamar o css do cdn no index.html
+ Em lsitar notícias, deixar com colpase para mostrar mais ao invez de ir para uma página exclusaiva para a sua visualizaçâo
+ Conferir as datas, ta dando uns probleminhas ainda
+ Criar tela Home de personaliade com card e noticias lembrando bel-falcon, sistema de grid
+ Modal de Login e v-if no Laout pra indicar que é admin
  - Difernte do log-price-app, vai poder fazer muita caoisa ainda sem login
+ Fazer página de About e de Error
+ por mais css shadow nas classes com 'box'
+ Por o tpitulo da página no NavBar (na ViewPerson, vai economzar espaço)
  - Por complete_name nas pessoas, para sabermos sua descendencia
+ Em ProfileView gerar a idade da pessoa dinamicamente
