package com.dgte.erp.rent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.dto.ApartmentDto;
import com.dgte.erp.rent.dto.ApartmentSearchDto;
import com.dgte.erp.rent.mapper.DgteErpRentMapper;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.service.ApartmentServiceCustom;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
public class ApartmentServiceImpl implements ApartmentServiceCustom {

    @Autowired
    private DgteErpRentMapper mapper;

    @Autowired
    private ApartmentService apartmentService;

    @Override
    public Page<ApartmentDto> findAll(ApartmentSearchDto searchDto, Pageable pageable) {
        return apartmentService.findAll(searchDto.toQuery(), pageable)
                    .map(mapper::toDto);
    }

    @Override
    @Transactional
    public ApartmentDto save(ApartmentDto apartment) {
        Apartment entity = mapper.toEntity(apartment);
        return mapper.toDto(apartmentService.save(entity));
    }

}
