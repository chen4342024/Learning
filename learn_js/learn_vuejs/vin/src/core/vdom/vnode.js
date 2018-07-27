export class VNode {
    constructor(options) {
        let { template, vm } = options;
        this.template = template;
        this.vm = vm;
        this.data = vm.$options.data;
    }

    //用于测试用
    render() {
        let keys = Object.keys(this.data);
        keys.forEach((item) => {
            this.template += `${item} : ${this.data[item]}<br/>`;
        })
        return this.template;
    }
}