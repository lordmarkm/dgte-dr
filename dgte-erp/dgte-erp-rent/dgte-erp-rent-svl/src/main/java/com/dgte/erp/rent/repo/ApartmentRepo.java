package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.Apartment;
import com.github.fabiomaffioletti.firebase.repository.DefaultFirebaseRealtimeDatabaseRepository;

@Repository
public class ApartmentRepo extends DefaultFirebaseRealtimeDatabaseRepository<Apartment, String> {

}
