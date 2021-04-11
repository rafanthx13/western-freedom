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
+ id
+ name
+ img_url

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

