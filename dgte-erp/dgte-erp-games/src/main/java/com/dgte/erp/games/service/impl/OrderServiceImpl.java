package com.dgte.erp.games.service.impl;

import java.math.BigDecimal;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.games.domain.BuyOrderItem;
import com.dgte.erp.games.domain.Currency;
import com.dgte.erp.games.domain.Gamer;
import com.dgte.erp.games.domain.Order;
import com.dgte.erp.games.domain.RentOrderItem;
import com.dgte.erp.games.domain.SellOrderItem;
import com.dgte.erp.games.dto.OrderDto;
import com.dgte.erp.games.dto.OrderSearchDto;
import com.dgte.erp.games.dto.PublicOrderDto;
import com.dgte.erp.games.mapper.DgteErpGamesMapper;
import com.dgte.erp.games.service.GamerService;
import com.dgte.erp.games.service.OrderService;
import com.dgte.erp.games.service.OrderServiceCustom;

/**
 * SELL orders must be separated from RENT/BUY because the delivery address will be different
 * so the criteria for completion is also different
 *
 * @author mbmartinez on 12 Nov 2019
 *
 */
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
    public PublicOrderDto authenticatedOrder(String email, PublicOrderDto orderDto) {
        Order order = mapper.toEntity(orderDto);

        Optional<Gamer> gamerOpt = gamerService.findByEmail(email);
        if (gamerOpt.isPresent()) {
            order.setGamer(gamerOpt.get());
        }
        computeTotals(order);

        return mapper.toPublicDto(orderService.save(order));
    }

    @Override
    public PublicOrderDto anonymousOrder(PublicOrderDto order) {
        // TODO Auto-generated method stub
        return null;
    }

    private void computeTotals(Order order) {
        order.setTotalBuyAmount(order.getBuyOrderItems().stream()
                .filter(oi -> oi.getCurrency() == Currency.CASH)
                .map(BuyOrderItem::getBuyPrice)
                .reduce(BigDecimal.ZERO, (total, amt) -> total.add(amt)));
        order.setTotalBuyRupees(order.getBuyOrderItems().stream()
                .filter(oi -> oi.getCurrency() == Currency.RUPEES)
                .map(BuyOrderItem::getBuyRupees)
                .reduce(0, (total, amt) -> total + amt));
        order.setTotalRentDeposit(order.getRentOrderItems().stream()
                .map(RentOrderItem::getDepositRupees)
                .reduce(0, (total, amt) -> total + amt));
        order.setTotalSellAmount(order.getSellOrderItems().stream()
                .filter(oi -> oi.getCurrency() == Currency.CASH)
                .map(SellOrderItem::getSellPrice)
                .reduce(BigDecimal.ZERO, (total, amt) -> total.add(amt)));
        order.setTotalSellRupees(order.getSellOrderItems().stream()
                .filter(oi -> oi.getCurrency() == Currency.RUPEES)
                .map(SellOrderItem::getSellRupees)
                .reduce(0, (total, amt) -> total + amt));
    }

    @Override
    public Optional<OrderDto> findDtoByCode(String orderCode) {
        return orderService.findByCode(orderCode).map(mapper::toDto);
    }

}
