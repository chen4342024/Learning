import { observe } from '../observer/index'
import Watcher from '../observer/watcher';
import { isReserved, noop } from '../util/index'
import { _update } from './lifecycle'

/**
 * Vin类
 */
class Vin {
    constructor(options) {
        this.init(options);
    }

    init(options) {
        console.log('init');
        this.$options = options;
        this.initData();

        let watchers = this.$options.watch;
        this.initWatch(this, watchers);
    }

    initData() {
        let data = this.$options.data;
        const vm = this;
        vm._data = data;
        const keys = Object.keys(data)
        let i = keys.length
        while (i--) {
            const key = keys[i]
            if (!isReserved(key)) {
                proxy(vm, `_data`, key)
            }
        }
        observe(data);
    }

    initWatch(vm, watch) {
        for (let key in watch) {
            const handler = watch[key];
            createWatcher(vm, key, handler);
        }
    }

    $watch(expOrFn, cb) {
        let vm = this;
        const watcher = new Watcher({ vm: vm, cb: cb, expOrFn: expOrFn });
        return function unwatchFn() {
            watcher.teardown();
        }
    }

    _update() {
        console.log('_update ');
    }
}

const sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
}

export function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key]
    }
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}


function createWatcher(vm, expOrFn, handler) {
    return vm.$watch(expOrFn, handler)
}


export default Vin;