package com.dgte.erp.rent.repo;

import org.springframework.stereotype.Repository;

import com.dgte.erp.rent.model.Project;
import com.microsoft.azure.spring.data.cosmosdb.repository.ReactiveCosmosRepository;

@Repository
public interface ProjectRepo extends ReactiveCosmosRepository<Project, String> {

}
