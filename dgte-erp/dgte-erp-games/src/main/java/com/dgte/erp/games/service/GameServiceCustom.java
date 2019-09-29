package com.dgte.erp.games.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GameSearchDto;
import com.dgte.erp.games.dto.PublicGameDto;

public interface GameServiceCustom {

    List<PublicGameDto> frontPageBuy(GameSearchDto searchDto);
    Page<GameDto> findAll(GameSearchDto searchDto, Pageable pageable);
    GameDto save(GameDto game);

}
