package com.dgte.erp.games.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

import com.dgte.erp.games.domain.OrderStatus;
import com.dgte.erp.games.domain.OrderType;

import lombok.Data;

@Data
public class PublicOrderDto {

    private String code;
    private LocalDateTime createdDate;
    private OrderType type;
    private OrderStatus status;
    private List<BuyOrderItemDto> buyOrderItems;
    private List<SellOrderItemDto> sellOrderItems;
    private List<RentOrderItemDto> rentOrderItems;
    private AddressDto buyDeliveryAddress;
    private AddressDto sellDeliveryAddress;
    private BigDecimal totalBuyAmount;
    private BigDecimal totalBuyRupees;
    private BigDecimal totalSellAmount;
    private BigDecimal totalSellRupees;
    private BigDecimal totalRentDeposit;

}
