const STATUS = {
	PENDING: 'pending',
	FULFILLED: 'fulfilled',
	REJECTED: 'rejected'
};

function returnValue(value) {
	return value;
}


class PromiseA {
	constructor(executor) {
		this.status = STATUS.PENDING;
		this.fulfilledCallback = returnValue;
		this.rejectedCallback = returnValue;
		executor((value) => {
			this.resolve(value);
		}, (err) => {
			this.reject(err);
		});
	}

	resolve(value) {
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.FULFILLED;
			this.fulfilledCallback(value);
		}
	}

	reject(error) {
		if (this.status === STATUS.PENDING) {
			this.status = STATUS.REJECTED;
			this.rejectedCallback(error);
		}
	}

	then(onResolve, onReject) {
		this.fulfilledCallback = onResolve;
		this.rejectedCallback = onReject;
		return new Promise((resolve, reject) => {

		});
	}
}


export default PromiseA;