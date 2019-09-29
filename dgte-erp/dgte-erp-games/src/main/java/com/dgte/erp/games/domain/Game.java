package com.dgte.erp.games.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "game")
public class Game extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Column(name = "short_name", unique = true)
    private String shortName;

    @ManyToOne(optional = false)
    @JoinColumn(name = "platform_id")
    private Platform platform;

    @Column(name = "cp_on_hand")
    @ColumnDefault("0")
    private int copiesOnHand;

    @Column(name = "cp_for_sale")
    @ColumnDefault("0")
    private int copiesForSale;

    @Column(name = "cp_for_rent")
    @ColumnDefault("0")
    private int copiesForRent;

    @Column(name = "price_buylist")
    @ColumnDefault("0")
    private BigDecimal buylistPrice;

    @Column(name = "price_sell")
    @ColumnDefault("0")
    private BigDecimal sellPrice;

    @Column(name = "img_url")
    private String imageUrl;
}
