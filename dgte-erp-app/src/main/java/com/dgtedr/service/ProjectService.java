package com.dgtedr.service;

import com.dgtedr.domain.Project;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface ProjectService extends BaseJpaRepository<Project, Long>, ProjectServiceCustom {

}
