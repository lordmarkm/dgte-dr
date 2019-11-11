package com.dgte.erp.games.service;

import java.security.Principal;
import java.util.List;
import java.util.Optional;

import com.dgte.erp.games.dto.GamerDeliveryAddressDto;
import com.dgte.erp.games.dto.GamerWalletDto;

public interface GamerServiceCustom {

    Optional<List<GamerDeliveryAddressDto>> findDeliveryAddresses(Principal principal);
    Optional<GamerDeliveryAddressDto> addDeliveryAddress(String email, GamerDeliveryAddressDto address);
    Optional<GamerWalletDto> getWallet(String email);

}
