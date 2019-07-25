package com.dgtedr.dto;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.google.common.collect.Lists;

import lombok.Data;

@Data
public class BalanceSheetDto {

    private LocalDate asOfDate;
    private ProjectDto project;
    private List<AccountBalanceDto> assets = Lists.newArrayList();
    private List<AccountBalanceDto> liabilities = Lists.newArrayList();
    private List<AccountBalanceDto> equities = Lists.newArrayList();

    @JsonIgnore
    public AccountBalanceDto findAssetAccountBalance(String accountCode) {
        return this.assets.stream().filter(asset -> accountCode.equals(asset.getAccount().getCode())).findFirst().get();
    }

    @JsonIgnore
    public AccountBalanceDto findLiabilityAccountBalance(String accountCode) {
        return this.liabilities.stream().filter(asset -> accountCode.equals(asset.getAccount().getCode())).findFirst().get();
    }

    @JsonIgnore
    public AccountBalanceDto findEquityAccountBalance(String accountCode) {
        return this.equities.stream().filter(asset -> accountCode.equals(asset.getAccount().getCode())).findFirst().get();
    }

}
