package com.dgtedr.resource;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgtedr.dto.ReferenceDto;

@RestController
@RequestMapping("/reference")
public class ReferenceResource {

    @GetMapping
    public ResponseEntity<ReferenceDto> references() {
        return ResponseEntity.ok(ReferenceDto.references());
    }

}
