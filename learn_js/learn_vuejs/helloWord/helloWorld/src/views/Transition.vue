<template>
    <div class="hello">
        <h1 class="title">{{ title }}</h1>

        <transition-group name="fade">
            <div v-for="(item,index) in list" :key="index" class="todo-item">
                <p>{{item.nickname}}</p>
                <span class="todo-item-delete" @click.prevent="deleteItem(index)">删除</span>
            </div>
        </transition-group>

        <input type="text" v-model="msg">
        <button @click="handleList">添加</button>
    </div>
</template>

<script>
export default {
    name: 'Transition',
    components: {},
    data() {
        return {
            title: 'Todo list',
            msg: '',
            _isVue: false,
            isVue: false,
            list: [],
        }
    },
    computed: {
    },

    created() {
        this.list = [
            {
                age: 1,
                nickname: "在下chen1",
                signature: "测试哎唉唉唉go恭喜顾着",
            },
            {
                age: 2,
                nickname: "在下chen2",
                signature: "测试哎唉唉唉go恭喜顾着",
            },
            {
                age: 3,
                nickname: "在下chen3",
                signature: "测试哎唉唉唉go恭喜顾着",
            },
        ]
    },

    methods: {

        handleList: function () {
            this.list.push({ nickname: this.msg, age: '123' });
            this.msg = '';
        },

        deleteItem(index) {
            this.list.splice(index, 1);
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
    font-weight: normal;
}
ul {
    list-style-type: none;
    padding: 0;
}
li {
    display: inline-block;
    margin: 0 10px;
}
a {
    color: #42b983;
}
p {
    margin: 0;
}

.todo-item {
    display: inline-flex;
    padding: 10px;
    justify-content: center;
    transition: all 1s;
}

.todo-item-text {
    text-align: center;
    margin-right: 20px;
}
.todo-item-delete {
}

.list-complete-item {
    transition: all 1s;
    display: inline-block;
    margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}
</style>
