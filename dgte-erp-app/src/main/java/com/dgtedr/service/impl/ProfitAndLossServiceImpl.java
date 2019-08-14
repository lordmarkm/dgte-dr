package com.dgtedr.service.impl;

import static com.dgtedr.domain.QAccount.account;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.BalanceSheetDto;
import com.dgtedr.dto.ProfitAndLossDto;
import com.dgtedr.service.AccountBalanceService;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.ProfitAndLossService;
import com.dgtedr.service.ProjectService;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProfitAndLossServiceImpl implements ProfitAndLossService {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private ProjectService projectService;

    @Autowired
    private AccountService accountService;

    @Autowired
    private AccountBalanceService accountBalanceService;

    @Override
    public Optional<ProfitAndLossDto> getProfitAndLoss(String projectCode, LocalDate startDate, LocalDate endDate,
            boolean forceRecompute) {

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
        AccountBalance rootAccountBalance = accountBalanceService.calculateBalance(root, startDate, endDate, forceRecompute);

        ProfitAndLossDto plDto = new ProfitAndLossDto();
        plDto.setStartDate(startDate);
        plDto.setEndDate(endDate);
        plDto.setProject(projectOpt.map(mapper::toDto).get());
        for (AccountBalance accountBalance : rootAccountBalance.getChildren()) {
            switch (accountBalance.getAccount().getType()) {
            case EXPENSE:
                plDto.getExpenses().add(mapper.toDto(accountBalance));
                break;
            case INCOME:
                plDto.getIncomes().add(mapper.toDto(accountBalance));
                break;
            default:
                //throw new IllegalStateException("Unhandled account type: " + accountBalance.getAccount().getType());
                log.info("Ignoring unhandled account type. type={}", accountBalance.getAccount().getType());
            }
        }

        return Optional.of(plDto);
    }

}
