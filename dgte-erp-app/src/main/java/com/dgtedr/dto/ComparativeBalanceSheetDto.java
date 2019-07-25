package com.dgtedr.dto;

import java.time.LocalDate;
import java.util.List;

import com.google.common.collect.Lists;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ComparativeBalanceSheetDto {

    private LocalDate asOfDateA;
    private LocalDate asOfDateB;
    private ProjectDto project;
    private List<ComparativeAccountBalanceDto> assets = Lists.newArrayList();
    private List<ComparativeAccountBalanceDto> liabilities = Lists.newArrayList();
    private List<ComparativeAccountBalanceDto> equities = Lists.newArrayList();

    public ComparativeBalanceSheetDto(BalanceSheetDto balanceSheetA, BalanceSheetDto balanceSheetB) {
        this.project = balanceSheetA.getProject();
        this.asOfDateA = balanceSheetA.getAsOfDate();
        this.asOfDateB = balanceSheetB.getAsOfDate();

        for (AccountBalanceDto assetA : balanceSheetA.getAssets()) {
            AccountBalanceDto assetB = balanceSheetB.findAssetAccountBalance(assetA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(assetA, assetB);
            this.assets.add(cabd);
        }

        for (AccountBalanceDto assetA : balanceSheetA.getLiabilities()) {
            AccountBalanceDto assetB = balanceSheetB.findLiabilityAccountBalance(assetA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(assetA, assetB);
            this.liabilities.add(cabd);
        }

        for (AccountBalanceDto assetA : balanceSheetA.getEquities()) {
            AccountBalanceDto assetB = balanceSheetB.findEquityAccountBalance(assetA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(assetA, assetB);
            this.equities.add(cabd);
        }
    }

}
