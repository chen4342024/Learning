<template>
    <div class="home">
        <h3>排序</h3>
        <div class="list-complete-container">
            <transition-group name="list-complete" class tag="p">
                <span
                    v-for="(item,index) in testArray"
                    :key="item"
                    :class="`list-complete-item ${isActive(index) ? 'active' : ''}`"
                    :style="{ height: item + 20 + 'px'}"
                >{{ item }}</span>
            </transition-group>
        </div>
        <div class="result-container">
            <p>排序前：{{beforeSort}}</p>
            <p>排序后：{{afterSort}}</p>
        </div>
        <div class="btn-container">
            <span class="cat-btn ghost medium" @click="handleCallSort(0)">冒泡排序</span>
            <span class="cat-btn ghost medium" @click="handleCallSort(1)">选择排序</span>
        </div>
    </div>
</template>

<script>
import { makeData, swap, log, toString } from "../utils/util.js";
import Snapshoot from "../utils/snapshoot.js";
export default {
    name: "home",
    components: {},
    data() {
        return {
            testArray: [],
            beforeSort: "",
            afterSort: ""
        };
    },

    created() {},

    methods: {
        handleCallSort(index) {
            let testArray = makeData(10, 100);
            // let testArray = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            this.snapshoot = new Snapshoot();
            // let testArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];
            this.beforeSort = toString(testArray);
            this.sort(index, testArray);
            this.afterSort = toString(testArray);
            this.snapshoot.play(item => {
                this.testArray = item.list;
                this.swapIndexs = item.swapIndexs;
            });
        },

        sort(index, testArray) {
            switch (index) {
                case 0:
                    this.bubbleSort(testArray);
                    break;
                case 1:
                    this.selectSort(testArray);
                    break;
            }
        },

        isActive(index) {
            return this.swapIndexs.indexOf(index) != -1;
        },

        // 冒泡排序，最慢的排序算法之一
        bubbleSort(array) {
            for (let i = array.length - 1; i >= 1; i--) {
                for (let j = 0; j <= i; j++) {
                    if (array[j] > array[j + 1]) {
                        swap(array, j, j + 1);
                    }
                    this.snapshoot.add({
                        list: array,
                        swap: [j, j + 1]
                    });
                }
                log(array);
            }
            this.snapshoot.add({
                list: array,
                swap: []
            });
        },

        selectSort(array) {
            // for (let i = array.length - 1; i >= 1; i--) {
            //     for (let j = 0; j <= i; j++) {
            //         if (array[j] > array[j + 1]) {
            //             swap(array, j, j + 1);
            //         }
            //         this.snapshoot.add({
            //             list: array,
            //             swap: [j, j + 1]
            //         });
            //     }
            //     log(array);
            // }
            // this.snapshoot.add({
            //     list: array,
            //     swap: []
            // });
        }
    }
};
</script>

<style scoped lang="scss">
.btn {
    border: 1px solid #cccccc;
    width: 7rem;
    margin: 0 auto;
    display: block;
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.28rem;
}

h3 {
    font-size: 0.4rem;
    padding: 0.1rem;
}

.btn-container {
    padding: 0.3rem;
}

.list-complete-item {
    transition: all 0.5s;
    display: inline-block;
    /* margin-right: 10px; */
    width: 0.6rem;
    height: 0.8rem;
    /* line-height: 0.8rem; */
    padding-top: 0.1rem;
    text-align: center;
    vertical-align: bottom;
    background: #a9d4e3;
    margin: 0.02rem;
}

.list-complete-item.active {
    background: #008100;
}

.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active for below version 2.1.8 */ {
    opacity: 0;
    transform: translateY(30px);
}
.list-complete-leave-active {
    position: absolute;
}

.list-complete-container {
    height: 5rem;
    background: #eeeeee;
    display: flex;
    justify-content: center;
    align-items: flex-end;
}

.result-container {
    text-align: left;
    padding: 0.3rem;

    > p {
        line-height: 0.5rem;
        font-size: 0.28rem;
    }
}
.cat-btn {
    margin-top: 0.1rem;
}
</style>
