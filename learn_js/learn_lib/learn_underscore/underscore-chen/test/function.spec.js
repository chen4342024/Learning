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
        })
    })
});