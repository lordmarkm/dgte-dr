package com.dgte.erp.rent.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.dgte.shared.app.dto.BaseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LeaseDto extends BaseDto {

    /**
     * Permanent lease info
     */
    @NotNull
    private boolean active;

    @NotEmpty
    private String roomCode;

    @NotNull @Size(min = 1)
    private List<TenantDto> tenants;

    @NotNull @Min(1) @Max(Integer.MAX_VALUE)
    private BigDecimal monthlyRent;

    @NotNull
    private BigDecimal securityDeposit;
    private BigDecimal advancePayment;

    @Min(1) @Max(29)
    private int dueDateDayOfMonth;

    @NotNull
    private LocalDate leaseStartDate;

    @NotNull
    private LocalDate leaseEndDate;

    /**
     * Last payment info
     */
    private LocalDate lastPaymentDate;
    private BigDecimal lastPaymentAmount;
    private LocalDate lastPaymentCoverageStartDate;
    private LocalDate lastPaymentCoverageEndDate;
    private BigDecimal balanceAfterLastPayment;

    /**
     * Next payment info
     */
    private LocalDate nextDueDate;
    private BigDecimal nextAmountDue;

    public BigDecimal getAdvancePayment() {
        return zeroIfNull(this.advancePayment);
    }

    public BigDecimal getMonthlyRent() {
        return zeroIfNull(this.monthlyRent);
    }
}
