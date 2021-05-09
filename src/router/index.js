import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './../pages/common/Home'
import NotFound from './../pages/common/NotFound'
import AboutMe from './../pages/common/AboutMe'

import NewPerson from './../pages/person/NewPerson';
import CreateNews from './../pages/news/CreateNews'
import ListTag from './../pages/tag/ListTag';
import ListPerson from './../pages/person/ListPerson';
import ViewPerson from './../pages/person/ViewPerson'
import ManagerNewsToPerson from './../pages/news-person/ManagerNewsToPerson'
import ListNews from './../pages/news/ListNews'

let router = new VueRouter({
    mode: 'history',
    routes: [

       { path: '/', redirect: 'home' },
       { path: '*', component: NotFound },

       { path: '/home', component: Home },
       { path: '/about-me', component: AboutMe },

       { path: '/create-news', component: CreateNews },
       { path: '/list-news', component: ListNews, name: 'ListNews' },
       { path: '/edit-news', component: CreateNews, name: 'EditNews'},

       { path: '/new-person', component: NewPerson },
       { path: '/list-person', component: ListPerson, name: 'ListPerson' },
       { path: '/edit-person', component: NewPerson, name: 'EditPerson'},
       { path: '/view-person/:id', component: ViewPerson, name: 'ViewPerson'},

       { path: '/list-tag', component: ListTag },

       { path: '/add-news-to-person/:id', component: ManagerNewsToPerson, name: 'AddNewsToPerson'},
       { path: '/delete-news-to-person/:id', component: ManagerNewsToPerson, name: 'DeleteNewsToPerson'},

    ]
});

export default router;
Vue.use(VueRouter)
