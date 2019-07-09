package com.dgtedr.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.EntryDto;
import com.dgtedr.service.EntryService;

@RestController
@RequestMapping("/entry")
public class EntryResource {

    @Autowired
    private EntryService entries;

    @GetMapping("/find-by-code")
    public ResponseEntity<EntryDto> findByCode(@RequestParam String code) {
        return entries.findDtoByCode(code)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find-by-transaction-code")
    public ResponseEntity<List<EntryDto>> findByTransactionCode(@RequestParam String transactionCode) {
        return ResponseEntity.ok(entries.findDtoByTransactionCode(transactionCode));
    }

    @PostMapping
    public ResponseEntity<EntryDto> save(@RequestBody EntryDto entry) {
        return ResponseEntity.ok(entries.save(entry));
    }

}
