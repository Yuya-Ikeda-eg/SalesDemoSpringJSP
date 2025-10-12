/**
 * ヘッダーに係るjsファイルです.
 * @author ikeda
 */
import { createApp, h } from './app.js';


export class Header {
	// コンストラクタ
	constructor(rootSelecter) {
		createApp({
			data: () => ( {
				a: 'Home',
				b: 'ログイン'
			}),
			computed: {
				
			},
			methods: {
				
			},
			render() {
				return h('nav', { class: 'header' }, [
					h('h1', {}, [
						h('a', { class: 'logo', href: '${pageContext.request.contextPath}/' }, this.a)
					]),
					h('ul', { class: 'menu' }, [
						h('li', {}, [
							h('a', { class: 'menu_right' }, this.b)
						]),
					])
				]);
			}
		}).mount(rootSelecter);
	}
	
}