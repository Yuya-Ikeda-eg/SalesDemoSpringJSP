package jp.co.nagatake.dto;

import java.util.List;
import java.util.stream.Collectors;

import jp.co.nagatake.entity.OrderDetails;
import jp.co.nagatake.entity.Products;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductDto {
    private String productName;
    private String category;
    private List<OrderDetailDto> orderDetails;

    public static ProductDto fromEntity(Products entity) {
        return new ProductDto(
            entity.getProductName(),
            entity.getCategory(),
            entity.getOrderDetails() == null ? null :
            	entity.getOrderDetails().stream()
            	.map((OrderDetails od) -> OrderDetailDto.fromEntity(od)) 
                .collect(Collectors.toList())
                		);
    }
}