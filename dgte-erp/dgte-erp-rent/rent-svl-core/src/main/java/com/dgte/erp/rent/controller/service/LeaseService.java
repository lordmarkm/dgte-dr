package com.dgte.erp.rent.controller.service;

import java.util.List;

import com.dgte.erp.rent.shared.dto.LeaseDto;

public interface LeaseService {

    LeaseDto save(LeaseDto Lease);
    List<LeaseDto> findByApartmentId(String apartmentId);

}
