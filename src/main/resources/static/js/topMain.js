/**
 * トップページに係るjsファイルです.
 * @author ikeda
 */
import { createApp, h } from './app.js';

export class TopMain {
	// コンストラクタ
	constructor(rootSelector) {
		const app = createApp({
			data: () => ({
				create: '新規登録',
				update: '更新',
				delete: '削除',
				productId: '商品ID',
				productName: '商品名',
				category: '商品カテゴリー',
				orderDetailId: '注文詳細ID',
				quantity: '発注量',
				price: '仕入額',
				orderDate: '注文日時',
				customerName: '顧客名',
				country: '居住地',
				// 状態
				loading: false,
				error: null,
				// RestAPIのJSON格納配列
				products: [],
				restApiUri: '/SalesDemoSpringJSP/api/products'
			}),
			computed: {
				
			},
			methods: {
				setAction(formName, actionPath) {
					document.forms[formName].action = actionPath;
				},
				async loadRestApi(restApiUri = this.restApiUri) {
				    this.loading = true;
				    this.error = null;
				    try {
				      const res = await fetch(restApiUri);
				      if (!res.ok) throw new Error(`HTTP ${res.status}`);
				      const json = await res.json();
				      this.products = Array.isArray(json) ? json : [];
				    } catch (e) {
				      console.error(e);
				      this.error = 'データ取得に失敗しました。時間をおいて再度お試しください。';
				      this.products = [];
				    } finally {
				      this.loading = false;
				    }
				},
			},
			render() {
		        // 操作フォーム
		        const forms = h('div', {}, [
		          h('form', { method: 'post', name: 'createForm', action: 'create' }, [
		            h('input', { type: 'submit', value: this.create, class: 'button button-left' })
		          ]),
		          h('form', { method: 'post', name: 'updateDeleteForm' }, [
		            h('input', {
		              type: 'submit',
		              value: this.update,
		              class: 'button',
		              onClick: () => this.setAction('updateDeleteForm', 'update')
		            }),
		            h('input', {
		              type: 'submit',
		              value: this.delete,
		              class: 'button',
		              onClick: () => this.setAction('updateDeleteForm', 'delete')
		            })
		          ])
		        ]);
	
		        // ヘッダ
		        const thead = h('thead', {}, [
		          h('tr', {}, [
		            h('th', {}),
		            h('th', {}, this.productId),
		            h('th', {}, this.productName),
		            h('th', {}, this.category),
		            h('th', {}, this.orderDetailId),
		            h('th', {}, this.quantity),
		            h('th', {}, this.price),
		            h('th', {}, this.orderDate),
		            h('th', {}, this.customerName),
		            h('th', {}, this.country)
		          ])
		        ]);
	
		        const rows = [];
		        for (const p of this.products) {
		          const details = Array.isArray(p.orderDetails) && p.orderDetails.length
		            ? p.orderDetails
		            : [null]; // 明細が無い場合でも製品1行は表示したい時
		
		          for (const d of details) {
		            rows.push(
		              h('tr', {}, [
		                h('td', {}, [
		                  h('input', {
		                    type: 'radio',
		                    name: 'productId',
		                    value: p?.productId ?? ''
		                  })
		                ]),
		                h('td', {}, toText(p?.productId)),
		                h('td', {}, toText(p?.productName)),
		                h('td', {}, toText(p?.category)),
		                h('td', {}, toText(d?.orderDetailId)),
		                h('td', {}, toText(d?.quantity)),
		                h('td', {}, d?.price != null ? formatJPY(d.price) : ''),
		                h('td', {}, d?.order?.orderDate ? formatDateTime(d.order.orderDate) : ''),
		                h('td', {}, toText(d?.order?.customer?.customerName)),
		                h('td', {}, toText(d?.order?.customer?.country))
		              ])
		            );
		          }
		        }

		        const tbody = h('tbody', {}, rows);
		
		        const table = h(
		          'table',
		          {
		            class: 'table-box',
		            hidden: this.loading || !!this.error || this.products.length === 0
		          },
		          [thead, tbody]
		        );
	
		        return h('div', { class: 'container' }, [forms, table]);
		     }
	    }).mount(rootSelector);
	  
  	}
}

/* 表示用ユーティリティ */
function toText(v) {
  return v == null ? '' : String(v);
}
function formatJPY(n) {
  try {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(n);
  } catch { return String(n); }
}
function formatDateTime(isoLike) {
  const d = new Date(isoLike);
  if (isNaN(d)) return toText(isoLike);
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}
