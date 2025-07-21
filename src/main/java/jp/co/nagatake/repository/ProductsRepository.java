package jp.co.nagatake.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import jp.co.nagatake.entity.Products;

public interface ProductsRepository extends JpaRepository<Products, Integer> {

	@Query("SELECT p FROM Products p " + 
	       "LEFT JOIN FETCH p.orderDetails od " +
		   "LEFT JOIN FETCH od.order o " +
		   "LEFT JOIN FETCH o.customer " +
	       "ORDER BY p.productId ASC")
	List<Products> findAllWithOrderDetails();
}
