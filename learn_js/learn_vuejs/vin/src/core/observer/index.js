import Dep from "./dep";
import { arrayMethods } from './array'
import { def, isRealObject } from '../util/index'
/**
 * 观察数据变化
 */
export class Observer {
    constructor(value) {

        this.value = value;

        // 定义当前观察者的依赖，主要用于watcher
        this.dep = new Dep();
        def(value, '__ob__', this);

        if (Array.isArray(value)) {
            // 数组情况下，需要对push等方法进行监听
            patchProto(value, arrayMethods);
            this.observeArray(value);
        } else {
            // 普通对象，则监听整个对象
            this.walk(value)
        }
    }

    /**
     * 监听对象的getter和setter
     * @param {}} obj 
     */
    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }

    /**
     * 监听数组 
     * @param {*} items 
     */
    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    }
};

// 将原型指向src
function patchProto(target, src, key) {
    target.__proto__ = src;
}


/**
 * 观察数据
 * @param {*} value 
 */
export function observe(value) {
    if (!isRealObject(value)) {
        return
    }
    let ob = new Observer(value);
    return ob;
}



/**
 * 定义响应式
 * @param {} obj 
 * @param {*} key 
 */
function defineReactive(obj, key) {
    console.log(`defineReactive  obj -> ${obj} , key -> ${key}`);
    const property = Object.getOwnPropertyDescriptor(obj, key)
    if (property && property.configurable === false) {
        return;
    }

    let val;
    // cater for pre-defined getter/setters
    const getter = property && property.get
    const setter = property && property.set
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key]
    }

    // 定义Dep对象，用于收集依赖
    const dep = new Dep();

    let childOb = val && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            const value = getter ? getter.call(obj) : val;
            // 由于getter是闭包，故外部利用getter来收集依赖，
            // Dep.target为一个全局变量，存储了当前正在调用getter的 watcher
            if (Dep.target) {
                dep.depend();
                // 如果是数组，则调用数组的依赖收集，并监听所有子项
                if (childOb) {
                    childOb.dep.depend()
                    if (Array.isArray(value)) {
                        dependArray(value)
                    }
                }
            }
            return value;
        },
        set: function(newVal) {
            const value = getter ? getter.call(obj) : val;
            if (newVal === value || (newVal !== newVal && value !== value)) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal)
            } else {
                val = newVal
            }
            // 通知之前所以依赖的 watcher
            dep.notify()
        }
    });
}

// 收集数组的依赖
function dependArray(value) {
    for (let e, i = 0, l = value.length; i < l; i++) {
        e = value[i]
        e && e.__ob__ && e.__ob__.dep.depend()
        if (Array.isArray(e)) {
            dependArray(e)
        }
    }
}