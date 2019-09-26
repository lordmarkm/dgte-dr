package com.dgte.erp.games.dto;

import com.dgte.shared.app.dto.GenericRefDataDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RefDataDto extends GenericRefDataDto {

    private String name;
    private String shortName;

}
