package com.dgte.erp.rent.dto;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import com.dgte.shared.app.dto.BaseDto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LeaseDto extends BaseDto {

    /**
     * Permanent lease info
     */
    private List<TenantDto> tenants;
    private BigDecimal monthlyRent;
    private BigDecimal securityDeposit;
    private int dueDateDayOfMonth;
    private LocalDate leaseStartDate;
    private LocalDate leaseEndDate;

    /**
     * Last payment info
     */
    private LocalDate lastPaymentDate;
    private BigDecimal lastPaymentAmount;
    private BigDecimal balanceAfterLastPayment;

    /**
     * Next payment info
     */
    private LocalDate nextDueDate;
    private BigDecimal nextAmountDue;

}
