// ------------------------------------------
// 求非负整数
console.log("求非负整数------------------------------------------");
function isNonnegativeInteger(str) {
    let reg = /^\d+$/;
    return reg.test(str);
}

console.log(isNonnegativeInteger(-1));
console.log(isNonnegativeInteger(1));
console.log(isNonnegativeInteger("a1"));
console.log(isNonnegativeInteger("1.1"));

// 匹配正整数
console.log("匹配正整数------------------------------------------");
function isPositiveInteger(str) {
    let reg = /^[1-9]\d*$/;
    return reg.test(str);
}

console.log(isPositiveInteger(-1));
console.log(isPositiveInteger(1));
console.log(isPositiveInteger("a1"));
console.log(isPositiveInteger("1.1"));

// 非正整数
console.log("匹配非正整数------------------------------------------");
function isNonPositiveInteger(str) {
    let reg = /^(-[1-9]\d*|0)$/;
    // let reg = /^(-\d+|0+)$/;
    return reg.test(str);
}

console.log(isNonPositiveInteger(-1));
console.log(isNonPositiveInteger(0));
console.log(isNonPositiveInteger(1));
console.log(isNonPositiveInteger(-01));

// 非负浮点数
console.log("匹配非负浮点数------------------------------------------");
function isNonnegativeFloat(str) {
    let reg = /^\d+(\.\d+)?$/;
    return reg.test(str);
}
console.log(isNonnegativeFloat(-1.2));
console.log(isNonnegativeFloat(0));
console.log(isNonnegativeFloat(0.1));
console.log(isNonnegativeFloat(-01));

// 由数字、26个英文字母组成的字符串
console.log("由数字、26个英文字母组成的字符串------------------------------------------");
function isNumberAndLetter(str) {
    let reg = /^[A-Za-z0-9]+$/;
    return reg.test(str);
}
console.log(isNumberAndLetter("abcAbc0123"));
console.log(isNumberAndLetter("abcAbc0123."));
console.log(isNumberAndLetter("-"));

// ----------------------------
console.log("长度为8-10的用户密码 ------------------------------------------");
// 长度为8-10的用户密码
function checkPassword(str) {
    let reg = /^[A-Za-z0-9._]{8,10}$/;
    return reg.test(str);
}
console.log(checkPassword("1234567890"));
console.log(checkPassword("abcd123."));
console.log(checkPassword("abcd123.123"));

// 校验是否中文名称组成
console.log("校验是否中文名称组成 ------------------------------------------");
function checkChinese(str) {
    let reg = /^.*[\u4e00-\u9fa5]+.*$/;
    return reg.test(str);
}
console.log(checkChinese("中文"));
console.log(checkChinese("中文1"));
console.log(checkChinese("1中2文1"));
console.log(checkChinese("abd"));

// 校验邮件地址是否合法
console.log("校验邮件地址是否合法 ------------------------------------------");
function checkEmail(str) {
    let reg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return reg.test(str);
}

console.log(checkEmail("abc@qq.com"));
console.log(checkEmail("abc@qqcom"));
console.log(checkEmail("abcqq.com"));
console.log(checkEmail("abcqq@.com"));
console.log(checkEmail("ab.cqq@qq.com"));

// URL地址验证
console.log("URL地址验证 ------------------------------------------");
function checkUrl(str) {
    let reg = /^https?:\/\/.+[^.]$/;
    return reg.test(str);
}
console.log(checkUrl("http://www.baidu.com"));
console.log(checkUrl("https://www.baidu.com"));
console.log(checkUrl("https://.c?a=1.1"));
console.log(checkUrl("htttps://www.baidu.com"));

// 电话号码的验证

// 是否带有小数

// 简单的身份证号验证

// ----------------------------------------
// 提取并捕获html标签内容