/**
 * 非同期処理のモジュールです.
 */

let isFlashing = false;
let isFlushPending = false;
const queue = [];
const p = Promise.resolve();

function nextTick(fn) {
	return p.then(fn);
}

function queueJob(job) {
	if(!queue.includes(job)) {
		queue.push(job);
		queueFlush();	
	}
}

function queueFlush() {
	if(!isFlushPending && !isFlashing) {
		isFlushPending = true;
		nextTick(flushJobs);
	}
}

function flushJobs() {
	let job;
	isFlashing = true;
	isFlushPending = false;
	while((job = queue.shift()) !== undefined) {
		job();
	}
	isFlashing = false;
}
export { queueJob, nextTick };