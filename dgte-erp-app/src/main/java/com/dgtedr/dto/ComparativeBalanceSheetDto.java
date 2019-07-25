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

        for (AccountBalanceDto assetAccountBalanceA : balanceSheetA.getAssets()) {
            AccountBalanceDto assetAccountBalanceB = balanceSheetB.findAssetAccountBalance(assetAccountBalanceA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(asOfDateA, asOfDateB, assetAccountBalanceA, assetAccountBalanceB);
            this.assets.add(cabd);
        }

        for (AccountBalanceDto liabilityAccountBalanceA : balanceSheetA.getLiabilities()) {
            AccountBalanceDto liabilityAccountBalanceB = balanceSheetB.findLiabilityAccountBalance(liabilityAccountBalanceA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(asOfDateA, asOfDateB, liabilityAccountBalanceA, liabilityAccountBalanceB);
            liabilities.add(cabd);
        }

        for (AccountBalanceDto equityAccountBalanceA : balanceSheetA.getEquities()) {
            AccountBalanceDto equityAccountBalanceB = balanceSheetB.findEquityAccountBalance(equityAccountBalanceA.getAccount().getCode());
            ComparativeAccountBalanceDto cabd = new ComparativeAccountBalanceDto(asOfDateA, asOfDateB, equityAccountBalanceA, equityAccountBalanceB);
            this.equities.add(cabd);
        }
    }

}
