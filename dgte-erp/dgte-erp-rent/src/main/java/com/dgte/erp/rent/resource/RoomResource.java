package com.dgte.erp.rent.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.dto.RoomDto;
import com.dgte.erp.rent.service.RoomService;

@RestController
@RequestMapping("/room")
public class RoomResource {

    @Autowired
    private RoomService roomService;

    @PostMapping
    public ResponseEntity<RoomDto> saveApartment(@RequestBody RoomDto room) {
        return ResponseEntity.ok(roomService.save(room));
    }

}
