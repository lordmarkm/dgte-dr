package com.dgte.erp.games.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RentOrderItemDto extends OrderItemDto {

    private BigDecimal depositRupees;
    private LocalDate dueDate;

}
