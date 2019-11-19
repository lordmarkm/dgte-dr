package com.dgte.erp.rent;

import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.http.ResponseEntity;

import com.dgte.erp.rent.shared.dto.ApartmentDto;
import com.dgte.shared.firebase.FirebaseConfig;
import com.github.fabiomaffioletti.firebase.EnableFirebaseRepositories;
import com.google.common.collect.Lists;

@SpringBootApplication
@EnableFirebaseRepositories
@Import({ FirebaseConfig.class })
public class CloudFunctionApplication {
 
    public static void main(String[] args) {
        SpringApplication.run(CloudFunctionApplication.class, args);
    }
 
    @Bean
    public Function<ApartmentDto, ResponseEntity<ApartmentDto>> saveApartment() {
        return apartment -> ResponseEntity.ok(apartment);
    }

    @Bean
    public Supplier<List<ApartmentDto>> findApartments() {
        return () -> Lists.newArrayList();
    }

    @Bean
    public Function<String, ResponseEntity<ApartmentDto>> findApartmentByCode() {
        return code -> ResponseEntity.ok(new ApartmentDto());
    }

}
