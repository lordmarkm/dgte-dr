package com.dgte.erp.games.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.OrderSearchDto;
import com.dgte.erp.games.dto.PublicOrderDto;

public interface OrderServiceCustom {

    PublicOrderDto authenticatedOrder(String email, PublicOrderDto order);
    PublicOrderDto anonymousOrder(PublicOrderDto order);
    Page<OrderDto> findAll(OrderSearchDto searchDto, Pageable page);

}
