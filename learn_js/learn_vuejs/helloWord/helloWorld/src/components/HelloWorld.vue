<template>
  <div class="hello">
    <h1 class="title">{{ msg + '123123' }}</h1>
    <h2 class="msg " @click="clickFunc"> {{fullName}} </h2>
    <input v-model="msg">
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      title: '这个是HelloWorld标题',
      seen: false,
      firstName: 'Foo',
      lastName: 'Bar',
      msg: '1',
      clickFunc: () => {
        alert(1)
      }
    }
  },
  computed: {
    msg: () => {
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
