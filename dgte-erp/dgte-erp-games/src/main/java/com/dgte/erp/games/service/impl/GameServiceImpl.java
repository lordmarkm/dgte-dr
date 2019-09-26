package com.dgte.erp.games.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.games.domain.Game;
import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GameSearchDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.GameService;
import com.dgte.erp.games.service.GameServiceCustom;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
public class GameServiceImpl implements GameServiceCustom {

    @Autowired
    private DgteErpGamesMapper mapper;

    @Autowired
    private GameService gameService;

    @Override
    public Page<GameDto> findAll(GameSearchDto searchDto, Pageable pageable) {
        return gameService.findAll(searchDto.toQuery(), pageable)
                    .map(mapper::toDto);
    }

    @Override
    @Transactional
    public GameDto save(GameDto game) {
        Game entity = mapper.toEntity(game);
        return mapper.toDto(gameService.save(entity));
    }

}
