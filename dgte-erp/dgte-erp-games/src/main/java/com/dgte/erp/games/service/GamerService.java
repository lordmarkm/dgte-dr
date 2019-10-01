package com.dgte.erp.games.service;

import java.util.Optional;

import com.dgte.erp.games.domain.Gamer;
import com.dgte.shared.firebase.client.UserAuthorityService;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface GamerService extends GamerServiceCustom, BaseJpaRepository<Gamer, Long> {

    Optional<Gamer> findByEmail(String email);

}
