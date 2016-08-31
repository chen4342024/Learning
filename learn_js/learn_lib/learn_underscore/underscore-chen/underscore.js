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

    var getLength = function (obj) {
        return obj == null ? void 0 : obj["length"];
    };

    var MAX_ARRAY_INDEX = Math.pow(2, 53) - 1;
    var isArrayLike = function (collection) {
        var length = getLength(collection);
        return typeof length == 'number' && length >= 0 && length < MAX_ARRAY_INDEX;
    };

    var optimizeCb = function (func, context) {
        if (context === void 0) {
            return func;
        } else {
            return function (value, index, collection) {
                func.call(context, value, index, collection);
            }
        }
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

    }

    // Object Functions
    // -----------------------
    _.has = function (obj, key) {
        return obj != null && hasOwnProperty.call(obj, key);
    };

}());