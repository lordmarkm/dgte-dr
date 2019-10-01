package com.dgte.shared.firebase.client;

import java.util.List;

import org.springframework.security.core.GrantedAuthority;

import com.dgte.shared.firebase.FirebaseUserDetails;

public interface UserAuthorityService {

    List<GrantedAuthority> getUserAuthorities(FirebaseUserDetails firebaseUserDetails);

}
