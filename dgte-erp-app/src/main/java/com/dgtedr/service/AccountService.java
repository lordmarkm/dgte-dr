package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.domain.Account;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface AccountService extends BaseJpaRepository<Account, Long>, AccountServiceCustom {

    Optional<Account> findByProjectIdAndCode(Long projectId, String code);

}