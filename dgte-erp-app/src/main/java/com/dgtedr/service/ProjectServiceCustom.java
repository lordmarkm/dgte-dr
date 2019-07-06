package com.dgtedr.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;

public interface ProjectServiceCustom {

    Page<ProjectDto> findAll(ProjectSearchDto searchDto, Pageable pageable);
    Optional<ProjectDto> findDtoByCode(String code);
    ProjectDto save(ProjectDto project);

}
