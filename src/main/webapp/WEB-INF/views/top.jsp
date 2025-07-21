<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<title>トップページ</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath}/css/style.css">
	<script type="text/javascript">
		function setAction(formName,actionPath){
				document.forms[formName].action = actionPath;
			}
	</script>
</head>
<body>
	<!-- ヘッダー読み込み -->
	<jsp:include page="/WEB-INF/views/header.jsp" />
	<div class="container">
		<!-- 新規登録 -->
		<form method="post" name="createForm" action="create">
			<input type="submit" value="新規登録" class="button button-left">
		</form>
		<!-- 商品一覧表示画面 更新、削除処理 -->
		<form method="post" name="updateDeleteForm">
			<input type="submit" value="更新" class="button" onclick="setAction('updateDeleteForm','update')"/>
			<input type="submit" value="削除" class="button" onclick="setAction('updateDeleteForm','delete')"/>
			<table class="table-box">
				<thead>
					<tr>
						<th></th>
						<th>商品ID</th>
						<th>商品名</th>
						<th>商品カテゴリー</th>
						<th>注文詳細ID</th>
						<th>発注量</th>
						<th>仕入額</th>
						<th>注文日時</th>
						<th>顧客名</th>
						<th>居住地</th>
				</thead>
				<tbody>
					<c:forEach var="product" items="${productsList}">
						<c:forEach var = "detail" items="${product.orderDetails}">
							<tr>
								<td>
									<input type="radio" name="productId" value="${product.productId}">
								</td>
								<td>
									${product.productId}
								</td>
								<td>
									${product.productName}
								</td>
								<td>
									${product.category}
								</td>
								<td>
									${detail.orderDetailId} 
								</td>
								<td>
									${detail.quantity} 
								</td>
								<td>
									${detail.price} 
								</td>
								<td>
									${detail.order.orderDate} 
								</td>
								<td>
									${detail.order.customer.customerName} 
								</td>
								<td>
									${detail.order.customer.country} 
								</td>
							</tr>
						</c:forEach>
					</c:forEach>
				</tbody>
			</table>
		</form>
	</div>
</body>
</html>