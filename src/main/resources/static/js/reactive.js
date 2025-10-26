/**
 * リアクティブ処理のモジュールです.
 * @author ikeda
 */
import { queueJob } from "./scheduler.js";
/* Proxy独自処理の実装 */
const handler = {
	/* オブジェクトのプロパティに値を取得した際の処理 */
	get(target, key, receiver) {
		/* thisの参照をProxyへ束縛するための処理 */
		const res = Reflect.get(target, key, receiver);
		track(target, key);
		return res;
	},
	/* オブジェクトのプロパティに値を設定した際の処理 */
	set(target, key, value, receiver) {
		/* thisの参照をProxyへ束縛するための処理 */
		const res = Reflect.set(target, key, value, receiver);
		trigger(target, key);
		return res;
	}
}
/* オブジェクトのプロパティにアクセスがあった際の独自処理を定義 */
function reactive(target) {
	return new Proxy(target, handler);
} 
/* 引数として受け取る関数fnを一時保存するための変数初期化 */
let activeEffect = null;
function effect(fn, { computed = false, lazy = false } = {}) {
	try {
		activeEffect = fn;
		activeEffect.computed = computed;
		activeEffect.lazy = lazy;
		if(computed) {
			/* computed内のrunnerの実行フラグ */
			activeEffect.dirty = true;
		}
		activeEffect();
		return activeEffect;
	} finally {
		activeEffect = null;
	}
}
/* オブジェクトと関数を格納するマップ（キーはオブジェクト） */
const targetMap = new WeakMap();
function track(/* オブジェクト */target, /* プロパティ名（文字列） */key) {
	if(activeEffect === null) {
		return;
	}
	
	let depsMap = targetMap.get(target);
	/* targetMapが取得できない場合 */
	if(!depsMap) {
		/* targetMapにオブジェクトと複数のプロパティを所持するためのMapを作成 */
		targetMap.set(target, (depsMap = new Map()));
	}
	
	let deps = depsMap.get(key);
	/* オブジェクトの中に対象のプロパティの値が存在しない場合 */
	if(!deps) {
		/* 対象のプロパティが複数の値を所持するためのSetを作成 */
		depsMap.set(key, (deps = new Set()));
	}
	/* Setの中に重複する値が存在しない場合 */
	if(!deps.has(activeEffect)) {
		deps.add(activeEffect);
	}
}

function trigger(target, key) {
	const depsMap = targetMap.get(target);
	if(!depsMap) {
		return;
	}
	
	const deps = depsMap.get(key);
	if(!deps) {
		return;
	}
	deps.forEach(effect => {
		if(effect.computed) {
			effect.dirty = true;
		} else {
			queueJob(effect);
		}
	});
}
/* effect内の関数のうち変更があったもののみ変更を反映させるためのメソッド */
function computed(getter, ctx) {
	let computed, value;                              
	const runner = effect(getter.bind(ctx), { computed: true });
	                      /* 関数 */         /* 第一引数の関数がcomputedから来たものなのかの判定フラグ */
	computed = {
		get value() {
			/* runnerの実行フラグがtrue */
			if(runner.dirty) {
				value = runner();
				runner.dirty = false;
			}
			return value;
		}
	}
	return computed;
}
export { effect, trigger, reactive, computed };
 