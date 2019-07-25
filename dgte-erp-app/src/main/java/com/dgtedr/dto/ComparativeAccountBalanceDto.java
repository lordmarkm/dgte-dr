package com.dgtedr.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import org.apache.commons.collections4.CollectionUtils;

import com.google.common.collect.Lists;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ComparativeAccountBalanceDto {

    private LocalDate asOfDateA;
    private LocalDate asOfDateB;
    private BasicAccountDto account;
    private BigDecimal balanceA;
    private BigDecimal balanceB;
    private List<ComparativeAccountBalanceDto> children = Lists.newArrayList();

    public ComparativeAccountBalanceDto(LocalDate asOfDateA, LocalDate asOfDateB, AccountBalanceDto accountBalanceA, AccountBalanceDto accountBalanceB) {
        this.account = accountBalanceA.getAccount();
        this.asOfDateA = asOfDateA;
        this.asOfDateB = asOfDateB;
        this.balanceA = accountBalanceA.getBalance();
        this.balanceB = accountBalanceB.getBalance();
        if (!CollectionUtils.isEmpty(accountBalanceA.getChildren())) {
            for (AccountBalanceDto childOfA : accountBalanceA.getChildren()) {
                AccountBalanceDto childOfB = accountBalanceB.findChildWithAccountCode(childOfA.getAccount().getCode()).get();
                ComparativeAccountBalanceDto comparativeChild = new ComparativeAccountBalanceDto(asOfDateA, asOfDateB, childOfA, childOfB);
                this.children.add(comparativeChild);
            }
        }
    }

}
