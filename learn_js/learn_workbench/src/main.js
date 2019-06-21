import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 注册 serviceWorker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/sw.js")
        .then(() => {
            console.log("注册成功");
        })
        .catch(error => {
            console.log(`注册失败 -> ${error}`);
        });
}

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount("#app");
