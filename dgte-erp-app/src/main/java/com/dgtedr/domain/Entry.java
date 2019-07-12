package com.dgtedr.domain;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.hibernate.annotations.ColumnDefault;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "entry")
public class Entry extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "account_id", nullable = false)
    private Account account;

    @ManyToOne
    @JoinColumn(name = "txn_id", nullable = false)
    private Transaction transaction;

    @Column(name = "entry_date", nullable = false)
    private LocalDate entryDate;

    @Column(name = "debit", nullable = false)
    @ColumnDefault("0")
    private BigDecimal debit;

    @Column(name = "credit", nullable = false)
    @ColumnDefault("0")
    private BigDecimal credit;

    /**
     * The order in which the entry was added to a transaction
     */
    @Column(name = "ent_order")
    private int order;

}
