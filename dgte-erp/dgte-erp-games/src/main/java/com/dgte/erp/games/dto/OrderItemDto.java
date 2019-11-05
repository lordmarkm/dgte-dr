package com.dgte.erp.games.dto;

import com.dgte.erp.games.domain.OrderItemStatus;

import lombok.Data;

@Data
public abstract class OrderItemDto {

    private GameDto game;
    private OrderItemStatus status = OrderItemStatus.NEW;
    private String fulfillingCopyOfGameCode;

}
