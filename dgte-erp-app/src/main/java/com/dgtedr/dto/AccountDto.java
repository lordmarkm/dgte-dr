package com.dgtedr.dto;

import java.util.List;

import com.dgtedr.ref.AccountType;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountDto extends BaseDto {

    private String name;
    private String code;
    private String description;
    private AccountType type;
    private ProjectDto project;
    private List<AccountDto> children;

}
