package com.dgte.erp.rent.controller.service;

import java.util.List;

import com.dgte.erp.rent.shared.dto.RoomDto;

public interface RoomService {

    RoomDto save(RoomDto room);
    List<RoomDto> findByApartmentId(String apartmentId);

}
