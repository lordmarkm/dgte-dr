package com.dgte.erp.rent.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgte.erp.rent.RentMapper;
import com.dgte.erp.rent.controller.service.ProjectService;
import com.dgte.erp.rent.model.Project;
import com.dgte.erp.rent.repo.ProjectRepo;
import com.dgte.erp.rent.shared.dto.ProjectDto;

@Service
public class ProjectServiceImpl implements ProjectService {

    @Autowired
    private RentMapper mapper;

    @Autowired
    private ProjectRepo projectRepo;

    @Override
    public ProjectDto save(ProjectDto dto) {
        Project saved = projectRepo.save(mapper.toEntity(dto)).block();
        return mapper.toDto(saved);
    }

    @Override
    public List<ProjectDto> findAll() {
        return projectRepo.findAll()
                .map(mapper::toDto)
                .collectList().block();
    }

}
