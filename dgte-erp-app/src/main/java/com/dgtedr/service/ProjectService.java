package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.domain.Project;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface ProjectService extends BaseJpaRepository<Project, Long>, ProjectServiceCustom {

    Optional<Project> findByCode(String code);

}
