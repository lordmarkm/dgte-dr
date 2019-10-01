package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "gamer")
public class Gamer extends BaseEntity {

    @Column(name = "display_name", nullable = false)
    private String displayName;

    @Column(name = "email", unique = true, nullable = false)
    private String email;

}
