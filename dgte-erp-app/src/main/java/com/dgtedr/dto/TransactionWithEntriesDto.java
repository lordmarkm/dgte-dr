package com.dgtedr.dto;

import java.util.List;

import javax.validation.Valid;
import javax.validation.constraints.NotNull;

import lombok.Data;

@Data
public class TransactionWithEntriesDto {

    @NotNull
    @Valid
    private TransactionDto transaction;

    @NotNull
    private List<EntryDto> entries;

}
