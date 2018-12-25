// 交换位置
export function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

// 输出
export function toString(dataStore) {
    var str = "";
    for (var i = 0; i < dataStore.length; ++i) {
        str += dataStore[i] + " ";
        if ((i > 0) & (i % 10 == 0)) {
            str += "\n";
        }
    }
    return str;
}

// 随机生成一组数据
export function makeData(count, range) {
    let data = [];
    var i = 0;
    while (i < count) {
        let num = Math.floor(Math.random() * range + 1);
        if (data.indexOf(num) === -1) {
            data.push(num);
            i++;
        }
    }
    return data;
}

export function log(array) {
    console.log(toString(array));
}

let _uniqId = 0;
export function uniqId() {
    return _uniqId++;
}

// 合并两个已经有排序的数组
export function mergeArrays(array, leftStart, leftEnd, rightStart, rightEnd) {
    let temp = [];
    let i = leftStart;
    let j = rightStart;

    while (i < leftEnd && j < rightEnd) {
        if (array[i] <= array[j]) {
            temp.push(array[i++]);
        } else {
            temp.push(array[j++]);
        }
    }

    while (i < leftEnd) {
        temp.push(array[i++]);
    }

    while (j < rightEnd) {
        temp.push(array[j++]);
    }

    for (i = 0; i < temp.length; i++) {
        array[leftStart + i] = temp[i];
    }
}
