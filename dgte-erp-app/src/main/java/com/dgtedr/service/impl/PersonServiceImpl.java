package com.dgtedr.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.PersonDto;
import com.dgtedr.dto.PersonSearchDto;
import com.dgtedr.service.PersonService;
import com.dgtedr.service.PersonServiceCustom;

public class PersonServiceImpl implements PersonServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private PersonService service;

    @Override
    public Page<PersonDto> findAll(PersonSearchDto loansSearchDto, Pageable page) {
        return service.findAll(loansSearchDto.toQuery(), page)
                .map(mapper::toDto);
    }

}
