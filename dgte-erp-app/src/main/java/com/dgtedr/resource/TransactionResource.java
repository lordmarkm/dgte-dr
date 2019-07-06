package com.dgtedr.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.TransactionDto;
import com.dgtedr.service.TransactionService;

@RestController
@RequestMapping("/txn")
public class TransactionResource {

    @Autowired
    private TransactionService service;

    @PostMapping
    public ResponseEntity<TransactionDto> save(@Valid @RequestBody TransactionDto txn) {
        return ResponseEntity.ok(service.save(txn));
    }

    @GetMapping("/find-by-code")
    public ResponseEntity<TransactionDto> findByCode(@RequestParam String code) {
        return service.findDtoByCode(code)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
