package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.AccountDto;
import com.dgtedr.service.AccountService;

@RestController
@RequestMapping("/account")
public class AccountResource {

    @Autowired
    private AccountService service;

    @PostMapping
    public ResponseEntity<AccountDto> save(@RequestBody AccountDto account) {
        return ResponseEntity.ok(service.saveInfo(account));
    }

    @GetMapping("/{projectId}/{code}")
    public ResponseEntity<AccountDto> findByCode(@PathVariable Long projectId, @PathVariable String code) {
        return service.findByCodeInfo(projectId, code)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}