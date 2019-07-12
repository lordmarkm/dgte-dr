package com.dgtedr.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Entry;
import com.dgtedr.domain.Transaction;
import com.dgtedr.dto.EntryDto;
import com.dgtedr.dto.TransactionDto;
import com.dgtedr.dto.TransactionSearchDto;
import com.dgtedr.dto.TransactionWithEntriesDto;
import com.dgtedr.service.EntryService;
import com.dgtedr.service.TransactionService;
import com.dgtedr.service.TransactionServiceCustom;

@Transactional(readOnly = true)
public class TransactionServiceImpl implements TransactionServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private TransactionService txns;

    @Autowired
    private EntryService entryService;

    @Override
    public TransactionDto save(TransactionDto txn) {
        return mapper.toDto(txns.save(mapper.toEntity(txn)));
    }

    @Override
    @Transactional
    public TransactionDto save(TransactionWithEntriesDto txn) {
        Transaction newTxn = txns.save(mapper.toEntity(txn.getTransaction()));

        //Delete removed entries first
        List<Entry> oldEntries = entryService.findByTransactionCode(newTxn.getCode());
        if (oldEntries.size() > 0) {
            oldEntries.removeIf(oldEntry -> {
                return txn.getEntries().stream().filter(newEntry -> oldEntry.getCode().equals(newEntry.getCode())).findAny().isPresent();
            });
        }
        entryService.deleteAll(oldEntries);

        List<Entry> newEntries = txn.getEntries().stream().map(entryDto -> {
            Entry entryEntity = mapper.toEntity(entryDto);
            entryEntity.setTransaction(newTxn);
            return entryEntity;
        }).collect(Collectors.toList());

        //Set the new indexes
        int entryOrder = 0;
        for (Entry newEntry : newEntries) {
            newEntry.setOrder(entryOrder);
            entryOrder++;
        }

        entryService.saveAll(newEntries);
        return mapper.toDto(newTxn);
    }

    @Override
    public Optional<TransactionDto> findDtoByCode(String code) {
        return txns.findByCode(code).map(mapper::toDto);
    }

    @Override
    public Page<TransactionDto> search(TransactionSearchDto txnSearchDto, Pageable page) {
        return txns.findAll(txnSearchDto.toQuery(), page)
                    .map(mapper::toDto);
    }

}
