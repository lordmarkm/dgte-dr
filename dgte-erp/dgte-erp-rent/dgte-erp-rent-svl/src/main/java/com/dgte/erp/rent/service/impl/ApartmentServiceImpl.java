package com.dgte.erp.rent.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.logging.log4j.util.Strings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.repo.ApartmentRepo;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.google.common.collect.Lists;

@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private ApartmentRepo repo;

    @Override
    public ApartmentDto save(ApartmentDto apartmentDto) {
        Apartment apartment = mapper.toEntity(apartmentDto);
        if (Strings.isNotBlank(apartment.getCode())) {
            apartment = repo.update(apartment, Lists.newArrayList());
        } else {
            apartment = repo.push(apartment, Lists.newArrayList());
        }
        return mapper.toDto(apartment);
    }

    @Override
    public List<ApartmentDto> findAll() {
        return repo.findAll(Lists.newArrayList()).stream().map(mapper::toDto).collect(Collectors.toList());
    }

    @Override
    public Optional<ApartmentDto> findByCode(String code) {
        return Optional.ofNullable(repo.get(code, Lists.newArrayList())).map(mapper::toDto);
    }

}
