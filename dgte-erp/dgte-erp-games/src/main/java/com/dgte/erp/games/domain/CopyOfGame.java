package com.dgte.erp.games.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

@Entity(name = "game_copy")
public class CopyOfGame {

    @ManyToOne(optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    private Gamer source;

    private CopyStatus copyStatus;

}
