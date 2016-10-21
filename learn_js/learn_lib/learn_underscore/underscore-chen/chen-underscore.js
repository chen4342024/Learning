(function () {
    var root = this;

    var previousUnderscore = root._;
    var _ = {};
    root._ = _;


    // Create quick reference variables for speed access to core prototypes.
    //-------------------
    var ArrayProto = Array.prototype,
        ObjectProto = Object.prototype;
    var hasOwnProperty = ObjectProto.hasOwnProperty;

    //ES 5
    var nativeIsArray = Array.isArray,
        nativeKeys = Object.keys,
        nativeCreate = Object.create;

    // Naked function reference for surrogate-prototype-swapping.
    var Ctor = function () {
    };

    var toString = ObjectProto.toString,
        slice = ArrayProto.slice,
        push = ArrayProto.push;

    // common function
    // -------------------

    var property = function (key) {
        return function (obj) {
            return obj == null ? void 0 : obj[key];
        };
    };

    var getLength = property('length');

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length < MAX_ARRAY_INDEX;
    };


    var optimizeCb = function (func, context, argCount) {
        if (context === void 0) {
            return func;
        } else {
            argCount = argCount || 3;
            switch (argCount) {
                case 3:
                    return function (value, index, collection) {
                        return func.call(context, value, index, collection);
                    };
                case 4:
                    return function (accumulator, value, index, collection) {
                        return func.call(context, accumulator, value, index, collection);
                    };
            }
        }
        return function () {
            return func.apply(context, arguments);
        };
    };

    var cb = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };

    var restArgs = function (func, startIndex) {
        startIndex = startIndex == null ? func.length - 1 : startIndex;
        return function () {
            var length = Math.max(arguments.length - startIndex, 0);
            var rest = Array(length);
            for (var index = 0; index < length; index++) {
                rest[index] = arguments[index + startIndex];
            }
            switch (startIndex) {
                case 0:
                    return func.call(this, rest); //使用call 性能比 apply更好点
                case 1:
                    return func.call(this, arguments[0], rest);
                case 2:
                    return func.call(this, arguments[0], arguments[1], rest);
            }
            var args = Array(startIndex + 1);
            for (index = 0; index < startIndex; index++) {
                args[index] = arguments[index];
            }
            args[startIndex] = rest;
            return func.apply(this, args);
        }
    };

    // An internal function for creating a new object that inherits from another.
    var baseCreate = function (prototype) {
        if (!_.isObject(prototype)) return {};
        if (nativeCreate) return nativeCreate(prototype);
        Ctor.prototype = prototype;
        var result = new Ctor;
        Ctor.prototype = null;
        return result;
    };


    _.matcher = function (attrs) {
        return function (obj) {
            return _.isMatch(obj, attrs)
        }
    };

    _.isMatch = function (object, attrs) {
        var keys = _.keys(attrs), length = keys.length;
        if (object == null) return !length;
        for (var i = 0; i < length; i++) {
            var key = keys[i];
            if (attrs[key] !== object[key] || !(key in object)) {
                return false;
            }
        }
        return true;
    };


    // Collection Functions
    // --------------------
    _.each = function (obj, iteratee, context) {
        iteratee = optimizeCb(iteratee, context);
        var i, length;
        if (isArrayLike(obj)) {
            for (i = 0, length = obj.length; i < length; i++) {
                iteratee(obj[i], i, obj);
            }
        } else {
            for (i in obj) {  //TODO
                if (_.has(obj, i))
                    iteratee(obj[i], i, obj);
            }
        }
        return obj;
    };

    _.map = function (obj, iteratee, context) {
        iteratee = cb(iteratee, context);
        var results = [];
        _.each(obj, function (value, key, obj) {
            results[key] = iteratee(value, key, obj);
        }, context);
        return results;
    };

    var createReduce = function (dir) {
        var reducer = function (obj, iteratee, memo, initial) {
            var isArray = isArrayLike(obj);
            var keys = !isArray && _.keys(obj);
            var length = (keys || obj).length;
            var index = dir > 0 ? 0 : length - 1;
            if (!initial) {
                memo = obj[isArray ? index : keys[index]];
                index += dir;
            }
            for (; index >= 0 && index < length; index += dir) {
                var key = isArray ? index : keys[index];
                memo = iteratee(memo, obj[key], key, obj);
            }
            return memo;
        };

        return function (obj, iteratee, memo, context) {
            var initial = arguments.length >= 3;
            iteratee = optimizeCb(iteratee, context, 4);
            return reducer(obj, iteratee, memo, initial);
        };
    };

    _.reduce = createReduce(1);

    _.reduceRight = createReduce(-1);


    _.find = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var isArray = isArrayLike(obj);
        var keys = !isArray && _.keys(obj);
        var length = (keys || obj).length;
        var index = 0;
        for (; index < length; index++) {
            var key = isArray ? index : keys[index];
            if (predicate(obj[key], key, obj)) {
                return obj[key];
            }
        }
        return void 0;
    };

    _.filter = function (obj, predicate, context) {
        var results = [];
        predicate = cb(predicate, context);
        _.each(obj, function (value, key, list) {
            if (predicate(value, key, list)) {
                results.push(value)
            }
        });
        return results;
    };

    _.where = function (obj, properties) {
        return _.filter(obj, _.matcher(properties));
    };

    _.findWhere = function (obj, properties) {
        return _.find(obj, _.matcher(properties));
    };

    _.reject = function (list, predicate, context) {
        predicate = cb(predicate);
        var rejectPredicate = function () {
            return !predicate.apply(this, arguments);
        };
        return _.filter(list, rejectPredicate, context);
    };

    _.every = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj);
        var length = (keys || obj).length;
        for (var i = 0; i < length; i++) {
            var key = keys ? keys[i] : i;
            if (!predicate(obj[key], key, obj)) return false;
        }
        return true;
    };

    _.some = _.any = function (obj, predicate, context) {
        predicate = cb(predicate, context);
        var keys = !isArrayLike(obj) && _.keys(obj),
            length = (keys || obj).length;
        for (var index = 0; index < length; index++) {
            var currentKey = keys ? keys[index] : index;
            if (predicate(obj[currentKey], currentKey, obj)) return true;
        }
        return false;
    };

    _.contains = function (obj, item, fromIndex) {
        if (!isArrayLike(obj)) {
            obj = _.values(obj);
        }
        if (typeof fromIndex != 'number') {
            fromIndex = 0;
        }
        return obj.indexOf(item, fromIndex) >= 0;
    };

    _.pluck = function (obj, key) {
        return _.map(obj, _.property(key));
    };


    _.invoke = restArgs(function (obj, methodName, args) {
        var isFunc = _.isFunction(methodName);
        return _.map(obj, function (value, index, list) {
            var func = isFunc ? methodName : value[methodName];
            return func == null ? func : func.apply(value, args);
        });
    });

    _.max = function (obj, iteratee, context) {
        var result = -Infinity, lastComputed = -Infinity, value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value != null && value > result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, list) {
                computed = iteratee(value, index, list);
                if (computed > lastComputed || computed === -Infinity && result === -Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };

    _.min = function (obj, iteratee, context) {
        var result = Infinity, lastComputed = Infinity, value, computed;
        if (iteratee == null || (typeof iteratee == 'number' && typeof obj[0] != 'object') && obj != null) {
            obj = isArrayLike(obj) ? obj : _.values(obj);
            for (var i = 0, length = obj.length; i < length; i++) {
                value = obj[i];
                if (value != null && value < result) {
                    result = value;
                }
            }
        } else {
            iteratee = cb(iteratee, context);
            _.each(obj, function (value, index, obj) {
                computed = iteratee(value, index, obj);
                if (computed < lastComputed || computed === Infinity && result === Infinity) {
                    result = value;
                    lastComputed = computed;
                }
            });
        }
        return result;
    };


    _.sortBy = function (obj, iteratee, context) {
        var index = 0;
        iteratee = cb(iteratee, context);
        var objSortCriteria = _.map(obj, function (value, key, obj) {
            return {
                value: value,
                index: index++,
                criteria: iteratee(value, key, obj)
            }
        });
        var sorted = objSortCriteria.sort(function (left, right) {
            var a = left.criteria, b = right.criteria;
            if (a !== b) {
                if (a > b || a === void 0) return 1; // a === void 0 ,的时候，将void 0 移到后面
                if (a < b || b === void 0) return -1;
            }
            return left.index - right.index;
        });
        return _.pluck(sorted, 'value');
    };

    _.groupBy = group(function (result, value, key) {
        if (!_.has(result, key)) {
            result[key] = [];
        }
        result[key].push(value);
    });


    function group(behavior, partition) {
        return function (obj, iteratee, context) {
            iteratee = cb(iteratee, context);
            var result = partition ? [[], []] : {};
            _.each(obj, function (value, index, obj) {
                var key = iteratee(value, index, obj);
                behavior(result, value, key);
            });
            return result;
        };
    }

    _.indexBy = group(function (result, value, key) {
        result[key] = value;
    });

    _.countBy = group(function (result, value, key) {
        if (_.has(result, key)) result[key]++; else result[key] = 1;
    });

    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return ArrayProto.slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj);
        return _.values(obj);
    };

    _.size = function (obj) {
        if (!obj) return 0;
        return isArrayLike(obj) ? obj.length : _.keys(obj).length;
    };

    _.partition = group(function (result, value, pass) {
        result[pass ? 0 : 1].push(value);
    }, true);

    _.shuffle = function (obj) {
        return _.sample(obj, Number.MAX_VALUE);
    };

    _.sample = function (obj, n) {
        if (n == null) {
            if (!isArrayLike(obj)) obj = _.values(obj);
            return obj[_.random(0, obj.length - 1)];
        }
        //TODO  must be _.clone(obj)
        var sample = isArrayLike(obj) ? obj : _.values(obj);
        var length = getLength(sample);
        n = Math.max(Math.min(n, length), 0);
        var last = length - 1;
        for (var i = 0; i < n; i++) {
            var randomIndex = _.random(i, last);
            var temp = obj[i];
            obj[i] = obj[randomIndex];
            obj[randomIndex] = temp;
        }
        return sample.slice(0, n);
    };


    //  Array Functions  -----------------------------------------------
    // --------------------------------------------------------------
    _.first = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[0];
        return slice.call(array, 0, Math.max(0, n));
    };

    //guard 参数表示方法是否从_.map执行进入的
    _.initial = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) n = 1;
        return slice.call(array, 0, Math.max(0, array.length - n));
    };

    // Get the last element of an array. Passing **n** will return the last N
    // values in the array.
    _.last = function (array, n, guard) {
        if (array == null) return void 0;
        if (n == null || guard) return array[array.length - 1];
        return _.rest(array, Math.max(0, array.length - n));
    };

    // Returns everything but the first entry of the array. Aliased as `tail` and `drop`.
    // Especially useful on the arguments object. Passing an **n** will return
    // the rest N values in the array.
    _.rest = _.tail = _.drop = function (array, n, guard) {
        return slice.call(array, n == null || guard ? 1 : n);
    };

    _.compact = function (array) {
        return _.filter(array);
    };


    /**
     * 减少数组维数
     * @param array 数组
     * @param shallow 是否只减少一维
     * @param output 输出结果，用于递归
     * @param strict 是否将非数组的值添加到结果集中，内部使用，用于union
     * @returns {*|Array}
     */
    var flatten = function (array, shallow, strict, output) {
        output = output || [];
        var idx = output.length;
        for (var i = 0, len = getLength(array); i < len; i++) {
            var value = array[i];
            if (isArrayLike(value) && (_.isArray(value) || _.isArguments(value))) {
                if (shallow) {
                    for (var j = 0, vLen = value.length; j < vLen; j++) {
                        output[idx++] = value[j];
                    }
                } else {
                    flatten(value, shallow, strict, output);
                    idx = output.length;
                }
            } else if (!strict) {
                output[idx++] = value;
            }
        }
        return output;
    };

    _.flatten = function (array, shallow) {
        return flatten(array, shallow, false);
    };


    _.union = restArgs(function (arrays) {
        return _.uniq(flatten(arrays, true, true))
    });

    _.uniq = function (array, isSorted, iteratee, context) {
        if (!_.isBoolean(isSorted)) {
            context = iteratee;
            iteratee = isSorted;
            isSorted = false;
        }
        if (iteratee != null) {
            iteratee = cb(iteratee, context);
        }
        var length = getLength(array);

        var result = [];
        var seen = [];
        for (var i = 0; i < length; i++) {
            var value = array[i];
            var computed = iteratee ? iteratee(value, i, array) : value;
            if (isSorted) {
                if (i == 0 || seen !== computed) {
                    result.push(value);
                    seen = computed;
                }
            } else if (iteratee) {
                if (!_.contains(seen, computed)) {
                    seen.push(computed);
                    result.push(value);
                }
            } else if (!_.contains(result, value)) {
                result.push(value);
            }
        }
        return result;
    };

    _.intersection = function (array) {
        var result = [];
        var argsLength = arguments.length;
        for (var i = 0, len = getLength(array); i < len; i++) {
            var item = array[i];
            if (_.contains(result, item)) continue;
            var j = 1;
            for (; j < argsLength; j++) {
                if (!_.contains(arguments[j], item)) {
                    break;
                }
            }
            if (j === argsLength) {
                result.push(item);
            }
        }
        return result;
    };

    _.without = restArgs(function (array, values) {
        return _.filter(array, function (value) {
            return !_.contains(values, value);
        });
    });

    _.difference = restArgs(function (array, others) {
        others = flatten(others, true, true);
        return _.filter(array, function (value) {
            return !_.contains(others, value)
        })
    });

    _.unzip = function (arrays) {
        var length = _.max(arrays, getLength).length || 0;
        var result = Array(length);
        for (var i = 0; i < length; i++) {
            result[i] = _.pluck(arrays, i);
        }
        return result;
    };

    _.zip = restArgs(_.unzip);


    _.object = function (list, values) {
        var result = {};
        for (var i = 0, len = getLength(list); i < len; i++) {
            if (values) {
                result[list[i]] = values[i];
            } else {
                result[list[i][0]] = list[i][1];
            }
        }
        return result;
    };

    _.range = function (start, stop, step) {
        if (stop == null) {
            stop = start || 0;
            start = 0;
        }
        if (!step) {
            step = stop < start ? -1 : 1;
        }

        var length = Math.max(Math.ceil((stop - start) / step), 0);
        var range = Array(length);

        for (var idx = 0; idx < length; idx++, start += step) {
            range[idx] = start;
        }

        return range;
    };

    // Function Functions
    //--------------------------
    _.bind = restArgs(function (func, obj, args) {
        var bound = restArgs(function (callArgs) {
            return excuteBound(func, bound, obj, this, args.concat(callArgs));
        });
        return bound;
    });

    /**
     * 执行绑定的方法
     * @param sourceFunc
     * @param boundFunc
     * @param context
     * @param callingContext
     * @param args
     * @returns {*}
     */
    var excuteBound = function (sourceFunc, boundFunc, context, callingContext, args) {
        //普通使用bound方法的情况
        if (!(callingContext instanceof boundFunc)) {
            return sourceFunc.apply(context, args);
        }
        var self = new sourceFunc(args);
        return self;
    };

    _.bindAll = restArgs(function (obj, keys) {
        keys = flatten(keys, false, false);
        var index = keys.length;
        if (index < 1) throw new Error('bindAll must be passed function names');
        while (index--) {
            var key = keys[index];
            obj[key] = _.bind(obj[key], obj);
        }
    });

    _.partial.placeholder = _;
    _.partial = restArgs(function (func, boundArgs) {
        var placeholder = _.partial.placeholder;
        var bound = function () {
            var position = 0, len = boundArgs.length;
            var args = [];
            for (var i = 0; i < len; i++) {
                args.push(boundArgs === placeholder ? arguments[position++] : boundArgs[i]);
            }
            var argumentLength = arguments.length;
            while (position < argumentLength){
                args.push(arguments[position++]);
            };

            return excuteBound(func, bound, this, this, args);
        };
        return bound;
    });

    _.delay = restArgs(function (func, wait, args) {
        return setTimeout(function () {
            return func.apply(null, args);
        }, wait);
    });

    _.defer = _.partial(_.delay, _, 1);


    // Object Functions
    // -----------------------
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };


    _.keys = function (obj) {
        if (!_.isObject(obj)) {
            return [];
        }
        var keys = [];
        for (var key in obj) {
            if (_.has(obj, key)) {
                keys.push(key);
            }
        }
        return keys;
    };

    _.allKeys = function (obj) {
        if (!_.isObject(obj)) return [];
        var keys = [];
        for (var key in obj) keys.push(key);
        // Ahem, IE < 9.
        //if (hasEnumBug) collectNonEnumProps(obj, keys);
        return keys;
    };

    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = (obj[keys[i]]);
        }
        return values;
    };

    // Invert the keys and values of an object. The values must be serializable.
    _.invert = function (obj) {
        var result = {};
        var keys = _.keys(obj);
        for (var i = 0, length = keys.length; i < length; i++) {
            result[obj[keys[i]]] = keys[i];
        }
        return result;
    };

    _.functions = function (obj) {
        var names = [];
        var allKeys = _.allKeys(obj);
        _.each(allKeys, function (key) {
            if (_.isFunction(obj[key])) names.push(key);
        });
        return names.sort();
    };

    // Create a (shallow-cloned) duplicate of an object.
    _.clone = function (obj) {
        if (!_.isObject(obj)) return obj;
        return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
    };

    _.extend = function (destination, source) {

    };

    _.isElement = function (obj) {
        return !!(obj && obj.nodeType === 1);
    };

    _.isArray = nativeIsArray
        || function (obj) {
            return toString.call(obj) === '[object Array]';
        };

    _.isObject = function (obj) {
        var type = typeof obj;
        return type === "object" || type === 'function' && !!obj;
    };

    _.each(["Arguments", 'Function', 'String', 'Number', 'Date', 'RegExp', 'Error', 'Symbol', 'Map', 'WeakMap', 'Set', 'WeakSet'], function (name) {
        _["is" + name] = function (obj) {
            return toString.call(obj) === '[object ' + name + ']';
        }
    });

    _.isArguments = function (obj) {
        return _.has(obj, 'callee');
    };

    _.isFunction = function (obj) {
        return typeof obj == 'function';
    };

    _.isBoolean = function (obj) {
        return obj === true || obj === false || toString.call(obj) === '[object Boolean]';
    };

    _.isNull = function (obj) {
        return obj === null;
    };

    _.isUndefined = function (obj) {
        return obj === void 0;
    };

    _.isFinite = function (obj) {
        return isFinite(obj) && !isNaN(parseFloat(obj));
    };

    //isString isNumber isFinite  isBoolean  isDate isRegExp isError isNaN isNull isUndefined

    _.property = property;


    // Utility Function
    // ----------------------
    _.noConflict = function () {
        root._ = previousUnderscore;
        return this;
    };

    _.noop = function () {
    };

    _.identity = function (value) {
        return value;
    };

    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
        return function () {
            return value;
        };
    };

    _.times = function (n, iteratee, context) {
        var accum = Array(Math.max(0, n));
        iteratee = optimizeCb(iteratee, context, 1);
        for (var i = 0; i < n; i++) accum[i] = iteratee(i);
        return accum;
    };

    _.random = function (min, max) {
        if (max == null) {
            max = min;
            min = 0;
        }
        return min + Math.floor(Math.random() * (max - min + 1));
    };

    // A (possibly faster) way to get the current timestamp as an integer.
    _.now = Date.now || function () {
            return new Date().getTime();
        };

    _.mixin = function (obj) {
        var functions = _.functions(obj);
        _.each(functions, function (name) {
            _[name] = obj[name];
        });
    };

    _.iteratee = function (value, context) {
        return cb(value, context, Infinity);
    };


    var idCounter = 0;
    _.uniqueId = function (prefix) {
        var id = ++idCounter + '';
        return prefix ? prefix + id : id;
    };

    // List of HTML entities for escaping.
    var escapeMap = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#x27;',
        '`': '&#x60;'
    };
    var unescapeMap = _.invert(escapeMap);

    var createEscape = function (map) {
        var source = '(?:' + _.keys(map).join('|') + ')';
        var testRegexp = new RegExp(source);
        var replaceRegexp = new RegExp(source, 'g');
        return function (string) {
            string = string == null ? '' : '' + string;
            return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
                return map[match];
            }) : string;
        }
    };

    _.escape = createEscape(escapeMap);
    _.unescape = createEscape(unescapeMap);
    _.now = Date.now || function () {
            return new Date().getTime();
        };

}());




