package com.dgte.erp.games.resource;

import java.security.Principal;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dgte.erp.games.dto.PublicOrderDto;
import com.dgte.erp.games.service.OrderService;
import com.dgte.erp.games.validator.OrderValidator;

@RestController
@RequestMapping("/public/order")
public class PublicOrderResource {

    @Autowired
    private OrderValidator orderValidator;

    @Autowired
    private OrderService orderService;

    @PostMapping
    public ResponseEntity<PublicOrderDto> save(Principal principal, @Valid @RequestBody PublicOrderDto order) {
        return ResponseEntity.ok(orderService.save(principal.getName(), order));
    }

    @InitBinder
    protected void initBinder(WebDataBinder binder) {
        binder.addValidators(orderValidator);
    }
}
