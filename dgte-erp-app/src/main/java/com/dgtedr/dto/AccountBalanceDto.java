package com.dgtedr.dto;

import java.math.BigDecimal;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountBalanceDto extends BaseDto {

    private BasicAccountDto account;
    private BigDecimal balance;
    private List<AccountBalanceDto> children;

}
