package com.dgte.erp.rent.model;

import java.time.LocalDate;
import java.util.List;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "leases", autoCreateCollection = false)
public class Lease extends BaseCosmosEntity {

    private String projectId;
    @PartitionKey
    private String apartmentId;
    private String roomId;
    private List<String> leseeNames;
    private LocalDate startOfLease;
    private LocalDate endOfLease;
    private boolean active;

}
