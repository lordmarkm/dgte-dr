package com.dgtedr.dto;

import java.time.LocalDate;
import java.util.List;

import com.google.common.collect.Lists;

import lombok.Data;

@Data
public class ProfitAndLossDto {

    private LocalDate startDate;
    private LocalDate endDate;
    private ProjectDto project;
    private List<AccountBalanceDto> incomes = Lists.newArrayList();
    private List<AccountBalanceDto> expenses = Lists.newArrayList();

}
