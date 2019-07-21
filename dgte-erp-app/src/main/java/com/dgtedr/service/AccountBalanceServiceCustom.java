package com.dgtedr.service;

import java.time.LocalDate;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;

public interface AccountBalanceServiceCustom {

    AccountBalance calculateBalance(Account account, LocalDate asOfDate, boolean forceRecompute); 

}
