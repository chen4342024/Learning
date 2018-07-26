export class VNode {
    constructor(options) {
        let { template, data } = options;
        this.template = template;
        this.data = data;
    }

    //用于测试用
    render() {
        let keys = Object.keys(this.data);
        keys.forEach((item) => {
            this.template += this.data[item] + ',';
        })
        return this.template;
    }

}