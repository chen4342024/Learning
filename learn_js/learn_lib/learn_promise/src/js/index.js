import PromiseA from './promise'

function runAsync() {
	return new PromiseA(function (resolve, reject) {
		setTimeout(() => {
			resolve("再次2秒后成功返回");
		}, 2000);
	});
}


$(".J-testThen").on('click', () => {
	let p = new PromiseA(function (resolve, reject) {
		console.log("开始承诺。 。。。。");
		setTimeout(() => {
			resolve("2秒后成功返回");
		}, 2000)
	});
	setTimeout(function () {
		console.log("3 秒后");
		p.then((value) => {
			console.log("success --> " + value);
			return runAsync();
		}).then((value) => {
			console.log("success2 --> " + value);
		});
	}, 3000);
});

//all 方法
$(".J-testAll").on('click', () => {
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
});

$('.J-testRace').on('click', () => {
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
	//race 方法
	PromiseA.race([p1, p3])
		.then(function (value) {
			console.log('race done');
			console.log(value);
		});
});


$('.J-testResolve').on('click', () => {
	//字符串
	setTimeout(() => {
		console.log("three");
	}, 0);
	PromiseA.resolve("two").then((value) => {
		console.log(value);
	});
	console.log("one");

	//promise 对象
	let p1 = new PromiseA(() => {
	});
	console.log('p1 === PromiseA.resolve(p1)) ---> ' + (p1 === PromiseA.resolve(p1)));

	//不传
	let p2 = PromiseA.resolve();
	p2.then((value) => {
		console.log('value === undefined ---> ' + ( value === void 0));
	});

	// thenAble 对象
	let thenAble = {
		then: function (resolve, reject) {
			resolve(42);
		}
	};
	let p3 = PromiseA.resolve(thenAble);
	p3.then(function (value) {
		console.log(value);  // 42
	});
});

$('.J-testReject').on('click', () => {
	let p1 = new PromiseA(() => {
	});
	let p2 = PromiseA.reject(p1);
	p2.catch((value) => {
		console.log('reject value === p1 ---> ' + (value === p1));
	});

	let p3 = PromiseA.reject("1111");
	p3.catch((value) => {
		console.log('reject value === 1111 ---> ' + (value === "1111"));
	});
});

$('.J-testDone').on('click', () => {
	let p = new PromiseA(function (resolve, reject) {
		setTimeout(() => {
			resolve("1");
		}, 2000)
	});
	p.then((value) => {
		return aaa.value;
	}).then(()=>{
		console.log('1111');
	}).catch((value) => {
		console.log(value);
	});
});






