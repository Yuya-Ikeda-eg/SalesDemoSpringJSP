package jp.co.nagatake.entity;

import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "order_details")
@Getter
@Setter
public class OrderDetails {
	
	/*
	 * 注文詳細ID
	 */
	@Id
	@SequenceGenerator(name = "order_details_order_detail_id_seq",sequenceName = "order_details_order_detail_id_seq",allocationSize = 1)
	@GeneratedValue(generator = "order_details_order_detail_id_seq",strategy = GenerationType.SEQUENCE)
	@Column(name = "order_detail_id")
	private Integer orderDetailId;
	
	/*
	 * 注文ID
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id",nullable = false)
	private Orders order;
	
	/*
	 * 商品ID
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id",nullable = false)
	private Products product;
	
	/*
	 * 発注量
	 */
	@Column(name = "quantity")
	private Integer quantity;
	
	/*
	 * 仕入単価
	 */
	@Column(name = "price")
	private BigDecimal price;
}
