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
public class BuyOrderItem {

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "buy_price", nullable = false)
    @ColumnDefault("0")
    private BigDecimal buyPrice;

    @Column(name = "buy_rupees", nullable = false)
    @ColumnDefault("0")
    private BigDecimal buyRupees;

    @ManyToOne
    @JoinColumn(name = "fulf_game_cp_id", nullable = true)
    private CopyOfGame fullfillingCopyOfGame;

}
