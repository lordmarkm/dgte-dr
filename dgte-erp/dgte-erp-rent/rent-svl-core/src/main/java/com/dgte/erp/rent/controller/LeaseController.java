package com.dgte.erp.rent.controller;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.dgte.erp.rent.controller.service.LeaseService;
import com.dgte.erp.rent.shared.dto.LeaseDto;

@Configuration
public class LeaseController {

    @Autowired
    private LeaseService leaseService;

    @Bean
    public Function<LeaseDto, LeaseDto> saveLease() {
        return lease -> leaseService.save(lease);
    }

    @Bean
    public Function<String, List<LeaseDto>> findLeaseByApartmentId() {
        return apartmentId -> leaseService.findByApartmentId(apartmentId);
    }

}
