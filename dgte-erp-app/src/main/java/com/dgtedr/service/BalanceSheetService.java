package com.dgtedr.service;

import java.time.LocalDate;
import java.util.Optional;

import com.dgtedr.dto.BalanceSheetDto;

public interface BalanceSheetService {

    Optional<BalanceSheetDto> getBalanceSheet(String projectCode, LocalDate asOfDate);
    Optional<BalanceSheetDto> getBalanceSheet(String projectCode, LocalDate asOfDate, boolean forceRecompute);

}
