package com.dgte.erp.games.domain;

import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Embeddable;

import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Embeddable
public class RentOrderItem extends OrderItem {

    @Column(name = "deposit_rupees", nullable = false)
    @ColumnDefault("0")
    private int depositRupees;

    @CreatedDate
    @Column(name = "due_date", nullable = false)
    @ColumnDefault("now()")
    private LocalDate dueDate;

}
