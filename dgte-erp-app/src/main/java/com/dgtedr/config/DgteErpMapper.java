package com.dgtedr.config;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.NullValuePropertyMappingStrategy;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.BaseEntity;
import com.dgtedr.domain.Entry;
import com.dgtedr.domain.Person;
import com.dgtedr.domain.Project;
import com.dgtedr.domain.Transaction;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.BaseDto;
import com.dgtedr.dto.EntryDto;
import com.dgtedr.dto.PersonDto;
import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.TransactionDto;

@Mapper(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
public interface DgteErpMapper {

    @Mapping(target = "createdDate", ignore = true)
    @Mapping(target = "updatedDate", ignore = true)
    BaseEntity anyDtoToEntity(BaseDto dto);

    PersonDto toDto(Person person);

    Project toEntity(ProjectDto project);
    ProjectDto toDto(Project project);

    Account toEntity(AccountDto account);
    @Mapping(target = "parent.children", ignore = true)
    AccountDto toDto(Account account);

    Transaction toEntity(TransactionDto txn);
    TransactionDto toDto(Transaction txn);

    Entry toEntity(EntryDto entry);

    @Mapping(target = "account.parent", ignore = true)
    @Mapping(target = "account.children", ignore = true)
    EntryDto toDto(Entry entry);

    @Mapping(target = "account.parent", ignore = true)
    @Mapping(target = "account.children", ignore = true)
    @Mapping(target = "transaction", ignore = true)
    EntryDto entryLite(Entry entry);
}
