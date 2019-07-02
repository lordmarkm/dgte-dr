package com.dgtedr.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.AccountServiceCustom;

@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private AccountService service;

    @Override
    public Optional<AccountDto> findByCodeInfo(Long projoectId, String code) {
        return service.findByProjectIdAndCode(projoectId, code)
                .map(mapper::toDto);
    }

    @Override
    @Transactional
    public AccountDto saveInfo(AccountDto account) {
        return mapper.toDto(service.save(mapper.toEntity(account)));
    }

}
