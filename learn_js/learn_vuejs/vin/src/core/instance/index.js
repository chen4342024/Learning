import { observe } from '../observer/index'
import Watcher from '../observer/watcher';
import { isReserved, noop } from '../util/index'
import { lifecycleMixin } from "./lifecycle";
import { renderMixin } from './render';
/**
 * Vin类
 */
class Vin {
    constructor(options) {
        this.init(options);
    }

    /**
     * 初始化
     * @param {*} options 
     */
    init(options) {
        console.log('init');
        this._watchers = [];
        this.$options = options;

        // 监听数据
        this.initData();

        // 监听watcher
        let watchers = this.$options.watch;
        this.initWatch(this, watchers);

        // 调用 mount
        if (this.$options.el) {
            this.$mount(this.$options.el)
        }
    }

    /**
     * 初始化数据
     */
    initData() {
        let data = this.$options.data;
        const vm = this;
        vm._data = data;
        const keys = Object.keys(data)
        let i = keys.length;
        while (i--) {
            const key = keys[i]
            if (!isReserved(key)) {
                proxy(vm, `_data`, key)
            }
        }
        observe(data);
    }

    /**
     * 初始化 订阅者
     * @param {*} vm 
     * @param {*} watch 
     */
    initWatch(vm, watch) {
        for (let key in watch) {
            const handler = watch[key];
            createWatcher(vm, key, handler);
        }
    }

    /**
     * 创建 watcher
     * @param {*} expOrFn 
     * @param {*} cb 
     */
    $watch(expOrFn, cb) {
        let vm = this;
        const watcher = new Watcher({ vm: vm, cb: cb, expOrFn: expOrFn });
        return function unwatchFn() {
            watcher.teardown();
        }
    }
}

// 生命周期
lifecycleMixin(Vin);

// 渲染相关
renderMixin(Vin);



const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

// 代理
export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}


//创建 watcher
function createWatcher(vm, expOrFn, handler) {
    return vm.$watch(expOrFn, handler)
}


export default Vin;