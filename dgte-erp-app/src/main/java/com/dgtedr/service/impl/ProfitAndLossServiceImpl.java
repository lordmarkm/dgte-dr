package com.dgtedr.service.impl;

import static com.dgtedr.domain.QAccount.account;

import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.ProfitAndLossDto;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountBalanceService;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.ProfitAndLossService;
import com.dgtedr.service.ProjectService;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@Transactional(readOnly = true)
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
    @Transactional
    public Optional<ProfitAndLossDto> getProfitAndLoss(String projectCode, LocalDate startDate, LocalDate endDate,
            boolean forceRecompute) {

        Optional<Project> projectOpt = projectService.findByCode(projectCode);
        if (!projectOpt.isPresent()) {
            log.warn("Unabled to find project with projectCode={}", projectCode);
            return Optional.empty();
        }

        BooleanExpression rootQuery = account.project.code.eq(projectCode)
                .and(account.parent.isNull());
        Optional<Account> rootOpt = accountService.findOne(rootQuery);
        if (!rootOpt.isPresent()) {
            log.warn("Unabled to find root account for project with projectCode={}", projectCode);
            return Optional.empty();
        }

        Account root = rootOpt.get();
        AccountBalance rootAccountBalance = accountBalanceService.calculateBalance(root, startDate, endDate, forceRecompute);
        AccountBalance equities = rootAccountBalance.getChildren().stream().filter(a -> AccountType.EQUITY.equals(a.getAccount().getType())).findFirst().get();

        ProfitAndLossDto plDto = new ProfitAndLossDto();
        plDto.setStartDate(startDate);
        plDto.setEndDate(endDate);
        plDto.setProject(projectOpt.map(mapper::toDto).get());

        for (AccountBalance accountBalance : equities.getChildren()) {
            switch (accountBalance.getAccount().getType()) {
            case EXPENSE:
                log.info("Adding EXPENSE. account={}", accountBalance.getAccount().getName());
                plDto.getExpenses().add(mapper.toDto(accountBalance));
                break;
            case INCOME:
                log.info("Adding INCOME. account={}", accountBalance.getAccount().getName());
                plDto.getIncomes().add(mapper.toDto(accountBalance));
                break;
            default:
                //throw new IllegalStateException("Unhandled account type: " + accountBalance.getAccount().getType());
                log.info("Ignoring unhandled account type. type={}, account={}", accountBalance.getAccount().getType(), accountBalance.getAccount().getName());
            }
        }

        return Optional.of(plDto);
    }

}
