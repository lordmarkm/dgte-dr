package com.dgte.erp.rent.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.erp.rent.dto.ApartmentSearchDto;
import com.dgte.erp.rent.service.ApartmentService;

@RestController
@RequestMapping("/apartment")
public class ApartmentResource {

    @Autowired
    private ApartmentService apartmentService;

    @GetMapping
    public ResponseEntity<Page<ApartmentDto>> search(ApartmentSearchDto searchDto, Pageable pageable) {
        return ResponseEntity.ok(apartmentService.findAll(searchDto, pageable));
    }

    @PostMapping
    public ResponseEntity<ApartmentDto> saveApartment(@RequestBody ApartmentDto apartment) {
        return ResponseEntity.ok(apartmentService.save(apartment));
    }

}
