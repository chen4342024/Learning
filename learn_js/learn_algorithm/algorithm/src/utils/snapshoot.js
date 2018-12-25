export default class Snapshoot {
    constructor() {
        this.list = [];
        this.step = 0;
        this.enable = true;
    }

    add(item = {}) {
        if (!this.enable) {
            return;
        }
        let cloneItem = {
            list: [...(item.list || [])],
            swapIndexs: [...(item.swap || [])],
            emptyIndexs: [...(item.empty || [])],
            temp: [...(item.temp || [])],
            compareRangeLeft: [...(item.compareRangeLeft || [])],
            compareRangeRight: [...(item.compareRangeRight || [])]
        };
        this.list.push(cloneItem);
    }

    play(callback, delay = 800) {
        if (!this.enable) {
            return;
        }
        this.step = 0;
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
        let loop = () => {
            callback(this.list[this.step]);
            if (this.step < this.list.length - 1) {
                this.step++;
                this.timeoutId = setTimeout(loop, delay);
            }
        };
        this.timeoutId = setTimeout(loop, delay);
    }

    next() {
        if (!this.enable) {
            return;
        }
        if (this.step < this.list.length) {
            return this.list[this.step];
        }
        return this.list[this.list.length - 1];
    }

    destory() {
        if (this.timeoutId != null) {
            clearTimeout(this.timeoutId);
            this.timeoutId = null;
        }
    }
}
