package com.dgte.erp.rent.service;

import java.util.Optional;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface ApartmentService extends ApartmentServiceCustom, BaseJpaRepository<Apartment, Long> {

    Optional<Apartment> findByCode(String code);

}
