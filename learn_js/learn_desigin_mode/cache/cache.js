var Page = function () {
    var page = 1,
        cache = {},
        data;
    return function (page) {
        if (cache[page]) {
            data = cache[page];
            render(data);
        } else {
            getData(function (data) {
                cache[page] = data;
                render(data);
            })
        }
    }
}()


