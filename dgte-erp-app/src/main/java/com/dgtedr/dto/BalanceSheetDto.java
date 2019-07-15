package com.dgtedr.dto;

import java.util.List;

import com.google.common.collect.Lists;

import lombok.Data;

@Data
public class BalanceSheetDto {

    private List<AccountBalanceDto> assets = Lists.newArrayList();
    private List<AccountBalanceDto> liabilities = Lists.newArrayList();
    private List<AccountBalanceDto> equities = Lists.newArrayList();

}
