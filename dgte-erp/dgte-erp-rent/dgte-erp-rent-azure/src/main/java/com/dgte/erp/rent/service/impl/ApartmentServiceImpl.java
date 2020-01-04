package com.dgte.erp.rent.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.controller.service.ApartmentService;
import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.repo.ApartmentRepo;
import com.dgte.erp.rent.shared.dto.ApartmentDto;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ApartmentServiceImpl implements ApartmentService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Override
    public ApartmentDto save(ApartmentDto dto) {
        Apartment entity = mapper.toEntity(dto);
        Apartment saved = apartmentRepo.save(entity).block();
        return mapper.toDto(saved);
    }

    @Override
    public List<ApartmentDto> findByProjectId(String projectId) {
        log.debug("findByProjectId. projectId={}", projectId);
        return apartmentRepo.findByProjectId(projectId)
                .map(mapper::toDto)
                .collectList()
                .block();
    }

    @Override
    public Optional<ApartmentDto> findByCode(String code) {
        // TODO Auto-generated method stub
        return null;
    }

}
