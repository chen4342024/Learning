describe('utility', function () {
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