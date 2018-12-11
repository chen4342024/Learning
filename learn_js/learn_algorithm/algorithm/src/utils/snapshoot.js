export default class Snapshoot {
    constructor() {
        this.list = [];
        this.step = 0;
    }

    add(item = {}) {
        let cloneItem = {
            list: [...item.list],
            swapIndexs: [...item.swap]
        };
        this.list.push(cloneItem);
    }

    play(callback, delay = 800) {
        this.step = 0;

        let loop = () => {
            callback(this.list[this.step]);
            if (this.step < this.list.length - 1) {
                this.step++;
                setTimeout(loop, delay);
            }
        };
        setTimeout(loop, delay);
    }

    next() {
        if (this.step < this.list.length) {
            return this.list[this.step];
        }
        return this.list[this.list.length - 1];
    }
}
