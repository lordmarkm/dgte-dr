package com.dgte.erp.games.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class OrderDto extends PublicOrderDto {

    private AddressDto buyDeliveryAddress;
    private AddressDto sellDeliveryAddress;

}
