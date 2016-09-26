describe('Object', function () {

    describe('functions', function () {
        it('can grab the function names of any passed-in object', function () {
            var obj = {a: 'dash', b: _.map, c: /yo/, d: _.reduce};
            expect(['b', 'd']).toEqual(_.functions(obj));
        });

        it('also looks up functions on the prototype', function () {
            var Animal = function () {
            };
            Animal.prototype.run = function () {
            };
            expect(_.functions(new Animal)).toEqual(['run']);
        });
    });

    describe('keys', function () {
        it('can extract the keys from an object', function () {
            expect(_.keys({one: 1, two: 2})).toEqual(['one', 'two']);
        });

        it('is not fooled by sparse arrays; see issue #95', function () {
            var a = [];
            a[1] = 0;
            expect(_.keys(a)).toEqual(['1']);
        });


        it('can handle null / void 0 / number / string / boolean', function () {
            expect(_.keys(null)).toEqual([]);
            expect(_.keys(void 0)).toEqual([]);
            expect(_.keys(1)).toEqual([]);
            expect(_.keys('a')).toEqual([]);
            expect(_.keys(true)).toEqual([]);
        });


        // keys that may be missed if the implementation isn't careful
        it('matches non-enumerable properties', function () {
            var trouble = {
                constructor: Object,
                valueOf: _.noop,
                hasOwnProperty: null,
                toString: 5,
                toLocaleString: void 0,
                propertyIsEnumerable: /a/,
                isPrototypeOf: this,
                __defineGetter__: Boolean,
                __defineSetter__: {},
                __lookupSetter__: false,
                __lookupGetter__: []
            };
            var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                'isPrototypeOf', '__defineGetter__', '__defineSetter__', '__lookupSetter__', '__lookupGetter__'].sort();
            expect(_.keys(trouble).sort()).toEqual(troubleKeys);
        });

    });

    describe('allKeys', function () {

        it('can extract the allKeys from an object', function () {
            expect(_.allKeys({one: 1, two: 2})).toEqual(['one', 'two']);
        });

        // the test above is not safe because it relies on for-in enumeration order

        it('is not fooled by sparse arrays; see issue #95', function () {
            var a = [];
            a[1] = 0;
            expect(_.allKeys(a)).toEqual(['1']);
        });


        it('is not fooled by sparse arrays with additional properties', function () {
            var a = [];
            a[1] = 0;
            a.a = a;
            expect(_.allKeys(a)).toEqual(['1', 'a']);
        });

        it('can handle negate value ', function () {
            _.each([null, void 0, 1, 'a', true, NaN, {}, [], new Number(5), new Date(0)], function (val) {
                expect(_.allKeys(val)).toEqual([]);
            });
        });


        // allKeys that may be missed if the implementation isn't careful
        it('matches non-enumerable properties', function () {
            var trouble = {
                constructor: Object,
                valueOf: _.noop,
                hasOwnProperty: null,
                toString: 5,
                toLocaleString: void 0,
                propertyIsEnumerable: /a/,
                isPrototypeOf: this
            };
            var troubleKeys = ['constructor', 'valueOf', 'hasOwnProperty', 'toString', 'toLocaleString', 'propertyIsEnumerable',
                'isPrototypeOf'].sort();
            expect(_.allKeys(trouble).sort()).toEqual(troubleKeys);
        });


        it('should include inherited keys', function () {
            function A() {
            }

            A.prototype.foo = 'foo';
            var b = new A();
            b.bar = 'bar';
            expect(_.allKeys(b).sort()).toEqual(['bar', 'foo']);
        });

        it('should get keys from constructor', function () {
            function y() {
            }

            y.x = 'z';
            expect(_.allKeys(y)).toEqual(['x']);
        });

    });


    var testElement = typeof document === 'object' ? document.createElement('div') : void 0;
    describe('isElement', function () {
        it('strings are not dom elements', function () {
            var result = _.isElement('div');
            expect(result).toBe(false);
        });

        it('an element is a DOM element', function () {
            var result = _.isElement(testElement);
            expect(result).toBe(true);
        });
    });

    describe('isArguments', function () {
        it('strings are not dom elements', function () {
            var result = _.isArguments('div');
            expect(result).toBe(false);
        });

        it('function arguments is true', function () {
            var result = _.isArguments(arguments);
            expect(result).toBe(true);
        });
    });

    describe('isString', function () {
        var obj = new String('I am a string object');

        it('an element is not a string', function () {
            var result = _.isString(testElement);
            expect(result).toBe(false);
        });

        it('but strings are', function () {
            var result = _.isString([1, 2, 3].join(', '));
            expect(result).toBe(true);
        });

        it('string literals are', function () {
            var result = _.isString('I am a string literal');
            expect(result).toBe(true);
        });

        it('so are String objects', function () {
            var result = _.isString(obj);
            expect(result).toBe(true);
        });

        it('number is not string ', function () {
            var result = _.isString(1);
            expect(result).toBe(false);
        });
    });

    describe('isFunction', function () {
        it("function can detect correct", function () {
            var result = _.isFunction(function () {
            });
            expect(result).toBe(true);
        });
        it("undefined is not function ", function () {
            var result = _.isFunction(void 0);
            expect(result).toBe(false);
        });
        it("array is not function ", function () {
            var result = _.isFunction([1, 2, 3]);
            expect(result).toBe(false);
        });
        it("string is not function ", function () {
            var result = _.isFunction('123');
            expect(result).toBe(false);
        });
    });


    describe('isNumber', function () {
        it("a string is not a number", function () {
            var result = _.isNumber('string');
            expect(result).toBe(false);
        });
        it("the arguments object is not a number", function () {
            var result = _.isNumber(arguments);
            expect(result).toBe(false);
        });
        it("undefined is not a number", function () {
            var result = _.isNumber(void 0);
            expect(result).toBe(false);
        });
        it("but numbers are ", function () {
            var result = _.isNumber(3 * 4 - 7 / 10);
            expect(result).toBe(true);
        });
        it("NaN *is* a number", function () {
            var result = _.isNumber(NaN);
            expect(result).toBe(true);
        });
        it("Infinity *is* a number", function () {
            var result = _.isNumber(Infinity);
            expect(result).toBe(true);
        });
        it("numeric strings are not numbers", function () {
            var result = _.isNumber('1');
            expect(result).toBe(false);
        })
    });

    describe('isDate', function () {
        it("string is not a date", function () {
            var result = _.isDate('1');
            expect(result).toBe(false);
        });
        it("date is not a date", function () {
            var result = _.isDate(new Date());
            expect(result).toBe(true);
        })
    });

    describe('isRegExp', function () {
        it("string is not a RegExp", function () {
            var result = _.isRegExp('1');
            expect(result).toBe(false);
        });
        it("RegExp is not a RegExp", function () {
            var result = _.isRegExp(/123/);
            expect(result).toBe(true);
        })
    });

    describe('isError', function () {
        it("string is not a Error", function () {
            var result = _.isError('1');
            expect(result).toBe(false);
        });
        it('Error is not a Error', function () {
            try {
                throw new TypeError("Example");
            } catch (o_O) {
                var result = _.isError(o_O);
                expect(result).toBe(true);
            }
        })
    });

    describe('isFinite', function () {

        it("Number is true", function () {
            var n = new Number(1);
            var result = _.isFinite(n);
            expect(result).toBe(true);
        });
        it("number is true", function () {
            var result = _.isFinite(-101);
            expect(result).toBe(true);
        });

        it('string is not Finite', function () {
            var result = _.isFinite(-Infinity);
            expect(result).toBe(false);
        });

        var value = [void 0, null, NaN, Infinity, -Infinity];
        var keys = ['undefined', 'null', 'NaN', 'Infinity', "-Infinity"]
        _.each(value, function (obj, i) {
            it(keys[i] + ' not Finite', function () {
                var result = _.isFinite(obj);
                expect(result).toBe(false);
            })
        });
    });


    describe('isNull', function () {
        it('undefined is not null', function () {
            var result = _.isNull(void 0);
            expect(result).toBe(false);
        });
        it('NaN is not null', function () {
            var result = _.isNull(NaN);
            expect(result).toBe(false);
        });
        it('but null is', function () {
            var result = _.isNull(null);
            expect(result).toBe(true);
        });
    });

    describe('isUndefined', function () {
        it('numbers are defined', function () {
            var result = _.isUndefined(1);
            expect(result).toBe(false);
        });
        it('null is defined', function () {
            var result = _.isUndefined(null);
            expect(result).toBe(false);
        });
        it('false is defined', function () {
            var result = _.isUndefined(false);
            expect(result).toBe(false);
        });
        it('NaN is defined', function () {
            var result = _.isUndefined(NaN);
            expect(result).toBe(false);
        });
        it('nothing is undefined', function () {
            var result = _.isUndefined();
            expect(result).toBe(true);
        });
        it('undefined is undefined', function () {
            var result = _.isUndefined(void 0);
            expect(result).toBe(true);
        });
    });
});