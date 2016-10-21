describe('Functions Function ', function () {
    describe('bind', function () {
        var context = {name: 'moe'};
        var func = function (arg1, arg2) {
            return 'name:' + (this.name || '') + (arg1 || '') + (arg2 || '');
        };
        it('can handler correct', function () {
            var bindFunc = _.bind(func, context);
            expect(bindFunc()).toEqual('name:moe');
        });
        it('can handler null', function () {
            var bindFunc = _.bind(func, null);
            expect(bindFunc()).toEqual('name:');
        });
        it('can handler arguments', function () {
            var bindFunc = _.bind(func, context, '1', '2');
            expect(bindFunc()).toEqual('name:moe12');
        });

        it('the function was partially applied in advance', function () {
            var func = function (salutation, name) {
                return salutation + ': ' + name;
            };
            func = _.bind(func, this, 'hello');
            expect(func('moe')).toEqual('hello: moe');
        });

        describe('deal with new operater', function () {
            var F = function () {
                return this;
            };
            var boundf = _.bind(F, {hello: 'moe curly'});
            var Boundf = boundf; // make eslint happy.
            var newBoundf = new Boundf();
            it('function should not be bound to the context, to comply with ECMAScript 5', function () {
                expect(newBoundf.hello).toEqual(void 0);
            });
            it('a bound instance is an instance of the original function', function () {
                expect(newBoundf instanceof F).toBe(true);
            });
            it("When called without the new operator, it's OK to be bound to the context", function () {
                expect(boundf().hello).toEqual('moe curly');
            });
        });

    });

    describe('bindAll', function () {
        it('bindAll functions correct', function () {
            var curly = {name: 'curly'};
            var moe = {
                name: 'moe',
                getName: function () {
                    return 'name: ' + this.name;
                },
                sayHi: function () {
                    return 'hi: ' + this.name;
                }
            };
            _.bindAll(moe, 'getName', 'sayHi');
            curly.getName = moe.getName;
            expect(curly.getName()).toEqual("name: moe");
        });

        it('bindAll functions must provide methodNames', function () {
            var curly = {name: 'curly'};
            expect(function () {
                _.bindAll(curly);
            }).toThrowError(Error);
        });
    });

    describe('partial', function () {
        var func = function () {
            return _.toArray(arguments).join(' ');
        };
        it('can partial correct', function () {
            var func1 = _.partial(func, 'a', 'b');
            expected(func1()).toEqual('ab');
        });
        it('can partial correct with placeholder', function () {
            var func1 = _.partial(func, 'a', _, _, 'd');
            expected(func1('b','c')).toEqual('abcd');
        });
        it('accepts more arguments than the number of placeholders', function () {
            var func1 = _.partial(func, 'a', _, _, 'd');
            expected(func1('b','c','e')).toEqual('abcde');
        });
        it('accepts fewer arguments than the number of placeholders and unfilled value is undefined', function () {
            var func1 = _.partial(func, 'a', _, _, 'd');
            expected(func1('b')).toEqual('abundefinedd');
        });
    })
});