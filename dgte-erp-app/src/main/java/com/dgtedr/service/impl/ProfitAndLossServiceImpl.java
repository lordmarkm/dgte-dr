package com.dgtedr.service.impl;

import java.time.LocalDate;
import java.util.Optional;

import com.dgtedr.dto.ProfitAndLossDto;
import com.dgtedr.service.ProfitAndLossService;

public class ProfitAndLossServiceImpl implements ProfitAndLossService {

    @Override
    public Optional<ProfitAndLossDto> getBalanceSheet(String projectCode, LocalDate startDate, LocalDate endDate,
            boolean forceRecompute) {
        // TODO Auto-generated method stub
        return null;
    }

}
