import PromiseA from './promise'


var p = new PromiseA(function (resolve, reject) {
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
	alert("3 秒后");
	p.then((value) => {
		console.log("success --> " + value);
		return runAsync();
	}).then((value) => {
		console.log("success2 --> " + value);
	})
}, 3000);

;
