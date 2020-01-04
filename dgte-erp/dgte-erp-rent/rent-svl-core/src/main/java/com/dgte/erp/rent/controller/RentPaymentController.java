package com.dgte.erp.rent.controller;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.dgte.erp.rent.controller.service.RentPaymentService;
import com.dgte.erp.rent.shared.dto.RentPaymentDto;

@Configuration
public class RentPaymentController {

    @Autowired
    private RentPaymentService rentPaymentService;

    @Bean
    public Function<RentPaymentDto, RentPaymentDto> saveRentPayment() {
        return rentPayment -> rentPaymentService.save(rentPayment);
    }

    @Bean
    public Function<String, List<RentPaymentDto>> findRentPaymentByLeaseId() {
        return leaseId -> rentPaymentService.findByLeaseId(leaseId);
    }

}
