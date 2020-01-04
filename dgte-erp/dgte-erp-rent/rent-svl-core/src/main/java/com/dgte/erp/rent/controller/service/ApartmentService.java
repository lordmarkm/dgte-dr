package com.dgte.erp.rent.controller.service;

import java.util.List;
import java.util.Optional;

import com.dgte.erp.rent.shared.dto.ApartmentDto;

public interface ApartmentService {

    ApartmentDto save(ApartmentDto apartment);
    List<ApartmentDto> findByProjectId(String projectId);
    Optional<ApartmentDto> findByCode(String code);

}
