package jp.co.nagatake.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.SequenceGenerator;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "products")
@Getter
@Setter
public class Products {
	
	/*
	 * 商品ID
	 */
	@Id
	@SequenceGenerator(name = "products_product_id_seq" ,sequenceName = "products_product_id_seq",allocationSize = 1)
	@GeneratedValue(generator = "products_product_id_seq",strategy = GenerationType.SEQUENCE)
	@Column(name="product_id")
	private Integer productId; 
	
	/*
	 * 商品名
	 */
	@Column(name="product_name")
	private String productName; 
	
	/*
	 * 商品カテゴリ
	 */
	@Column(name="category")
	private String category; 
	
	/*
	 * 商品詳細エンティティ
	 */
	@OneToMany(mappedBy = "product" ,cascade = CascadeType.ALL,orphanRemoval = true)
	private List<OrderDetails> orderDetails;

}
