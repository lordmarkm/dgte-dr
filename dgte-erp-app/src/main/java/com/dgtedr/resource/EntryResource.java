package com.dgtedr.resource;

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

    @PostMapping
    public ResponseEntity<EntryDto> save(@RequestBody EntryDto entry) {
        return ResponseEntity.ok(entries.save(entry));
    }

}
