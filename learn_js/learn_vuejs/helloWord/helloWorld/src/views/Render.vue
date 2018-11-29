<template>
    <div class="hello">
        <h1 class="title">{{ title }}</h1>
        <render-test :level="5">这是内容</render-test>
    </div>
</template>

<script>
import RenderTest from '../components/RenderTest'

export default {
    name: 'render',
    components: {
        RenderTest
    },
    data() {
        return {
            title: '渲染',
            level: 1,
        }
    },

    render(createElement) {
        return createElement(
            'h' + this.level,   // 标签名称
            this.$slots.default // 子元素数组
        )
    },

    computed: {
    },

    created() {
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
