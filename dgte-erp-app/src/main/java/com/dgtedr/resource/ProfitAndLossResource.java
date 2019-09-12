package com.dgtedr.resource;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ProfitAndLossDto;
import com.dgtedr.service.ProfitAndLossService;

@RestController
@RequestMapping("/profit-and-loss")
public class ProfitAndLossResource {

    @Autowired
    private ProfitAndLossService profitAndLossService;

    @GetMapping
    public ResponseEntity<ProfitAndLossDto> getProfitAndLoss(@RequestParam String projectCode,
            @DateTimeFormat(pattern = "yyyy-MMM-dd") @RequestParam LocalDate startDate,
            @DateTimeFormat(pattern = "yyyy-MMM-dd") @RequestParam LocalDate endDate,
            @RequestParam(required = false, defaultValue = "false") boolean forceRecompute) {
        return profitAndLossService.getProfitAndLoss(projectCode, startDate, endDate, forceRecompute)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
