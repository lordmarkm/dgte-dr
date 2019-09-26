package com.dgte.erp.games.service;

import java.util.Optional;

import com.dgte.erp.games.domain.Game;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface GameService extends GameServiceCustom, BaseJpaRepository<Game, Long> {

    Optional<Game> findByCode(String code);

}
