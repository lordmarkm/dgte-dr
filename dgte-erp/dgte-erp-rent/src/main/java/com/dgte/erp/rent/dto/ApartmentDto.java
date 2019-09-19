package com.dgte.erp.rent.dto;

import com.dgte.shared.app.dto.BaseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ApartmentDto extends BaseDto {

    private String projectCode;
    private String name;
    private String address;

}
