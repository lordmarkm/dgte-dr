package com.dgtedr.resource;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.BalanceSheetDto;
import com.dgtedr.service.BalanceSheetService;

@RestController
@RequestMapping("/balance-sheet")
public class BalanceSheetResource {

    @Autowired
    private BalanceSheetService balanceSheetService;

    @GetMapping
    public ResponseEntity<BalanceSheetDto> getBalanceSheet(@RequestParam String projectCode,
            @DateTimeFormat(pattern = "yyyy-MMM-dd") @RequestParam LocalDate asOfDate) {
        return balanceSheetService.getBalanceSheet(projectCode, asOfDate)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
