<template>
    <div class="about"></div>
</template>

<script>
export default {
    name: "home",
    components: {},
    data() {
        return {
            timing: {},
            mesure: {},
            device: {}
        };
    },

    mounted() {
        window.onload = () => {
            setTimeout(() => {
                this.timing = performance.timing;
                this.calc();
                this.printAllEntry();
            }, 500);
        };
        this.setDevice();
    },

    methods: {
        setDevice() {
            this.device.ua = window.navigator.userAgent;
        }
    }
};
</script>
