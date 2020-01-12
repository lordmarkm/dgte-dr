package com.dgte.erp.rent.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.controller.service.RentPaymentService;
import com.dgte.erp.rent.model.RentPayment;
import com.dgte.erp.rent.repo.RentPaymentRepo;
import com.dgte.erp.rent.shared.dto.RentPaymentDto;
import com.google.common.base.Strings;

@Service
public class RentPaymentServiceImpl implements RentPaymentService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private RentPaymentRepo rentPaymentRepo;

    @Override
    public RentPaymentDto save(RentPaymentDto dto) {
        if (Strings.isNullOrEmpty(dto.getId())) {
            dto.setId(UUID.randomUUID().toString());
        }
        RentPayment entity = mapper.toEntity(dto);
        RentPayment saved = rentPaymentRepo.save(entity).block();
        return mapper.toDto(saved);
    }

    @Override
    public List<RentPaymentDto> findByLeaseId(String leaseId) {
        return rentPaymentRepo.findByLeaseId(leaseId)
                .map(mapper::toDto)
                .collectList()
                .block();
    }

}
