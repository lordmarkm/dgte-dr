package com.dgtedr.dto;

import com.dgtedr.ref.AccountType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class BaseAccountDto extends BaseDto {

    private String name;
    private String accountCode;
    private String description;
    private AccountType type;
    private boolean permanent;

}
