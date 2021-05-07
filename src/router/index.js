import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from './../pages/common/Home'
import NotFound from './../pages/common/NotFound'
import AboutMe from './../pages/common/AboutMe'

import NewPerson from './../pages/person/NewPerson';
import CreateNews from './../pages/news/CreateNews'
import ListTag from './../pages/tag/ListTag';
import ListPerson from './../pages/person/ListPerson';
import ProfilePerson from './../pages/person/ProfilePerson';


// import EditPerson from './../pages/person/EditPerson'
import ViewPerson from './../pages/person/ViewPerson'
import AddNewsToPerson from './../pages/news-person/AddNewsToPerson'
import ListNews from './../pages/news/ListNews'

let router = new VueRouter({
    mode: 'history',
    routes: [
       { path: '/', redirect: 'home' },
       { path: '/home', component: Home },
       { path: '*', component: NotFound },
       { path: '/new-person', component: NewPerson },
       { path: '/about-me', component: AboutMe },
       { path: '/list-person', component: ListPerson },
       { path: '/list-tag', component: ListTag },
       { path: '/profile-person', component: ProfilePerson },
       { path: '/create-news', component: CreateNews },
       { path: '/edit-person', component: NewPerson, name: 'EditPerson'},
       { path: '/view-person/:id', component: ViewPerson, name: 'ViewPerson'},
       { path: '/add-news-to-person/:id', component: AddNewsToPerson, name: 'AddNewsToPerson'},
       { path: '/list-news', component: ListNews, name: 'ListNews' },
       { path: '/edit-news', component: CreateNews, name: 'EditNews'},
    ]
});

export default router;
Vue.use(VueRouter)
