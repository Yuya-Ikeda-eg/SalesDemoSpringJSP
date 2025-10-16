/**
 * ヘッダーに係るjsファイルです.
 * @author ikeda
 */
import { createApp, h } from './createApp.js';


export class Create {
	// コンストラクタ
	constructor(rootSelecter) {
		createApp({
			data: () => ( {
				productName: '商品名',
				category: '商品カテゴリー',
				quantity: '発注量',
				price: '仕入額',
				customerName: '顧客名',
				country: '居住地',
				orderDate: '注文日時'
			}),
			computed: {
				
			},
			methods: {
				
			},
			render() {
				return h('div', { class: 'header' }, '遷移成功');
			}
		}).mount(rootSelecter);
	}
	
}