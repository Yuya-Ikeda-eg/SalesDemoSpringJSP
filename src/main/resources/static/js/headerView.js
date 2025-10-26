/**
 * ヘッダーNodeに係るjsファイルです.
 * @author ikeda
 */
export function HeaderView(h, ctx) {
	return h('div', {id: 'header_container'}, [
		h('nav', { class: 'header' }, [
			h('h1', {}, [
				h('button', { class: 'logo', onClick: () => ctx.navigate('index') }, ctx.home)
			]),
			h('h1', { class: 'menu' }, [
				h('button', { class: 'menu_right' }, ctx.login)
			])
		])
	])
};