/**
 * 仮想DOMを模したモジュールです.
 * @author ikeda
 */
import { nodeOps } from './nodeOps.js';
import { isArray, isText } from './util.js';

/* 仮想DOMを作成するメソッド */
function createVNode(/* タグの種類 */type = '', /* 属性 */props = {}, /* 子ノードDOMツリー */children = '') {
	return {
		type,
		props,
		children
	}
}
/* イベント重複を防ぐための invoker 管理 */
function setProp(el, key, next, prev) {
  if (key.startsWith('on')) {
    const type = key.slice(2).toLowerCase();

    // el._vei = { click: invoker, input: invoker, ... }
    const invokers = (el._vei ||= {});
    let inv = invokers[type];

    if (next) {
      if (inv) {
        // 既存のinvokerにハンドラだけ差し替え（リスナーは増えない）
        inv.value = next;
      } else {
        // 新規: 1回だけaddEventListener
        inv = (e) => inv.value && inv.value(e);
        inv.value = next;
        invokers[type] = inv;

        if (nodeOps?.on) nodeOps.on(el, type, inv);
        else el.addEventListener(type, inv);
      }
    } else if (inv) {
      // 削除
      if (nodeOps?.off) nodeOps.off(el, type, inv);
      else el.removeEventListener(type, inv);
      invokers[type] = null;
    }
    return;
  }

  // 属性/プロパティ
  if (next == null) {
    if (nodeOps?.removeAttr) nodeOps.removeAttr(el, key);
    else el.removeAttribute(key);
  } else {
    // elementのプロパティとして持っていれば直接代入、なければ属性に
    if (key in el && key !== 'class') {
      el[key] = next;
    } else if (nodeOps?.setAttr) {
      nodeOps.setAttr(el, key, next);
    } else {
      el.setAttribute(key, next);
    }
  }
}

function patchProps(el, oldProps = {}, newProps = {}) {
  // 追加・更新
  for (const k in newProps) {
    const prev = oldProps[k];
    const next = newProps[k];
    if (prev !== next) setProp(el, k, next, prev);
  }
  // 削除
  for (const k in oldProps) {
    if (!(k in newProps)) setProp(el, k, null, oldProps[k]);
  }
}

/* マウント/アンマウント */
function mountElement(vnode, container) {
  const el = (vnode.el = nodeOps?.create ? nodeOps.create(vnode.type) : document.createElement(vnode.type));
  patchProps(el, {}, vnode.props);
  patchChildren(null, vnode, el);
  if (nodeOps?.append) nodeOps.append(container, el);
  else container.appendChild(el);
  return el;
}

function mountElementNoAppend(vnode) {
  const el = vnode.el = nodeOps?.create ? nodeOps.create(vnode.type) : document.createElement(vnode.type);
  patchProps(el, {}, vnode.props);
  patchChildren(null, vnode, el);
  return el; // appendしない
}

function unmount(vnode) {
  const el = vnode?.el;
  if (!el) return;
  // イベント片付け（任意：_veiがあれば外す）
  if (el._vei) {
    for (const type in el._vei) {
      const inv = el._vei[type];
      if (inv) {
        if (nodeOps?.off) nodeOps.off(el, type, inv);
        else el.removeEventListener(type, inv);
      }
    }
    el._vei = null;
  }
  if (nodeOps?.remove) nodeOps.remove(el);
  else el.parentNode && el.parentNode.removeChild(el);
}

/* 子の差分 */
function patchChildren(n1, n2, el) {
  const c1 = isArray(n1?.children) ? n1.children : (isText(n1?.children) ? [String(n1.children)] : []);
  const c2Raw = n2.children;

  // 配列同士
  if (isArray(c2Raw)) {
    const c2 = c2Raw.filter(Boolean); // null/undefined/false を除去（安全策）
    const common = Math.min(c1.length, c2.length);

    for (let i = 0; i < common; i++) {
      patch(c1[i], c2[i], el);
    }
    // 余った旧子を削除
    for (let i = common; i < c1.length; i++) {
      unmount(c1[i]);
    }
    // 余った新子を追加
    for (let i = common; i < c2.length; i++) {
      mountElement(c2[i], el);
    }
    return;
  }

  // 文字列（テキスト）/ number
  if (isText(c2Raw)) {
    const text = String(c2Raw);
    // 旧が配列なら全て外してからテキストに
    if (isArray(c1)) {
      for (const ch of c1) unmount(ch);
    }
    if (nodeOps?.html) nodeOps.html(el, text);
    else el.textContent = text;
    return;
  }

  // null/undefined → 子なし
  if (isArray(c1)) {
    for (const ch of c1) unmount(ch);
  } else {
    if (nodeOps?.html) nodeOps.html(el, '');
    else el.textContent = '';
  }
}

function patch(/* 旧VNode */ n1, /* 新VNode */ n2, /* 親 */ container) {
  // ① 新規マウント
  if (!n1 && n2) {
	console.log('[patch] mount');
    mountElement(n2, container);
    return;
  }

  // ② アンマウント
  if (n1 && !n2) {
	console.log('[patch] unmount');
    unmount(n1);
    return;
  }

  // 以降、両方ある前提
  if (!n1 || !n2) return;

  // ③ type変更 → 置換（旧ノードがDOMに残らない）
  if (n1.type !== n2.type) {
	  console.log('[patch] replace');
	  const newEl = mountElementNoAppend(n2);             // ← appendしない
	  const parent = n1.el?.parentNode ?? container;
	  if (nodeOps?.replace) nodeOps.replace(parent, n1.el, newEl);
	  else parent.replaceChild(newEl, n1.el);
	  return;
  }

  // ④ 同一type → 差分更新
  const el = (n2.el = n1.el);
  patchProps(el, n1.props || {}, n2.props || {});
  patchChildren(n1, n2, el);
  console.log('[patch] patch-props/children');

}
export { createVNode, patch };