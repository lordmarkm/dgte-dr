package com.dgtedr.config;

import org.mapstruct.Mapper;

import com.dgtedr.domain.Person;
import com.dgtedr.dto.PersonDto;

@Mapper
public interface DgteDrMapper {

    PersonDto toDto(Person person);

}
