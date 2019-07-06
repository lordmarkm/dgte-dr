package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.dto.TransactionDto;

public interface TransactionServiceCustom {

    TransactionDto save(TransactionDto txn);
    Optional<TransactionDto> findDtoByCode(String code);

}
