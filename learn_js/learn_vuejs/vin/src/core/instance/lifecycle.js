import Watcher from "../observer/watcher";
import { noop } from "../util";

export function lifecycleMixin(Vin) {
    
    Vin.prototype._update = function(vnode) {
        const vm = this;
        const prevVnode = vm._vnode;
        vm._vnode = vnode;

        //patch, 测试，这里不做处理，直接返回一整个html替换
        vm.$el.innerHTML = vnode.render();

    }
}

/**
 * 
 * @param {*} el 
 */
export function mountComponent(vm, el) {
    console.log("mountComponent");

    vm.$el = el;
    vm.$options.render
    let updateComponent = () => {
        vm._update(vm._render())
    }

    new Watcher({
        vm,
        expOrFn: updateComponent,
        cb: noop,
        isRenderWatcher: true
    });

    return vm;
}