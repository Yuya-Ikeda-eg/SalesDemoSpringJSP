/**
 * createAppオブジェクトのdataプロパティです.
 * @author ikeda
 */
export const datas = {
	// 各種ボタン
	home: 'Home',
	login: 'ログイン',
	create: '新規登録',
	update: '更新',
	delete: '削除',
	// ページ遷移
	route: 'index',
	// テーブルカラム
	productName: '商品名',
	category: '商品カテゴリー',
	quantity: '発注量',
	price: '仕入額',
	orderDate: '注文日時',
	customerName: '顧客名',
	country: '居住地',
	// JSON初回読み込み用フラグ
	loadedOnce: false,
	// JSON読み込み状態
	loading: false,
	error: null,
	// RestAPIのJSON格納配列
	products: [],
	// RestAPIのパス
	restApiUri: '/SalesDemoSpringJSP/api/products'
}