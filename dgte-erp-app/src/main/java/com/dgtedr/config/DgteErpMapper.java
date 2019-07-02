package com.dgtedr.config;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.BaseEntity;
import com.dgtedr.domain.Person;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.BaseDto;
import com.dgtedr.dto.PersonDto;
import com.dgtedr.dto.ProjectDto;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DgteErpMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseEntity anyDtoToEntity(BaseDto dto);

    PersonDto toDto(Person person);

    Project toEntity(ProjectDto project);
    ProjectDto toDto(Project project);

    Account toEntity(AccountDto account);
    AccountDto toDto(Account account);
}
