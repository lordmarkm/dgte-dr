package com.dgte.erp.rent.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.controller.service.LeaseService;
import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.model.Lease;
import com.dgte.erp.rent.repo.LeaseRepo;
import com.dgte.erp.rent.shared.dto.LeaseDto;

@Service
public class LeaseServiceImpl implements LeaseService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private LeaseRepo leaseRepo;

    @Override
    public LeaseDto save(LeaseDto dto) {
        Lease entity = mapper.toEntity(dto);
        Lease saved = leaseRepo.save(entity).block();
        return mapper.toDto(saved);
    }

    @Override
    public List<LeaseDto> findByApartmentId(String apartmentId) {
        return leaseRepo.findByApartmentId(apartmentId)
                .map(mapper::toDto)
                .collectList()
                .block();
    }

}
