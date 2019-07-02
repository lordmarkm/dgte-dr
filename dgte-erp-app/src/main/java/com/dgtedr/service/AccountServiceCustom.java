package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.dto.AccountDto;

public interface AccountServiceCustom {

    Optional<AccountDto> findByCodeInfo(Long projectId, String code);
    AccountDto saveInfo(AccountDto account);

}
