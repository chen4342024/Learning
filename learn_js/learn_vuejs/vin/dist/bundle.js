var _typeof$1 = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function remove(arr, item) {
    if (arr.length) {
        var index = arr.indexOf(item);
        if (index > -1) {
            return arr.splice(index, 1);
        }
    }
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath(path) {
    if (bailRE.test(path)) {
        return;
    }
    var segments = path.split('.');
    return function (obj) {
        for (var i = 0; i < segments.length; i++) {
            if (!obj) return;
            obj = obj[segments[i]];
        }
        return obj;
    };
}

/**
 * Check if a string starts with $ or _
 */
function isReserved(str) {
    var c = (str + '').charCodeAt(0);
    return c === 0x24 || c === 0x5F;
}

function noop() {}

function def(obj, key, val, enumerable) {
    Object.defineProperty(obj, key, {
        value: val,
        enumerable: !!enumerable,
        writable: true,
        configurable: true
    });
}

function isRealObject(obj) {
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof$1(obj)) === 'object';
    // return Object.prototype.toString.call(obj) === '[object Object]';
}

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
var uid = 0;

var Dep = function () {
    function Dep() {
        _classCallCheck(this, Dep);

        this.id = uid++;
        this.subs = [];
    }

    _createClass(Dep, [{
        key: 'addSubs',
        value: function addSubs(watcher) {
            this.subs.push(watcher);
        }
    }, {
        key: 'removeSub',
        value: function removeSub(watcher) {
            remove(this.subs, watcher);
        }
    }, {
        key: 'depend',
        value: function depend() {
            if (Dep.target) {
                var watcher = Dep.target;
                this.addSubs(watcher);
            }
        }
    }, {
        key: 'notify',
        value: function notify() {
            var subs = this.subs.slice();
            for (var i = 0, l = subs.length; i < l; i++) {
                subs[i].update();
            }
        }
    }]);

    return Dep;
}();


Dep.target = null;
var targetStack = [];

function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

function popTarget() {
    Dep.target = targetStack.pop();
}

var methodsToPatch = ['pop', 'push', 'shift', 'unshift', 'splice', 'sort', 'reverse'];

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

methodsToPatch.forEach(function (method) {
    var original = arrayProto[method];
    def(arrayMethods, method, function () {
        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }

        var result = original.apply(this, args);
        var ob = this.__ob__;

        var inserted = void 0;
        switch (method) {
            case 'push':
            case 'unshift':
                inserted = args;
                break;
            case 'splice':
                inserted = args.slice(2);
                break;
        }
        if (inserted) ob.observeArray(inserted);

        ob.dep.notify();
        return result;
    });
});

var _createClass$1 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$1(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
/**
 * 观察数据变化
 */
var Observer = function () {
    function Observer(value) {
        _classCallCheck$1(this, Observer);

        this.value = value;

        this.dep = new Dep();
        def(value, '__ob__', this);

        if (Array.isArray(value)) {
            patchProto(value, arrayMethods);
            this.observeArray(value);
        } else {
            this.walk(value);
        }
    }

    _createClass$1(Observer, [{
        key: 'walk',
        value: function walk(obj) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                defineReactive(obj, keys[i]);
            }
        }
    }, {
        key: 'observeArray',
        value: function observeArray(items) {
            for (var i = 0, l = items.length; i < l; i++) {
                observe(items[i]);
            }
        }
    }]);

    return Observer;
}();
function patchProto(target, src, key) {
    target.__proto__ = src;
}

/**
 * 观察数据
 * @param {*} value 
 */
function observe(value) {
    if (!isRealObject(value)) {
        return;
    }
    var ob = new Observer(value);
    return ob;
}

/**
 * 定义响应式
 * @param {} obj 
 * @param {*} key 
 */
function defineReactive(obj, key) {
    console.log('defineReactive  obj -> ' + obj + ' , key -> ' + key);
    var property = Object.getOwnPropertyDescriptor(obj, key);
    if (property && property.configurable === false) {
        return;
    }

    var val = void 0;
    // cater for pre-defined getter/setters
    var getter = property && property.get;
    var setter = property && property.set;
    if ((!getter || setter) && arguments.length === 2) {
        val = obj[key];
    }

    var dep = new Dep();

    var childOb = val && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function get$$1() {
            var value = getter ? getter.call(obj) : val;
            if (Dep.target) {
                dep.depend();
                if (childOb) {
                    childOb.dep.depend();
                    if (Array.isArray(value)) {
                        dependArray(value);
                    }
                }
            }
            return value;
        },
        set: function set$$1(newVal) {
            var value = getter ? getter.call(obj) : val;
            if (newVal === value || newVal !== newVal && value !== value) {
                return;
            }
            if (setter) {
                setter.call(obj, newVal);
            } else {
                val = newVal;
            }
            dep.notify();
        }
    });
}

function dependArray(value) {
    for (var e, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}

var _createClass$2 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$2(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Watcher = function () {
    function Watcher(options) {
        _classCallCheck$2(this, Watcher);

        var vm = options.vm,
            cb = options.cb,
            expOrFn = options.expOrFn;

        this.vm = vm;
        this.expOrFn = expOrFn;
        this.cb = cb;
        this.getter = parsePath(this.expOrFn);
        this.value = this.get();
    }

    _createClass$2(Watcher, [{
        key: 'update',
        value: function update() {
            var value = this.get();
            var oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }, {
        key: 'get',
        value: function get$$1() {
            pushTarget(this);
            var vm = this.vm;
            var value = this.getter.call(vm, vm);
            popTarget();
            return value;
        }
    }, {
        key: 'teardown',
        value: function teardown() {}
    }]);

    return Watcher;
}();

var _createClass$3 = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck$3(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Vin类
 */

var Vin = function () {
    function Vin(options) {
        _classCallCheck$3(this, Vin);

        this.init(options);
    }

    _createClass$3(Vin, [{
        key: 'init',
        value: function init(options) {
            console.log('init');
            this.$options = options;
            this.initData();

            var watchers = this.$options.watch;
            this.initWatch(this, watchers);
        }
    }, {
        key: 'initData',
        value: function initData() {
            var data = this.$options.data;
            var vm = this;
            vm._data = data;
            var keys = Object.keys(data);
            var i = keys.length;
            while (i--) {
                var key = keys[i];
                if (!isReserved(key)) {
                    proxy(vm, '_data', key);
                }
            }
            observe(data);
        }
    }, {
        key: 'initWatch',
        value: function initWatch(vm, watch) {
            for (var key in watch) {
                var handler = watch[key];
                createWatcher(vm, key, handler);
            }
        }
    }, {
        key: '$watch',
        value: function $watch(expOrFn, cb) {
            var vm = this;
            var watcher = new Watcher({ vm: vm, cb: cb, expOrFn: expOrFn });
            return function unwatchFn() {
                watcher.teardown();
            };
        }
    }]);

    return Vin;
}();

var sharedPropertyDefinition = {
    enumerable: true,
    configurable: true,
    get: noop,
    set: noop
};

function proxy(target, sourceKey, key) {
    sharedPropertyDefinition.get = function proxyGetter() {
        return this[sourceKey][key];
    };
    sharedPropertyDefinition.set = function proxySetter(val) {
        this[sourceKey][key] = val;
    };
    Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createWatcher(vm, expOrFn, handler) {
    return vm.$watch(expOrFn, handler);
}

export default Vin;
