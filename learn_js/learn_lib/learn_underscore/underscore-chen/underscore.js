(function () {
    var root = this;

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
    };

    var cb = function (value, context, argCount) {
        if (value == null) return _.identity;
        if (_.isFunction(value)) return optimizeCb(value, context, argCount);
        if (_.isObject(value)) return _.matcher(value);
        return _.property(value);
    };

    _.noop = function () {
    };

    _.identity = function (value) {
        return value;
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



    var getRestArgs = function (args, startIndex) {
        var argsArr = ArrayProto.slice.call(args);
        return argsArr.slice(startIndex);
    };

    _.invoke = function (obj, methodName) {
        var args = getRestArgs(arguments, 2);
        var isFunc = _.isFunction(methodName);
        return _.map(obj, function (value, index, list) {
            var func = isFunc ? methodName : value[methodName];
            return func == null ? func : func.apply(value, args);
        });
    };


    // Array Functions
    // ------------------------
    _.toArray = function (obj) {
        if (!obj) return [];
        if (_.isArray(obj)) return ArrayProto.slice.call(obj);
        if (isArrayLike(obj)) return _.map(obj);
        return _.values(obj);
    };

    // Predicate-generating functions. Often useful outside of Underscore.
    _.constant = function (value) {
        return function () {
            return value;
        };
    };

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

    _.values = function (obj) {
        var keys = _.keys(obj);
        var length = keys.length;
        var values = Array(length);
        for (var i = 0; i < length; i++) {
            values[i] = (obj[keys[i]]);
        }
        return values;
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

}());