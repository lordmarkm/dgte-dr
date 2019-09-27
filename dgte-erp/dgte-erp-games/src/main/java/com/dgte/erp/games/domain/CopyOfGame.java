package com.dgte.erp.games.domain;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "game_copy")
public class CopyOfGame extends BaseEntity {

    @ManyToOne(optional = false)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne
    @JoinColumn(name = "gamer_id")
    private Gamer source;

    @ManyToOne
    @JoinColumn(name = "ref_game_cp_status_id")
    private CopyStatus copyStatus;

}
