<template>
  <div class="hello">
    <h1 class="title">{{ msg}}</h1>
    <span v-for="item in list">{{item}}</span>
    <input type="text" v-model="msg">
    <button @click="handleList">处理List</button>
  </div>
</template>

<script>
import Dog from './Dog'
export default {
  name: 'HelloWorld',
  components: { Dog },
  data () {
    return {
      title: '这个是HelloWorld标题',
      seen: false,
      firstName: 'Foo',
      lastName: 'Bar',
      msg: '1',
      _isVue: false,
      isVue: false,
      list: [],
      clickFunc: () => {
        alert(1)
      }
    }
  },
  computed: {
    msgs: () => {
      return '这个是HelloWorld信息'
    },

    fullName: {
      // getter
      get: function () {
        return this.firstName + ' ' + this.lastName
      },
      // setter
      set: function (newValue) {
        var names = newValue.split(' ')
        this.firstName = names[0]
        this.lastName = names[names.length - 1]
      }
    }
  },

  watch: {
    list: function (newVal, oldVal) {
      console.log(`list : newVal --> ${newVal} , oldVal --> ${oldVal}`)
    }
  },

  methods: {
    handleList: function () {
      // this.list = this.list.concat([1, 2, 3])
      this.list.push('123')
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
</style>
