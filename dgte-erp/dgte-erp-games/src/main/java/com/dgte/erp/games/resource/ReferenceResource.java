package com.dgte.erp.games.resource;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.RefDataDto;
import com.dgte.erp.games.dto.ReferencesDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.CopyStatusService;
import com.dgte.erp.games.service.PlatformService;

@RestController
@RequestMapping("/references")
public class ReferenceResource {

    @Autowired
    private DgteErpGamesMapper mapper;

    @Autowired
    private PlatformService platformService;

    @Autowired
    private CopyStatusService copyStatusService;

    @GetMapping
    public ResponseEntity<ReferencesDto> getPlatforms() {
        ReferencesDto references = new ReferencesDto();

        List<RefDataDto> platforms = platformService.findAll()
                    .stream()
                    .map(mapper::toDto)
                    .collect(Collectors.toList());
        references.setPlatforms(platforms);

        List<RefDataDto> gameCopyStatuses = copyStatusService.findAll()
                .stream()
                .map(mapper::toDto)
                .collect(Collectors.toList());
        references.setGameCopyStatuses(gameCopyStatuses);

        return ResponseEntity.ok(references);
    }

}
