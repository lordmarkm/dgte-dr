package com.dgte.erp.rent.domain;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.persistence.CollectionTable;
import javax.persistence.Column;
import javax.persistence.ElementCollection;
import javax.persistence.Embedded;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;

import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.Type;

import com.dgte.shared.jpa.domain.BaseEntity;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity(name = "lease")
public class Lease extends BaseEntity {

    @Column(name = "active")
    @Type(type = "yes_no")
    @ColumnDefault("N")
    private boolean active;

    @Column(name = "room_code", nullable = false)
    private String roomCode;

    @ElementCollection
    @CollectionTable(name = "lease_tenants", joinColumns = @JoinColumn(name = "lease_id", nullable = false))
    private List<Tenant> tenants;

    @Column(name = "monthly_rent", nullable = false)
    @ColumnDefault("0")
    private BigDecimal monthlyRent;

    @Column(name = "sec_dep", nullable = false)
    @ColumnDefault("0")
    private BigDecimal securityDeposit;

    @Column(name = "due_day_of_month", nullable = false)
    @ColumnDefault("1")
    private int dueDateDayOfMonth;

    @Column(name = "start_date", nullable = false)
    private LocalDate leaseStartDate;

    @Column(name = "end_date", nullable = false)
    private LocalDate leaseEndDate;

    /**
     * Last payment info
     */
    @Column(name = "last_payment_date", nullable = false)
    private LocalDate lastPaymentDate;

    @Column(name = "last_payment_amt", nullable = false)
    private BigDecimal lastPaymentAmount;

    @Column(name = "last_payment_cov_start", nullable = false)
    private LocalDate lastPaymentCoverageStartDate;

    @Column(name = "last_payment_cov_end", nullable = false)
    private LocalDate lastPaymentCoverageEndDate;

    @Column(name = "last_payment_bal", nullable = false)
    private BigDecimal balanceAfterLastPayment;

    /**
     * Next payment info
     */
    @Column(name = "next_due_date", nullable = false)
    private LocalDate nextDueDate;

    @Column(name = "next_due_amount", nullable = false)
    private BigDecimal nextAmountDue;

}
