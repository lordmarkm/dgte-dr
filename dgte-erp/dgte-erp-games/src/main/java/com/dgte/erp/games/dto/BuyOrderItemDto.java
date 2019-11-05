package com.dgte.erp.games.dto;

import java.math.BigDecimal;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BuyOrderItemDto extends OrderItemDto {

    private BigDecimal buyPrice = BigDecimal.ZERO;
    private BigDecimal buyRupees = BigDecimal.ZERO;

}
