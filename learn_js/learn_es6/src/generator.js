import $ from "jquery";

function bindClick(className, func) {
  $("body").on("click", `.${className}`, func);
}


//generator简单使用
bindClick("J-test9-2", ()=> {
  test9_2();
});


function* helloWorldGenerator() {
  console.log("1");
  yield '2';
  yield '3';
  return '4';
}

function test9_2() {
  var hw = helloWorldGenerator();
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
}


//generator next 带参数
bindClick("J-test9-3", ()=> {
  test9_3();
});
function* foo(x) {
  console.log(`x->${x}`);
  var y = 2 * (yield (x + 1));
  console.log(`y->${y}`);
  var z = yield (y / 3);
  console.log(`z->${z}`);
  return (x + y + z);
}

function test9_3() {
  var a = foo(5);
  console.log(a.next()); // Object{value:6, done:false}
  console.log(a.next()); // Object{value:NaN, done:false}
  console.log(a.next()); // Object{value:NaN, done:true}

  console.log('-----------------');
  var b = foo(5);
  console.log(b.next()); // { value:6, done:false }
  console.log(b.next(5)); // { value:8, done:false }
  console.log(b.next(13)); // { value:42, done:true }
}

//generator next 观察yield的值
bindClick("J-test9-4", ()=> {
  test9_4();
});
function* dataConsumer() {
  console.log('Started');
  console.log(`1. ${yield}`);
  console.log(`2. ${yield}`);
  return 'result';
}

function test9_4() {
  let genObj = dataConsumer();
  console.log(genObj.next());
  console.log(genObj.next('a'));// 1. a
  console.log(genObj.next('b'));// 2. b
  eval("123123");
}

//generate 异步任务封装
function asyncFetch(step) {
  return new Promise((resolve, reject)=> {
    setTimeout(()=> {
      resolve("这是内容");
    }, 100)
  })
}

function* gen() {
  var result = yield asyncFetch();
  console.log(result);
}


bindClick("J-test9-5", ()=> {
  test9_5();
});
function test9_5() {
  var g = gen();
  var result = g.next();
  result.value
      .then((data)=> data)
      .then((data)=> g.next(data));
}

//generate 执行器
bindClick("J-test9-6", ()=> {
  test9_6();
});

function* genTest9_6() {
  var result0 = yield asyncFetch();
  var result1 = result0 + "," + (yield asyncFetch());
  var result2 = result1 + "," + (yield asyncFetch());
  console.log(result2);
}

function run(fn) {
  var g = fn();

  function next(data) {
    var result = g.next(data);
    if (result.done) return result.value;
    result.value.then(function (data) {
      next(data);
    });
  }

  next();
}

function test9_6() {
  run(genTest9_6);
}