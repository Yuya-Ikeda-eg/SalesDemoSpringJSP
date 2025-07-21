/**
 * 発注画面のJS
 */
//商品名が選択された時に商品カテゴリーを自動で更新する関数
    function updateCategory(){
        const productSelect = document.getElementById("selectProductName");
        const categoryInput = document.getElementById("inputCategory");
        const priceInput = document.getElementById("inputPrice");
        //商品名のセレクトタグから選択したインデックスを取得する
        const selectedOption = productSelect.options[productSelect.selectedIndex];
        //ユーザが選択した商品名に紐づく商品カテゴリーを取得する
        const category = selectedOption.getAttribute("data-category") || "";

      	//ユーザが選択した商品名に紐づく商品カテゴリーを取得する
        const price = selectedOption.getAttribute("data-price") || "";

      	//選択した商品名に紐づく商品カテゴリーに更新する
      	categoryInput.value = category;
      	//選択した商品名に紐づく単価に更新する
      	priceInput.value = price;
    }

    //注文日時を自動で表示させる関数
    document.addEventListener("DOMContentLoaded",function(){
        //本日の日付を取得する
        const today = new Date();
        //日付をYYYY-MM-DDフォーマット形式へ変換
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2,'0');
        const day = String(today.getDate()).padStart(2,'0');
        const formattedDate = `${year}-${month}-${day}`;
        //注文日時テーブルに設定
        document.getElementById("orderDataInput").value = formattedDate;
        });