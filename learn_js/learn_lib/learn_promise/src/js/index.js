import PromiseA from './promise'


let p = new PromiseA(function (resolve, reject) {
	console.log("开始承诺。 。。。。");
	setTimeout(() => {
		resolve("2秒后成功返回");
	}, 2000)
});


function runAsync() {
	return new PromiseA(function (resolve, reject) {
		setTimeout(() => {
			resolve("再次2秒后成功返回");
		}, 2000);
	});
}

setTimeout(function () {
	console.log("3 秒后");
	p.then((value) => {
		console.log("success --> " + value);
		return runAsync();
	}).then((value) => {
		console.log("success2 --> " + value);
	});
}, 3000);

//all 方法
let p1 = new PromiseA(function (resolve, reject) {
	setTimeout(() => {
		console.log("resolve p1 ");
		resolve("p1");
	}, 2000);
});
let p2 = 123;
let p3 = new PromiseA(function (resolve, reject) {
	setTimeout(() => {
		console.log("resolve p3 ");
		resolve("p3");
	}, 4000);
});

PromiseA.all([p1, p2, p3])
	.then(function (values) {
		console.log("all done");
		console.log(values);
	});

//race 方法
PromiseA.race([p1, p3])
	.then(function (value) {
		console.log('race done');
		console.log(value);
	});
