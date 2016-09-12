describe('Array Function ', function () {
    describe('first', function () {
        it('return first element when n is null', function () {
            expect(_.first([5, 4, 3, 2, 1])).toBe(5);
        });
        it('return correct element', function () {
            expect(_.first([5, 4, 3, 2, 1], 3)).toEqual([5, 4, 3]);
        });
        it('return [] when n is 0', function () {
            expect(_.first([5, 4, 3, 2, 1], 0)).toEqual([]);
        });
        it('return [] when n is negative', function () {
            expect(_.first([5, 4, 3, 2, 1], -1)).toEqual([]);
        });
        it('return whole value when n > array.length', function () {
            expect(_.first([5, 4, 3, 2, 1], 20)).toEqual([5, 4, 3, 2, 1]);
        });
    });

    describe('initial', function () {
        it('returns all but the last element', function () {
            expect(_.initial([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
        });
        it('returns all but the last n elements', function () {
            expect(_.initial([1, 2, 3, 4], 2)).toEqual([1, 2]);
        });
        it('returns an empty array when n > length', function () {
            expect(_.initial([1, 2, 3, 4], 6)).toEqual([]);
        });

        it('works on an arguments object', function () {
            var result = (function () {
                return _.initial(arguments);
            }(1, 2, 3, 4));
            expect(result).toEqual([1, 2, 3]);
        });
        it('works well with _.map', function () {
            var result = _.map([[1, 2, 3], [1, 2, 3]], _.initial);
            expect(result).toEqual([[1, 2], [1, 2]]);
        })
    });


    describe('compact', function () {
        it('removes all false values', function () {
            expect(_.compact([1, false, null, 0, '', void 0, NaN, 2])).toEqual([1, 2]);
        });
        it('can works well with _.map', function () {
            var result = _.map([[1, false, false], [false, false, 3]], _.compact);
            expect(result).toEqual([[1], [3]]);
        });
    });


    describe('range', function () {
        it('can correct generate new Array', function () {
            expect(_.range(4)).toEqual([0, 1, 2, 3]);
        });
        it('can correct generate with stop', function () {
            expect(_.range(4, 8)).toEqual([4, 5, 6, 7]);
        });
        it('can correct generate with negative', function () {
            expect(_.range(-3, 3)).toEqual([-3, -2, -1, 0, 1, 2]);
        });
        it('can correct generate with step', function () {
            expect(_.range(2, 10, 2)).toEqual([2, 4, 6, 8]);
        });
        it('can correct generate with negative step', function () {
            expect(_.range(10, 2, -2)).toEqual([10, 8, 6, 4]);
        });
    });
});