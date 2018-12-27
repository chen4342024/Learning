// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    data: {
        title: 'chen',
        msg: '123123'
    },
    template: `
    <div class="hello">
        <h1 class="title">{{ title }}</h1>
        <p v-if="msg" class="msg">{{ msg }}</p>
    </div>`,

})
