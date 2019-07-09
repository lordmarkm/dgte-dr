package com.dgtedr.service;

import java.util.List;
import java.util.Optional;

import com.dgtedr.domain.Entry;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface EntryService extends BaseJpaRepository<Entry, Long>, EntryServiceCustom {

    Optional<Entry> findByCode(String code);
    List<Entry> findByTransactionCode(String transactionCode);

}
