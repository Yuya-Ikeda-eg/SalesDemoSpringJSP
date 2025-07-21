package jp.co.nagatake.form;

import java.util.ArrayList;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

/*
 * 複数の商品を同時に登録するためのFormクラスです.
 */
@Getter
@Setter
public class ProductsBatchForm {
	
	/*
	 * 商品Formクラスのリスト
	 */
	private List<ProductsForm> productsFormList = new ArrayList<ProductsForm>();

}
