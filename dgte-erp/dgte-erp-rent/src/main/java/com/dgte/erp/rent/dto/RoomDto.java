package com.dgte.erp.rent.dto;

import java.math.BigDecimal;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;

import com.dgte.shared.app.dto.BaseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RoomDto extends BaseDto {

    @NotEmpty
    private String apartmentCode;

    @NotEmpty
    private String name;

    @Min(0) @Max(Integer.MAX_VALUE)
    private BigDecimal priceMonthly;

    private boolean available;
    private LeaseDto currentLease;

}
