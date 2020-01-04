package com.dgte.erp.rent.model;

import com.microsoft.azure.spring.data.cosmosdb.core.mapping.Document;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Document(collection = "projects", autoCreateCollection = false)
public class Project extends BaseCosmosEntity {

    private String name;

}
