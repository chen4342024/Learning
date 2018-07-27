/**
 * 删除 array
 * @param {*} arr 
 * @param {*} item 
 */
export function remove(arr, item) {
    if (arr.length) {
        const index = arr.indexOf(item)
        if (index > -1) {
            return arr.splice(index, 1)
        }
    }
}

/**
 * Parse simple path.
 */
const bailRE = /[^\w.$]/
export function parsePath(path) {
    if (bailRE.test(path)) {
        return
    }
    const segments = path.split('.')
    return function(obj) {
        for (let i = 0; i < segments.length; i++) {
            if (!obj) return
            obj = obj[segments[i]]
        }
        return obj
    }
}

/**
 * Check if a string starts with $ or _
 */
export function isReserved(str) {
    const c = (str + '').charCodeAt(0)
    return c === 0x24 || c === 0x5F
}


export function noop() {}


/**
 * 定义 对象上的 key，返回的val
 * @param {*} obj 
 * @param {*} key 
 * @param {*} val 
 * @param {*} enumerable 
 */
export function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

// 判断是否是object对象
export function isRealObject(obj) {
    return obj !== null && typeof obj === 'object';
}

//判断是否是函数
export function isFunction(fn) {
    return typeof fn === 'function';
}