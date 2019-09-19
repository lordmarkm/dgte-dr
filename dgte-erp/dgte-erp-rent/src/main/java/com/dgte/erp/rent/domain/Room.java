package com.dgte.erp.rent.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "room")
public class Room extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "apt_id", nullable = false)
    private Apartment apartment;

    @Column(name = "rm_name", nullable = false)
    private String name;

    @Column(name = "available", nullable = false)
    @Type(type = "yes_no")
    @ColumnDefault("Y")
    private boolean available;

    @Column(name = "price_monthly", nullable = false)
    @ColumnDefault("0")
    private BigDecimal priceMonthly;

}
