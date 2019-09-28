package com.dgte.erp.games.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.games.domain.Game;
import com.dgte.erp.games.domain.Platform;
import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GameSearchDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.GameService;
import com.dgte.erp.games.service.GameServiceCustom;
import com.dgte.erp.games.service.PlatformService;
import com.dgte.shared.app.exception.InvalidCodeException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
public class GameServiceImpl implements GameServiceCustom {

    @Autowired
    private DgteErpGamesMapper mapper;

    @Autowired
    private GameService gameService;

    @Autowired
    private PlatformService platformService;

    @Override
    public Page<GameDto> findAll(GameSearchDto searchDto, Pageable pageable) {
        return gameService.findAll(searchDto.toQuery(), pageable)
                    .map(mapper::toDto);
    }

    @Override
    @Transactional
    public GameDto save(GameDto game) {
        String platformRefCode = game.getPlatform().getRefCode();
        Optional<Platform> platformOpt = platformService.findByRefCode(platformRefCode);
        if (!platformOpt.isPresent()) {
            throw new InvalidCodeException("No platform with code=" + platformRefCode);
        }

        Game entity = mapper.toEntity(game);
        entity.setPlatform(platformOpt.get());
        return mapper.toDto(gameService.save(entity));
    }

}
