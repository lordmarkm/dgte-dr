package com.dgte.erp.rent.model;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;
import com.microsoft.azure.spring.data.cosmosdb.core.mapping.PartitionKey;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "apartments", autoCreateCollection = false)
public class Apartment extends BaseCosmosEntity {

    @PartitionKey
    private String projectId;
    private String name;
    private String address;

}
