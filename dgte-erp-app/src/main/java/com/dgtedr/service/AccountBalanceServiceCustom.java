package com.dgtedr.service;

import java.time.LocalDate;
import java.util.Optional;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.dto.AccountBalanceDto;
import com.dgtedr.ref.AccountType;

public interface AccountBalanceServiceCustom {

    AccountBalance calculateBalance(Account account, LocalDate asOfDate, boolean forceRecompute);
    AccountBalance calculateBalance(Account account, LocalDate startDate, LocalDate endDate, boolean forceRecompute);
    Optional<AccountBalanceDto> findByProjectCodeAndAsOfDateAndType(String projectCode, LocalDate asOfDate, AccountType type, boolean forceRecompute);

}
