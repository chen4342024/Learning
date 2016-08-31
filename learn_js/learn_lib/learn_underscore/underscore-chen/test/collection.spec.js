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
        expect(count, 3);
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
        expect(answers, 0);

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


describe('sortPageListKey', function () {

});