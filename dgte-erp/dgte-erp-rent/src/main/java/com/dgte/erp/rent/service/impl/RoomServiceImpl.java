package com.dgte.erp.rent.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.domain.Room;
import com.dgte.erp.rent.dto.RoomDto;
import com.dgte.erp.rent.mapper.DgteErpRentMapper;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.service.RoomService;
import com.dgte.erp.rent.service.RoomServiceCustom;
import com.dgte.shared.app.exception.InvalidCodeException;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
public class RoomServiceImpl implements RoomServiceCustom {

    @Autowired
    private DgteErpRentMapper mapper;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ApartmentService apartmentService;

    @Override
    @Transactional
    public RoomDto save(RoomDto room) {
        Optional<Apartment> aptOpt = apartmentService.findByCode(room.getApartmentCode());
        if (aptOpt.isPresent()) {
            Room entity = mapper.toEntity(room);
            entity.setApartment(aptOpt.get());
            return mapper.toDto(roomService.save(entity));
        } else {
            log.error("No apartment with code={}", room.getApartmentCode());
            throw new InvalidCodeException("No apartment with code=" + room.getApartmentCode());
        }
    }

}
