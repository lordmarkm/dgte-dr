package com.dgte.erp.games.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class SellOrderItemDto extends OrderItemDto {

    private BigDecimal sellPrice;
    private BigDecimal sellRupees;

}
