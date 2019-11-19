package com.dgte.erp.rent.service;

import java.util.Optional;

import com.dgte.erp.rent.domain.Lease;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface LeaseService extends LeaseServiceCustom, BaseJpaRepository<Lease, Long> {
    Optional<Lease> findByCode(String code);
}


