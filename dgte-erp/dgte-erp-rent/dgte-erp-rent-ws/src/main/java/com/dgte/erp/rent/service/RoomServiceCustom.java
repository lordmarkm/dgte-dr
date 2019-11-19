package com.dgte.erp.rent.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.rent.dto.RoomDto;
import com.dgte.erp.rent.dto.RoomSearchDto;

public interface RoomServiceCustom {

    Page<RoomDto> findAll(RoomSearchDto searchDto, Pageable pageable);
    RoomDto save(RoomDto room);

}
