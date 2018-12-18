<template>
    <div class="home">
        <h3>排序</h3>
        <div class="list-complete-container">
            <transition-group name="list-complete" class="list-complete-group" tag="p">
                <span
                    v-for="(item,index) in testArray"
                    :key="item"
                    :class="`list-complete-item ${isActive(index) ? 'active' : ''} ${ isEmpty(index) ? 'empty' : ''}`"
                    :style="{ height: item + 20 + 'px'}"
                >{{ item }}</span>
            </transition-group>
        </div>
        <div class="result-container">
            <div v-if="measureTime">
                <p>排序时间 :</p>
                <p>冒泡 ：{{spendTime[0]}}</p>
                <p>选择 ：{{spendTime[1]}}</p>
                <p>插入 ：{{spendTime[2]}}</p>
            </div>
            <div v-else>
                <p>排序前：{{beforeSort}}</p>
                <p>排序后：{{afterSort}}</p>
            </div>
        </div>
        <div class="btn-container">
            <span class="cat-btn ghost medium" v-if="isShow('bubble')" @click="handleCallSort(0)">冒泡排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('select')" @click="handleCallSort(1)">选择排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('insert')" @click="handleCallSort(2)">插入排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('all')" @click="handleTestingTime(2)">测量排序顺序</span>
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
            afterSort: "",
            measureTime: false,
            spendTime: []
        };
    },

    created() {
        this.showKey = this.$route.query.key || "all";
    },

    methods: {
        handleCallSort(index) {
            this.measureTime = false;
            if (this.snapshoot) {
                this.snapshoot.destory();
            }
            this.snapshoot = new Snapshoot();
            let testArray = makeData(10, 100);
            // let testArray = [3, 1, 5, 2, 4];
            // let testArray = [9, 8, 7, 6, 5, 4, 3, 2, 1];
            this.beforeSort = toString(testArray);
            this.sort(index, testArray);
            this.afterSort = toString(testArray);
            this.snapshoot.play(item => {
                console.log(this.testArray.toString());
                this.testArray = item.list;
                this.swapIndexs = item.swapIndexs;
                this.emptyIndexs = item.emptyIndexs;
            });
        },

        handleTestingTime() {
            this.measureTime = true;
            this.snapshoot = new Snapshoot();
            let testArray = makeData(500, 10000);
            this.spendTime = [];
            for (let i = 0; i < 3; i++) {
                let cloneTestArray = [...testArray];

                let startTime = new Date().getTime();
                this.sort(i, cloneTestArray);
                let endTime = new Date().getTime();

                this.spendTime[i] = `${endTime - startTime}ms`;
            }
        },

        sort(index, testArray) {
            switch (index) {
                case 0:
                    this.bubbleSort(testArray);
                    break;
                case 1:
                    this.selectSort(testArray);
                    break;
                case 2:
                    this.insertSort(testArray);
                    break;
            }
        },

        isActive(index) {
            return this.swapIndexs.indexOf(index) != -1;
        },

        isEmpty(index) {
            return this.emptyIndexs.indexOf(index) != -1;
        },

        // 冒泡排序，最慢的排序算法之一，
        // 最大的值一步一步往上冒泡
        bubbleSort(array) {
            for (let i = array.length - 1; i >= 1; i--) {
                let hasSwap = false;
                for (let j = 0; j <= i; j++) {
                    if (array[j] > array[j + 1]) {
                        swap(array, j, j + 1);
                        hasSwap = true;
                    }
                    this.snapshoot.add({
                        list: array,
                        swap: [j, j + 1]
                    });
                }
                if (!hasSwap) {
                    break;
                }
                log(array);
            }
            this.snapshoot.add({
                list: array,
                swap: []
            });
        },

        // 选择排序从开头开始，找出最小的值，放在第一个位置
        // 有点类似打扑克拍的时候，抽取每一张最小的放在最左边
        selectSort(array) {
            for (let i = 0; i < array.length - 1; i++) {
                let minIndex = i;
                let min = array[i];
                for (let j = i + 1; j < array.length; j++) {
                    this.snapshoot.add({
                        list: array,
                        swap: [i, j]
                    });
                    if (array[j] < min) {
                        min = array[j];
                        minIndex = j;
                    }
                }
                swap(array, i, minIndex);
                this.snapshoot.add({
                    list: array,
                    swap: [i, minIndex]
                });
                log(array);
            }
        },

        // 插入排序
        insertSort(array) {
            for (let i = 0; i < array.length; i++) {
                let temp = array[i];

                let j = i;
                while (j > 0 && array[j - 1] > temp) {
                    array[j] = array[j - 1];

                    // 记录
                    let prev = array[j - 1];
                    array[j - 1] = temp;
                    this.snapshoot.add({
                        list: array,
                        swap: [j, j - 1],
                        empty: [j - 1]
                    });
                    array[j - 1] = prev;
                    // 记录 end

                    j--;
                }
                array[j] = temp;
                this.snapshoot.add({
                    list: array,
                    swap: [i]
                });
            }
        },

        isShow(key) {
            return this.showKey === key || this.showKey === "all";
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

.list-complete-group {
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
.list-complete-item.empty {
    // opacity: 0;
    vertical-align: top;
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
