package com.dgte.erp.rent;

import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

import com.dgte.erp.rent.model.Apartment;
import com.dgte.erp.rent.repo.ApartmentRepo;
import com.dgte.erp.rent.shared.dto.ApartmentDto;

@SpringBootApplication
public class AzureRentApplication {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private ApartmentRepo apartmentRepo;

    @Bean
    public Function<ApartmentDto, ApartmentDto> save() {
        return dto -> {
            Apartment entity = mapper.toEntity(dto);
            Apartment saved = apartmentRepo.save(entity);
            return mapper.toDto(saved);
        };
    }

    public static void main(String[] args) throws Exception {
        SpringApplication.run(AzureRentApplication.class, args);
    }

}
