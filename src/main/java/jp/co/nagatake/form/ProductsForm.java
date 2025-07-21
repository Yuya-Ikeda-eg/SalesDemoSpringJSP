package jp.co.nagatake.form;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.Getter;
import lombok.Setter;
/*
 * 商品の削除や更新を行うためのFormクラスです.
 */
@Getter
@Setter
public class ProductsForm {
	
	/*
	 * 商品ID
	 */
	private Integer productId;
	
	/*
	 * 商品名
	 */
	private String productName;
	
	/*
	 * 商品カテゴリー
	 */
	private String category;
	
	/*
	 * 商品詳細リスト
	 */
	private List<OrderDetailsForm> orderDetails;
	
	/*
	 * orderDetailsテーブルのFormクラスを定義
	 */
	public static class OrderDetailsForm{
		/*
		 * 商品詳細ID
		 */
		private Integer orderDetailId;
		
		/*
		 * 発注数
		 */
		private Integer quantity;
		
		/*
		 * 単価
		 */
		private BigDecimal price;
		
		/*
		 * 注文テーブル
		 */
		private OrdersForm orders;
		
	}
	
	public static class OrdersForm{
		
		/*
		 * 注文ID
		 */
		private Integer orderId;
		
		/*
		 * 注文日時
		 */
		private LocalDate orderDate;
		
		/*
		 * 発注担当者
		 */
		private CustomersForm customer;
	}
	
	public static class CustomersForm{
		
		/*
		 * 注文ID
		 */
		private Integer customerId;
		
		/*
		 * 顧客名
		 */
		private String customerName;
		
		/*
		 * 発注元
		 */
		private String country;
	}
	
}
