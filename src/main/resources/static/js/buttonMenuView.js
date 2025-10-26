/**
 * ボタンメニューNodeに係るjsファイルです.
 * @author ikeda
 */

export function ButtonMenu(h, ctx) {
	return h('div', {}, [
	  h('div', { class: 'form-buttons' }, [
	    // 新規登録ボタン（クリックイベントで画面遷移 or API呼び出し）
	    h('button', {
	      type: 'button',                
	      class: 'button button-left',
	      onClick: () => ctx.navigate('create', ctx) 
	    }, ctx.create)
	  ]),
	  
	  h('div', { class: 'form-buttons' }, [
	    h('button', {
	      type: 'button',
	      class: 'button',
	      onClick: () => ctx.navigate('update') 
	    }, ctx.update),
	    h('button', {
	      type: 'button',
	      class: 'button',
	      onClick: () => ctx.navigate('delete')
	    }, ctx.delete)
	  ])
	]);
}
