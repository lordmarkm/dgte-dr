package com.dgte.erp.rent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.erp.rent.mapper.DgteErpRentMapper;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.service.ApartmentServiceCustom;

@Transactional(readOnly = true)
public class ApartmentServiceImpl implements ApartmentServiceCustom {

    @Autowired
    private DgteErpRentMapper mapper;

    @Autowired
    private ApartmentService apartmentService;

    @Override
    @Transactional
    public ApartmentDto save(ApartmentDto apartment) {
        Apartment entity = mapper.toEntity(apartment);
        return mapper.toDto(apartmentService.save(entity));
    }

}
