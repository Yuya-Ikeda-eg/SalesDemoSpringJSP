/**
 * アプリケーションの画面表示に係るモジュールです.
 * @author ikeda
 */
import { createApp, h } from './createApp.js';
import { CreateIndexView } from './index.js';
import { loadJson } from './restApi.js';
import { datas } from './data.js'; 

export class appViews {
	// コンストラクタ
	constructor(rootSelector) {
		createApp({
			data: () => (
				// データ一覧
				datas
			),
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
			mounted() {
				// RestAPIを初回自動ロード
				if(!this.loadingOnce) {
					this.loadRestApi();
				}	
			},
			render() {
			   //一覧表示画面を描画
		       return CreateIndexView(h, this);
		     }
	    }).mount(rootSelector); 
  	}
}

