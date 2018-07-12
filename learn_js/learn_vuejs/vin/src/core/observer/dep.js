import { remove } from '../util/index'
let uid = 0;


export default class Dep {
    constructor() {
        this.id = uid++;
        this.subs = [];
    }

    addSubs(watcher) {
        this.subs.push(watcher);
    }

    removeSub(watcher) {
        remove(this.subs, watcher);
    }

    depend() {
        if (Dep.target) {
            let watcher = Dep.target;
            this.addSubs(watcher);
        }
    }

    notify() {
        const subs = this.subs.slice();
        for (let i = 0, l = subs.length; i < l; i++) {
            subs[i].update();
        }
    }
}

Dep.target = null
const targetStack = []

export function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target)
    Dep.target = _target
}

export function popTarget() {
    Dep.target = targetStack.pop()
}