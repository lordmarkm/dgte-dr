package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.RentPayment;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;

/**
 *
 * @author mbmartinez
 *
 */
@Repository
public interface RentPaymentRepo extends ReactiveCosmosRepository<RentPayment, String> {

}
