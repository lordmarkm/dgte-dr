package com.dgte.erp.rent.service;

import java.util.List;
import java.util.Optional;

import com.dgte.erp.rent.shared.dto.ApartmentDto;

public interface ApartmentService {

    ApartmentDto save(ApartmentDto apartment);
    List<ApartmentDto> findAll();
    Optional<ApartmentDto> findByCode(String code);

}
