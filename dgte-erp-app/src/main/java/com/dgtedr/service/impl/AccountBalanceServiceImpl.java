package com.dgtedr.service.impl;

import static com.dgtedr.domain.QEntry.entry;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.domain.Entry;
import com.dgtedr.dto.AccountBalanceDto;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountBalanceService;
import com.dgtedr.service.AccountBalanceServiceCustom;
import com.dgtedr.service.EntryService;
import com.google.common.collect.Lists;
import com.querydsl.core.types.dsl.BooleanExpression;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class AccountBalanceServiceImpl implements AccountBalanceServiceCustom {

    @Autowired
    private AccountBalanceService accountBalanceService;

    @Autowired
    private EntryService entryService;

    @Override
    public AccountBalance calculateBalance(Account account, LocalDate endDate, boolean forceRecompute) {
        return this.calculateBalance(account, null, endDate, forceRecompute);
    }

    @Override
    public AccountBalance calculateBalance(Account account, LocalDate startDate, LocalDate asOfDate, boolean forceRecompute) {
        if (account.hasChildren()) {
            //For accounts with children, the balance is the sum of its children's balances
            Optional<AccountBalance> previouslyComputedBalanceOpt = this.findPreviouslyComputedBalance(account, startDate, asOfDate);
            AccountBalance accountBalance;
            if (!previouslyComputedBalanceOpt.isPresent()) {
                accountBalance = new AccountBalance();
                accountBalance.setAccount(account);
                accountBalance.setStartDate(startDate);
                accountBalance.setAsOfDate(asOfDate);
                accountBalance.setBalance(BigDecimal.ZERO);
                accountBalance = accountBalanceService.save(accountBalance);
            } else {
                accountBalance = previouslyComputedBalanceOpt.get();
            }

            List<AccountBalance> children = Lists.newArrayList();
            BigDecimal totalBalance = BigDecimal.ZERO;

            //First sort children by code
            //Update: Sorting was moved to getter
            //account.getChildren().sort((acctA, acctB) -> acctA.getAccountCode().compareTo(acctB.getAccountCode()));
            for (Account child : account.getChildren()) {
                AccountBalance childBalance = this.calculateBalance(child, startDate, asOfDate, forceRecompute);
                totalBalance = totalBalance.add(childBalance.getBalance());
                children.add(childBalance);
            }
            accountBalance.setChildren(children);
            accountBalance.setBalance(totalBalance);
            return accountBalance;
        } else {
            //For accounts without children, compute the balance from its entries
            Optional<AccountBalance> previouslyComputedBalanceOpt = this.findPreviouslyComputedBalance(account, startDate, asOfDate);
            if (!previouslyComputedBalanceOpt.isPresent()) {
                AccountBalance accountBalance = new AccountBalance();
                accountBalance.setAccount(account);
                accountBalance.setStartDate(startDate);
                accountBalance.setAsOfDate(asOfDate);
                this.recomputeBalance(accountBalance);
                log.debug("Returning new computed balance for account w/o children. acct={}, balance={}", account.getName(), accountBalance.getBalance());
                return accountBalanceService.save(accountBalance);
            } else {
                AccountBalance previouslyComputedBalance = previouslyComputedBalanceOpt.get();

                boolean hasMoreRecentlyUpdatedEntries = false;
                long moreRecentEntries = entryService.count(entry.updatedDate.after(previouslyComputedBalance.getUpdatedDate()));
                hasMoreRecentlyUpdatedEntries = moreRecentEntries > 0;
                if (forceRecompute || hasMoreRecentlyUpdatedEntries) {
                    this.recomputeBalance(previouslyComputedBalance);
                }
                log.debug("Returning new computed balance for account w/o children. acct={}, balance={}", account.getName(), previouslyComputedBalance.getBalance());
                return previouslyComputedBalance;
            }
        }
    }

    private Optional<AccountBalance> findPreviouslyComputedBalance(Account account, LocalDate startDate, LocalDate asOfDate) {
        if (null == startDate) {
            return accountBalanceService.findByAccountAndAsOfDate(account, asOfDate);
        } else {
            return accountBalanceService.findByAccountAndAsOfDate(account, asOfDate);
        }
    }

    private void recomputeBalance(AccountBalance accountBalance) {
        BooleanExpression query = entry.account.eq(accountBalance.getAccount())
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
                    case EXPENSE:
                    case INCOME:
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

    @Override
    public Optional<AccountBalanceDto> findByProjectCodeAndAsOfDateAndType(String projectCode, LocalDate asOfDate,
            AccountType type, boolean forceRecompute) {
        // TODO Auto-generated method stub
        return null;
    }

}
