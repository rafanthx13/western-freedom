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
+ BD: Adicionar social_media

### 03.05.2021 - Segunda-Feira -TODO

ESTRUTURA DO BANCO
+ Como há poucas tags e provavelmente pouca coisa, vai ser um bd no NoSQL mesmo, afinal, nem há tanta TAG
+   - VAI REPETIR MAS É POUCA COISA

TO
06.05.2021
+ [X] Refatorar de 2 tabelas de tags para uma só, adicionando type para diferencia-las.
  - [X] Botão adicionar na parte de listagem COMO MODAL
+ Feat: Por em todo lugar as notificaçêos e fazer seu template no mixin [x]
  - aplicar em tudo [--]
+ Em listar notícias, deixar com colpase para mostrar mais ao invez de ir para uma página exclusaiva para a sua visualizaçâo [x]
+ Adicionar Modela de Login e SignUp [x]
+ + Loading nas coisas que usam AJAX [x]
+   - this.isLoading = true (no created)
+   - add vdata isLoading: false
+ Usar somente mdi nos icones (mdi) lembre-se que depende de chamar o css do cdn no index.html [x]
+ + Conferir as datas, ta dando uns probleminhas ainda [x]
+ Em ProfileView gerar a idade da pessoa dinamicamente [x]
+ Fazer página de About [x] e de Error [x]
+ css global [x] [global.css]
+ Tags: Filtrar tags de person e tag de news em cada parte que ela é chamda (nao fiz isso ainda) / e tirar outras tags [x]
+ Editar pessoa [x]/notícia[x] será a mesma de criação


TODO-NEXT
EM SUMA, ASSOCIAR NEWS <=> PERSON, que nâo será como Tag, mas sim por tabela Aux
+ 1. Ao criar uma notícia, adicionar a pessoa na forma de tag (adicionando em news_x_person)
+ 2. Gerenciar Notícias de uma pesso
  + 2.1 Adicionar notícias (uma tela)
  + 2.2 Deletar Notícia (outra tela)
  + 2.3 Ambas as telas sâo checlks, mas uma tem menos dados do que a outra

TELA HOME
+ de personaliade com card e noticias lembrando bel-falcon, sistema de grid

GERENCIA DE DELETAÇÃO
+ Ao deletar usuário, deletar a associaçâo das notícias. Remover a associaçâo de ID
+ Gerenciar deletaçao de tag com (person/news) para suas respectivas entidades/tags [OBS: SERÁ QUE HAVERÁ TAGS DELETADAS?]



TODO-FUTURE
+ Por complete_name nas pessoas, para sabermos sua descendencia
+ Quadro de amigos e inimigos
