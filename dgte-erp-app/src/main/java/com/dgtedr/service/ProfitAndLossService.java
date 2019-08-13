package com.dgtedr.service;

import java.time.LocalDate;
import java.util.Optional;

import com.dgtedr.dto.ProfitAndLossDto;

public interface ProfitAndLossService {

    Optional<ProfitAndLossDto> getProfitAndLoss(String projectCode, LocalDate startDate, LocalDate endDate, boolean forceRecompute);

}
