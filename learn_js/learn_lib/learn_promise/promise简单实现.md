

# Promise简单实现

### 前言

你可能知道，javascript的任务执行的模式有两种：同步和异步。异步模式非常重要，在浏览器端，耗时很长的操作（例如ajax请求）都应该异步执行，避免浏览器失去响应。

在异步模式编程中，我们经常使用回调函数。一不小心就可能写出以下这样的代码：

```javascript
//事件1
doSomeThing1(function(){
  //事件2
  doSomeThing2(function(){
    //事件3
    doSomeThing3();
  });
})
```

当你的需要异步执行的函数越来越多，你的层级也会越来越深。

这样的写法存在的缺点是：

1. 不利于阅读
2. 各个任务之间的高度耦合，难以维护
3. 对异常的处理比较难

用Promise可以避免这种回调地狱，可以写成这样

```javascript
//事件1
doSomeThing1()
  .then(function(){
    //事件2
    return doSomeThing2();
  })
  .then(function(){
    //事件3
    return doSomeThing3();
  })
  .catch(function(){
    //这里可以很方便的做异常处理
  })
```

在市面上有许多库都实现了Promise，例如：Q.js 、when.js ，es6也将Promise纳入了标准中

> es6 的 Promise使用方法可以参考阮一峰的 http://es6.ruanyifeng.com/#docs/promise ，我就不在做具体介绍

接下来，我们模仿ES6的promise，一步一步来实现一个简单版的Promise。



#### 构造函数

我们使用Promise的时候，

```javascript
const promise = new Promise((resolve, reject)=>{
  // ... some code
  if (/* 异步操作成功 */){
    resolve(value);
  } else {
    reject(error);
  }
});
```

Promise是一个构造函数，接收一个函数，函数里有两个参数，resolve、reject。

我们可以这样子实现：

```javascript
class PromiseA {
	constructor(executor) {
		const resolve = (value) => {
			this.resolve(value);
		};
		const reject = (err) => {
			this.reject(err);
		};
		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}
  
  	resolve(value) {
		this.resultValue = value;
	}

	reject(error) {
		this.resultValue = error;
	}
}
```

#### then方法

promise中，用的最频繁的就是then方法，then方法有两个参数，一个是promise成功时候的回调，一个是失败的回调。实现方式为：

```javascript
class PromiseA {
	constructor(executor) {
		const resolve = (value) => {
			this.resolve(value);
		};
		const reject = (err) => {
			this.reject(err);
		};
		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}
  
  	resolve(value) {
		this.resultValue = value;
      	//++++++++
      	if(this.fullfillCallback){ 
            this.fullfillCallback(value);
        }
	}

	reject(error) {
		this.resultValue = error;
        //++++++++
      	if(this.rejectCallback){
            this.rejectCallback(value);
        }
	}
  	
  	then(resolve,reject){
        this.fullfillCallback = resolve;
        this.rejectCallback = resolve;
    }
}
```

then方法有以下几个特性：

1. 支持链式操作
2. 每次then方法都是返回新的Promise
3. 当前promise的状态通过返回值传递给下一个promise
4. 错误冒泡，即如果当前promise没有提供onReject方法，会把错误冒泡到下一个promise，方便处理

```javascript
then(onResolve,onReject){
  
  //返回新的Promise并支持链式操作
  return new PromiseA((resolve,reject)=>{
  	
    this.fullfillCallback = (value)=>{
		try {
			if (onResolve) {
				let newValue = onResolve(value); 
				resolve(newValue); //将当前promise执行结果，传递给下一个promise
			} else {
				resolve(value);
			}
		} catch (err) {
			reject(err);
		}
    }
    
    //类似fullfillCallback
    this.rejectCallback = (value)=>{
      	try {
	  		if (onReject) {
	  			let newValue = onReject(value);
	  			resolve(newValue);
	  		} else {
              	//错误冒泡
	  			reject(value);
	  		}
	  	} catch (err) {
	 	 	reject(err);
	 	}
    }
  });
}
```

这样我们就实现了一个简单版的then方法了

#### 加强版then

上面的实现，模拟了then方法的逻辑，但是还有一些缺点：

1. then方法只能添加一个，例如

```javascript
let p = new PromiseA((resolve)=>{setTimeout(()=>{resolve(1)},0)});
p.then((value)=>{console.log('then-->' + value)}); //无输出，因为没触发到，被后一个覆盖了
p.then((value)=>{console.log('then2-->' + value)}); ////then---> 1
```

2. promise没有状态，当promsie在添加then的时候已经完成了，没法得到结果
3. 没有实现：如果上一个promise的返回值也是一个Promise对象时，则会等到这个Promise resolve的时候才执行下一个

##### 为了解决第一点，引入了事件监听,简单的实现如下：

```javascript
export default class EventEmitter {
	constructor() {
		this._events = {};
	}

	on(type, fn, context = this) {
		if (!this._events[type]) {
			this._events[type] = [];
		}
		this._events[type].push([fn, context]);
	}

	trigger(type) {
		let events = this._events[type];
		if (!events) {
			return;
		}
		let len = events.length;
		let eventsCopy = [...events];
		for (let i = 0; i < len; i++) {
			let event = eventsCopy[i];
			let [fn, context] = event;
			if (fn) {
				fn.apply(context, [].slice.call(arguments, 1));
			}
		}
	}
};
```

所以进一步对PromiseA进行改造：

