/**
 * 非同期処理のモジュールです.
 * @author ikeda
 */

/* 非同期処理実行中判定フラグ */
let isFlashing = false;
/* 非同期処理実行前判定フラグ */
let isFlushPending = false;
/* 非同期処理の関数を保持する配列 */
const queue = [];
const p = Promise.resolve();

function nextTick(fn) {
	return p.then(fn);
}
/* 配列に関すを登録する関数 */
function queueJob(job) {
	/* 配列の中に重複する関数が格納されていない場合 */
	if(!queue.includes(job)) {
		queue.push(job);
		queueFlush();	
	}
}
/* 非同期処理の実行フラグの状態を判定し、プロミスオブジェクトに関数を追加する関数 */
function queueFlush() {
	/* 非同期処理の判定フラグの状態が実行中でも実行前でもない場合 */
	if(!isFlushPending && !isFlashing) {
		isFlushPending = true;
		nextTick(flushJobs);
	}
}
/* 配列に格納されている関数を一つずつ実行していく関数 */
function flushJobs() {
	let job;
	isFlashing = true;
	isFlushPending = false;
	/* 配列に格納されている関数が無くなるまでループ */
	while((job = queue.shift()) !== undefined) {
		         /* 配列から取り出された一番目の要素 */
		job();
	}
	isFlashing = false;
}
export { queueJob, nextTick };