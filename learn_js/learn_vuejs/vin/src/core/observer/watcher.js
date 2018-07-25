import { parsePath } from '../util/index'
import { pushTarget, popTarget } from './dep';

/**
 * 监听器
 */
export default class Watcher {
    constructor(options) {
        let { vm, cb, expOrFn } = options;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;

        this.deps = []
        this.newDeps = []
        this.depIds = new Set()
        this.newDepIds = new Set()

        this.getter = parsePath(this.expOrFn);
        this.value = this.get();
    }

    /**
     * 更新方法，会调用之前绑定到当前watcher的回调
     */
    update() {
        const value = this.get();
        const oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
    }

    /**
     * 获取当前所 watcher 内容的值，并收集依赖
     */
    get() {
        pushTarget(this);
        const vm = this.vm;
        let value = this.getter.call(vm, vm);
        popTarget();
        return value;
    }

    addDep(dep) {
        const id = dep.id
        if (!this.newDepIds.has(id)) {
            this.newDepIds.add(id)
            this.newDeps.push(dep)
            
            if (!this.depIds.has(id)) {
                dep.addSub(this)
            }
        }
    }

    teardown() {

    }
}