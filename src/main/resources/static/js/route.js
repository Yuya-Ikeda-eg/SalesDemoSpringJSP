/**
 * 各画面の描画変更にかかるモジュールです.
 * @author ikeda
 */

 /**
  * 画面切り替え関数
  */
 export function changeViews(route, ctx) {
	 return ctx.route = route;
 }