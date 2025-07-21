/**
 * DOM操作のモジュールです.
 * @author ikeda
 */
export const nodeOps = {
	qs(selecter, scope) {
		return (scope || document).querySelecter(selecter);
	},
	create(type) {
		return document.createElement(type);
	},
	setAttr(target, key, value) {
		target.setAttribute(key, value);
	},
	append(parent, target) {
		parent.appendChild(target);
	},
	html(target, value) {
		target.innerHtml = value;
	},
	on(target, eventType, callback) {
		target.addEventListener(eventType, () => {
			callback();
		});
	}
}