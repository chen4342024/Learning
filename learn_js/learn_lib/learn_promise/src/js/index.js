import PromiseA from './promise'


var p = new PromiseA(function (resolve, reject) {
	console.log("开始承诺。 。。。。");
	setTimeout(() => {
		resolve("2秒后成功返回");
	}, 2000)
});

p
	.then((value) => {
		console.log("success --> " + value);
	})
	.then((value) => {
		console.log("success2 --> " + value);
	})
;
