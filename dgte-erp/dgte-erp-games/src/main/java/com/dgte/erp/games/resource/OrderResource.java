package com.dgte.erp.games.resource;

import java.security.Principal;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.OrderSearchDto;
import com.dgte.erp.games.service.OrderService;

@RestController
@RequestMapping("/order")
public class OrderResource {

    @Autowired
    private OrderService orderService;

    @GetMapping
    public ResponseEntity<Page<OrderDto>> getOrders(Principal principal, OrderSearchDto orderSearchDto, Pageable page) {
        if (null != principal) {
            orderSearchDto.setGamerEmail(principal.getName());
        }
        return ResponseEntity.ok(orderService.findAll(orderSearchDto, page));
    }

}
