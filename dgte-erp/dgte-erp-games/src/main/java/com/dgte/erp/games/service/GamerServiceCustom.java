package com.dgte.erp.games.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.dto.GamerDeliveryAddressDto;

public interface GamerServiceCustom {

    Gamer findOrCreateFromToken(UsernamePasswordAuthenticationToken principal);
    Optional<List<GamerDeliveryAddressDto>> findDeliveryAddresses(Principal principal);

}
