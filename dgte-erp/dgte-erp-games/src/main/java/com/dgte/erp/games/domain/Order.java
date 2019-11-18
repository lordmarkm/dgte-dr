package com.dgte.erp.games.domain;

import java.math.BigDecimal;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "game_order")
public class Order extends BaseEntity {

    @Column(name = "order_type", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderType type;

    @ManyToOne
    @JoinColumn(name = "gamer_id", nullable = false)
    private Gamer gamer;

    @ElementCollection
    @CollectionTable(name = "game_order_item_buy", joinColumns = @JoinColumn(name = "order_id", nullable = false))
    private List<BuyOrderItem> buyOrderItems;

    @ElementCollection
    @CollectionTable(name = "game_order_item_rent", joinColumns = @JoinColumn(name = "order_id", nullable = false))
    private List<RentOrderItem> rentOrderItems;

    @ElementCollection
    @CollectionTable(name = "game_order_item_sell", joinColumns = @JoinColumn(name = "order_id", nullable = false))
    private List<SellOrderItem> sellOrderItems;

    @Embedded
    private BuyDeliveryAddress buyDeliveryAddress;

    @ManyToOne
    @JoinColumn(name = "ref_addr_sell_id")
    private SellDeliveryAddress sellDeliveryAddress;

    @Column(name = "buy_amt", nullable = false)
    @ColumnDefault("0")
    private BigDecimal totalBuyAmount;

    @Column(name = "buy_rp", nullable = false)
    @ColumnDefault("0")
    private int totalBuyRupees;

    @Column(name = "sell_amt", nullable = false)
    @ColumnDefault("0")
    private BigDecimal totalSellAmount;

    @Column(name = "sell_rp", nullable = false)
    @ColumnDefault("0")
    private int totalSellRupees;

    @Column(name = "rent_rp", nullable = false)
    @ColumnDefault("0")
    private int totalRentDeposit;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    private OrderStatus status;

}
