# BD

person
+ id @required
+ name @required
+ complete_name @add
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

tags
+ id
+ name
+ type
+
person_x_news
+ id
+ id_person
+ id_news

