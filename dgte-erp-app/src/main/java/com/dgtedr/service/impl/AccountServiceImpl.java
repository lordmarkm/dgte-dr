package com.dgtedr.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.QEntry;
import com.dgtedr.domain.QTransaction;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.StatusedResponse;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.AccountServiceCustom;
import com.dgtedr.service.EntryService;
import com.dgtedr.service.TransactionService;
import com.querydsl.core.types.dsl.BooleanExpression;

import static com.dgtedr.domain.QAccount.account;

@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private AccountService service;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private EntryService entryService;

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

    @Override
    public StatusedResponse<AccountDto> delete(String code) {
        StatusedResponse<AccountDto> response = new StatusedResponse<>();
        long entryCount = entryService.count(QEntry.entry.account.code.eq(code));
        if (entryCount > 0) {
            response.setStatus(HttpStatus.CONFLICT);
            return response;
        }

        int deleted = service.deleteByCode(code);
        if (deleted > 0) {
            response.setStatus(HttpStatus.OK);
        } else {
            response.setStatus(HttpStatus.BAD_REQUEST);
        }

        return response;
    }

}
