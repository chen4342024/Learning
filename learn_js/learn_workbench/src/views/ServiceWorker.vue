<template>
    <div>
        serviceWorkerDemo
        {{ test }}
        <img width="100%" src="../assets/test.jpg" />
    </div>
</template>

<script>
export default {
    name: "serviceWorker",
    data() {
        return {
            test: window.test
        };
    }
};
</script>

<style lang="scss" scoped></style>
