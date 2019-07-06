package com.dgtedr.service.impl;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.TransactionDto;
import com.dgtedr.service.TransactionService;
import com.dgtedr.service.TransactionServiceCustom;

public class TransactionServiceImpl implements TransactionServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private TransactionService txns;

    @Override
    public TransactionDto save(TransactionDto txn) {
        return mapper.toDto(txns.save(mapper.toEntity(txn)));
    }

    @Override
    public Optional<TransactionDto> findDtoByCode(String code) {
        return txns.findByCode(code).map(mapper::toDto);
    }

}
