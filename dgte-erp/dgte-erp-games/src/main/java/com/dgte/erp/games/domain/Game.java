package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import com.dgte.shared.app.dto.BaseDto;
import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "game")
public class Game extends BaseEntity {

    @Column(name = "name", nullable = false)
    private String name;

    @Column(name = "short_name")
    private String shortName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "platform_id")
    private Platform platform;

}
