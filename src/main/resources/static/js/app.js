/**
 * 各モジュールを用いて動的ページを構成するためのモジュールです.
 * @author ikeda
 */
import { nodeOps } from './nodeOps.js';
import { createVNode, patch } from './renderer.js';
import { reactive, computed, effect } from './reactive.js';

function createApp() {
	const {data, computed: computedData, methods, render} = args;
	
	const app = {};
	
	const rawData = data();
	
	app.publicCtx = createPublicCtx(app, rawData, computedData, methods);
	
	app.data = reactive(rawData);
	
	app.computed = createComputedData(app, computedData);
	
	app.mount = createMountFn(app, render);
	
	return app;
}

function createMountFn(app, render) {
	return function(selecter) {
		const container = nodeOps.qs(selecter);
		app.vnode = createVNode();
		effect(() => {
			const nextVNode = render.call(app.publicCtx);
			patch(app.vnode, nextVNode, container);
			app.vnode = nextVNode;
		}, { lazy: true });	
	}
}

function createComputedData() {
	const res = {};
	for(const prop in computedData) {
		const c = computed(computedData[prop], publicCtx);
		res[prop] = c;
	}
	return res;
}

function createPublicCtx() {
	const ctx = { ...rawData, ...computedData, ...methods };
	
	return new Proxy(ctx, {
		get(target, key, receiver) {
			if(rawData.hasOwnProperty(key)) {
				return Reflect.get(app.data, key);
			} else if(computedData.hasOwnProperty(key)) {
				return Reflect.get(app.computed, key).value;
			} else {
				return Reflect(target, key, receiver);
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
