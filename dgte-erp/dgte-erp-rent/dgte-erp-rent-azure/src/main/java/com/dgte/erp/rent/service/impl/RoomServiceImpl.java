package com.dgte.erp.rent.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.controller.service.RoomService;
import com.dgte.erp.rent.model.Room;
import com.dgte.erp.rent.repo.RoomRepo;
import com.dgte.erp.rent.shared.dto.RoomDto;

@Service
public class RoomServiceImpl implements RoomService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private RoomRepo roomRepo;

    @Override
    public RoomDto save(RoomDto dto) {
        Room saved = roomRepo.save(mapper.toEntity(dto)).block();
        return mapper.toDto(saved);
    }

    @Override
    public List<RoomDto> findByApartmentId(String apartmentId) {
        return roomRepo.findByApartmentId(apartmentId)
                .map(mapper::toDto)
                .collectList().block();
    }

}
