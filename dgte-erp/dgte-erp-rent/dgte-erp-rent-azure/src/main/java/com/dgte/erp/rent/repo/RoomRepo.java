package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.Room;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;

import reactor.core.publisher.Flux;

@Repository
public interface RoomRepo extends ReactiveCosmosRepository<Room, String> {

    Flux<Room> findByApartmentId(String apartmentId);

}
