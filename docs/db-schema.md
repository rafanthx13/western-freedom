## BD

person
+ id @required
+ name @required
+ complete_name
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
+ tags
+ Person_references

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


