package com.dgtedr.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "transaction")
public class Transaction extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Project project;

    @Column(name = "txn_desc", nullable = false)
    private String description;

    @Column(name = "txn_date", nullable = false)
    private LocalDate transactionDate;

}
