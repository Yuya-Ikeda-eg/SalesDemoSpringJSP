/**
 * リアクティブ処理のモジュールです.
 * @author ikeda
 */
import { queueJob } from "./scheduler.js";

handler = {
	get(target, key, receiver) {
		const res = Reflect.get(arget, key, receiver);
		track(target, key);
		return res;
	},
	set(target, key, value, receiver) {
		const res = Reflect.set(target, key, value, receiver);
		trigger(target, key);
		return res;
	}
}

function reactive() {
	return new Proxy(target, handler);
} 

let activeEffect = null;
function effect(fn, { computed = false, lazy = false } = {}) {
	try {
		activeEffect = fn;
		activeEffect.computed = computed;
		activeEffect.lazy = lazy;
		if(computed) {
			activeEffect.dirty = true;
		}
		activeEffect();
		return activeEffect;
	} finally {
		activeEffect = null;
	}
}

const targetMap = new WeakMap();
function track(target, key) {
	if(activeEffect === null) {
		return;
	}
	
	let depsMap = targetMap.get(target);
	if(!depsMap) {
		targetMap.set(target, (depsMap = new Map()));
	}
	
	let deps = depsMap.get(key);
	if(!deps) {
		depsMap.set(key, (deps = new Set()));
	}
	
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
			if(effect.lazy) {
				queueJob(effect);
			} else {
				effect();
			}
		}
	});
}

function computed(getter, ctx) {
	let computed, value;
	const runner = effect(getter.bind(ctx), { computed: true });
	
	computed = {
		get value() {
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
 