import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/views/HelloWorld'
import TodoMvc from '@/views/TodoMvc'

Vue.use(Router)

export default new Router({
    routes: [{
            path: '/',
            name: 'HelloWorld',
            component: HelloWorld
        },
        {
            path: '/TodoMvc',
            name: 'TodoMvc',
            component: TodoMvc
        }, {
            path: '/Render',
            name: 'Render',
            component: () =>
                import( /* webpackChunkName: "EditProfile" */ "../views/Render.vue")
        }, {
            path: '/Transition',
            name: 'Transition',
            component: () =>
                import( /* webpackChunkName: "EditProfile" */ "../views/Transition.vue")
        }
    ]
})
