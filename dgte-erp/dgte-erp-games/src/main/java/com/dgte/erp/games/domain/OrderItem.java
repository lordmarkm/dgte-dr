package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.MappedSuperclass;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@MappedSuperclass
public abstract class OrderItem {

    @ManyToOne
    @JoinColumn(name = "game_id", nullable = false)
    private Game game;

    @ManyToOne
    @JoinColumn(name = "fulf_game_cp_id", nullable = true)
    private CopyOfGame fullfillingCopyOfGame;

    @Column(name = "status", nullable = false)
    @Enumerated(EnumType.STRING)
    @ColumnDefault("NEW")
    private OrderItemStatus status;

    @Column(name = "currency", nullable = false)
    @ColumnDefault("CASH")
    @Enumerated(EnumType.STRING)
    private Currency currency;

}
