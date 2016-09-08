define([
    "../core"
], function (jQuery) {

// Multifunctional method to get and set values of a collection
// The value/s can optionally be executed if it's a function
    /**
     * 暴露给api的原型方法非常简单,只有一句话.把参数交给jQuery.access函数去处理. jQuery.access主要作用是修正参数
     * access 方法是可以被抽象出复用的一组对参数的修正方法,通过分解成单一的数据后,然后调用传递的回调处理钩子fn 比如 attr,css, prop,text
     * @param elems jQuery的this
     * @param fn 函数  这个参数的作用是告诉access方法, 修正完参数后再去调用 fn 方法
     *           参数修正后，如果 key == null ， 则会通过fn.call(target,value);
     *           如果 key != null ,value != null， 则会通过fn(target,key,value);
     *           如果 key != null ,value == null， 则会通过fn(target,key);
     * @param key 属性
     * @param value 值
     * @param chainable 是否可以链式调用，如果是get动作，为false，如果是set动作，为true
     * @param emptyGet 如果jQuery没有选中到元素的返回值
     * @param raw value是否为原始数据，如果raw是true，说明value是原始数据，如果是false，说明raw是个函数
     */
    var access = jQuery.access = function (elems, fn, key, value, chainable, emptyGet, raw) {
        var i = 0,
            len = elems.length,
            bulk = key == null;

        // Sets many values
        /**
         * 如果参数key是对象，表示要设置多个属性，则遍历参数key，遍历调用access方法
         */
        if (jQuery.type(key) === "object") {
            chainable = true; //表示可以链式调用
            for (i in key) {
                jQuery.access(elems, fn, i, key[i], true, emptyGet, raw);
            }

            // Sets one value
            // 设置一个值
        } else if (value !== undefined) {
            chainable = true;

            if (!jQuery.isFunction(value)) {
                raw = true;
            }

            if (bulk) {  // bulk = (key == null) ,例如$("xxx").text("xxxx")
                //批量操作
                // Bulk operations run against the entire set
                if (raw) { // value not a function
                    fn.call(elems, value);
                    fn = null;

                    // ...except when executing function values
                } else {
                    bulk = fn; //这里将bulk 赋值为fn，只是省略一个变量而已，fn肯定存在，所以bulk在下面的判断，依然标明key == null
                    fn = function (elem, key, value) {
                        return bulk.call(jQuery(elem), value);
                    };
                }
            }

            if (fn) {
                for (; i < len; i++) {
                    //如果value不是function，则直接设置值
                    //如果value为function，则调用value，并将fn的get将数据作为参数传回去，得到结果后，再设置值
                    fn(elems[i], key,
                        raw
                            ? value
                            : value.call(elems[i], i, fn(elems[i], key))
                    );
                }
            }
        }


        /**
        * 如果chainable为true，说明是个set方法，就返回elems
        * 否则说明是get方法
        * 1.如果bulk是个true，说明没有key值，调用fn，将elems传进去
        * 2.如果bulk为false，说明key有值哦，然后判断元素的长度是否大于0
        *    2.1 如果大于0，调用fn，传入elems[0]和key，完成get
        *    2.2 如果为0，说明传参有问题，返回指定的空值emptyGet
        */
        return chainable ?
            elems :

            // Gets
            bulk ?
                fn.call(elems) :
                len ? fn(elems[0], key) : emptyGet;
    };

    return access;

});
