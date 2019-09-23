package com.dgte.erp.rent.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.dto.RoomDto;
import com.dgte.erp.rent.dto.RoomSearchDto;
import com.dgte.erp.rent.service.RoomService;

@RestController
@RequestMapping("/room")
public class RoomResource {

    @Autowired
    private RoomService roomService;

    @GetMapping
    public ResponseEntity<Page<RoomDto>> search(RoomSearchDto searchDto, Pageable pageable) {
        return ResponseEntity.ok(roomService.findAll(searchDto, pageable));
    }

    @PostMapping
    public ResponseEntity<RoomDto> saveRoom(@RequestBody RoomDto room) {
        return ResponseEntity.ok(roomService.save(room));
    }

}
