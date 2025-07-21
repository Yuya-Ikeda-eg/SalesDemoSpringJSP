<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>新規商品登録</title>
    <script type="text/javascript" src="${pageContext.request.contextPath}/js/create.js"></script>
</head>
<body>
	<form action="/register" method="post">
		<!-- 新規発注テーブル -->
		<table border="1">
			<thead>
				<tr>
					<th>商品名</th>
					<th>商品カテゴリー</th>
					<th>発注量</th>
					<th>仕入単価</th>
					<th>発注担当者</th>
					<th>発注元</th>
					<th>注文日時</th>
				</tr>
			</thead>
			<tbody>
			<!-- 発注テーブル -->
			<tr>
				<!-- 商品名 -->
				<td>
					<select name="productId" id="selectProductName" onchange="updateCategory()">
						<!-- 初期値 -->
						<option value="" data-category="" data-price="">商品名を選択してください</option>
						<!-- プルダウン選択肢 -->
						<c:forEach var="product" items="${productsList}">
							<option value="${product.productId}" data-category="${product.category}" data-price="${product.orderDetails[0].price}">${product.productName}</option>
						</c:forEach>
					</select>
				</td>
				<!-- 商品カテゴリー -->
				<td>
					<input type="text" name="category" id="inputCategory" value="" readonly/>
				</td>
				<!-- 発注数 -->
				<td>
					<input type="text" >
				</td>
				<!-- 単価 -->
				<td>
					<input type="text" name="price" id="inputPrice" value="" readonly/>
				</td>
				<!-- 発注担当者 -->
				<td>
					<input type="text" >
				</td>
				<!-- 発注元 -->
				<td>
					<select name="country">
						<!-- セッション情報から都道府県のenumリストを取得し、要素分ループを回し、要素を取り出す -->
						<c:forEach var="prefecture" items="${prefectures}">
							<option>${prefecture.displayName}</option>
						</c:forEach>
					</select>
				</td>
				<!-- 注文日時 -->
				<td>
					<input type="text" name="orderDate" id="orderDataInput" value="" readonly>
				</td>
			</tr>
			</tbody>
		</table>
	<input type="submit" value="登録">
	</form>
	<input type="button" value="戻る" onclick="window.location.href='${pageContext.request.contextPath}/';">
</body>
</html>

   