package com.dgte.erp.rent.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.repo.ApartmentRepo;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.shared.dto.ApartmentDto;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private ApartmentRepo repo;

    @Override
    public void save(ApartmentDto apartmentDto) {
        Apartment apartment = mapper.toEntity(apartmentDto);
        repo.push(apartment, uriVariables);
    }

}
