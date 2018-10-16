/**
 * post 数据
 */
function post(url, data, options) {
    return request(url, {
        method: "POST",
        body: JSON.stringify(data),
        ...options,
    });
}

/**
 * get 数据
 */
function get(url, params, options) {
    const searchStr = obj2String(params);
    url = url + '?' + searchStr;
    return request(url, {
        method: "GET",
        ...options,
    });
}

/**
 * 将对象转成 a=1&b=2的形式
 * @param obj 对象
 */
function obj2String(obj) {
    let params = '';
    for (let item in obj) {
        params = params + `&${item}=${obj[item]}`;
    }
    return params;
}

function request(url, options) {
    return fetch(url, {
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
        },
        ...options
    }).then(response => response.json());
}

export default {
    get,
    post,
    request,
    obj2String
}
