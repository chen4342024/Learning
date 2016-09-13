describe('utility', function () {

    describe('noConflict', function () {
        it('can correct releace underscore', function () {
            var old = _;
            var underscore = _.noConflict();
            expect(_).toEqual(void 0);
            expect(underscore).toBe(old);
            _ = underscore;
        });

    });

    describe('noop', function () {
        it('should always return undefined', function () {
            expect(_.noop('curly', 'larry', 'moe')).toBe(void 0);
        });
    });

    describe('identity', function () {
        it('should always return self', function () {
            expect(_.identity('curly')).toBe('curly');
        });
    });

    describe('constant', function () {
        it('should always return constant', function () {
            var a = _.constant("test");
            expect(a()).toBe('test');
        });
    });

    describe('times', function () {
        it('collects return values', function () {
            expect([0, 1, 2]).toEqual(_.times(3, function (i) {
                return i;
            }));
        });
        it('can handle 0 time ', function () {
            expect(_.times(0, _.identity)).toEqual([]);
        });

        it('can handle negate time ', function () {
            expect(_.times(-1, _.identity)).toEqual([]);
        });

    });


    describe('random', function () {
        var array = _.range(1000);
        var min = Math.pow(2, 31);
        var max = Math.pow(2, 62);

        it('should produce a random number greater than or equal to the minimum number', function () {
            var result = _.every(array, function () {
                return _.random(min, max) >= min;
            });
            expect(result).toBe(true);
        });

        it('should has random 5 or 0 one thousand times', function () {
            var result1 = _.some(array, function () {
                var randomNum = _.random(0, 5);
                return randomNum == 5;
            });
            var result2 = _.some(array, function () {
                var randomNum = _.random(0, 5);
                return randomNum == 0;
            });
            expect(result1 && result2).toBe(true);
        });

        it('should produce a random number when passed `Number.MAX_VALUE', function () {
            var result = _.some(array, function () {
                return _.random(Number.MAX_VALUE) > 0;
            });
            expect(result).toBe(true);
        });
    })
});