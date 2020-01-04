package com.dgte.erp.rent.shared.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class RentPaymentDto extends BaseDto {

    private String projectId;
    private String apartmentId;
    private String roomId;
    private String leaseId;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private LocalDate paymentCoverageStart;
    private LocalDate paymentCoverageEnd;

}
