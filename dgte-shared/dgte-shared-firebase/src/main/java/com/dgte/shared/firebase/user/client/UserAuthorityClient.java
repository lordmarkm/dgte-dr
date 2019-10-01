package com.dgte.shared.firebase.user.client;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("user")
public interface UserAuthorityClient {

    @GetMapping("/api/user-authority")
    ResponseEntity<List<GrantedAuthority>> getUserAuthorities(@RequestParam String username);

}
