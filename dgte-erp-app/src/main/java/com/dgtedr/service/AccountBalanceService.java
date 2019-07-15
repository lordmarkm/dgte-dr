package com.dgtedr.service;

import java.time.LocalDate;
import java.util.Optional;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface AccountBalanceService extends BaseJpaRepository<AccountBalance, Long> {

    Optional<AccountBalance> findByAccountAndAsOfDate(Account account, LocalDate asOfDate);

}
