import $ from  'jquery'
import style from './style.scss'
import "babel-polyfill"

import generator from './generator';

function bindClick(className, func) {
  $("body").on("click", `.${className}`, func);
}


bindClick("J-test-var", ()=> {
  testLetBefore();
});

// let 块级作用域
function testLetBefore() {
  var a = [];
  for (var i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[6]();
}


bindClick("J-test-let", ()=> {
  testLetAfter();
});
function testLetAfter() {
  var a = [];
  for (let i = 0; i < 10; i++) {
    a[i] = function () {
      console.log(i);
    };
  }
  a[6]();
}

//暂时性死区，不存在变量提升,需用es6直接在浏览器上测试
// bindClick("J-test-let2", ()=> {
//   testLet2();
// });
function testLet2() {
  console.log(a);
  let a = 0;
}
testLet2();

//不可重复声明
// function testLet3() {
//   let a = 0;
//   let a = 10;
// }

//引用类型的变量指向的内存地址不能改动
// function testConst() {
//   const a = 1;
//   const b = {c: 1};
//   b.c = 2;//可以修改
//   console.log(b.c);
//   a = 3; //报错
// }

//默认参数
bindClick("J-test4", ()=> {
  test4();
});

function test4(x = 1, y = 2) {
  console.log(`${x}  ${y}`);
}

function test4_1(x, y) {
  if (typeof x === 'undefined') {
    x = 1;
  }
  console.log(x + y);
}

bindClick("J-test4-2", ()=> {
  test4_2({});
});
//和解构一起用,用于参数为对象的情况下，方便赋值
function test4_2({x = 1, y = 2}) {
  console.log(`${x}  ${y}`);
}

function test4_2_2(option) {
  let {x, y} = option;
  console.log(`${x}  ${y}`);
}

//强制某参数必填
bindClick("J-test4-3", ()=> {
  test4_3();
});

function throwIfMissing() {
  throw new Error('Missing parameter');
}

function test4_3(mustBeProvided = throwIfMissing()) {
  return mustBeProvided;
}


// ...运算符
//不定参数
bindClick("J-test5", ()=> {
  test5(2, 3, 4);
});

function test5(...values) {
  let sum = 0;
  for (var val of values) {
    sum += val;
  }
  console.log(sum);
}


//...拼接数组
bindClick("J-test5-1", ()=> {
  test5_1(...[1, 2]);
});

function test5_1(x, y) {
  console.log(`${x}  ${y}`);
}

//求最大值
bindClick("J-test5-2", ()=> {
  test5_2();
});


function test5_2() {
  console.log(Math.max(1, 2, 3, 4));
  console.log(Math.max(...[1, 2, 3, 4]));
}

//合并两个数组
bindClick("J-test5-3", ()=> {
  test5_3();
});
function test5_3() {
  let more = [3, 4];
  console.log([1, 2, ...more]);
}

//解构对象时使用...
bindClick("J-test5-4", ()=> {
  test5_4();
});
function test5_4() {
  let {x, y, c, ...z} = {x: 1, y: 2, a: 3, b: 4, c: 5};
  console.log(`x-->${x}`);
  console.log(`y-->${y}`);
  console.log(`c-->${c}`);
  console.log("z-->%o", z);//{a:3,b:4}
}

// 复制对象
bindClick("J-test5-5", ()=> {
  test5_5();
});
function test5_5() {
  let a = {x: 1, y: 2};
  let aClone = {...a};
  console.log("aClone-->%o", aClone);
  console.log("a === aClone -->" + (a === aClone));
}

//合并两个对象
bindClick("J-test5-6", ()=> {
  test5_6();
});
function test5_6() {
  let a = {x: 1, y: {a: 1}};
  let b = {x: 2, z: 3};
  let ab = {...a, ...b};
  console.log(ab);
  ab.y.a = 2;
  console.log(a.y.a);//浅拷贝1
}

//模板字符串
bindClick("J-test6-1", ()=> {
  test6_1();
});
function test6_1() {
  let name = "陈佳佳";
  let age = "18";
  console.log("你好，我叫" + name + "，今年" + age + "岁");
  console.log(`你好，我叫${name} ,今年${age}岁`);
}

// 多行模板字符串
bindClick("J-test6-2", ()=> {
  test6_2();
});
function test6_2() {
  console.log(
      "<div>" +
      "<p>" + text + "这是一个测试</p>" +
      "</div>"
  );
}

// 解构赋值
// 数组的解构赋值
bindClick("J-test7-1", ()=> {
  test7_1();
});
function test7_1() {
  let [x , y = 'b'] = ['a'];
  console.log(`${x}, ${y}`);
}

//对象的解构赋值
//默认值，键值不对应问题
bindClick("J-test7-2", ()=> {
  test7_2();
});
function test7_2() {
  let obj = {a: 1, b: 2};
  let {a, b} = obj;
  console.log(`${a}, ${b}`);
  let {foo: baz, x = "ccc"} = {foo: "aaa", bar: "bbb"};
  console.log(`${baz}, ${x}`);
}

//字符串的解构赋值
bindClick("J-test7-3", ()=> {
  test7_3();
});
function test7_3() {
  const [a, b, c, d, e] = 'hello';
  console.log(`${a},${b},${c},${d},${e}`);
}

//函数的解构赋值
bindClick("J-test7-4", ()=> {
  test7_4([1, 2]); // 3
});

function test7_4([x, y]) {
  console.log(x + y);
}

bindClick("J-test8-1", ()=> {
  test8_1();
});
// 箭头函数
function test8_1() {
  var f1 = () => 5;
  console.log(f1());

  var f2 = v=> v + 5;
  console.log(f2(5));

  var sum = (num1, num2) => num1 + num2;
  console.log(sum(1, 2));
}

// 简化函数作用
function test8_2() {
  // 正常函数写法
  [1, 2, 3].map(function (x) {
    return x * x;
  });
  // 箭头函数写法
  [1, 2, 3].map(x => x * x);
}

//this绑定，call，apply，bind也不能用
bindClick("J-test8-3", ()=> {
  test8_3();
});
function test8_3() {
  window.id = "windowId";
  let foo = {
    id: 1,
    test: function () {
      setTimeout(function () {
        console.log(this.id);
      }, 100);
    }
  };
  let foo2 = {
    id: 2,
    test: function () {
      setTimeout(() => {
        console.log(this.id);
      }, 100);
    }
  };
  foo.test();
  foo2.test();
}
//不可作为构造函数。，用控制台演示
function test8_4() {
  var Foo = ()=>5;
  var f = new Foo();
}

//不能使用arguments
function test8_5() {
  var foo = (v)=> {
    console.log(arguments)//test8_5的arguments
  };
  foo(5);
}

// promise
bindClick("J-test9-1", ()=> {
  test9_1();
});
function syncReadFile() {
  return new Promise((resolve, reject)=> {
    setTimeout(() =>resolve("这是内容"), 100)
  });
}
function test9_1() {
  syncReadFile()
      .then((content)=> {
        console.log(content);
        return "123";
      })
      .then(function (content) {
        console.log(content);
      })
}



//async 简单例子
function timeout(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

async function asyncPrint(value, ms) {
  await timeout(ms);
  console.log(value);
}

bindClick("J-test10-1", ()=> {
  test10_1();
});

function test10_1() {
  asyncPrint('hello world', 3000);
}


//async 返回promise
async function f() {
  return 'hello world';
}

bindClick("J-test10-2", ()=> {
  test10_2();
});

function test10_2() {
  console.log(f());
  f().then(v => console.log(v))
}

// await 后面非promise对象
bindClick("J-test10-3", ()=> {
  test10_3();
});

function test10_3() {
  async function f() {
    return await 123;
  }

  console.log(f());
  f().then(v => console.log(v));
}

//对比各种不同方法
function animate1() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      console.log("animate1");
      resolve();
    }, 1000);
  });
}
function animate2() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      console.log("animate2");
      resolve();
    }, 1000);
  });
}

function animate3() {
  return new Promise((resolve) => {
    setTimeout(()=> {
      console.log("animate3");
      resolve();
    }, 1000);
  });
}

async function chainAnimationsAsync(animations) {
  var ret = null;
  try {
    for (var animate of animations) {
      ret = await animate();
    }
  } catch (e) {
    /* 忽略错误，继续执行 */
  }
  return ret;
}

bindClick("J-test10-4", ()=> {
  test10_4();
});

function test10_4() {
  chainAnimationsAsync([animate1, animate2, animate3]);
}

//模块
// v = 1;// 模块下默认严格模式，所以var 必须显示声明
// with(){} //模块下默认严格模式

// 测试import export
bindClick("J-test11-1", ()=> {
  test11_1();
});
import {a, b, c} from './index2'
function test11_1() {
  console.log(a);
  console.log(b());
  console.log(c);
}

//测试default
bindClick("J-test11-2", ()=> {
  test11_2();
});
import index2 from './index2'
function test11_2() {
  console.log(index2);
}

//测试import *
import * as index222 from './index2';
bindClick("J-test11-3", ()=> {
  test11_3();
});
function test11_3() {
  console.log(index222);
}









