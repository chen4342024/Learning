import Watcher from "../observer/watcher";
import { noop } from "../util";


// 为原型增加生命周期相关的函数
export function lifecycleMixin(Vin) {

    // 更新虚拟dom结构
    Vin.prototype._update = function(vnode) {
        const vm = this;
        const prevVnode = vm._vnode;
        vm._vnode = vnode;

        //patch, 测试，这里不做处理，直接返回一整个html替换
        // 这里应该是对比 vnode 和 prevVnode ，然后更新dom结构
        vm.$el.innerHTML = vnode.render();

    }
}

/**
 * 挂在组件
 * @param {*} el 
 */
export function mountComponent(vm, el) {
    console.log("mountComponent");

    vm.$el = el;
    vm.$options.render;

    // 更新组件
    let updateComponent = () => {
        vm._update(vm._render())
    }

    //创建渲染的 watcher
    new Watcher({
        vm,
        expOrFn: updateComponent,
        cb: noop,
        isRenderWatcher: true
    });

    return vm;
}