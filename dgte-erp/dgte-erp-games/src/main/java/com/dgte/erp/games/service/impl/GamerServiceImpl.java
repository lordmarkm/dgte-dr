package com.dgte.erp.games.service.impl;

import java.math.BigDecimal;
import java.security.Principal;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Primary;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.domain.GamerDeliveryAddress;
import com.dgte.erp.games.domain.GamerWallet;
import com.dgte.erp.games.dto.GamerDeliveryAddressDto;
import com.dgte.erp.games.dto.GamerDto;
import com.dgte.erp.games.dto.GamerWalletDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.GamerService;
import com.dgte.erp.games.service.GamerServiceCustom;
import com.dgte.shared.firebase.FirebaseUserDetails;
import com.dgte.shared.firebase.client.UserAuthorityService;

import lombok.extern.slf4j.Slf4j;

@Primary
@Slf4j
@Transactional(readOnly = true)
public class GamerServiceImpl implements GamerServiceCustom, UserAuthorityService {

    private static final String COMMA = ",";
    private static final String AUTHORITIES_DEFAULT = "ROLE_USER";

    @Autowired
    private DgteErpGamesMapper mapper;

    @Autowired
    private GamerService gamerService;

    @Override
    @Transactional
    public List<GrantedAuthority> getUserAuthorities(FirebaseUserDetails userDetails) {
        String email = userDetails.getUsername();

        Gamer gamer = gamerService.findByEmail(email)
                .orElseGet(() -> {
                    return createGamer(userDetails);
                });

        List<String> auths = Arrays.asList(gamer.getAuthorities().split(COMMA));
        return auths.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());
    }

    private Gamer createGamer(FirebaseUserDetails userDetails) {
        log.info("Creating new gamer. userDetails={}", userDetails);
        Gamer gamer = new Gamer();
        gamer.setDisplayName(userDetails.getDisplayName());
        gamer.setEmail(userDetails.getUsername());
        gamer.setAuthorities(AUTHORITIES_DEFAULT);
        return gamerService.save(gamer);
    }

    @Override
    public Optional<List<GamerDeliveryAddressDto>> findDeliveryAddresses(Principal principal) {
        return gamerService.findByEmail(principal.getName())
            .map(mapper::toDto)
            .map(GamerDto::getAddressesPrimaryFirst);
    }

    @Override
    @Transactional
    public Optional<GamerDeliveryAddressDto> addDeliveryAddress(String email, GamerDeliveryAddressDto addressDto) {
        Optional<Gamer> gamerOpt = gamerService.findByEmail(email);
        if (gamerOpt.isPresent()) {
            Gamer gamer = gamerOpt.get();
            GamerDeliveryAddress address = mapper.toEntity(addressDto);
            if (address.isPrimary()) {
                gamer.getAddresses().forEach(addr -> addr.setPrimary(false));
            }
            gamer.getAddresses().add(address);
            return Optional.of(addressDto);
        } else {
            log.info("Unable to find gamer & add address. email={}", email);
            return Optional.empty();
        }
    }

    @Override
    public Optional<GamerWalletDto> getWallet(String email) {
        Optional<Gamer> gamerOpt = gamerService.findByEmail(email);
        if (gamerOpt.isPresent()) {
            Gamer gamer = gamerOpt.get();
            if (null == gamer.getWallet()) {
                GamerWallet newWallet = new GamerWallet();
                newWallet.setBalance(BigDecimal.ZERO);
                newWallet.setRupees(0);
                gamer.setWallet(newWallet);
            }
            GamerWalletDto wallet = mapper.toDto(gamer.getWallet());
            return Optional.of(wallet);
        } else {
            log.info("Unable to find gamer wallet. email={}", email);
            return Optional.empty();
        }
    }

}
