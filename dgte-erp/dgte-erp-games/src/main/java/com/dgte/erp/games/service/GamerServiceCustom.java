package com.dgte.erp.games.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.dgte.erp.games.dto.GamerDeliveryAddressDto;

public interface GamerServiceCustom {

    Optional<List<GamerDeliveryAddressDto>> findDeliveryAddresses(Principal principal);
    Optional<GamerDeliveryAddressDto> addDeliveryAddress(String username, GamerDeliveryAddressDto address);

}
