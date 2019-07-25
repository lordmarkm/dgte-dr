package com.dgtedr.service.impl;

import static com.dgtedr.domain.QAccount.account;
import static com.dgtedr.domain.QEntry.entry;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.domain.Entry;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.BalanceSheetDto;
import com.dgtedr.dto.ComparativeBalanceSheetDto;
import com.dgtedr.service.AccountBalanceService;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.BalanceSheetService;
import com.dgtedr.service.EntryService;
import com.dgtedr.service.ProjectService;
import com.google.common.collect.Lists;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional
public class BalanceSheetServiceImpl implements BalanceSheetService {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private AccountBalanceService accountBalanceService;

    @Override
    public Optional<BalanceSheetDto> getBalanceSheet(String projectCode, LocalDate asOfDate) {
        return this.getBalanceSheet(projectCode, asOfDate, false);
    }

    @Override
    public Optional<BalanceSheetDto> getBalanceSheet(String projectCode, LocalDate asOfDate, boolean forceRecompute) {
        Optional<Project> projectOpt = projectService.findByCode(projectCode);
        if (!projectOpt.isPresent()) {
            return Optional.empty();
        }

        BooleanExpression rootQuery = account.project.code.eq(projectCode)
                .and(account.parent.isNull());
        Optional<Account> rootOpt = accountService.findOne(rootQuery);
        if (!rootOpt.isPresent()) {
            return Optional.empty();
        }

        Account root = rootOpt.get();
        AccountBalance rootAccountBalance = accountBalanceService.calculateBalance(root, asOfDate, forceRecompute);

        BalanceSheetDto balanceSheetDto = new BalanceSheetDto();
        balanceSheetDto.setAsOfDate(asOfDate);
        balanceSheetDto.setProject(projectOpt.map(mapper::toDto).get());
        for (AccountBalance accountBalance : rootAccountBalance.getChildren()) {
            switch (accountBalance.getAccount().getType()) {
            case ASSET:
                balanceSheetDto.getAssets().add(mapper.toDto(accountBalance));
                break;
            case LIABILITY:
                balanceSheetDto.getLiabilities().add(mapper.toDto(accountBalance));
                break;
            case EQUITY:
                balanceSheetDto.getEquities().add(mapper.toDto(accountBalance));
                break;
            default:
                throw new IllegalStateException("Unhandled account type: " + accountBalance.getAccount().getType());
            }
        }

        return Optional.of(balanceSheetDto);
    }

    @Override
    public Optional<ComparativeBalanceSheetDto> getComparativeBalanceSheet(String projectCode, LocalDate asOfDateA,
            LocalDate asOfDateB) {

        Optional<BalanceSheetDto> balanceSheetA = this.getBalanceSheet(projectCode, asOfDateA);
        if (!balanceSheetA.isPresent()) {
            return Optional.empty();
        }
        Optional<BalanceSheetDto> balanceSheetB = this.getBalanceSheet(projectCode, asOfDateB);
        if (!balanceSheetB.isPresent()) {
            return Optional.empty();
        }

        ComparativeBalanceSheetDto comparativeBalanceSheetDto = new ComparativeBalanceSheetDto(balanceSheetA.get(), balanceSheetB.get());
        return Optional.of(comparativeBalanceSheetDto);
    }

}
