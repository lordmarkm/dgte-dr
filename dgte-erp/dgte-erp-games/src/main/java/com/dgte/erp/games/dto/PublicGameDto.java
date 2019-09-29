package com.dgte.erp.games.dto;

import java.math.BigDecimal;

import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.app.dto.GenericRefDataDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class PublicGameDto extends BaseDto {

    private String name;
    private String shortName;
    private GenericRefDataDto platform;
    private BigDecimal buylistPrice;
    private BigDecimal sellPrice;
    private String imageUrl;

}
