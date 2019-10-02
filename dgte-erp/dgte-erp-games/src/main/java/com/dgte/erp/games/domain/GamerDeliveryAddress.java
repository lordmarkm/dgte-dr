package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import lombok.Data;

@Data
@Embeddable
public class GamerDeliveryAddress {

    @Column(name = "line_1", nullable = false)
    private String line1;

    @Column(name = "line_2")
    private String line2;

    @Column(name = "line_3")
    private String line3;

    @Column(name = "primary")
    @Type(type = "yes_no")
    @ColumnDefault("N")
    private boolean primary;

}
