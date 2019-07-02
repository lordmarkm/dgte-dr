package com.dgtedr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;
import com.dgtedr.service.ProjectService;
import com.dgtedr.service.ProjectServiceCustom;

public class ProjectServiceImpl implements ProjectServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private ProjectService service;

    @Override
    public Page<ProjectDto> findAll(ProjectSearchDto searchDto, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

}
