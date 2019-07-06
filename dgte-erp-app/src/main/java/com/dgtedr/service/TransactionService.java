package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.domain.Transaction;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface TransactionService extends BaseJpaRepository<Transaction, Long>, TransactionServiceCustom {

    Optional<Transaction> findByCode(String code);

}
