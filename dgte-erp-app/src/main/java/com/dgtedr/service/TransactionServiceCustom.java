package com.dgtedr.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.dto.TransactionDto;
import com.dgtedr.dto.TransactionSearchDto;
import com.dgtedr.dto.TransactionWithEntriesDto;

public interface TransactionServiceCustom {

    Page<TransactionDto> search(TransactionSearchDto txnSearchDto, Pageable page);
    TransactionDto save(TransactionDto txn);

    /**
     * Save a new transaction along with its member entries
     * @param txn
     * @return
     */
    TransactionDto save(TransactionWithEntriesDto txn);
    Optional<TransactionDto> findDtoByCode(String code);

}
