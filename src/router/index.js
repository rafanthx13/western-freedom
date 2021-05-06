import Vue from 'vue';
import VueRouter from 'vue-router';

import NewPerson from './../pages/person/NewPerson';
import CreateNews from './../pages/news/CreateNews'
import ListTag from './../pages/tag/ListTag';
import ListPerson from './../pages/person/ListPerson';
import ProfilePerson from './../pages/person/ProfilePerson';
import Home from './../pages/common/Home'
import ErrorPage from './../pages/common/ErrorPage'
import EditPerson from './../pages/person/EditPerson'
import ViewPerson from './../pages/person/ViewPerson'
import AddNewsToPerson from './../pages/news-person/AddNewsToPerson'
import ListNews from './../pages/news/ListNews'

let router = new VueRouter({
    mode: 'history',
    routes: [
       { path: '/', redirect: 'home' },
       { path: '/home', component: Home },
       { path: '*', component: ErrorPage },
       { path: '/new-person', component: NewPerson },
       { path: '/list-person', component: ListPerson },
       { path: '/list-tag', component: ListTag },
       { path: '/profile-person', component: ProfilePerson },
       { path: '/create-news', component: CreateNews },
       { path: '/edit-person', component: EditPerson, name: 'EditPerson'},
       { path: '/view-person/:id', component: ViewPerson, name: 'ViewPerson'},
       { path: '/add-news-to-person/:id', component: AddNewsToPerson, name: 'AddNewsToPerson'},
       { path: '/list-news', component: ListNews, name: 'ListNews' },
    ]
});

export default router;
Vue.use(VueRouter)
