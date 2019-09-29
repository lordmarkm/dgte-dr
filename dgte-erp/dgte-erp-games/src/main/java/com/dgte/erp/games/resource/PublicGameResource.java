package com.dgte.erp.games.resource;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.GameSearchDto;
import com.dgte.erp.games.dto.PublicGameDto;
import com.dgte.erp.games.service.GameService;

@RestController
@RequestMapping("/public/game")
public class PublicGameResource {

    @Autowired
    private GameService gameService;

    /**
     * This will always return a List with size <= 8, for use in the front page "featured items" grid
     */
    @GetMapping("/buy")
    public ResponseEntity<List<PublicGameDto>> frontPageSearch(GameSearchDto searchDto) {
        return ResponseEntity.ok(gameService.frontPageBuy(searchDto));
    }

}
