package com.dgtedr.dto;

import java.math.BigDecimal;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;

import com.google.common.collect.Lists;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ComparativeAccountBalanceDto {

    private BasicAccountDto account;
    private BigDecimal balanceA;
    private BigDecimal balanceB;
    private List<ComparativeAccountBalanceDto> children = Lists.newArrayList();

    public ComparativeAccountBalanceDto(AccountBalanceDto accountBalanceA, AccountBalanceDto accountBalanceB) {
        this.account = accountBalanceA.getAccount();
        this.balanceA = accountBalanceA.getBalance();
        this.balanceB = accountBalanceB.getBalance();
        if (!CollectionUtils.isEmpty(accountBalanceA.getChildren())) {
            for (AccountBalanceDto childOfA : accountBalanceA.getChildren()) {
                AccountBalanceDto childOfB = accountBalanceB.findChildWithAccountCode(childOfA.getAccount().getCode()).get();
                ComparativeAccountBalanceDto comparativeChild = new ComparativeAccountBalanceDto(childOfA, childOfB);
                this.children.add(comparativeChild);
            }
        }
    }

}
