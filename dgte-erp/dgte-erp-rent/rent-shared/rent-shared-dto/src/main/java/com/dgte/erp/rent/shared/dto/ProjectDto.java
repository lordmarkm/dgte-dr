package com.dgte.erp.rent.shared.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class ProjectDto extends BaseDto {

    private String name;

}
