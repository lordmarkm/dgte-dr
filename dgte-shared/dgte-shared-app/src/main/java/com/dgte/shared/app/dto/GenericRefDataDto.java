package com.dgte.shared.app.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class GenericRefDataDto extends BaseDto {

    private String value;

}
