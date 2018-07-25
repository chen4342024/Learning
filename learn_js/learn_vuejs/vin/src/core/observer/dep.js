import { remove } from '../util/index'
let uid = 0;

/**
 * 用来收集依赖
 */
export default class Dep {

    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    /**
     * 添加 watcher
     * @param {*} watcher 
     */
    addSub(watcher) {
        this.subs.push(watcher);
    }

    /**
     * 删除watcher
     * @param {*} watcher 
     */
    removeSub(watcher) {
        remove(this.subs, watcher);
    }

    /**
     * 收集依赖的watcher
     */
    depend() {
        if (Dep.target) {
            Dep.target.addDep(this)
        }
    }

    /**
     * 通知依赖
     */
    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

Dep.target = null

// 一个堆栈,保存着所有的 watcher
const targetStack = []

/**
 * 将 watcher 推入堆栈，这样再 observer 里面可以通过 Dep.target 拿到
 * @param {*} _target watcher
 */
export function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

/**
 * 将 watcher 从堆栈中弹出
 */
export function popTarget() {
    Dep.target = targetStack.pop()
}