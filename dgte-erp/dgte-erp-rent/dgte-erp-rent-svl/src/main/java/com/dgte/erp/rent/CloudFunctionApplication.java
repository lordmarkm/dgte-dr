package com.dgte.erp.rent;

import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.web.client.RestTemplate;

import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.dgte.shared.firebase.FirebaseConfig;
import com.github.fabiomaffioletti.firebase.EnableFirebaseRepositories;

@SpringBootApplication
@EnableFirebaseRepositories
@Import({ FirebaseConfig.class })
public class CloudFunctionApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(CloudFunctionApplication.class, args);
    }

    @Autowired
    private ApartmentService apartmentService;

    @Bean
    public RestTemplate restTemplate() {
        return new RestTemplate();
    }

    @Bean
    public Function<ApartmentDto, ApartmentDto> saveApartment() {
        return apartment -> apartmentService.save(apartment);
    }

    @Bean
    public Supplier<List<ApartmentDto>> findApartments() {
        return () -> apartmentService.findAll();
    }

    @Bean
    public Function<String, ApartmentDto> findApartmentByCode() {
        return code -> apartmentService.findByCode(code).orElseGet(() -> null);
    }

}
