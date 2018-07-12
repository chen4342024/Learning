import { parsePath } from '../util/index'
import { pushTarget, popTarget } from './dep';

export default class Watcher {
    constructor(options) {
        let { vm, cb, expOrFn } = options;
        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.getter = parsePath(this.expOrFn);
        this.value = this.get();
    }

    update() {
        const value = this.get();
        const oldValue = this.value;
        this.value = value;
        this.cb.call(this.vm, value, oldValue);
    }

    get() {
        pushTarget(this);
        const vm = this.vm;
        let value = this.getter.call(vm, vm);
        popTarget();
        return value;
    }

    teardown() {

    }
}