package com.dgtedr.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/reports")
public class ReportsResource {

    @GetMapping("/profit-and-loss")
    public ResponseEntity<ProfitAndLossDto> profitAndLoss() {
        
    }

}
