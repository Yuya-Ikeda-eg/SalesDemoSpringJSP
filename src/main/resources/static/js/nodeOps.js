/**
 * DOM操作のモジュールです.
 * @author ikeda
 */
export const nodeOps = {
  qs(sel, scope) { return (scope || document).querySelector(sel); },
  create(type) { return document.createElement(type); },

  setAttr(el, key, val) {
    if (!el || !key) return;
    if (val == null) el.removeAttribute(key);
    else el.setAttribute(key, String(val)); // falsy も許容
  },

  append(p, c) { if (p && c) p.appendChild(c); },
  remove(el) { if (el?.parentNode) el.parentNode.removeChild(el); },

  html(el, v) { if (el) el.innerHTML = v == null ? '' : String(v); },

  on(el, type, handler, opts) { el.addEventListener(type, handler, opts); },
  off(el, type, handler, opts) { el.removeEventListener(type, handler, opts); }, 
  replace(parent, oldEl, newEl) {
    if (!parent || !oldEl || !newEl) return;
    parent.replaceChild(newEl, oldEl);
  }
};