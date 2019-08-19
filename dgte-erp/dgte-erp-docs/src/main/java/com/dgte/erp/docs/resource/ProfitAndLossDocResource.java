package com.dgte.erp.docs.resource;

import java.io.IOException;

import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
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
    public ResponseEntity<String> test() throws OfficeException, InvalidPasswordException, IOException {
        profitAndLossService.test();
        return ResponseEntity.ok("test");
    }

}
