<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/arrayBuffer">ArrayBuffer</router-link>|
            <router-link to="/largeDiv">largeDiv</router-link>
        </div>
        <router-view />
    </div>
</template>

<style lang="scss">
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#nav {
    padding: 30px;
    a {
        font-weight: bold;
        color: #2c3e50;
        &.router-link-exact-active {
            color: #42b983;
        }
    }
}

.btn {
    border: 1px solid #42b983;
    height: 40px;
    line-height: 40px;
    margin-bottom: 5px;
}

.result-box {
    font-size: 14px;
    color: #333;
    padding: 5px 0;
}
</style>
