package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.dto.AccountDto;

public interface AccountServiceCustom {

    Optional<AccountDto> findDtoByCode(String code);
    Optional<AccountDto> findRootByProjectCode(String code);
    AccountDto saveInfo(AccountDto account);

}
