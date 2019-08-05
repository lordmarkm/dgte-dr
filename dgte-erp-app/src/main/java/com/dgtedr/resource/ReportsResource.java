package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ProfitAndLossDto;

@RestController
@RequestMapping("/reports")
public class ReportsResource {

    @Autowired
    private ProfitAndLossService profitAndLossService;

    @GetMapping("/profit-and-loss")
    public ResponseEntity<ProfitAndLossDto> profitAndLoss() {
        
    }

}
