package com.dgte.erp.games.domain;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import lombok.Data;

@Data
@Embeddable
public class BuyDeliveryAddress {

    @Column(name = "addr_line_1", nullable = false)
    private String line1;

    @Column(name = "addr_line_2")
    private String line2;

    @Column(name = "addr_line_3")
    private String line3;

}
