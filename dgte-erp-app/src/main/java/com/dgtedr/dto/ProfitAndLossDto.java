package com.dgtedr.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.dgtedr.ref.FixedAccountCodes;
import com.dgtedr.util.BigDecimalUtil;
import com.google.common.collect.Lists;

import lombok.Data;

@Data
public class ProfitAndLossDto {

    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectDto project;
    private List<AccountBalanceDto> incomes = Lists.newArrayList();
    private List<AccountBalanceDto> expenses = Lists.newArrayList();
    private BigDecimal totalIncome;
    private BigDecimal cogs;
    private BigDecimal grossProfit;
    private BigDecimal otherExpenses;
    private BigDecimal netProfit;

    public BigDecimal getTotalIncome() {
        if (null == totalIncome) {
            BigDecimal totalIncome = incomes.stream()
                    .map(AccountBalanceDto::getBalance)
                    .reduce(BigDecimal.ZERO, (subTotal, accountBalance) -> {
                        return subTotal.add(accountBalance);
                    });
            this.totalIncome = totalIncome;
        }
        return totalIncome;
    }

    public BigDecimal getCogs() {
        if (null == cogs) {
            BigDecimal cogs = expenses.stream()
                .filter(expense -> FixedAccountCodes.EXPENSES_COGS.equals(expense.getAccount().getAccountCode()))
                .map(AccountBalanceDto::getBalance)
                .reduce(BigDecimal.ZERO, (subTotal, accountBalance) -> {
                    return subTotal.add(accountBalance);
                });
            this.cogs = cogs;
        }
        return cogs;
    }

    public BigDecimal getGrossProfit() {
        if (null == grossProfit) {
            this.grossProfit = this.getTotalIncome().subtract(this.getCogs());
        }
        return grossProfit;
    }

    public BigDecimal getGrossProfitAsAPercentageOfTotalIncome() {
        if (null == this.getTotalIncome() || BigDecimalUtil.equals(this.getTotalIncome(), BigDecimal.ZERO)) {
            return BigDecimal.ZERO;
        }
        return this.getGrossProfit().divide(this.getTotalIncome());
    }

    /**
     * All expenses other than COGS
     */
    public BigDecimal getOtherExpenses() {
        if (null == otherExpenses) {
            BigDecimal otherExpenses = expenses.stream()
                .filter(expense -> !FixedAccountCodes.EXPENSES_COGS.equals(expense.getAccount().getAccountCode()))
                .map(AccountBalanceDto::getBalance)
                .reduce(BigDecimal.ZERO, (subTotal, accountBalance) -> {
                    return subTotal.add(accountBalance);
                });
            this.otherExpenses = otherExpenses;
        }
        return otherExpenses;
    }

    public BigDecimal getNetProfit() {
        if (null == netProfit) {
            BigDecimal netProfit = this.getGrossProfit().subtract(this.getOtherExpenses());
            this.netProfit = netProfit;
        }
        return netProfit;
    }

    public BigDecimal getNetProfitAsAPercentageOfTotalIncome() {
        if (null == this.getTotalIncome() || BigDecimalUtil.equals(this.getTotalIncome(), BigDecimal.ZERO)) {
            return BigDecimal.ZERO;
        }
        return this.getNetProfit().divide(this.getTotalIncome());
    }

}
