/**
 * 各モジュールを用いて動的ページを構成するためのモジュールです.
 * @author ikeda
 */
import { nodeOps } from './nodeOps.js';

import { createVNode, patch } from './renderer.js';
import { reactive, computed, effect } from './reactive.js';
import { nextTick } from './scheduler.js';



/* 作成したDOMをオブジェクトとして返却するメソッド */
function createApp(args) {
	const {data, computed: computedData, methods, render} = args;
	
	/* 空のオブジェクト作成 */
	const app = {};
	
	/* メソッドを格納 */
	const rawData = data();
	
	app.publicCtx = createPublicCtx(app, rawData, computedData, methods);
	// メソッドをreactiveへ渡し、参照先をProxyへ束縛する
	app.data = reactive(rawData);
	
	app.computed = createComputedData(app, computedData);
	
	app.mount = createMountFn(app, render);
	
	return app;
}
/* 仮想DOMで変更を反映したNodeを変更反映先へ渡すメソッド */
function createMountFn(app, render) {
	return function(selector) {
		const container = nodeOps.qs(selector);
		
		app.vnode = createVNode();
		const runner = effect(() => {
			/* 仮想DOMとして値を保持 */
			const nextVNode = render.call(app.publicCtx);
			/* DOMの変更を反映させる */
			patch(/* 変更前のDOM */app.vnode, /* 変更後のDOM */nextVNode, /* 変更反映先 */container);
			app.vnode = nextVNode;
		}, { lazy: true });
		
		runner();
		
		// ★ マウント直後に自動ロード（クリック不要）
	    queueMicrotask(() => {
	      app.publicCtx.loadRestApi?.().then(() => {
			  runner();
		  });
	    });
	
	    return app.publicCtx; // 返しておくと呼び出し側でも使いやすい
	}
}

function createComputedData({ publicCtx }, computedData) {
	const res = {};
	for(const prop in computedData) {
		const c = computed(computedData[prop], publicCtx);
		res[prop] = c;
	}
	return res;
}

function createPublicCtx(/* 空のオブジェクト */app, /* メソッド */rawData, /* 動的に変更する値 */computedData, methods) {
	const ctx = { ...rawData, ...computedData, ...methods };
	
	return new Proxy(ctx, {
		get(target, key, receiver) {
			if(rawData.hasOwnProperty(key)) {
				return Reflect.get(app.data, key);
			} else if(computedData.hasOwnProperty(key)) {
				return Reflect.get(app.computed, key).value;
			} else {
				return Reflect.get(target, key, receiver);
			}
		},
		set(target, key, value, receiver) {
			if(rawData.hasOwnProperty(key)) {
				return Reflect.set(app.data, key, value);
			}
		}
	});
}

export { nextTick } from './scheduler.js';
export { createApp, createVNode as h};
