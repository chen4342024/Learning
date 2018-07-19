import Dep from "./dep";
// import { arrayMethods } from './array'
// import { def } from '../util/index'
/**
 * 观察数据变化
 */
export class Observer {
    constructor(value) {
        this.value = value;

        this.dep = new Dep();
        // def(value, '__ob__', this);

        if (Array.isArray(value)) {
            // patchProto(value, arrayMethods);
            this.observeArray(value);
        } else {
            this.walk(value)
        }
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }

    observeArray(items) {
        for (let i = 0, l = items.length; i < l; i++) {
            observe(items[i]);
        }
    }
};

// function patchProto(target, src, key) {
//     target.__proto__ = src;
// }


/**
 * 观察数据
 * @param {*} value 
 */
export function observe(value) {
    if (!(obj !== null && typeof obj === 'object')) {
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

    const dep = new Dep();

    // let childOb = val && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                // if (childOb) {
                //     childOb.dep.depend()
                //     if (Array.isArray(value)) {
                //         dependArray(value)
                //     }
                // }
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
            dep.notify()
        }
    });
}

// function dependArray(value) {
//     for (let e, i = 0, l = value.length; i < l; i++) {
//         e = value[i]
//         e && e.__ob__ && e.__ob__.dep.depend()
//         if (Array.isArray(e)) {
//             dependArray(e)
//         }
//     }
// }