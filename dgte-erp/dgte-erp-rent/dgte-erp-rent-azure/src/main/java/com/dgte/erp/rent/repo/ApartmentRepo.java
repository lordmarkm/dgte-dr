package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.Apartment;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;

@Repository
public interface ApartmentRepo extends ReactiveCosmosRepository<Apartment, String> {

}
