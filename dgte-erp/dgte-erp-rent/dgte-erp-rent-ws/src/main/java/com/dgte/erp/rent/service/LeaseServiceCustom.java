package com.dgte.erp.rent.service;

import java.util.Optional;

import com.dgte.erp.rent.domain.Lease;
import com.dgte.erp.rent.dto.LeaseDto;

public interface LeaseServiceCustom {

    LeaseDto save(LeaseDto lease);
    Optional<Lease> findActiveLeaseByRoomCode(String roomCode);
    Optional<LeaseDto> findActiveLeaseDtoByRoomCode(String roomCode);

}
