package com.dgte.shared.firebase.client;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;

public interface UserAuthorityService {

    ResponseEntity<List<GrantedAuthority>> getUserAuthorities(String username);

}
