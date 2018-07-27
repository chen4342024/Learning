import { parsePath, isFunction } from '../util/index'
import { pushTarget, popTarget } from './dep';

/**
 * 监听器
 */
export default class Watcher {
    constructor(options) {
        let { vm, cb, expOrFn, isRenderWatcher } = options;
        this.vm = vm;

        this.expOrFn = expOrFn;
        this.cb = cb;
        this.isRenderWatcher = isRenderWatcher;

        // 如果是用于渲染的watcher，则存起来
        if (isRenderWatcher) {
            vm._watcher = this;
        }
        vm._watchers.push(this);

        // 用于保存watcher所在的依赖
        this.deps = []
        // this.newDeps = []
        this.depIds = new Set()
        // this.newDepIds = new Set()

        // 初始化getter
        if (isFunction(this.expOrFn)) {
            this.getter = this.expOrFn;
        } else {
            this.getter = parsePath(this.expOrFn);
        }

        // 保存下value，这里会触发getter，搜集依赖
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

    /**
     * 添加依赖，因为更多时候是删除watcher ，然后要到 所有的 dep里面把当前watcher删掉
     * 所以在这里保存下 dep
     * @param {*} dep 
     */
    addDep(dep) {
        const id = dep.id
        if (!this.depIds.has(id)) {
            this.depIds.add(id)
            this.deps.push(dep)
            dep.addSub(this)
        }
    }

    teardown() {

    }
}