package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "platform")
public class Platform extends BaseEntity {

    @Column(name = "name")
    private String name;

    @Column(name = "shortname")
    private String shortName;

}
