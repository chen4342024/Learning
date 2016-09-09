describe('Collection ', function () {


    describe('each', function () {

        it('each iterators provide value and iteration count', function () {
            _.each([1, 2, 3], function (num, i) {
                expect(num).toEqual(i + 1);
            });
        });

        it('context object property accessed', function () {
            var answers = [];
            _.each([1, 2, 3], function (num) {
                answers.push(num * this.multiplier);
            }, {multiplier: 5});
            expect(answers).toEqual([5, 10, 15]);
        });

        it('can iterate a simple array', function () {
            var answers = [];
            _.each([1, 2, 3], function (num) {
                answers.push(num);
            });
            expect(answers).toEqual([1, 2, 3]);
        });

        it('iterating over objects works, and ignores the object prototype.', function () {
            var answers = ['one'];
            var obj = {one: 1, two: 2, three: 3};
            obj.constructor.prototype.four = 4;
            _.each(obj, function (value, key) {
                answers.push(key);
            });
            delete obj.constructor.prototype.four;
            expect(['one', 'two', 'three']).toEqual(['one', 'two', 'three']);
        });

        //// ensure the each function is JITed
        it('the fun should be called only 3 times', function () {
            //_(1000).times(function () {
            //    _.each([], function () {
            //    });
            //});
            var count = 0;
            obj = {1: 'foo', 2: 'bar', 3: 'baz'};
            _.each(obj, function () {
                count++;
            });
            expect(count).toBe(3);
        });

        it("can reference the original collection from inside the iterator", function () {
            var answer = null;
            _.each([1, 2, 3], function (num, index, arr) {
                if (arr.indexOf(num)) {
                    answer = true;
                }
            });
            expect(answer).toBe(true);
        });

        it('handles a null properly', function () {
            var answers = 0;
            _.each(null, function () {
                ++answers;
            });
            expect(answers).toBe(0);

            _.each(false, function () {
            });
            var a = [1, 2, 3];

            var result = _.each(a, function () {
            });
            expect(result).toEqual(a);

            var nullResult = _.each(null, function () {
            });
            expect(nullResult).toEqual(null);
        });

    });


    describe('map', function () {
        it('double number', function () {
            var doubleArray = _.map([1, 2, 3], function (num) {
                return num * 2;
            });
            expect(doubleArray).toEqual([2, 4, 6]);
        });

        it('can handle null', function () {
            var nullArr = _.map(null, function (num) {
                return num * 2;
            });
            expect(nullArr).toEqual([]);
        });

        it('tripled numbers with context', function () {
            var tripled = _.map([1, 2, 3], function (num) {
                return num * this.multiplier;
            }, {multiplier: 3});
            expect(tripled).toEqual([3, 6, 9]);
        });

        it('Can use collection methods on Array-likes.', function () {
            var ids = _.map({length: 2, 0: {id: '1'}, 1: {id: '2'}}, function (n) {
                return n.id;
            });
            expect(ids).toEqual(['1', '2']);
        })
    });


    describe("reduce", function () {
        it('can sum up an array', function () {
            var sum = _.reduce([1, 2, 3, 4], function (memo, num) {
                return memo + num;
            }, 0);
            expect(sum).toBe(10);
        });

        it('can reduce with a context object', function () {
            var context = {multiplier: 3};
            var sum = _.reduce([1, 2, 3], function (memo, num) {
                return memo + num * this.multiplier;
            }, 0, context);
            expect(sum).toBe(18);
        });

        it('default initial value', function () {
            var sum = _.reduce([1, 2, 3], function (memo, num) {
                return memo + num;
            });
            expect(sum).toBe(6);
        });
    });

    describe("reduceRight", function () {
        it('can perform right folds', function () {
            var strSum = _.reduceRight(['1', '2', '3', '4'], function (memo, str) {
                return memo + str;
            });
            expect(strSum).toBe('4321');
        });

        it('can reduce with a context object', function () {
            var context = {multiplier: 3};
            var sum = _.reduceRight([1, 2, 3], function (memo, num) {
                return memo + num * this.multiplier;
            }, 0, context);
            expect(sum).toBe(18);
        });

        it('default initial value', function () {
            var sum = _.reduceRight([1, 2, 3], function (memo, num) {
                return memo.concat(num);
            }, []);
            expect(sum).toEqual([3, 2, 1]);
        });

        it('can handle null value', function () {
            var result = _.reduceRight(null, _.noop, 138);
            expect(result).toBe(138);
        });

        it('undefined can be passed as a special case', function () {
            var result = _.reduceRight([], _.noop, void 0);
            expect(result).toBe(void 0);
        });
    });

    describe("find", function () {
        it('can correct find ', function () {
            var three = _.find([1, 2, 3, 4, 5, 6], function (num) {
                return num == 3;
            });
            expect(three).toBe(3);
        });

        it('should return undefined if not found', function () {
            var result = _.find([1, 2, 3, 4, 5, 6], function (num) {
                return false;
            });
            expect(result).toBe(void 0);
        });

        it('can handle null ', function () {
            var result = _.find(null, function (num) {
                return num == 3;
            });
            expect(result).toBe(void 0);
        });

        it('can find obj ', function () {
            var list = [{a: 1, b: 2}, {a: 2, b: 2}, {a: 1, b: 3}, {a: 1, b: 4}, {a: 2, b: 4}];
            var result = _.find(list, {a: 1});
            expect(result).toEqual({a: 1, b: 2});
        });
    });


    describe("filter", function () {
        it('can handle array', function () {
            var result = _.filter([1, 2, 3, 4, 5, 6], function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([2, 4, 6]);
        });
        it('can handle object', function () {
            var obj = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6};
            var result = _.filter(obj, function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([2, 4, 6]);
        });
        it('can handle null', function () {
            var result = _.filter(null, function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([]);
        });

        it('can handle with context', function () {
            var result = _.filter([1, 2, 3, 4, 5, 6], function (num) {
                return num > this.middle;
            }, {middle: 2});
            expect(result).toEqual([3, 4, 5, 6]);
        })
    });

    describe("where", function () {
        it('can handle obj', function () {
            var listOfPlays = [
                {title: "Cymbeline", author: "Shakespeare", year: 1611},
                {title: "Cymbeline", author: "Shakespeare", year: 1612},
                {title: "The Tempest", author: "Shakespeare", year: 1611}
            ];
            var result = _.where(listOfPlays, {author: "Shakespeare", year: 1611});
            expect(result).toEqual([
                {title: "Cymbeline", author: "Shakespeare", year: 1611},
                {title: "The Tempest", author: "Shakespeare", year: 1611}
            ]);
        });
    });

    describe("findWhere", function () {
        it('can handle obj', function () {
            var listOfPlays = [
                {title: "Cymbeline", author: "Shakespeare", year: 1611},
                {title: "Cymbeline", author: "Shakespeare", year: 1612},
                {title: "The Tempest", author: "Shakespeare", year: 1611}
            ];
            var result = _.findWhere(listOfPlays, {author: "Shakespeare", year: 1611});
            expect(result).toEqual(
                {title: "Cymbeline", author: "Shakespeare", year: 1611}
            );
        });

        it('can handle null', function () {
            var result = _.findWhere(null, {author: "Shakespeare", year: 1611});
            expect(result).toEqual(void 0);
        });
    });


    describe("reject", function () {
        it('can handle array', function () {
            var result = _.reject([1, 2, 3, 4, 5, 6], function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([1, 3, 5]);
        });
        it('can handle object', function () {
            var obj = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6};
            var result = _.reject(obj, function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([1, 3, 5]);
        });
        it('can handle null', function () {
            var result = _.reject(null, function (num) {
                return num % 2 == 0;
            });
            expect(result).toEqual([]);
        });

        it('can handle with context', function () {
            var result = _.reject([1, 2, 3, 4, 5, 6], function (num) {
                return num > this.middle;
            }, {middle: 2});
            expect(result).toEqual([1, 2]);
        })
    });

    describe("every", function () {
        it('can handle array', function () {
            var result = _.every([true, 1, null, 'yes'], _.identity);
            expect(result).toBe(false);
        });
        it('can handle object', function () {
            var obj = {two: 2, four: 4, six: 6};
            var result = _.every(obj, function (num) {
                return num % 2 == 0;
            });
            expect(result).toBe(true);
        });
        it('can handle null', function () {
            var result = _.every(null, function (num) {
                return num % 2 == 0;
            });
            expect(result).toBe(true);
        });

        it('can handle with context', function () {
            var result = _.every([3, 4, 5, 6], function (num) {
                return num > this.middle;
            }, {middle: 2});
            expect(result).toBe(true);
        })
    });


    describe("some", function () {
        it('can handle array', function () {
            var result = _.some([true, 1, null, 'yes'], _.identity);
            expect(result).toBe(true);
        });
        it('can handle object', function () {
            var obj = {two: 2, four: 4, six: 6};
            var result = _.some(obj, function (num) {
                return num % 2 == 0;
            });
            expect(result).toBe(true);
        });
        it('can handle null', function () {
            var result = _.some(null, function (num) {
                return num % 2 == 0;
            });
            expect(result).toBe(false);
        });

        it('can handle with context', function () {
            var result = _.some([3, 4, 5, 6], function (num) {
                return num < this.middle;
            }, {middle: 2});
            expect(result).toBe(false);
        })
    });


    describe("contains", function () {
        it('can handle array', function () {
            var result = _.contains([1, 2, 3, 4, 5], 3);
            expect(result).toBe(true);
        });
        //obj的时候，是对比value
        it('can handle object', function () {
            var obj = {two: 2, four: 4, six: 6};
            var result = _.contains(obj, 4);
            expect(result).toBe(true);
        });
        it('can handle null', function () {
            var result = _.contains(null, 1);
            expect(result).toBe(false);
        });

        it('can handle with fromIndex', function () {
            var result1 = _.contains([1, 2, 3, 4, 5], 3, 3);
            var result2 = _.contains([1, 2, 3, 4, 5], 3, 2);
            expect(result1).toBe(false);
            expect(result2).toBe(true);
        })

    });

    describe('invoke', function () {
        it('can correct handle', function () {
            var result = _.invoke([[5, 1, 7], [3, 2, 1]], 'sort');
            expect(result).toEqual([[1, 5, 7], [1, 2, 3]]);
        });

        it('called with arguments', function () {
            _.invoke([{
                method: function () {
                    expect(_.toArray(arguments)).toEqual([1, 2, 3]);
                }
            }], 'method', 1, 2, 3);
        });

        it('handles null & undefined', function () {
            expect(_.invoke([{a: null}, {}, {a: _.constant(1)}], 'a')).toEqual([null, void 0, 1], '');
        });

    });

    describe('pluck', function () {
        var people = [{name: 'moe', age: 30}, {name: 'curly', age: 50}];
        it('can correct handle', function () {
            var result = _.pluck(people, 'name');
            expect(result).toEqual(['moe', 'curly']);
        });

        it('return undefined if key not exist', function () {
            var result = _.pluck(people, 'address');
            expect(result).toEqual([void 0, void 0]);
        });

        it('handles null & undefined', function () {
            expect(_.invoke([{a: null}, {}, {a: _.constant(1)}], 'a')).toEqual([null, void 0, 1], '');
        });
    });

    describe('max', function () {
        it('can return max value', function () {
            var result = _.max([1, 2, 3, 4, 5]);
            expect(result).toBe(5);
        });

        it('can return max value with context', function () {
            var result = _.max([1, 2, 3, 4, 5], function (num) {
                return num * this.key;
            }, {key: -1});
            expect(result).toBe(1);
        });

        it('can return max value by iteratee', function () {
            var peoples = [
                {name: 'chen1', age: 25},
                {name: 'chen2', age: 26},
                {name: 'chen3', age: 27}
            ];
            var result = _.max(peoples, function (people) {
                return people.age;
            });
            expect(result).toEqual({name: 'chen3', age: 27});
        });

        it('return infinity if list is null', function () {
            var result = _.max(null);
            expect(result).toEqual(-Infinity);
        });

        it('String keys use property iterator', function () {
            var result = _.max([{a: 1}, {a: 0, b: 3}, {a: 4}, {a: 2}], 'a');
            expect(result).toEqual({a: 4});
        });
        it('Finds correct max in array starting with num and containing a false', function () {
            var result = _.max([1, 2, 3, false]);
            expect(result).toBe(3);
        });

        it('Finds correct max in array starting with a false', function () {
            var result = _.max([false, 1, 2, 3]);
            expect(result).toBe(3);
        });

        it('Maximum value of a non-numeric collection', function () {
            expect(_.max({a: 'a'})).toBe(-Infinity);
        })
    });

    describe('min', function () {
        it('can return min value', function () {
            var result = _.min([1, 2, 3, 4, 5]);
            expect(result).toBe(1);
        });

        it('can return min value with context', function () {
            var result = _.min([1, 2, 3, 4, 5], function (num) {
                return num * this.key;
            }, {key: -1});
            expect(result).toBe(5);
        });

        it('can return min value by iteratee', function () {
            var peoples = [
                {name: 'chen1', age: 25},
                {name: 'chen2', age: 26},
                {name: 'chen3', age: 27}
            ];
            var result = _.min(peoples, function (people) {
                return people.age;
            });
            expect(result).toEqual({name: 'chen1', age: 25});
        });

        it('return infinity if list is null', function () {
            var result = _.min(null);
            expect(result).toEqual(Infinity);
        });

        it('String keys use property iterator', function () {
            var result = _.min([{a: 1}, {a: 0, b: 3}, {a: 4}, {a: 2}], 'a');
            expect(result).toEqual({a: 0, b: 3});
        });
        it('Finds correct min in array starting with num and containing a null', function () {
            var result = _.min([1, 2, 3, null]);
            expect(result).toBe(1);
        });

        it('Finds correct min in array starting with a null', function () {
            var result = _.min([null, 1, 2, 3]);
            expect(result).toBe(1);
        });

        it('Maximum value of a non-numeric collection', function () {
            expect(_.min({a: 'a'})).toBe(Infinity);
        })

    });


    describe('sortBy', function () {

        it('stooges sorted by age', function () {
            var people = [{name: 'curly', age: 50}, {name: 'moe', age: 30}];
            people = _.sortBy(people, function (person) {
                return person.age;
            });
            expect(_.pluck(people, 'name')).toEqual(['moe', 'curly']);
        });

        it('sortBy with undefined values', function () {
            var list = [void 0, 4, 1, void 0, 3, 2];
            expect(_.sortBy(list, _.identity)).toEqual([1, 2, 3, 4, void 0, void 0]);
        });

        it('sorted by length', function () {
            var list = ['one', 'two', 'three', 'four', 'five'];
            var sorted = _.sortBy(list, 'length');
            expect(sorted).toEqual(['one', 'two', 'four', 'five', 'three']);
        });

        function Pair(x, y) {
            this.x = x;
            this.y = y;
        }

        var stableArray = [
            new Pair(1, 1), new Pair(1, 2),
            new Pair(2, 1), new Pair(2, 2),
            new Pair(2, 3), new Pair(2, 4),
            new Pair(void 0, 1), new Pair(void 0, 2),
            new Pair(void 0, 5), new Pair(void 0, 6)
        ];

        var actual = _.sortBy(stableArray, function (pair) {
            return pair.x;
        });

        it('sortBy should be stable for arrays', function () {
            expect(actual).toEqual(stableArray);
        });

    });

    describe('groupBy', function () {
        it('can group correct by iteratee', function () {
            var result = _.groupBy([1.3, 2.1, 2.4], function (num) {
                return Math.floor(num);
            });
            expect(result).toEqual({1: [1.3], 2: [2.1, 2.4]});
        });

        it('can group correct by key', function () {
            var result = _.groupBy(['one', 'two', 'three'], 'length');
            expect(result).toEqual({3: ["one", "two"], 5: ["three"]});

            var matrix = [
                [1, 2],
                [1, 3],
                [2, 3]
            ];
            expect(_.groupBy(matrix, 0)).toEqual({1: [[1, 2], [1, 3]], 2: [[2, 3]]});
            expect(_.groupBy(matrix, 1)).toEqual({2: [[1, 2]], 3: [[1, 3], [2, 3]]});
        });
    });
    describe('indexBy', function () {
        it('can correct handle ', function () {
            var parity = _.indexBy([1, 2, 3, 4, 5], function (num) {
                return num % 2 === 0;
            });
            expect(parity['true']).toEqual(4);
            expect(parity['false']).toEqual(5);
        });

        it('can just retain one value', function () {
            var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            var grouped = _.indexBy(list, 'length');
            expect(grouped['3']).toEqual('ten');
            expect(grouped['4']).toEqual('nine');
            expect(grouped['5']).toEqual('eight');
        });

        it('can handle without iteratee', function () {
            var array = [1, 2, 1, 2, 3];
            grouped = _.indexBy(array);
            expect(grouped['1']).toEqual(1);
            expect(grouped['2']).toEqual(2);
            expect(grouped['3']).toEqual(3);
        });
    });

    describe('countBy', function () {
        it('can correct handle ', function () {
            var parity = _.countBy([1, 2, 3, 4, 5], function (num) {
                return num % 2 === 0;
            });
            expect(parity['true']).toBe(2);
            expect(parity['false']).toBe(3);
        });

        it('can just retain one value', function () {
            var list = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten'];
            var grouped = _.countBy(list, 'length');
            expect(grouped['3']).toBe(4);
            expect(grouped['4']).toBe(3);
            expect(grouped['5']).toBe(3);
        });

        it('can handle without iteratee', function () {
            var array = [1, 2, 1, 2, 3];
            grouped = _.countBy(array);
            expect(grouped['1']).toBe(2);
            expect(grouped['2']).toBe(2);
            expect(grouped['3']).toBe(1);
        });
    });

    describe('partition', function () {
        it('can correct handle ', function () {
            var result = _.partition([0, 1, 2, 3, 4, 5], function (num) {
                return num % 2 === 0;
            });
            expect(result).toEqual([[0, 2, 4], [1, 3, 5]]);
        });
        it('can handle without iteratee', function () {
            var result = _.partition([0, 1, 2, 3, 4, 5]);
            expect(result).toEqual([[1, 2, 3, 4, 5], [0]]);
        });
    });

    describe('size', function () {
        it('can compute the size of an object', function () {
            expect(_.size({one: 1, two: 2, three: 3})).toBe(3);
        });
        it('can compute the size of an array', function () {
            expect(_.size([1, 2, 3])).toBe(3);
        });
        it('can compute the size of Array-likes', function () {
            expect(_.size({length: 3, 0: 0, 1: 0, 2: 0})).toBe(3);
        });
        it('can compute the size of a string literal', function () {
            expect(_.size('hello')).toBe(5);
        });
        it('can compute the size of string object', function () {
            expect(_.size(new String('hello'))).toBe(5);
        });
        it('handles nulls', function () {
            expect(_.size(null)).toBe(0);
        });
        it('handles numbers', function () {
            expect(_.size(0)).toBe(0);
        });
    })
});


