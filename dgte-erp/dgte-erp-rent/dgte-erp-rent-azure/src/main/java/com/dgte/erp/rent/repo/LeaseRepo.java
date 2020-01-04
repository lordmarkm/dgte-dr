package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.Lease;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;

import reactor.core.publisher.Flux;

@Repository
public interface LeaseRepo extends ReactiveCosmosRepository<Lease, String> {

    Flux<Lease> findByApartmentId(String apartmentId);

}
