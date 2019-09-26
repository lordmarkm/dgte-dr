package com.dgte.erp.games.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.GameDto;
import com.dgte.erp.games.dto.GameSearchDto;
import com.dgte.erp.games.service.GameService;

@RestController
@RequestMapping("/game")
public class GameResource {

    @Autowired
    private GameService gameService;

    @GetMapping
    public ResponseEntity<Page<GameDto>> search(GameSearchDto searchDto, Pageable pageable) {
        return ResponseEntity.ok(gameService.findAll(searchDto, pageable));
    }

    @PostMapping
    public ResponseEntity<GameDto> saveGame(@Valid @RequestBody GameDto game) {
        return ResponseEntity.ok(gameService.save(game));
    }

}
