package com.dgtedr.config;

import org.mapstruct.Mapper;

import com.dgtedr.domain.Person;
import com.dgtedr.dto.PersonDto;

@Mapper
public interface DgteErpMapper {

    PersonDto toDto(Person person);

}
