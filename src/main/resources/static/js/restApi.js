/**
 * RestAPIとのJSON処理に係るモジュールです.
 * @author ikeda
 */

// RestApiからJSONを取得します.
export async function loadJson(restApiUri, ctx) {
  // トグルは true → false の1往復のみ
  ctx.loading = true;

  // ここに“次の状態”を組み立てる（まとめ更新用）
  let nextProducts = ctx.products;
  let nextError = null;
  let nextLoadedOnce = ctx.loadedOnce ?? false;

  try {
    const res = await fetch(restApiUri);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const json = await res.json();
    nextProducts = Array.isArray(json) ? json : [];
    nextLoadedOnce = true; // 成功時のみ true
  } catch (e) {
    console.error(e);
    nextError = 'データ取得に失敗しました。時間をおいて再度お試しください。';
    nextProducts = [];
    // 失敗時は loadedOnce を変更しない（再ロード条件を保つ）
  } finally {
    // ここで“まとめて”反映（リアクティブな再描画が最小限で済む）
    ctx.error = nextError;
    ctx.products = nextProducts;
    ctx.loadedOnce = nextLoadedOnce;
    ctx.loading = false;
  }
}