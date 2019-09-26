package com.dgte.erp.games.resource;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.RefDataDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.PlatformService;
import com.dgte.shared.app.dto.GenericRefDataDto;

@RestController
@RequestMapping("/ref")
public class ReferenceResource {

    @Autowired
    private DgteErpGamesMapper mapper;

    @Autowired
    private PlatformService platformService;

    @GetMapping("/platform")
    public ResponseEntity<List<RefDataDto>> getPlatforms() {
        List<RefDataDto> platforms = platformService.findAll()
                    .stream()
                    .map(mapper::toDto)
                    .collect(Collectors.toList());
        return ResponseEntity.ok(platforms);
    }

}
