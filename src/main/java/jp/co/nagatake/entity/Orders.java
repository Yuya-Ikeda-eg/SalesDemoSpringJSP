package jp.co.nagatake.entity;

import java.time.LocalDate;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "orders")
@Getter
@Setter
public class Orders {
	
	/*
	 * 注文ID
	 */
	@Id
	@SequenceGenerator(name = "orders_order_id_seq" ,sequenceName = "orders_order_id_seq",allocationSize = 1)
	@GeneratedValue(generator = "orders_order_id_seq",strategy = GenerationType.SEQUENCE)
	@Column(name = "order_id")
	private Integer orderId;
	
	/*
	 * 顧客ID
	 */
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "customer_id",nullable = false)
	private Customers customer;
	
	/*
	 * 注文日時
	 */
	@Column(name = "order_date")
	private LocalDate orderDate;
	
	/*
	 * 商品詳細エンティティ
	 */
	@OneToMany(mappedBy = "order" ,cascade = CascadeType.ALL,orphanRemoval = true)
	private List<OrderDetails> orderDetails;

}
