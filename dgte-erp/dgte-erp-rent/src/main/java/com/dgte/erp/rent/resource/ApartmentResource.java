package com.dgte.erp.rent.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.erp.rent.service.ApartmentService;

@RestController
@RequestMapping("/apartment")
public class ApartmentResource {

    @Autowired
    private ApartmentService apartmentService;

    @PostMapping
    public ResponseEntity<?> saveApartment(ApartmentDto apartment) {
        return ResponseEntity.ok(apartmentService.save(apartment));
    }

}
