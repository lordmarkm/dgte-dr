package com.dgte.erp.games.resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.PublicOrderDto;
import com.dgte.erp.games.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderResource {

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<PublicOrderDto> save(@RequestBody PublicOrderDto order) {
        return ResponseEntity.ok(orderService.save(order));
    }

}
