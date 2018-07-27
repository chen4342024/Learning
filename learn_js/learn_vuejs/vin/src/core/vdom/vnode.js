// 虚拟 Dom 节点
export class VNode {

    constructor(options) {
        let { template, vm } = options;
        // 简单处理直接保存template
        this.template = template;
        this.vm = vm;
        this.data = vm.$options.data;
    }

    //用于测试用
    render() {
        // 简单处理,直接显示
        let keys = Object.keys(this.data);
        keys.forEach((item) => {
            this.template += `${item} : ${this.data[item]}<br/>`;
        })
        return this.template;
    }
}