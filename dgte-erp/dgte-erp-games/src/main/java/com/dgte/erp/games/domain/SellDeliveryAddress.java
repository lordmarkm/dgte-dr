package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "addr_sell")
public class SellDeliveryAddress extends BaseEntity {

    @Column(name = "line_1", nullable = false)
    private String line1;

    @Column(name = "line_2")
    private String line2;

    @Column(name = "line_3")
    private String line3;

}
