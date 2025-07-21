package jp.co.nagatake.controller;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import jp.co.nagatake.enums.Prefecture;
import jp.co.nagatake.form.ProductsForm;
import jp.co.nagatake.service.ProductsService;




@Controller
public class Products {
	
	@Autowired
	private ProductsService proSer;
	
	/*
	 * top.jspへ遷移
	 */
	@GetMapping("/")
	public ModelAndView init(ModelAndView mav) {
		//商品リスト取得し、セッション情報へ登録
		mav.addObject("productsList", proSer.getProductsList());
		//inputページへ遷移
		mav.setViewName("top");
		return mav;
	}
	
	/*
	 * create.jspへ遷移
	 */
	@PostMapping("/create")
	public ModelAndView showCreatePage(ModelAndView mav) {
		//都道府県enum配列をリストに格納
		List<Prefecture> prefectures = Arrays.asList(Prefecture.values());
		//商品リストをセッション情報へ登録
		mav.addObject("productsList", proSer.getProductsList());
		//都道府県リストをセッション情報へ登録
		mav.addObject("prefectures", prefectures);
		//create.jspへ遷移
		mav.setViewName("create");
		return mav;
	}
	
	/*
	 * 新規登録ビジネスロジック呼び出し
	 */
	@PostMapping("/register")
	public ModelAndView register(ModelAndView mav,ProductsForm form) {
		proSer.registerProduct(form);
		//商品リスト取得し、セッション情報へ登録
		mav.addObject("productsList", proSer.getProductsList());
		mav.setViewName("top");
		return mav;
	}
	
	/*
	 * 削除ビジネスロジック呼び出し
	 */
	@PostMapping("/delete")
	public ModelAndView delete(ModelAndView mav,Integer productId) {
		proSer.deleteProduct(productId);
		//商品リスト取得し、セッション情報へ登録
		mav.addObject("productsList", proSer.getProductsList());
		mav.setViewName("top");
		return mav;
	}
	
	/*
	 * 更新ビジネスロジック呼び出し
	 */
	@PostMapping("/update")
	public ModelAndView update(ModelAndView mav ,Integer productId) {
		mav.addObject("product", proSer.updateProduct(productId));
		mav.setViewName("update");
		return mav;
	}
	

}
