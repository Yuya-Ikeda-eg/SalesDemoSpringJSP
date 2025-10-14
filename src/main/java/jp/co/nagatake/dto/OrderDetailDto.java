package jp.co.nagatake.dto;

import java.math.BigDecimal;

import jp.co.nagatake.entity.OrderDetails;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderDetailDto {
    private Integer quantity;
    private BigDecimal price;
    private OrderSummaryDto order;

    public static OrderDetailDto fromEntity(OrderDetails entity) {
        return new OrderDetailDto(
            entity.getQuantity(),
            entity.getPrice(),
            entity.getOrder() == null ? null : OrderSummaryDto.fromEntity(entity.getOrder())
        );
    }
}
