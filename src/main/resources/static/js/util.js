/**
 * ユーティリティ関数を提供するjsファイルです.
 * @author ikeda
 */

/** 引数の値を文字列へ変換します */
function toText(v) {
  return v == null ? '' : String(v);
}

/** 引数で受け取った整数に「¥」を付与します */
function formatJPY(n) {
  try {
    return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY' }).format(n);
  } catch { return String(n); }
}

/** 日付の表示を「YYYY-MM-DD HH:MM」へ変換します */
function formatDateTime(isoLike) {
  const d = new Date(isoLike);
  if (isNaN(d)) return toText(isoLike);
  const pad = (x) => String(x).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export { toText, formatJPY, formatDateTime };