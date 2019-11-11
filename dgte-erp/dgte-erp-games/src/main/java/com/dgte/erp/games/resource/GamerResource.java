package com.dgte.erp.games.resource;

import java.security.Principal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.GamerDeliveryAddressDto;
import com.dgte.erp.games.dto.GamerWalletDto;
import com.dgte.erp.games.service.GamerService;

import lombok.extern.slf4j.Slf4j;

/**
 * TODO secure this
 *
 * @author mbmartinez on 31 Oct 2019
 *
 */
@Slf4j
@RestController
@RequestMapping("/gamer")
public class GamerResource {

    @Autowired
    private GamerService gamerService;

    @GetMapping("/me")
    public ResponseEntity<?> me(Principal principal) {
        log.info("Principal={}", principal);
        return ResponseEntity.ok(principal);
    }

    @GetMapping("/wallet")
    public ResponseEntity<GamerWalletDto> wallet(Principal principal) {
        return gamerService.getWallet(principal.getName())
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.FORBIDDEN).build());
    }

    @GetMapping("/delivery-addresses")
    public ResponseEntity<List<GamerDeliveryAddressDto>> deliveryAddresses(UsernamePasswordAuthenticationToken principal) {
        //TODO this if/else can be removed once we actually secure the urls
        if (null != principal && principal.isAuthenticated()) {
            return gamerService.findDeliveryAddresses(principal)
                        .map(ResponseEntity::ok)
                        .orElseGet(() -> ResponseEntity.notFound().build());
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
    }

    @PostMapping("/delivery-addresses")
    public ResponseEntity<GamerDeliveryAddressDto> addDeliveryAddress(Principal principal, @RequestBody GamerDeliveryAddressDto address) {
        return gamerService.addDeliveryAddress(principal.getName(), address).map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
