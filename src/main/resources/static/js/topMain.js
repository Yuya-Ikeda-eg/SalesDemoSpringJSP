/**
 * アプリケーションの画面表示に係るモジュールです.
 * @author ikeda
 */
import { createApp, h } from './app.js';
import { CreateIndexView } from './index.js';
import { loadJson } from './restApi.js';

export class TopMain {
	// コンストラクタ
	constructor(rootSelector) {
		const app = createApp({
			data: () => ({
				// 各種ボタン
				create: '新規登録',
				update: '更新',
				delete: '削除',
				// テーブルカラム
				productName: '商品名',
				category: '商品カテゴリー',
				quantity: '発注量',
				price: '仕入額',
				orderDate: '注文日時',
				customerName: '顧客名',
				country: '居住地',
				// JSON読み込み状態
				loading: false,
				error: null,
				// RestAPIのJSON格納配列
				products: [],
				// RestAPIのパス
				restApiUri: '/SalesDemoSpringJSP/api/products'
			}),
			computed: {
				
			},
			methods: {
				setAction(formName, actionPath) {
					document.forms[formName].action = actionPath;
				},
				// RestAPIから一覧データを取得
				loadRestApi(restApiUri = this.restApiUri, ctx = this) {
					return loadJson(restApiUri, ctx);
				},
			},
			render() {
			   //一覧表示画面を描画
		       return CreateIndexView(h, this);
		     }
	    }).mount(rootSelector); 
  	}
}

