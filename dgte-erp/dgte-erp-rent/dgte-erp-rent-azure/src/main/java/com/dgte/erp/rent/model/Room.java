package com.dgte.erp.rent.model;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "rooms", autoCreateCollection = false)
public class Room extends BaseCosmosEntity {

    private String projectId;
    @PartitionKey
    private String apartmentId;
    private String name;

}
