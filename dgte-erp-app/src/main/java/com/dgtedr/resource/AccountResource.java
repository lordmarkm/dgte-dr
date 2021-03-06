package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.StatusedResponse;
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

    @DeleteMapping
    public ResponseEntity<AccountDto> delete(@RequestParam String code) {
        StatusedResponse<AccountDto> response = service.delete(code);
        return ResponseEntity
                    .status(response.getStatus())
                    .build();
    }

    @GetMapping("/find-by-code")
    public ResponseEntity<AccountDto> findByCode(@RequestParam String code) {
        return service.findDtoByCode(code)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

    @GetMapping("/find-root-by-project-code")
    public ResponseEntity<AccountDto> findRootByProjectCode(@RequestParam String projectCode) {
        return service.findRootByProjectCode(projectCode)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.badRequest().build());
    }

}
