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
    private AccountBalanceService accountBalanceService;

    @Autowired
    private EntryService entryService;

    @Autowired
    private DgteErpMapper mapper;

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
        AccountBalance rootAccountBalance = this.calculateBalance(root, asOfDate, forceRecompute);

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

    private AccountBalance calculateBalance(Account account, LocalDate asOfDate, boolean forceRecompute) {
        if (account.hasChildren()) {
            //For accounts with children, the balance is the sum of its children's balances
            Optional<AccountBalance> previouslyComputedBalanceOpt = accountBalanceService.findByAccountAndAsOfDate(account, asOfDate);
            AccountBalance accountBalance;
            if (!previouslyComputedBalanceOpt.isPresent()) {
                accountBalance = new AccountBalance();
                accountBalance.setAccount(account);
                accountBalance.setAsOfDate(asOfDate);
                accountBalance.setBalance(BigDecimal.ZERO);
                accountBalance = accountBalanceService.save(accountBalance);
            } else {
                accountBalance = previouslyComputedBalanceOpt.get();
            }

            List<AccountBalance> children = Lists.newArrayList();
            BigDecimal totalBalance = BigDecimal.ZERO;
            for (Account child : account.getChildren()) {
                AccountBalance childBalance = this.calculateBalance(child, asOfDate, forceRecompute);
                totalBalance = totalBalance.add(childBalance.getBalance());
                children.add(childBalance);
            }
            accountBalance.setChildren(children);
            accountBalance.setBalance(totalBalance);
            return accountBalance;
        } else {
            //For accounts without children, compute the balance from its entries
            Optional<AccountBalance> previouslyComputedBalanceOpt = accountBalanceService.findByAccountAndAsOfDate(account, asOfDate);
            if (!previouslyComputedBalanceOpt.isPresent()) {
                AccountBalance accountBalance = new AccountBalance();
                accountBalance.setAccount(account);
                accountBalance.setAsOfDate(asOfDate);
                this.recomputeBalance(accountBalance);
                return accountBalanceService.save(accountBalance);
            } else {
                AccountBalance previouslyComputedBalance = previouslyComputedBalanceOpt.get();

                boolean hasMoreRecentlyUpdatedEntries = false;
                long moreRecentEntries = entryService.count(entry.updatedDate.after(previouslyComputedBalance.getUpdatedDate()));
                hasMoreRecentlyUpdatedEntries = moreRecentEntries > 0;
                if (forceRecompute || hasMoreRecentlyUpdatedEntries) {
                    this.recomputeBalance(previouslyComputedBalance);
                }
                return previouslyComputedBalance;
            }
        }
    }

    private void recomputeBalance(AccountBalance accountBalance) {
        BooleanExpression query = entry.account.eq(accountBalance.getAccount())
                //TODO is this right, or should it be entry.transaction.transactionDate???
                .and(entry.entryDate.loe(accountBalance.getAsOfDate()));

        List<Entry> entries = (List<Entry>) entryService.findAll(query);
        log.debug("Found entries for query account={}, asOfDate={}. Entry count={}", accountBalance.getAccount().getAccountCode(),
                accountBalance.getAsOfDate(), entries.size());
        BigDecimal balance = entries.stream()
                .map(entry -> {
                    log.debug("Processing entry. debit={}, credit={}", entry.getDebit(), entry.getCredit());
                    switch (entry.getAccount().getType()) {
                    case ASSET:
                        return entry.getDebit().subtract(entry.getCredit());
                    case LIABILITY:
                    case EQUITY:
                        return entry.getCredit().subtract(entry.getDebit());
                    default:
                        throw new IllegalStateException("Uncomputeable account balance! type=" + entry.getAccount().getType());
                    }
                })
                .reduce(BigDecimal.ZERO, (subtotal, entryBalance) -> {
                    return subtotal.add(entryBalance);
                });
        accountBalance.setBalance(balance);
    }

}
