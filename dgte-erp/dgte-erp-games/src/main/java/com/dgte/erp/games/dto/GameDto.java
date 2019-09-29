package com.dgte.erp.games.dto;

import java.math.BigDecimal;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.app.dto.GenericRefDataDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class GameDto extends BaseDto {

    @NotEmpty
    private String name;

    @NotEmpty
    private String shortName;

    @NotNull
    private GenericRefDataDto platform;

    private BigDecimal buylistPrice;
    private BigDecimal sellPrice;
    private String imageUrl;
}
