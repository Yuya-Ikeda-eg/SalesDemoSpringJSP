package jp.co.nagatake.dto;

import jp.co.nagatake.entity.Customers;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CustomerDto {
    private Integer customerId;
    private String customerName;
    private String country;

    public static CustomerDto fromEntity(Customers entity) {
        return new CustomerDto(
            entity.getCustomerId(),
            entity.getCustomerName(),
            entity.getCountry()
        );
    }
}