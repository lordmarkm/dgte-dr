package com.dgte.erp.rent.controller.service;

import java.util.List;

import com.dgte.erp.rent.shared.dto.ProjectDto;

public interface ProjectService {

    ProjectDto save(ProjectDto project);
    List<ProjectDto> findAll();

}
