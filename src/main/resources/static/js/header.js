/**
 * ヘッダーNodeに係るjsファイルです.
 * @author ikeda
 */
export function CreateHeaderView(h, ctx) {
	return h('div', {id: 'header_container'}, [
		h('nav', { class: 'header' }, [
			h('h1', {}, [
				h('a', { class: 'logo', href: '${pageContext.request.contextPath}/' }, ctx.home)
			]),
			h('ul', { class: 'menu' }, [
				h('li', {}, [
					h('a', { class: 'menu_right' }, ctx.login)
				]),
			])
		])
	])
};