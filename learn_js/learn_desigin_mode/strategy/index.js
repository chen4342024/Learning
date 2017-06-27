// 函数比较大，代码中包含了很多if语句；
// 函数缺乏弹性，如果增加了一种新的效验规则，或者想把密码的长度效验从6改成8，我们必须改registerForm.onsubmit 函数内部的代码。违反了开放-封闭原则。
function onSubmit() {
    if (registerForm.userName.value === '') {
        alert('用户名不能为空');
        return;
    }

    if (registerForm.password.value === '') {
        alert('密码不能为空');
        return;
    }

    if (registerForm.password.value.length < 6) {
        alert("密码的长度不能小于6位");
        return;
    }
    if (!/(^1[3|5|8][0-9]{9}$)/.test(registerForm.phoneNumber.value)) {
        alert("手机号码格式不正确");
        return;
    }
}


var strategy = {
    isNotEmpty: function (value, errorMsg) {
        if (value === '') {
            return errorMsg;
        }
    },
    // 限制最小长度
    minLength: function (value, length, errorMsg) {
        if (value.length < length) {
            return errorMsg;
        }
    },
    // 手机号码格式
    mobileFormat: function (value, errorMsg) {
        if (!/(^1[3|5|8][0-9]{9}$)/.test(value)) {
            return errorMsg;
        }
    }
};

var Validator = function () {
    this.cache = []; // 保存效验规则
};

Validator.prototype.add = function (dom, rule, errorMsg) {
    var str = rule.split(":");
    this.cache.push(function () {
        // str 返回的是 minLength:6 
        var strategy = str.shift();
        str.unshift(dom.value); // 把input的value添加进参数列表
        str.push(errorMsg); // 把errorMsg添加进参数列表
        return strategys[strategy].apply(dom, str);
    });
};

Validator.prototype.valid = function () {
    for (var i = 0, validatorFunc; validatorFunc = this.cache[i++];) {
        var msg = validatorFunc(); // 开始效验 并取得效验后的返回信息
        if (msg) {
            return msg;
        }
    }
};

function onsubmits() {
    var validator = new Validator(); // 创建一个Validator对象
    /* 添加一些效验规则 */
    validator.add(registerForm.userName, 'isNotEmpty', '用户名不能为空');
    validator.add(registerForm.password, 'minLength:6', '密码长度不能小于6位');
    validator.add(registerForm.userName, 'mobileFormat', '手机号码格式不正确');

    var errorMsg = validator.valid(); // 获得效验结果

    if (errorMsg) {
        alert(errorMsg);
        return false;
    }
}


var obj = {
    child,
    c: 2
}

var child = {
    a: 1,
    b: 1,
}


// 策略模式指的是 定义一系列的算法，把它们一个个封装起来，将不变的部分和变化的部分隔开，实际就是将算法的使用和实现分离出来；算法的使用方式是不变的，都是根据某个算法取得计算后的奖金数，而算法的实现是根据绩效对应不同的绩效规则；