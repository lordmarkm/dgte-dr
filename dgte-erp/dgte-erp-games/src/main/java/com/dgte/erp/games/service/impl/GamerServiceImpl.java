package com.dgte.erp.games.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;

import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.service.GamerService;
import com.dgte.erp.games.service.GamerServiceCustom;
import com.dgte.shared.firebase.FirebaseUserDetails;

public class GamerServiceImpl implements GamerServiceCustom {

    @Autowired
    private GamerService gamerService;

    @Override
    public List<GrantedAuthority> getUserAuthorities(FirebaseUserDetails userDetails) {
        String email = userDetails.getUsername();
        String displayName = userDetails.getDisplayName();

        Gamer gamer = gamerService.findByEmail(email)
                .orElseGet(() -> {
                    return createGamer(userDetails);
                });
        // TODO Auto-generated method stub
        return null;
    }

    private Gamer createGamer(FirebaseUserDetails userDetails) {
        // TODO Auto-generated method stub
        return null;
    }

}
