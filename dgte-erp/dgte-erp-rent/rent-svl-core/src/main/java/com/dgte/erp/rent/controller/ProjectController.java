package com.dgte.erp.rent.controller;

import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.dgte.erp.rent.controller.service.ProjectService;
import com.dgte.erp.rent.shared.dto.ProjectDto;

@Configuration
public class ProjectController {

    @Autowired
    private ProjectService projectService;

    @Bean
    public Function<ProjectDto, ProjectDto> saveProject() {
        return project -> projectService.save(project);
    }

    @Bean
    public Supplier<List<ProjectDto>> findAllProjects() {
        return () -> projectService.findAll();
    }

}
