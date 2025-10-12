/**
 * DOM操作のモジュールです.
 * @author ikeda
 */
export const nodeOps = {
	qs(selector, scope) {
		return (scope || document).querySelector(selector);
	},
	create(type) {
		return document.createElement(type);
	},
	setAttr(target, key, value) {
		if(!target || !key || !value) {
			return;
		}
		target.setAttribute(key, value);
	},
	append(parent, target) {
		if(!parent || !target) {
			return;
		}
		parent.appendChild(target);
	},
	remove(el) {
		if(!el) {
			return;
		}
		el.parentNode && el.parentNode.removeChild(el);
	},
	html(target, value) {
		if(!target) {
			return;
		}
		if(value === null || value === undefined) {
			value = '';
			return target.innerHTML = value;
		} else {
		  return target.innerHTML = value;	
		} 
	},
	on(target, eventType, callback) {
		target.addEventListener(eventType, () => {
			callback();
		});
	}
}