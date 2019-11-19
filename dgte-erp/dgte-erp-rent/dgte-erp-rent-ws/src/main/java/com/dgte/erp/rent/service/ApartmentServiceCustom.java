package com.dgte.erp.rent.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.erp.rent.dto.ApartmentSearchDto;

public interface ApartmentServiceCustom {

    Page<ApartmentDto> findAll(ApartmentSearchDto searchDto, Pageable pageable);
    ApartmentDto save(ApartmentDto apartment);

}
