package com.dgte.erp.rent.dto;

import java.math.BigDecimal;

import com.dgte.shared.app.dto.BaseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomDto extends BaseDto {

    private String apartmentCode;
    private String name;
    private boolean available;
    private BigDecimal priceMonthly;
    private LeaseDto currentLease;

}
