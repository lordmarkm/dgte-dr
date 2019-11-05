package com.dgte.erp.games.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.domain.Order;
import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.OrderSearchDto;
import com.dgte.erp.games.dto.PublicOrderDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.GamerService;
import com.dgte.erp.games.service.OrderService;
import com.dgte.erp.games.service.OrderServiceCustom;

@Transactional(readOnly = true)
public class OrderServiceImpl implements OrderServiceCustom {

    @Autowired
    private OrderService orderService;

    @Autowired
    private GamerService gamerService;

    @Autowired
    private DgteErpGamesMapper mapper;

    @Override
    public Page<OrderDto> findAll(OrderSearchDto searchDto, Pageable page) {
        return orderService.findAll(searchDto.toQuery(), page)
                .map(mapper::toDto);
    }

    @Override
    @Transactional
    public PublicOrderDto save(String email, PublicOrderDto orderDto) {
        Order order = mapper.toEntity(orderDto);

        Optional<Gamer> gamerOpt = gamerService.findByEmail(email);
        if (gamerOpt.isPresent()) {
            order.setGamer(gamerOpt.get());
        }

        return mapper.toPublicDto(orderService.save(order));
    }

}
