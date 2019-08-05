package com.dgtedr.service.impl;

import static com.dgtedr.domain.QAccount.account;

import java.util.List;
import java.util.Objects;
import java.util.Optional;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.QAccount;
import com.dgtedr.domain.QEntry;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.StatusedResponse;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.AccountServiceCustom;
import com.dgtedr.service.EntryService;
import com.querydsl.core.types.dsl.BooleanExpression;

@Transactional(readOnly = true)
public class AccountServiceImpl implements AccountServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private AccountService service;

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
        //Handle accounts that have been transferred to a different parent
        if (Objects.nonNull(account.getParent()) && account.getType() != account.getParent().getType()) {
            //If the parent account type is "Unspecified", retain the selected account type
            AccountType parentAccountType = account.getParent().getType();
            if (parentAccountType == AccountType.UNSPECIFIED) {
                parentAccountType = account.getType();
            }
            account.setType(parentAccountType);

            //An account w/o a code is new and won't have any children
            if (!StringUtils.isEmpty(account.getCode())) {
                this.setChildrenAccountTypeRecursive(account.getCode(), parentAccountType);
            }
        }

        return mapper.toDto(service.save(mapper.toEntity(account)));
    }

    private void setChildrenAccountTypeRecursive(String parentAccountCode, AccountType parenType) {
        if (StringUtils.isEmpty(parentAccountCode)) {
            throw new IllegalStateException("Parent account code can't be empty");
        }

        BooleanExpression query = QAccount.account.parent.code.eq(parentAccountCode);
        List<Account> children = (List<Account>) service.findAll(query);
        children.forEach(childAccount -> {
            childAccount.setType(parenType);
            if (childAccount.hasChildren()) {
                this.setChildrenAccountTypeRecursive(childAccount.getCode(), parenType);
            }
        });
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

        Optional<Account> account = service.findByCode(code);
        if (!account.isPresent()) {
            //Can't delete an account if it doesn't exist
            response.setStatus(HttpStatus.BAD_REQUEST);
            return response;
        } else if (account.get().isPermanent()) {
            //Can't delete permanent accounts
            response.setStatus(HttpStatus.NOT_ACCEPTABLE);
            return response;
        }

        //Can't delete accounts with entries
        long entryCount = entryService.count(QEntry.entry.account.code.eq(code));
        if (entryCount > 0) {
            response.setStatus(HttpStatus.CONFLICT);
            return response;
        }

        service.delete(account.get());
        response.setStatus(HttpStatus.OK);

        return response;
    }

}
