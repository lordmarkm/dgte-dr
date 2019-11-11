package com.dgte.erp.games.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;

@Data
@Embeddable
public class GamerWallet {

    @Column(name = "rupees", nullable = false)
    @ColumnDefault("0")
    private int rupees;

    @Column(name = "peso_balance", nullable = false)
    @ColumnDefault("0")
    private BigDecimal balance;

}
