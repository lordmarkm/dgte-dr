package com.dgte.erp.games.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.OrderSearchDto;
import com.dgte.erp.games.dto.PublicOrderDto;

public interface OrderServiceCustom {

    PublicOrderDto save(String email, PublicOrderDto game);
    Page<OrderDto> findAll(OrderSearchDto searchDto, Pageable page);

}
