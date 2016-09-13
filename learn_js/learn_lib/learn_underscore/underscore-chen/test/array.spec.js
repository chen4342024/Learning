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

    describe('flatten', function () {
        it('supports null', function () {
            expect(_.flatten(null)).toEqual([]);
        });
        it('supports undefined', function () {
            expect(_.flatten(void 0)).toEqual([]);
        });

        it('supports empty arrays', function () {
            expect(_.flatten([[], [[]], []])).toEqual([]);
        });

        it('can shallowly flatten empty arrays', function () {
            expect(_.flatten([[], [[]], []], true)).toEqual([[]]);
        });

        it('can flatten nested arrays', function () {
            var list = [1, [2], [3, [[[4]]]]];
            expect(_.flatten(list)).toEqual([1, 2, 3, 4]);
        });
        it('can flatten nested arrays', function () {
            var list = [1, [2], [3, [3.1], 3.2, [[[4, 5, 6]]]], [7]];
            expect(_.flatten(list)).toEqual([1, 2, 3, 3.1, 3.2, 4, 5, 6, 7]);
        });

        it('can shallowly flatten nested arrays', function () {
            var list = [1, [2], [3, [[[4]]]]];
            expect(_.flatten(list, true)).toEqual([1, 2, 3, [[[4]]]]);
        });
    });

    describe('without', function () {
        it('removes all instances of the given values', function () {
            var list = [1, 2, 1, 0, 3, 1, 4];
            expect(_.without(list, 0, 1)).toEqual([2, 3, 4]);
        });

        it('works on an arguments object', function () {
            var result = (function () {
                return _.without(arguments, 0, 1);
            }(1, 2, 1, 0, 3, 1, 4));
            expect(result).toEqual([2, 3, 4]);
        });

        it('compares objects by reference (value case)', function () {
            var list = [{one: 1}, {two: 2}];
            expect(_.without(list, {one: 1})).toEqual(list);
        });

        it('compares objects by reference (reference case)', function () {
            var list = [{one: 1}, {two: 2}];
            expect(_.without(list, list[0])).toEqual([{two: 2}]);
        });
    });

    describe('uniq', function () {
        it('can find uniq value of unsofted array', function () {
            expect(_.uniq([1, 3, 5, 9, 7, 4, 3, 1])).toEqual([1, 3, 5, 9, 7, 4]);
        });
        it('can find uniq value of softed array', function () {
            expect(_.uniq([1, 3, 5, 7, 7, 9, 9, 10], true)).toEqual([1, 3, 5, 7, 9, 10]);
        });
        it('can find uniq value has iteratee', function () {
            var result = _.uniq([1, 4, 6, 7, 7, 9, 9, 10], false, function (value) {
                return value % 2;
            });
            expect(result).toEqual([1, 4]);
        });
    });

    describe('union', function () {
        it('can find the union of a list of arrays', function () {
            var result = _.union([1, 2, 3], [2, 30, 1], [1, 40]);
            expect(result).toEqual([1, 2, 3, 30, 40]);
        });

        it('can find the union of a list of nested arrays', function () {
            var result = _.union([1, 2, 3], [2, 30, 1], [1, 40, [1]]);
            expect(result).toEqual([1, 2, 3, 30, 40, [1]]);
        });

        it('orders values by their first encounter', function () {
            var result = _.union([10, 20], [1, 30, 10], [0, 40]);
            expect(result).toEqual([10, 20, 1, 30, 0, 40]);
        });

        it('works on an arguments object', function () {
            var result = (function () {
                return _.union(arguments, [2, 30, 1], [1, 40]);
            }(1, 2, 3));
            expect(result).toEqual([1, 2, 3, 30, 40]);
        });

        it('restricts the union to arrays only', function () {
            var result = _.union([1, 2, 3], 4);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('intersection', function () {
        it('can intersection correct', function () {
            var stooges = ['moe', 'curly', 'larry'], leaders = ['moe', 'groucho'];
            expect(_.intersection(stooges, leaders)).toEqual(['moe']);
        });
        it('works on an arguments object', function () {
            var leaders = ['moe', 'groucho'];
            var result = (function () {
                return _.intersection(arguments, leaders);
            }('moe', 'curly', 'larry'));
            expect(result).toEqual(['moe']);
        });

        it('returns a duplicate-free array', function () {
            var theSixStooges = ['moe', 'moe', 'curly', 'curly', 'larry', 'larry'];
            var leaders = ['moe', 'groucho'];
            expect(_.intersection(theSixStooges, leaders)).toEqual(['moe']);
        });

        it('preserves the order of the first array', function () {
            var result = _.intersection([2, 4, 3, 1], [1, 2, 3]);
            expect(result).toEqual([2, 3, 1]);
        });

        it('returns an empty array when passed null as the first argument', function () {
            var result = _.intersection(null, [1, 2, 3]);
            expect(result).toEqual([]);
        });

        it('returns an empty array when passed null as an argument beyond the first', function () {
            var result = _.intersection([1, 2, 3], null);
            expect(result).toEqual([]);
        });
    });

    describe('difference', function () {
        it('can correct find difference', function () {
            var result = _.difference([1, 2, 3, 4, 5], [5, 2, 10]);
            expect(result).toEqual([1, 3, 4]);
        });

        it('can find the difference of three arrays', function () {
            var result = _.difference([1, 2, 3, 4], [2, 30, 40], [1, 11, 111]);
            expect(result).toEqual([3, 4]);
        });

        it('preserves the order of the first array', function () {
            var result = _.difference([8, 9, 3, 1], [3, 8]);
            expect(result).toEqual([9, 1]);
        });

        it('restrict the difference to arrays only', function () {
            var result = _.difference([1, 2, 3], 1);
            expect(result).toEqual([1, 2, 3]);
        });
    });

    describe('zip', function () {
        it('unzipped empty and null', function () {
            var empty = _.zip([]);
            expect(empty).toEqual([]);
            expect(_.zip(null)).toEqual([]);
            expect(_.zip()).toEqual([]);
        });

        it('zipped together arrays of different lengths', function () {
            var names = ['moe', 'larry', 'curly'], ages = [30, 40, 50], leaders = [true];
            var result = _.zip(names, ages, leaders);
            var expectResult = [
                ['moe', 30, true],
                ['larry', 40, void 0],
                ['curly', 50, void 0]
            ];
            expect(result).toEqual(expectResult);
        });

        it('zipped pairs', function () {
            var stooges = _.zip(['moe', 30, 'stooge 1'], ['larry', 40, 'stooge 2'], ['curly', 50, 'stooge 3']);
            var expectResult = [['moe', 'larry', 'curly'], [30, 40, 50], ['stooge 1', 'stooge 2', 'stooge 3']];
            expect(stooges).toEqual(expectResult);
        });
    });

    describe('unzip', function () {
        it('handles null', function () {
            expect(_.unzip(null)).toEqual([]);
        });

        it('correct unZip', function () {
            expect(_.unzip([['a', 'b'], [1, 2]])).toEqual([['a', 1], ['b', 2]]);
        });


        // complements zip
        it('can complements zip', function () {
            var zipped = _.zip(['fred', 'barney'], [30, 40], [true, false]);
            expect(_.unzip(zipped)).toEqual([['fred', 'barney'], [30, 40], [true, false]]);
        });

        it('Uses length of largest array', function () {
            var zipped = _.zip(['moe', 30], ['larry', 40], ['curly', 50, 'extra data']);
            expect(_.unzip(zipped)).toEqual([['moe', 30, void 0], ['larry', 40, void 0], ['curly', 50, 'extra data']]);
        });

    });

    describe('object', function () {
        it('can correct object', function () {
            expect(_.object(['moe', 'larry', 'curly'], [30, 40, 50])).toEqual({moe: 30, larry: 40, curly: 50});
        });

        it('can correct object', function () {
            expect(_.object([['moe', 30], ['larry', 40], ['curly', 50]])).toEqual({moe: 30, larry: 40, curly: 50});
        });

        it('handles nulls', function () {
            expect(_.object(null)).toEqual({});
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