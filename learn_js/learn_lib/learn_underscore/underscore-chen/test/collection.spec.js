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