/**
 * 非同期処理のモジュールです.
 * @author ikeda
 */

/* 非同期処理実行中判定フラグ */
let isFlushing = false;
/* 非同期処理実行前判定フラグ */
let isFlushPending = false;
/* 非同期処理の関数を保持する配列 */
const queue = new Set();
const p = Promise.resolve();

function nextTick(fn) {
	return fn ? p.then(fn) : p;
}
/* 配列に関すを登録する関数 */
function queueJob(job) {
	queue.add(job);
	queueFlush();	
}
/* 非同期処理の実行フラグの状態を判定し、プロミスオブジェクトに関数を追加する関数 */
function queueFlush() {
	/* 非同期処理の判定フラグの状態が実行中でも実行前でもない場合 */
	if(!isFlushPending && !isFlushing) {
		isFlushPending = true;
		nextTick(flushJobs);
	}
}
/* 配列に格納されている関数を一つずつ実行していく関数 */
function flushJobs() {
	isFlushing = true;
	isFlushPending = false;
	 try {
	    // ループにして、実行中に追加された job も次ラウンドで確実に拾う
	    while (queue.size) {
	      // いま登録されているジョブを配列にスナップショット
	      const jobs = Array.from(queue);
	      queue.clear(); // 先にクリア（この間に追加された分は次ループで処理）
	
	      for (const job of jobs) {
	        try {
	          job();
	        } catch (err) {
	          // ここで個別エラーハンドリングしてもOK（全体を止めない）
	          console.error(err);
	        }
	      }
	    }
	  } finally {
	    isFlushing = false;
  }
}
export { queueJob, nextTick };