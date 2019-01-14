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
        msgList: ['1111', '2222', '3333'],
        isMan: true
    },
    template: `
    <div class="hello">
        <h1 class="title">{{ title }}</h1>
        <p v-for="msg,index,list in msgList" :key="index" class="msg">{{ msg }}</p>
        <span v-if='isMan'>男</span><span v-else>女</span>
    </div>`,

})
