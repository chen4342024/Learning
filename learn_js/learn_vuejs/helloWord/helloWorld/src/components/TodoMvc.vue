<template>
  <div>
    <header class="header">
      <h1>todos</h1>
      <input type="text" autocomplete="off" placeholder="请输入待办事件" v-model="newTodo" @keyup.enter="addTodo"/>
    </header>
    <section class="main" v-show="todos.length > 0">
      <ul class="todo-list">
        <li class="todo" v-for="todo in filteredTodos" :key="todo.id">
          <div class="view">
              <input type="checkbox" v-model="todo.completed">
              <label>{{todo.title}}</label>
              <button class="destory" @click="removeTodo(todo)">X</button>
          </div>
        </li>
      </ul>
    </section>
    <footer class="footer" v-show="todos.length">
        <ul class="filters">
          <li><a @click="toggleFilter('all')" :class="{ selected: filter == 'all' }">All</a></li>
          <li><a @click="toggleFilter('active')" :class="{ selected: filter == 'active' }">Active</a></li>
          <li><a @click="toggleFilter('completed')" :class="{ selected: filter == 'completed' }">Completed</a></li>
        </ul>
    </footer>
  </div>
</template>

<script>
const filters = {
  all: (todos) => {
    return todos
  },
  active: (todos) => {
    return todos.filter((todo) => { return !todo.completed })
  },
  completed: (todos) => {
    return todos.filter((todo) => todo.completed)
  }
}

export default {
  name: 'HelloWorld',
  data () {
    return {
      todos: [],
      filter: 'all',
      newTodo: ''
    }
  },
  computed: {
    filteredTodos: function () {
      let filterFunc = filters[this.filter]
      return filterFunc && filters[this.filter](this.todos)
    }
  },
  methods: {
    addTodo: function () {
      let value = this.newTodo && this.newTodo.trim()
      if (!value) {
        return
      }
      this.todos.push({
        title: value,
        completed: false
      })
    },
    removeTodo: function (todo) {
      this.todos = this.todos.filter((item) => todo !== item)
    },

    toggleFilter (filter) {
      this.filter = filter
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
  display: block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
