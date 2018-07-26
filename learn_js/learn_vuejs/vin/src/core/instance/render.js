export function renderMixin(Vin) {
    Vin.prototype._render = function() {
        const vm = this;
        const { render } = vm.$options;

        let vnode = render.call(vm)
        return vnode;
    }
}