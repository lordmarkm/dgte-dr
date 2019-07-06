package com.dgtedr.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

import com.dgtedr.util.DateUtil;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class EntryDto extends BaseDto {

    @NotNull private AccountDto account;
    @NotNull private TransactionDto transaction;

    @NotNull
    @JsonFormat(pattern = DateUtil.DATE_FORMAT)
    private LocalDate entryDate;

    @NotNull @Min(0) private BigDecimal amount;

}
