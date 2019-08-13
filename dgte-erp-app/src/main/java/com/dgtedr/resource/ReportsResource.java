package com.dgtedr.resource;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ProfitAndLossDto;
import com.dgtedr.service.ProfitAndLossService;

@RestController
@RequestMapping("/reports")
public class ReportsResource {

    @Autowired
    private ProfitAndLossService profitAndLossService;

    @GetMapping("/profit-and-loss")
    public ResponseEntity<ProfitAndLossDto> profitAndLoss(@RequestParam String projectCode,
            @RequestParam LocalDate startDate,
            @RequestParam LocalDate endDate,
            @RequestParam(required = false) boolean forceRecompute) {
        return profitAndLossService.getProfitAndLoss(projectCode, startDate, endDate, forceRecompute)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