```javascript
const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

const EventType = {
	fulfill: 'fulfill',
	reject: 'reject'
};


class PromiseA {
	constructor(executor) {
      	//初始化事件监听及状态
		this.eventEmitter = new EventEmitter();
		this.status = STATUS.PENDING;
		
		const resolve = (value) => {
			if (value instanceof PromiseA) {
				value.then((value) => {
					this.resolve(value)
				}, (error) => {
					this.reject(error);
				});
			} else {
				this.resolve(value);
			}
		};
		const reject = (err) => {
			this.reject(err);
		};
		try {
			executor(resolve, reject);
		} catch (err) {
			reject(err);
		}
	}

	resolve(value) {
      	//增加状态
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.FULFILLED;
			this.resultValue = value;
			this.eventEmitter.trigger(EventType.fulfill, value);
		}
	}

	reject(error) {
      	//增加状态
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.REJECTED;
			this.resultValue = error;
			this.eventEmitter.trigger(EventType.reject, error);
		}
	}

	then(onResolve, onReject) {
      	//根据状态不同处理
		if (this.status === STATUS.PENDING) {
			return new PromiseA((resolve, reject) => {
	            //增加事件监听
				this.eventEmitter.on('fulfill', (value) => {
					try {
						if (onResolve) {
							let newValue = onResolve(value);
							resolve(newValue)
						} else {
							resolve(value);
						}
					} catch (err) {
						reject(err);
					}
				});
                //增加事件监听
				this.eventEmitter.on('reject', (value) => {
					try {
						if (onReject) {
							let newValue = onReject(value);
							resolve(newValue);
						} else {
							reject(value);
						}
					} catch (err) {
						reject(err);
					}
				});
			});
		}
		if (this.status === STATUS.FULFILLED || this.status === STATUS.REJECTED) {
			return new PromiseA((resolve, reject) => {
				let callback = returnValue;
				if (this.status === STATUS.FULFILLED) {
					callback = onResolve;
				}
				if (this.status === STATUS.REJECTED) {
					callback = onReject;
				}
				try {
					let newValue = callback(this.resultValue);
					resolveValue(newValue, resolve, reject);
				} catch (err) {
					reject(err);
				}
			});
		}
	}
}
```

到这里，我们的then方法基本就完成了。

最后还有一个小知识点，就是执行时机的问题：

```
setTimeout(function(){
    console.log(4);
},0);
new Promise(function(resolve){ 
	console.log(1);
    resolve();
}).then(function(){
    console.log(3);
});
console.log(2);
//输出结果会是： 1、2、3、4
```

> promise.then,是异步的，属于microtask，执行时机是本次事件循环结束之前，而setTimeout是macrotask，执行时机是在下一次事件循环的开始之时

实现这个功能，我利用了第三方库 microtask 来模拟。所以PromiseA修改为：

```javascript
	resolve(value) {
		microtask(() => {
			if (this.status === STATUS.PENDING) {
				this.status = STATUS.FULFILLED;
				this.resultValue = value;
				this.eventEmitter.trigger(EventType.fulfill, value);
			}
		})
	}

	reject(error) {
		microtask(() => {
			if (this.status === STATUS.PENDING) {
				this.status = STATUS.REJECTED;
				this.resultValue = error;
				this.eventEmitter.trigger(EventType.reject, error);
			}
		});
	}
```

到此为止，我们的then方法已经大功告成了。最困难的一步已经解决了

#### catch

Promise跟普通回调的一大优势就是异常处理，我们推荐使用Promise的时候，总是使用catch来代替then的第二个参数。即是：

```javascript
//bad
let p = new Promise((resolve,reject)=>{
  //...异步操作
}).then((value)=>{
    //成功
},()=>{
    //失败
});

//good
let p = new Promise((resolve,reject)=>{
  //...异步操作
})
.then((value)=>{
    //成功
})
.catch(()=>{
    //失败
});

```

接下来让我们实现catch方法：

```javascript
catch(reject) {
   return this.then(null, reject);
}
```

哈哈~ ， 你没看错。你已经实现了catch方法

#### all方法

Promise.all是一个很好用的方法。接受一个promise数组，然后等到所有的异步操作都完成了，就返回一个数组，包含对应的值

具体实现如下：

```javascript
static all(promiseList = []) {
  	//返回promise以便链式操作
	return new PromiseA((resolve, reject) => {
		let results = [];
      	let len = promiseList.length;
		let resolveCount = 0; //用于计数

		let resolver = function (index, value) {
			resolveCount++;
			results[index] = value;
			if (resolveCount === len) {
				resolve(results);
			}
		};

      	//遍历执行所有的promise
		promiseList.forEach((p, i) => {
			if (p instanceof PromiseA) {
				p.then((value) => {
					resolver(i, value);
				}, (err) => {
					reject(err);
				})
			} else {
				resolver(i, p);
			}
		})
	});
}
```

#### race方法

race方法为竞速，第一执行完的为准。所以只需循环一遍执行就可以了。当有第一个将Promise的状态改变成fullfilled或reject之后，其他的就都无效了

```javascript
static race(promiseList = []) {
   return new PromiseA((resolve, reject) => {
      promiseList.forEach((p, i) => {
         if (p instanceof PromiseA) {
            p.then((value) => {
               resolve(value);
            }, (err) => {
               reject(err);
            })
         } else {
            resolve(p);
         }
      })
   })
}
```



最后，我们实现了一个简单版的promise， 还有一些其他的方法在这里没有讲到。感兴趣的朋友可以自行去研究哈~



> 最后附上代码完整的实现 ： https://github.com/chen4342024/Learning/tree/master/learn_js/learn_lib/learn_promise/src/js





