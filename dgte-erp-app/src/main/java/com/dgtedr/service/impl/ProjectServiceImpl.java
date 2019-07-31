package com.dgtedr.service.impl;

import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.domain.Account;
import com.dgtedr.domain.NotificationEmail;
import com.dgtedr.domain.NotificationSubscription;
import com.dgtedr.domain.Project;
import com.dgtedr.dto.AccountDto;
import com.dgtedr.dto.ProjectDto;
import com.dgtedr.dto.ProjectSearchDto;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountService;
import com.dgtedr.service.NotificationSubscriptionService;
import com.dgtedr.service.ProjectService;
import com.dgtedr.service.ProjectServiceCustom;
import com.google.common.collect.Lists;

@Transactional(readOnly = true)
public class ProjectServiceImpl implements ProjectServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private ProjectService service;

    @Autowired
    private AccountService accountService;

    @Autowired
    private NotificationSubscriptionService notificationSubscriptionService;

    @Value("${app.notifications.default-email}")
    private String DEFAULT_NOTIFICATION_EMAIL;

    @Override
    public Page<ProjectDto> findAll(ProjectSearchDto searchDto, Pageable pageable) {
        return service.findAll(searchDto.toQuery(), pageable)
                    .map(mapper::toDto);
    }

    @Override
    public Optional<ProjectDto> findDtoByCode(String code) {
        return service.findByCode(code)
                .map(mapper::toDto);
    }

    @Override
    @Transactional
    public ProjectDto save(ProjectDto project) {
        Project savedProject = service.save(mapper.toEntity(project));

        //For new projects, create a root account & permanent accounts & default subscriptions
        Optional<AccountDto> rootAccountOpt = accountService.findRootByProjectCode(savedProject.getCode());
        if (!rootAccountOpt.isPresent()) {
            this.createPermanentAccounts(savedProject);
            this.createDefaultNotificationSubscriptions(savedProject);
        }

        return mapper.toDto(savedProject);
    }

    private void createDefaultNotificationSubscriptions(Project project) {
        NotificationEmail defaultNotification = new NotificationEmail();
        defaultNotification.setEmail(DEFAULT_NOTIFICATION_EMAIL);
        defaultNotification.setEnabled(true);

        NotificationSubscription projectNotifs = new NotificationSubscription();
        projectNotifs.setEmails(Lists.newArrayList(defaultNotification));
        projectNotifs.setProject(project);
        projectNotifs.setLastNotification(LocalDateTime.now().minusYears(10L));
        notificationSubscriptionService.save(projectNotifs);
    }

    private void createPermanentAccounts(Project project) {
        Account rootAccount = new Account();
        rootAccount.setName(project.getName() + " - Root Account");
        rootAccount.setProject(project);
        rootAccount.setType(AccountType.UNSPECIFIED);
        rootAccount.setAccountCode("1");
        rootAccount.setPermanent(true);
        rootAccount = accountService.save(rootAccount);

        Account assets = new Account();
        assets.setName("Assets");
        assets.setProject(project);
        assets.setPermanent(true);
        assets.setType(AccountType.ASSET);
        assets.setAccountCode("1000");
        assets.setParent(rootAccount);
        assets = accountService.save(assets);

        Account liabilities = new Account();
        liabilities.setName("Liabilities");
        liabilities.setProject(project);
        liabilities.setPermanent(true);
        liabilities.setType(AccountType.LIABILITY);
        liabilities.setAccountCode("2000");
        liabilities.setParent(rootAccount);
        liabilities = accountService.save(liabilities);

        //Equities and default children
        Account equities = new Account();
        equities.setName("Equities");
        equities.setProject(project);
        equities.setPermanent(true);
        equities.setType(AccountType.EQUITY);
        equities.setAccountCode("3000");
        equities.setParent(rootAccount);
        equities = accountService.save(equities);

        Account contribution = new Account();
        contribution.setName("Business owner contribution");
        contribution.setProject(project);
        contribution.setType(AccountType.EQUITY);
        contribution.setAccountCode("3010");
        contribution.setParent(equities);
        accountService.save(contribution);

        Account income = new Account();
        income.setName("Income");
        income.setProject(project);
        income.setType(AccountType.EQUITY);
        income.setAccountCode("3020");
        income.setParent(equities);
        accountService.save(income);

        Account drawing = new Account();
        drawing.setName("Business Owner Drawing");
        drawing.setProject(project);
        drawing.setType(AccountType.EQUITY);
        drawing.setAccountCode("3030");
        drawing.setParent(equities);
        accountService.save(drawing);
    }
}
