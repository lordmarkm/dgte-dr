package com.dgte.erp.rent.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "rentPayments", autoCreateCollection = false)
public class RentPayment extends BaseCosmosEntity {

    private String projectId;
    private String apartmentId;
    private String roomId;
    @PartitionKey
    private String leaseId;
    private BigDecimal amount;
    private LocalDate paymentDate;
    private LocalDate paymentCoverageStart;
    private LocalDate paymentCoverageEnd;
    private String remarks;

}
