<template>
    <div>
        serviceWorkerDemo
        {{ test }}
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
