package com.dgtedr.dto;

import java.time.LocalDate;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class TransactionDto extends BaseDto {

    @NotNull
    private ProjectDto project;

    @NotEmpty
    private String description;

    @NotNull
    @JsonFormat(pattern = "yyyy-MMM-d")
    private LocalDate transactionDate;

}
