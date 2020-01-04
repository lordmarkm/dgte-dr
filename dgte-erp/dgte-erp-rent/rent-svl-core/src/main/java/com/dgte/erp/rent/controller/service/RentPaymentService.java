package com.dgte.erp.rent.controller.service;

import java.util.List;

import com.dgte.erp.rent.shared.dto.RentPaymentDto;

public interface RentPaymentService {

    RentPaymentDto save(RentPaymentDto Lease);
    List<RentPaymentDto> findByLeaseId(String leaseId);

}
