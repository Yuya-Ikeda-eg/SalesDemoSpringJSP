/**
 * 仮想DOMを模したモジュールです.
 * @author ikeda
 */
import { nodeOps } from './nodeOps.js';
/* 仮想DOMを作成するメソッド */
function createVNode(/* タグの種類 */type = '', /* 属性 */props = {}, /* 子ノードDOMツリー */children = '') {
	return {
		type,
		props,
		children
	}
}
/* DOMの変更を反映させるメソッド */
function patch(/* 変更前のNode */n1, /* 変更後のNode */n2, /* 変更反映先 */container) {
	let el;
	/* 変更後のNodeのタグの種類が変更前と異なる場合 */
	if(n1.type !== n2.type) {
		/* 変更後のタグの種類を変更前に上書きする */
		el = n2.el = nodeOps.create(n2.type);
		nodeOps.append(container, el);
	} else {
		el = n2.el = n1.el;
	}
	/* 変更後のNodeのタグの属性のオブジェクトのキーをループで取り出す */
	for(const key in n2.props) {
		/* 変更前の属性オブジェクトの値 */
		const prevProp = n1.props[key];
		/* 変更後の属性オブジェクトの値 */
		const nextProp = n2.props[key];
		/* 変更前と変更後の属性値が異なる場合 */
		if(prevProp !== nextProp) {
			/* 属性オブジェクトのキーがonから始まる場合（イベントリスナー） */
			if(key.startsWith('on')) {
				if(!prevProp
						|| (prevProp.toString() !== nextProp.toString())) {
					/* キーのon以外の文字列を小文字で設定 */		
					nodeOps.on(el, key.substring(2).toLowerCase(), () => {
						nextProp();
					});	
				}
			} else {
				/* 属性値を設定 */
				nodeOps.setAttr(el, key, nextProp);
			}
		}
	}
	/* 変更後の子ノードDOMツリーが配列の場合 */
	if(n2.children instanceof Array) {
		for(let i = 0; i < n2.children.length; i++) {
			/* 変更前の配列の方が長い場合 */
			if(n1.children.hasOwnProperty(i)) {
				/* 入れ子構造でメソッドを呼び出す（再帰的プログラミング） */
				patch(n1.children[i], n2.children[i], el);
			} else {
				patch(createVNode(), n2.children[i], el);
			}
		}
	}else {
		/* 変更後の子ノードDOMツリーが文字列であり、 */
		/* 変更後の子ノードDOMツリーが変更前と異なる場合 */
		if(n1.children !== n2.children) {
			/* 変更後の子ノードDOMツリーを反映させる */
			nodeOps.html(el, n2.children);
		}
	}
}

export { createVNode, patch };