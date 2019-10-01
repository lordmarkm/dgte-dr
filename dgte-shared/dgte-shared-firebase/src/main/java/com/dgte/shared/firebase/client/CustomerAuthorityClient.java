package com.dgte.shared.firebase.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("customer")
public interface CustomerAuthorityClient {

    @GetMapping("/api/customer/user-authority")
    ResponseEntity<List<String>> getUserAuthorities(@RequestParam String username);

}
