package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.StatusedResponse;

public interface AccountServiceCustom {

    Optional<AccountDto> findDtoByCode(String code);
    Optional<AccountDto> findRootByProjectCode(String code);
    StatusedResponse<AccountDto> delete(String code);
    AccountDto saveInfo(AccountDto account);

}
