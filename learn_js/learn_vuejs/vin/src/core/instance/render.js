/**
 * 为Vin 添加渲染相关的原型方法
 * @param {*} Vin 
 */
export function renderMixin(Vin) {

    /**
     * 渲染
     */
    Vin.prototype._render = function() {
        const vm = this;
        const { render } = vm.$options;
        let vnode = render.call(vm)
        return vnode;
    }
}