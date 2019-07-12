package com.dgtedr.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.apache.commons.lang3.ObjectUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.EntryDto;
import com.dgtedr.dto.EntrySearchDto;
import com.dgtedr.service.EntryService;
import com.dgtedr.service.EntryServiceCustom;

@Transactional(readOnly = true)
public class EntryServiceImpl implements EntryServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private EntryService service;

    @Override
    public Page<EntryDto> findAll(EntrySearchDto searchDto, Pageable pageable) {
        // TODO Auto-generated method stub
        return null;
    }

    @Override
    public Optional<EntryDto> findDtoByCode(String code) {
        return service.findByCode(code)
                    .map(mapper::toDto);
    }

    @Override
    @Transactional
    public EntryDto save(EntryDto entry) {
        return mapper.toDto(service.save(mapper.toEntity(entry)));
    }

    @Override
    public List<EntryDto> findDtoByTransactionCode(String transactionCode) {
        return service.findByTransactionCode(transactionCode)
                .stream()
                .sorted((e1, e2) -> ObjectUtils.compare(e1.getOrder(), e2.getOrder()))
                .map(mapper::entryLite)
                .collect(Collectors.toList());
    }

}
