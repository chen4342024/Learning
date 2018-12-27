<template>
    <div class="hello">
        <h1 class="title">{{ title }}</h1>
        <p v-if="msg" class="msg">{{ msg }}</p>
    </div>
</template>

<script>
export default {
    name: 'HelloWorld',
    components: {},
    data() {
        return {
            title: 'chen',
            msg: '123123'
        }
    },
    computed: {
    },

    methods: {
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
