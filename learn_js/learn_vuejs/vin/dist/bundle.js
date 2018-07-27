var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};

var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

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
    return obj !== null && (typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object';
    // return Object.prototype.toString.call(obj) === '[object Object]';
}

function isFunction(fn) {
    return typeof fn === 'function';
}

var uid = 0;

/**
 * 用来收集依赖
 */

var Dep = function () {
    function Dep() {
        classCallCheck(this, Dep);

        this.id = uid++;
        this.subs = [];
    }

    /**
     * 添加 watcher
     * @param {*} watcher 
     */


    createClass(Dep, [{
        key: 'addSub',
        value: function addSub(watcher) {
            this.subs.push(watcher);
        }

        /**
         * 删除watcher
         * @param {*} watcher 
         */

    }, {
        key: 'removeSub',
        value: function removeSub(watcher) {
            remove(this.subs, watcher);
        }

        /**
         * 收集依赖的watcher
         */

    }, {
        key: 'depend',
        value: function depend() {
            if (Dep.target) {
                Dep.target.addDep(this);
            }
        }

        /**
         * 通知依赖
         */

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

// 一个堆栈,保存着所有的 watcher
var targetStack = [];

/**
 * 将 watcher 推入堆栈，这样再 observer 里面可以通过 Dep.target 拿到
 * @param {*} _target watcher
 */
function pushTarget(_target) {
    if (Dep.target) targetStack.push(Dep.target);
    Dep.target = _target;
}

/**
 * 将 watcher 从堆栈中弹出
 */
function popTarget() {
    Dep.target = targetStack.pop();
}

// 需要打补丁的方法
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

/**
 * 观察数据变化
 */
var Observer = function () {
    function Observer(value) {
        classCallCheck(this, Observer);


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
            this.walk(value);
        }
    }

    /**
     * 监听对象的getter和setter
     * @param {}} obj 
     */


    createClass(Observer, [{
        key: 'walk',
        value: function walk(obj) {
            var keys = Object.keys(obj);
            for (var i = 0; i < keys.length; i++) {
                defineReactive(obj, keys[i]);
            }
        }

        /**
         * 监听数组 
         * @param {*} items 
         */

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
// 将原型指向src
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

    // 定义Dep对象，用于收集依赖
    var dep = new Dep();

    var childOb = val && observe(val);
    Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: function get$$1() {
            var value = getter ? getter.call(obj) : val;
            // 由于getter是闭包，故外部利用getter来收集依赖，
            // Dep.target为一个全局变量，存储了当前正在调用getter的 watcher
            if (Dep.target) {
                dep.depend();
                // 如果是数组，则调用数组的依赖收集，并监听所有子项
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
            // 通知之前所以依赖的 watcher
            dep.notify();
        }
    });
}

// 收集数组的依赖
function dependArray(value) {
    for (var e, i = 0, l = value.length; i < l; i++) {
        e = value[i];
        e && e.__ob__ && e.__ob__.dep.depend();
        if (Array.isArray(e)) {
            dependArray(e);
        }
    }
}

/**
 * 监听器
 */

var Watcher = function () {
    function Watcher(options) {
        classCallCheck(this, Watcher);
        var vm = options.vm,
            cb = options.cb,
            expOrFn = options.expOrFn,
            isRenderWatcher = options.isRenderWatcher;

        this.vm = vm;

        this.expOrFn = expOrFn;
        this.cb = cb;
        this.isRenderWatcher = isRenderWatcher;

        if (isRenderWatcher) {
            vm._watcher = this;
        }
        vm._watchers.push(this);

        this.deps = [];
        // this.newDeps = []
        this.depIds = new Set();
        // this.newDepIds = new Set()
        if (isFunction(this.expOrFn)) {
            this.getter = this.expOrFn;
        } else {
            this.getter = parsePath(this.expOrFn);
        }
        this.value = this.get();
    }

    /**
     * 更新方法，会调用之前绑定到当前watcher的回调
     */


    createClass(Watcher, [{
        key: 'update',
        value: function update() {
            var value = this.get();
            var oldValue = this.value;
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }

        /**
         * 获取当前所 watcher 内容的值，并收集依赖
         */

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
        key: 'addDep',
        value: function addDep(dep) {
            var id = dep.id;
            if (!this.depIds.has(id)) {
                this.depIds.add(id);
                this.deps.push(dep);
                dep.addSub(this);
            }
        }
    }, {
        key: 'teardown',
        value: function teardown() {}
    }]);
    return Watcher;
}();

function lifecycleMixin(Vin) {

    Vin.prototype._update = function (vnode) {
        var vm = this;
        var prevVnode = vm._vnode;
        vm._vnode = vnode;

        //patch, 测试，这里不做处理，直接返回一整个html替换
        vm.$el.innerHTML = vnode.render();
    };
}

/**
 * 
 * @param {*} el 
 */
function mountComponent(vm, el) {
    console.log("mountComponent");

    vm.$el = el;
    vm.$options.render;
    var updateComponent = function updateComponent() {
        vm._update(vm._render());
    };

    new Watcher({
        vm: vm,
        expOrFn: updateComponent,
        cb: noop,
        isRenderWatcher: true
    });

    return vm;
}

function renderMixin(Vin) {
    Vin.prototype._render = function () {
        var vm = this;
        var render = vm.$options.render;


        var vnode = render.call(vm);
        return vnode;
    };
}

/**
 * Vin类
 */

var Vin = function () {
    function Vin(options) {
        classCallCheck(this, Vin);

        this.init(options);
    }

    createClass(Vin, [{
        key: 'init',
        value: function init(options) {
            console.log('init');
            this._watchers = [];
            this.$options = options;

            this.initData();

            var watchers = this.$options.watch;
            this.initWatch(this, watchers);

            if (this.$options.el) {
                this.$mount(this.$options.el);
            }
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

lifecycleMixin(Vin);
renderMixin(Vin);

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

/**
 * Query an element selector if it's not an element already.
 */
function query(el) {
    if (typeof el === 'string') {
        var selected = document.querySelector(el);
        if (!selected) {
            process.env.NODE_ENV !== 'production' && warn('Cannot find element: ' + el);
            return document.createElement('div');
        }
        return selected;
    } else {
        return el;
    }
}

/**
 * Get outerHTML of elements, taking care
 * of SVG elements in IE as well.
 */
function getOuterHTML(el) {
    if (el.outerHTML) {
        return el.outerHTML;
    } else {
        var container = document.createElement('div');
        container.appendChild(el.cloneNode(true));
        return container.innerHTML;
    }
}

var VNode = function () {
    function VNode(options) {
        classCallCheck(this, VNode);
        var template = options.template,
            vm = options.vm;

        this.template = template;
        this.vm = vm;
        this.data = vm.$options.data;
    }

    //用于测试用


    createClass(VNode, [{
        key: "render",
        value: function render() {
            var _this = this;

            var keys = Object.keys(this.data);
            keys.forEach(function (item) {
                _this.template += item + " : " + _this.data[item] + "<br/>";
            });
            return this.template;
        }
    }]);
    return VNode;
}();

Vin.prototype.$mount = function (el) {
    el = el ? query(el) : undefined;
    return mountComponent(this, el);
};

var mount = Vin.prototype.$mount;
Vin.prototype.$mount = function (el) {
    el = el && query(el);
    var options = this.$options;
    var template = options.template;
    if (!template && el) {
        template = getOuterHTML(el);
    }
    if (!options.render) {
        if (template) {
            options.render = compileToFunctions(template, { vm: this });
        }
    }
    mount.call(this, el);
};

function compileToFunctions(template, options) {
    var vm = options.vm;
    return function (data) {
        return new VNode({
            template: template,
            vm: vm
        });
    };
}

export default Vin;
