package com.dgte.erp.rent.shared.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ApartmentDto extends BaseDto {

    private String name;
    private String address;

}
