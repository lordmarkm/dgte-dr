package com.dgte.erp.rent.resource;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.rent.dto.LeaseDto;

@RestController
@RequestMapping("/lease")
public class LeaseResource {

    @PostMapping
    public void createLease(@RequestBody LeaseDto lease) {
        
    }

}
