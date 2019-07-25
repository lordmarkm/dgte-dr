package com.dgtedr.dto;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.apache.commons.collections4.CollectionUtils;

import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class AccountBalanceDto extends BaseDto {

    private BasicAccountDto account;
    private BigDecimal balance;
    private List<AccountBalanceDto> children;

    @JsonIgnore
    public Optional<AccountBalanceDto> findChildWithAccountCode(String accountCode) {
        if (!CollectionUtils.isEmpty(this.children)) {
            return this.children.stream().filter(child -> accountCode.equals(child.getAccount().getCode())).findFirst();
        }
        return Optional.empty();
    }

}
