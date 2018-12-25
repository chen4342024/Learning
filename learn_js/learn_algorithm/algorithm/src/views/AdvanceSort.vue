<template>
    <div class="home">
        <h3>高级排序</h3>
        <div class="list-complete-container">
            <transition-group name="list-complete" class="list-complete-group" tag="p">
                <span
                    v-for="(item,index) in testArray"
                    :key="item"
                    :class="`list-complete-item ${isActive(index) ? 'active' : ''} ${ isEmpty(index) ? 'empty' : ''} ${ getCompareClass(index)}`"
                    :style="{ height: item + 20 + 'px'}"
                >{{ item }}</span>
            </transition-group>
        </div>
        <div class="result-container">
            {{compareRangeLeft}} {{compareRangeRight}}
            <div v-if="measureTime">
                <p>排序时间 :</p>
                <p>希尔 ：{{spendTime[0]}}</p>
                <p>归并 ：{{spendTime[1]}}</p>
                <p>快速 ：{{spendTime[2]}}</p>
            </div>
            <div v-else>
                <p>排序前：{{beforeSort}}</p>
                <p>排序后：{{afterSort}}</p>
            </div>
        </div>
        <div class="btn-container">
            <span class="cat-btn ghost medium" v-if="isShow('shell')" @click="handleCallSort(0)">希尔排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('merge')" @click="handleCallSort(1)">归并排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('quick')" @click="handleCallSort(2)">快速排序</span>
            <span class="cat-btn ghost medium" v-if="isShow('all')" @click="handleTestingTime(2)">测量排序时间</span>
        </div>
    </div>
</template>

<script>
import { makeData, swap, log, toString, mergeArrays } from "../utils/util.js";
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
            spendTime: [],
            compareRangeLeft: [],
            compareRangeRight: []
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
                this.compareRangeLeft = item.compareRangeLeft;
                this.compareRangeRight = item.compareRangeRight;
            });
        },

        handleTestingTime() {
            this.measureTime = true;
            this.snapshoot = new Snapshoot();
            let testArray = makeData(1000, 10000);
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
                    this.shellSort(testArray);
                    break;
                case 1:
                    this.mergeSort(testArray);
                    break;
                case 2:
                    this.quickSort(testArray);
                    break;
            }
        },

        isActive(index) {
            return this.swapIndexs.indexOf(index) != -1;
        },

        isEmpty(index) {
            return this.emptyIndexs.indexOf(index) != -1;
        },

        getCompareClass(index) {
            let compareRangeLeft = this.compareRangeLeft[0];
            let compareRangeLeftEnd = this.compareRangeLeft[1];
            let compareRangeRight = this.compareRangeRight[0];
            let compareRangeRightEnd = this.compareRangeRight[1];
            if (index >= compareRangeLeft && index < compareRangeLeftEnd) {
                return "compare-left";
            } else if (
                index >= compareRangeRight &&
                index < compareRangeRightEnd
            ) {
                return "compare-right";
            } else {
                return "";
            }
        },

        // 希尔排序
        shellSort(array) {
            let gaps = [5, 3, 1];
            for (let i = 0; i < gaps.length; i++) {
                let gap = gaps[i];
                for (let j = 0; j < array.length; j++) {
                    let k = j;
                    let temp = array[j];
                    while (k >= gap && array[k - gap] > temp) {
                        array[k] = array[k - gap];

                        // 记录
                        let prev = array[k - gap];
                        array[k - gap] = temp;
                        this.snapshoot.add({
                            list: array,
                            swap: [k, k - gap],
                            empty: [k - gap]
                        });
                        array[k - gap] = prev;
                        // 记录 end

                        k -= gap;
                    }
                    array[k] = temp;
                    this.snapshoot.add({
                        list: array,
                        swap: [k]
                    });
                }
            }

            this.snapshoot.add({
                list: array,
                swap: []
            });
        },

        // 归并排序
        mergeSort(array) {
            if (array.length < 2) {
                return;
            }
            let step = 1;
            let left, right;
            while (step < array.length) {
                left = 0;
                right = step;
                while (right + step <= array.length) {
                    mergeArrays(array, left, left + step, right, right + step);
                    this.snapshoot.add({
                        list: array,
                        swap: [],
                        compareRangeLeft: [left, left + step],
                        compareRangeRight: [right, right + step]
                    });
                    left = right + step;
                    right = left + step;
                }

                if (right < array.length) {
                    mergeArrays(array, left, left + step, right, array.length);
                    this.snapshoot.add({
                        list: array,
                        swap: [left, left + step, right, right + step],
                        compareRangeLeft: [left, left + step],
                        compareRangeRight: [right, right + step]
                    });
                }
                step *= 2;
            }
            this.snapshoot.add({
                list: array,
                swap: []
            });
        },

        // 快速排序
        quickSort(array) {
            if (array.length === 0) {
                return [];
            }
            let lesser = [];
            let greater = [];
            let pivot = array[0];
            for (let i = 1; i < array.length; i++) {
                if (array[i] < pivot) {
                    lesser.push(array[i]);
                } else {
                    greater.push(array[i]);
                }
            }
            this.quickSort(lesser);
            this.quickSort(greater);
            let result = [...lesser, pivot, ...greater];
            for (let j = 0; j < result.length; j++) {
                array[j] = result[j];
            }
            this.snapshoot.add({
                list: array,
                swap: []
            });
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

.compare-left {
    background: #ffb600;
}
.compare-right {
    background: #008100;
}
</style>
