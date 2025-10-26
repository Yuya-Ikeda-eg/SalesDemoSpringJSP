/**
 * アプリケーションの画面表示に係るモジュールです.
 * @author ikeda
 */
import { createApp, h } from './createApp.js';
import { IndexView } from './indexView.js';
import { CreateView } from './createView.js';
import { loadJson } from './restApi.js';
import { datas } from './data.js';
import { changeViews } from './route.js';

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
				// RestAPIから一覧データを取得
				loadRestApi(restApiUri = this.restApiUri, ctx = this) {
					return loadJson(restApiUri, ctx);
				},
				// SPAページ描画変更
				navigate(route = this.route, ctx = this) {
					changeViews(route, ctx);
				}
			},
			mounted() {
				// RestAPIを初回自動ロード
				if(!this.loadingOnce) {
					this.loadRestApi();
				}	
			},
			render() {
			   // 一覧表示画面を描画
			   if(this.route === 'index') {
				 return IndexView(h, this);  
			   }
			   
			   // 新規登録画面を描画
			   if(this.route === 'create') {
				 return CreateView(h, this);
			   }
		       
		     }
	    }).mount(rootSelector); 
  	}
}

