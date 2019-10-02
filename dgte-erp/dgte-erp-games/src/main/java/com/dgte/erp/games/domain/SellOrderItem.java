package com.dgte.erp.games.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Embeddable
public class SellOrderItem {

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "sell_price", nullable = false)
    @ColumnDefault("0")
    private BigDecimal sellPrice;

    @Column(name = "sell_rupees", nullable = false)
    @ColumnDefault("0")
    private BigDecimal sellRupees;

    @ManyToOne
    @JoinColumn(name = "fulf_game_cp_id", nullable = true)
    private CopyOfGame fullfillingCopyOfGame;

}
