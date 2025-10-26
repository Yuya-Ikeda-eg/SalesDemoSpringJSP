/**
 * 新規登録画面のNodeに係るjsファイルです.
 * @author ikeda
 */
import { createApp, h } from './createApp.js';
import { HeaderView } from './headerView.js';
import { ButtonMenu } from './buttonMenuView.js'

export function CreateView(h, ctx) {
	
	/**
	 * ヘッダーのNode
	 */
	const header = HeaderView(h, ctx);
	
	/**
	 * ボタンメニューのNode
	 */
	const buttonMenu = ButtonMenu(h, ctx);
	
	/**
	* テーブルヘッダのNode 
	*/ 
    const thead = h('thead', {}, [
      h('tr', {}, [
        h('th', {}),
        h('th', {}, ctx.productName),
        h('th', {}, ctx.category),
        h('th', {}, ctx.quantity),
        h('th', {}, ctx.price),
        h('th', {}, ctx.orderDate),
        h('th', {}, ctx.customerName),
        h('th', {}, ctx.country)
      ])
    ]);
    
    /**
	 * テーブルボディのNode
	 */
    const rows = [];
    for (const p of ctx.products) {
      const details = Array.isArray(p.orderDetails) && p.orderDetails.length
        ? p.orderDetails
        : [null]; // 明細が無い場合でも製品1行は表示したい時

      for (const d of details) {
        rows.push(
          h('tr', {}, [])
        )
      }
    }
    
    const tbody = h('tbody', {}, rows);
	
	/**
	 * テーブルのNode
	 */
    const table = h(
      'table',
      {
        class: 'table-box',
        hidden: ctx.loading || !!ctx.error || ctx.products.length === 0
      },
      [thead, tbody]
    );
	
	return h('div', { class: 'container' }, [header, buttonMenu, table]);
}
