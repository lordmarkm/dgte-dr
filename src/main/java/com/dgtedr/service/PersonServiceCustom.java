package com.dgtedr.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.dgtedr.dto.PersonDto;
import com.dgtedr.dto.PersonSearchDto;

public interface PersonServiceCustom {

    Page<PersonDto> findAll(PersonSearchDto loansSearchDto, Pageable pageable);

}
