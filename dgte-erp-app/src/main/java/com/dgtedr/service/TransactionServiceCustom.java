package com.dgtedr.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.dto.TransactionDto;
import com.dgtedr.dto.TransactionSearchDto;

public interface TransactionServiceCustom {

    Page<TransactionDto> search(TransactionSearchDto txnSearchDto, Pageable page);
    TransactionDto save(TransactionDto txn);
    Optional<TransactionDto> findDtoByCode(String code);

}
