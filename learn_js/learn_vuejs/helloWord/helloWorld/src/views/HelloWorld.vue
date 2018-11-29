<template>
    <div class="hello">
        <h1 class="title">{{ title }}</h1>
        <dog :info="item" v-for="(item,index) in list" :key="index" class="todo-item">
            <span class="todo-item-delete" @click.prevent="deleteItem(index)">删除</span>
        </dog>
        <input type="text" v-model="msg">
        <button @click="handleList">添加</button>
    </div>
</template>

<script>
import Dog from '../components/Dog'
export default {
    name: 'HelloWorld',
    components: { Dog },
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
                headImg: "https://imgcdn.chuxingyouhui.com/lmjb/api/20181126/135c1941d2f6457c931b9f329ccbd1e3.jpeg",
                mutual: 1,
                nickname: "在下chen1",
                sex: 1,
                signature: "测试哎唉唉唉go恭喜顾着",
                userId: "1060740607372300299",
            },
            {
                age: 2,
                headImg: "https://imgcdn.chuxingyouhui.com/lmjb/api/20181126/135c1941d2f6457c931b9f329ccbd1e3.jpeg",
                mutual: 1,
                nickname: "在下chen2",
                sex: 1,
                signature: "测试哎唉唉唉go恭喜顾着",
                userId: "1060740607372300299",
            },
            {
                age: 3,
                headImg: "https://imgcdn.chuxingyouhui.com/lmjb/api/20181126/135c1941d2f6457c931b9f329ccbd1e3.jpeg",
                mutual: 1,
                nickname: "在下chen3",
                sex: 1,
                signature: "测试哎唉唉唉go恭喜顾着",
                userId: "1060740607372300299",
            },
        ]
    },

    methods: {



        handleList: function () {
            this.list.push({ text: this.msg, name: 'aaaaaa' });
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
    display: flex;
    padding: 10px;
    justify-content: center;
}

.todo-item-text {
    text-align: center;
    margin-right: 20px;
}
.todo-item-delete {
}
</style>
