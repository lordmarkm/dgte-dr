package com.dgte.erp.docs.resource;

import org.jodconverter.office.OfficeException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.docs.service.ProfitAndLossService;

@RestController
@RequestMapping("/profit-and-loss")
public class ProfitAndLossDocResource {

    @Autowired
    private ProfitAndLossService profitAndLossService;

    @GetMapping
    public ResponseEntity<String> test() throws OfficeException {
        profitAndLossService.test();
        return ResponseEntity.ok("test");
    }

}
