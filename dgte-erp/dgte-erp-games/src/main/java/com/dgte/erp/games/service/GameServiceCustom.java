package com.dgte.erp.games.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GameSearchDto;

public interface GameServiceCustom {

    Page<GameDto> findAll(GameSearchDto searchDto, Pageable pageable);
    GameDto save(GameDto game);

}
