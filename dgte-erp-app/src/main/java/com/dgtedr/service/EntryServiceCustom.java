package com.dgtedr.service;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.dto.EntryDto;
import com.dgtedr.dto.EntrySearchDto;

public interface EntryServiceCustom {

    Page<EntryDto> findAll(EntrySearchDto searchDto, Pageable pageable);
    Optional<EntryDto> findDtoByCode(String code);
    EntryDto save(EntryDto entry);

}
