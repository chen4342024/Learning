import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoMvc from '@/components/TodoMvc'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/TodoMvc',
      name: 'TodoMvc',
      component: TodoMvc
    }
  ]
})
