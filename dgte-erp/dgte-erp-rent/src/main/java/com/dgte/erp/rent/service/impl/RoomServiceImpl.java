package com.dgte.erp.rent.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.rent.domain.Apartment;
import com.dgte.erp.rent.domain.Room;
import com.dgte.erp.rent.dto.LeaseDto;
import com.dgte.erp.rent.dto.RoomDto;
import com.dgte.erp.rent.dto.RoomSearchDto;
import com.dgte.erp.rent.mapper.DgteErpRentMapper;
import com.dgte.erp.rent.service.ApartmentService;
import com.dgte.erp.rent.service.LeaseService;
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

    @Autowired
    private LeaseService leaseService;

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

    @Override
    public Page<RoomDto> findAll(RoomSearchDto searchDto, Pageable pageable) {
        return roomService.findAll(searchDto.toQuery(), pageable)
                .map(mapper::toDto)
                .map(this::addCurrentLease);
    }

    private RoomDto addCurrentLease(RoomDto room) {
        Optional<LeaseDto> leaseDto = leaseService.findActiveLeaseDtoByRoomCode(room.getCode());
        if (leaseDto.isPresent()) {
            room.setCurrentLease(leaseDto.get());
        }
        return room;
    }
}
