package com.dgte.erp.rent.controller;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.dgte.erp.rent.controller.service.ApartmentService;
import com.dgte.erp.rent.shared.dto.ApartmentDto;

@Configuration
public class ApartmentController {

    @Autowired
    private ApartmentService apartmentService;

    @Bean
    public Function<ApartmentDto, ApartmentDto> saveApartment() {
        return dto -> apartmentService.save(dto);
    }

    @Bean
    public Function<String, List<ApartmentDto>> findApartmentByProjectId() {
        return projectId -> apartmentService.findByProjectId(projectId);
    }

}
