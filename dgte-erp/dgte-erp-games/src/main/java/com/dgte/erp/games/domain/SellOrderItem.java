package com.dgte.erp.games.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Embeddable
public class SellOrderItem {

    @Column(name = "sell_price", nullable = false)
    @ColumnDefault("0")
    private BigDecimal sellPrice;

    @Column(name = "sell_rupees", nullable = false)
    @ColumnDefault("0")
    private BigDecimal sellRupees;

}
