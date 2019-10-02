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
public class RentOrderItem {

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @Column(name = "deposit_rupees", nullable = false)
    @ColumnDefault("0")
    private BigDecimal depositRupees;

    @ManyToOne
    @JoinColumn(name = "fulf_game_cp_id", nullable = true)
    private CopyOfGame fullfillingCopyOfGame;

}
