const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

function returnValue(value) {
	return value;
}


function resolveValue(newValue, resolve, reject) {
	if (newValue instanceof PromiseA) {
		newValue.then(resolve, reject);
	} else {
		resolve(newValue);
	}
}


class PromiseA {
	constructor(executor) {
		this.status = STATUS.PENDING;
		this.fulfilledCallback = returnValue;
		this.rejectedCallback = returnValue;
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
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.FULFILLED;
			this.resultValue = value;
			this.fulfilledCallback(value);
		}
	}

	reject(error) {
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.REJECTED;
			this.resultValue = error;
			this.rejectedCallback(error);
		}
	}

	then(onResolve, onReject) {
		if (this.status === STATUS.PENDING) {
			return new PromiseA((resolve, reject) => {
				this.fulfilledCallback = (value) => {
					try {
						let newValue = onResolve(value);
						resolveValue(newValue, resolve, reject);
					} catch (err) {
						reject(err);
					}
				};
				this.rejectedCallback = (value) => {
					try {
						let newValue = onReject(value);
						resolveValue(newValue, resolve, reject);
					} catch (err) {
						reject(err);
					}

				};
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

	catch(reject) {
		return this.then(null, reject);
	}

	static all(promiseList = []) {
		return new Promise((resolve, reject) => {
			let results = [];
			let len = promiseList.length;
			let resolveCount = 0;

			let resolver = function (index, value) {
				resolveCount++;
				results[index] = value;
				if (resolveCount === len) {
					resolve(results);
				}
			};

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
}


export default PromiseA;