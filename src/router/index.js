import Vue from 'vue'
import VueRouter from 'vue-router'

import Editor from '../views/Editor.vue'

const routes = [
  {
    path: '/:id',
    name: 'editor',
    component: Editor
  },
  {
    path: '*',
    redirect: '/1'
  }
]

Vue.use(VueRouter)

export default new VueRouter({
  routes: routes
})
