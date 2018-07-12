import Dep from "./dep";

/**
 * 观察数据变化
 */
export class Observer {
    constructor(value) {
        this.value = value;
        this.walk(value)
    }

    walk(obj) {
        const keys = Object.keys(obj)
        for (let i = 0; i < keys.length; i++) {
            defineReactive(obj, keys[i]);
        }
    }
};


/**
 * 观察数据
 * @param {*} value 
 */
export function observe(value) {
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

    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function() {
            const value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
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