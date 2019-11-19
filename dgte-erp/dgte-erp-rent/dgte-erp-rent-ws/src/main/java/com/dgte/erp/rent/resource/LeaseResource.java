package com.dgte.erp.rent.resource;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.dto.LeaseDto;
import com.dgte.erp.rent.service.LeaseService;

@RestController
@RequestMapping("/lease")
public class LeaseResource {

    @Autowired
    private LeaseService leaseService;

    @PostMapping
    public ResponseEntity<LeaseDto> save(@RequestBody @Valid LeaseDto lease) {
        return ResponseEntity.ok(leaseService.save(lease));
    }

    @GetMapping
    public ResponseEntity<LeaseDto> findActiveLeaseByRoom(@RequestParam String roomCode) {
        return leaseService.findActiveLeaseDtoByRoomCode(roomCode)
                    .map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

}
