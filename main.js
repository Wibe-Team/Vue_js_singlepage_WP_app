import Vue from 'vue'
import App from './components/App.vue'
import Home from './components/Home.vue'
//import Blog from './components/Blog.vue'
import Post from './components/Post.vue'
import Categories from './components/Categories.vue'

import VueResource from 'vue-resource'
import VueRouter from 'vue-router'
Vue.use(VueRouter);
Vue.use(VueResource);

const routes = [
  {path: '/app', component: App},
  {path: '/home', component: Home},
  {path: '/blog', component: Categories, props: true},
  {path: '/post/:id', name: 'post', component: Post}
]
const router = new VueRouter({
  routes
})

new Vue({
  el: '#app',
  router
})

