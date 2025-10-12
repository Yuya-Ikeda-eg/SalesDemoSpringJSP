package jp.co.nagatake.dto;

import java.time.LocalDate;

import jp.co.nagatake.entity.Orders;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OrderSummaryDto {
    private Integer orderId;
    private LocalDate orderDate;
    private CustomerDto customer;

    public static OrderSummaryDto fromEntity(Orders entity) {
        return new OrderSummaryDto(
            entity.getOrderId(),
            entity.getOrderDate(),
            entity.getCustomer() == null ? null : CustomerDto.fromEntity(entity.getCustomer())
        );
    }
}