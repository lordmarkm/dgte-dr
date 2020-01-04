package com.dgte.erp.rent.controller;

import java.util.List;
import java.util.function.Function;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.dgte.erp.rent.controller.service.RoomService;
import com.dgte.erp.rent.shared.dto.RoomDto;

@Configuration
public class RoomController {

    @Autowired
    private RoomService roomService;

    @Bean
    public Function<RoomDto, RoomDto> saveRoom() {
        return room -> roomService.save(room);
    }

    @Bean
    public Function<String, List<RoomDto>> findRoomsByApartmentId() {
        return apartmentId -> roomService.findByApartmentId(apartmentId);
    }

}
