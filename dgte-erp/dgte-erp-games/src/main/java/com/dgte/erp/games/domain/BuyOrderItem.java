package com.dgte.erp.games.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Embeddable
public class BuyOrderItem extends OrderItem {

    @Column(name = "buy_price", nullable = false)
    @ColumnDefault("0")
    private BigDecimal buyPrice;

    @Column(name = "buy_rupees", nullable = false)
    @ColumnDefault("0")
    private int buyRupees;

}
