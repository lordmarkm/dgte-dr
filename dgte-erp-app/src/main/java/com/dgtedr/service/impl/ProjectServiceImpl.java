package com.dgtedr.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.ProjectService;
import com.dgtedr.service.ProjectServiceCustom;

public class ProjectServiceImpl implements ProjectServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private ProjectService service;

    @Autowired
    private AccountService accountService;

    @Override
    public Page<ProjectDto> findAll(ProjectSearchDto searchDto, Pageable pageable) {
        return service.findAll(searchDto.toQuery(), pageable)
                    .map(mapper::toDto);
    }

    @Override
    public Optional<ProjectDto> findDtoByCode(String code) {
        return service.findByCode(code)
                .map(mapper::toDto);
    }

    @Override
    public ProjectDto save(ProjectDto project) {
        Project saved = service.save(mapper.toEntity(project));

        //For new projects, create a root account
        Optional<AccountDto> rootAccountOpt = accountService.findRootByProjectCode(saved.getCode());
        if (!rootAccountOpt.isPresent()) {
            Account rootAccount = new Account();
            rootAccount.setName(saved.getName() + " - Root Account");
            rootAccount.setProject(saved);
            rootAccount.setType(AccountType.UNSPECIFIED);
            rootAccount.setAccountCode("1");
            accountService.save(rootAccount);
        }

        return mapper.toDto(saved);
    }

}
