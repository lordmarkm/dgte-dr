package com.dgtedr.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.AccountServiceCustom;
import com.querydsl.core.types.dsl.BooleanExpression;

import static com.dgtedr.domain.QAccount.account;

@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private AccountService service;

    @Override
    public Optional<AccountDto> findDtoByCode(String code) {
        return service.findByCode(code)
                .map(mapper::toDto);
    }

    @Override
    @Transactional
    public AccountDto saveInfo(AccountDto account) {
        return mapper.toDto(service.save(mapper.toEntity(account)));
    }

    @Override
    public Optional<AccountDto> findRootByProjectCode(String projectCode) {
        BooleanExpression query = account.project.code.eq(projectCode)
                .and(account.parent.isNull());
        return service.findOne(query).map(mapper::toDto);
    }

}
