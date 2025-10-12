package jp.co.nagatake.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import jp.co.nagatake.dto.ProductDto;
import jp.co.nagatake.service.ProductsService;

@RestController
@RequestMapping("/api/products")
public class ProductsApiController {
    private final ProductsService proSer;

    public ProductsApiController(ProductsService proSer) {
        this.proSer = proSer;
    }

    @GetMapping
    public List<ProductDto> list() {
        return proSer.getProductsList()
                     .stream()
                     .map(ProductDto::fromEntity) // DTO化して返却
                     .toList();
    }
}