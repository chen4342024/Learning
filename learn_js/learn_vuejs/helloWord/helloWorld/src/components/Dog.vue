<template>
    <div>
        {{infoData.age}}
        {{infoData.nickname}}
        <slot></slot>
    </div>
</template>


<script>
export default {
    name: 'HelloWorld',
    props: {
        info: {
            type: Object,
            required: true
        },
    },

    created() {
        this.infoData = { ...this.info };
    },

    watch: {
        info: function (val) {
            this.infoData = { ...this.info };
        }
    },

    data() {
        return {
        }
    }
}
</script>

