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
@Table(name = "customers")
@Getter
@Setter
public class Customers {
	
	/*
	 * 顧客ID
	 */
	@Id
	@SequenceGenerator(name = "customers_customer_id_seq",sequenceName = "customers_customer_id_seq",allocationSize = 1)
	@GeneratedValue(generator = "customers_customer_id_seq",strategy = GenerationType.SEQUENCE)
	@Column(name = "customer_id")
	private Integer customerId;
	
	/*
	 * 発注担当者
	 */
	@Column(name = "customer_name")
	private String customerName;
	
	/*
	 * 居住地
	 */
	@Column(name = "country")
	private String country;
	
	/*
	 * 注文エンティティ
	 */
	@OneToMany(mappedBy = "customer",cascade = CascadeType.ALL,orphanRemoval = true)
	private List<Orders> orders;

}
