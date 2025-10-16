/**
 * RestAPIとのJSON処理に係るモジュールです.
 * @author ikeda
 */

// RestApiからJSONを取得します.
export async function loadJson(restApiUri, ctx) {
    ctx.loading = true;
    ctx.error = null;
    try {
      const res = await fetch(restApiUri);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      ctx.products = Array.isArray(json) ? json : [];
      ctx.loadedOnce = true;
    } catch (e) {
      console.error(e);
      ctx.error = 'データ取得に失敗しました。時間をおいて再度お試しください。';
      ctx.products = [];
    } finally {
      ctx.loading = false;
    }
}