package com.dgtedr.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.domain.AccountBalance;
import com.dgtedr.dto.DashboardDto;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountBalanceService;

@RestController
@RequestMapping("/dashboard")
public class DashboardResource {

    @GetMapping
    public ResponseEntity<DashboardDto> findByProjectCode(@RequestParam String projectCode) {
        return null;
    }

}
