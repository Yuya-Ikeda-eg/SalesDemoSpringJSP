<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="jakarta.tags.core" prefix="c"%>
<%@ taglib prefix="form" uri="http://www.springframework.org/tags/form" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>商品情報更新ページ</title>
</head>
<body>
	<form:form modelAttribute="product" action="register">
		<table>
			<tr>
				<td>
					商品ID
				</td>
				<td>
					<form:input path="productId"/>
				</td>
			</tr>
			<tr>
				<td>
					商品名
				</td>
				<td>
					<form:input path="productName"/>
				</td>
			</tr>
			<tr>
				<td>
					商品カテゴリー
				</td>
				<td>
					<form:input path="category"/>
				</td>
			</tr>
		</table>
		<input type="submit" value="更新する">
	</form:form>
</html>