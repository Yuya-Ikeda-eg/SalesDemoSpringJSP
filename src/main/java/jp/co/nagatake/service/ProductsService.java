package jp.co.nagatake.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jp.co.nagatake.entity.Products;
import jp.co.nagatake.form.ProductsForm;
import jp.co.nagatake.repository.ProductsRepository;

@Service
public class ProductsService {
	
	@Autowired
	private ProductsRepository proRep;
	
	/*
	 * 商品リストを取得するメソッド
	 */
	public List<Products> getProductsList(){
		return proRep.findAllWithOrderDetails();
	}
	
	/*
	 * 商品リストを登録するメソッド
	 */
	public void registerProduct(ProductsForm form) {
		Products pro = formToEntity(form);
		proRep.save(pro);
	}
	/*
	 * フォームオブジェクトをエンティティに詰め替えるメソッド
	 */
	public Products formToEntity(ProductsForm form) {
		//エンティティ格納用オブジェクト作成
		Products products = new Products();
		//フォームオブジェクトからエンティティへ詰め替える
		BeanUtils.copyProperties(form, products);
		return products;
	}
	
	/*
	 * 商品削除メソッド
	 */
	public void deleteProduct(Integer id) {
		proRep.deleteById(id);
	}
	
	/*
	 * 更新対象商品情報取得メソッド
	 */
	public Products updateProduct(Integer id) {
		Optional<Products> op = proRep.findById(id);
		Products pro = new Products();
		if(op.isPresent()) {
			pro = op.get();
		}
		return pro;
	}

}
