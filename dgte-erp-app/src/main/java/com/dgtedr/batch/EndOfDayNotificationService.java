package com.dgtedr.batch;

import static com.dgtedr.domain.QProject.project;
import static com.dgtedr.domain.QTransaction.transaction;

import java.awt.Color;
import java.awt.Font;
import java.io.File;
import java.io.IOException;
import java.io.StringWriter;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Optional;
import java.util.stream.Collectors;

import org.knowm.xchart.BitmapEncoder;
import org.knowm.xchart.BitmapEncoder.BitmapFormat;
import org.knowm.xchart.PieChart;
import org.knowm.xchart.PieChartBuilder;
import org.knowm.xchart.PieSeries.PieSeriesRenderStyle;
import org.knowm.xchart.style.PieStyler.AnnotationType;
import org.knowm.xchart.style.Styler.ToolTipType;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.domain.Account;
import com.dgtedr.domain.AccountBalance;
import com.dgtedr.domain.NotificationSubscription;
import com.dgtedr.domain.Project;
import com.dgtedr.domain.Transaction;
import com.dgtedr.ref.AccountType;
import com.dgtedr.service.AccountBalanceService;
import com.dgtedr.service.EntryService;
import com.dgtedr.service.NotificationSubscriptionService;
import com.dgtedr.service.ProjectService;
import com.dgtedr.service.TransactionService;
import com.dgtedr.util.DateUtil;
import com.github.mustachejava.DefaultMustacheFactory;
import com.github.mustachejava.Mustache;
import com.github.mustachejava.MustacheFactory;
import com.google.common.collect.ImmutableMap;
import com.google.common.collect.Lists;
import com.google.common.collect.Maps;
import com.dgte.shared.imgur.Imgur;
import com.dgte.shared.imgur.dto.ImgurResponse;
import com.dgte.shared.imgur.dto.UploadResponseData;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class EndOfDayNotificationService {

    @Autowired
    private ProjectService projectService;

    @Autowired
    private NotificationSubscriptionService notificationSubscriptionService;

    @Autowired
    private TransactionService transactionService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private EntryService entryService;

    @Autowired
    private AccountBalanceService accountBalanceService;

    @Transactional
    @Scheduled(fixedRate = 60000)
    public void run() {
        log.info("Running notification task...");
        List<Project> projects = (List<Project>) projectService.findAll(project.deleted.isFalse());
        projects.forEach(this::notifySubscribedUsers);
    }

    private void notifySubscribedUsers(Project project) {
        log.debug("Running notifications for project. project={}");
        List<NotificationSubscription> subscriptions = notificationSubscriptionService.findByProjectCodeAndNotify(project.getCode(), true);
        if (subscriptions.isEmpty()) {
            log.info("No subscriptions found for project. project={}", project.getName());
            return;
        } else {
            log.debug("Found subscriptions. count={}", subscriptions.size());
        }

        subscriptions.forEach(this::notifySubscribedUser);
    }

    private void notifySubscribedUser(NotificationSubscription subscription) {
        log.debug("Processing subscription. sub={}", subscription);

        Optional<String> transactionsUpdateOpt = this.transactionsUpdate(subscription);
        if (transactionsUpdateOpt.isPresent()) {
            SimpleMailMessage message =  new SimpleMailMessage();
            message.setTo(subscription.getEmail());
            message.setSubject("Cool beans");
            message.setText(transactionsUpdateOpt.get());
            mailSender.send(message);
        }

        subscription.setLastNotification(LocalDateTime.now());
    }

    private Optional<String> transactionsUpdate(NotificationSubscription subscription) {
        LocalDateTime lastNotificationDate = subscription.getLastNotification();
        List<Transaction> newTransactions = (List<Transaction>) transactionService.findAll(transaction.createdDate.after(lastNotificationDate));
        List<Transaction> modifiedTransactions = (List<Transaction>) transactionService.findAll(
                transaction.createdDate.loe(lastNotificationDate).and(
                        transaction.updatedDate.after(lastNotificationDate)));

        if (newTransactions.isEmpty() && modifiedTransactions.isEmpty()) {
            log.debug("No new transactions since last notification. Until next time.");
            return Optional.empty();
        }

        Map<String, Account> accountsToSummarizeMap = Maps.newHashMap();
        newTransactions.stream()
            .map(txn -> {
                return entryService.findByTransactionCode(txn.getCode());
            })
            .flatMap(entries -> entries.stream())
            .map(entry -> entry.getAccount().getParent())
            .filter(Objects::nonNull)
            .filter(acct -> acct.getType() == AccountType.EQUITY)
            .forEach(parentAccount -> {
                accountsToSummarizeMap.put(parentAccount.getCode(), parentAccount);
            });

        List<EmailScheduleDto> schedules = Lists.newArrayList();
        accountsToSummarizeMap.values().forEach(account -> {
            schedules.add(createSchedule(account));
        });

        MustacheFactory mf = new DefaultMustacheFactory();
        Mustache mustache = mf.compile("email/transactions-update.mustache");

        StringWriter writer = new StringWriter();
        String messageText = null;
        Map<String, Object> scope = ImmutableMap.of(
            "projectName", subscription.getProject().getName(),
            "newTransactions", newTransactions,
            "modifiedTransactions", modifiedTransactions,
            "schedules", schedules,
            "asOfDate", LocalDate.now().format(DateUtil.DATE_FORMATTER)
        );

        try {
           mustache.execute(writer, scope).flush();
           messageText = writer.toString();
        } catch (IOException e) {
           e.printStackTrace();
           messageText = e.getMessage();
        }

        return Optional.ofNullable(messageText);
    }

    private EmailScheduleDto createSchedule(Account account) {
        //Initialize the chart
        PieChart chart = new PieChartBuilder().width(400).height(300).title(account.getName()).build();

        //Add the values
        List<Account> children = account.getChildren();
        children.stream().forEach(childAccount -> {
            log.debug("Adding series for account. account={}", childAccount.getName());
            AccountBalance accountBalance = accountBalanceService.calculateBalance(childAccount, LocalDate.now(), false);
            BigDecimal balance = accountBalance.getBalance();
            log.debug("Balance={}", balance);
            chart.addSeries(childAccount.getName(), balance);
        });

        //Style
//        Color[] sliceColors = new Color[] { new Color(224, 68, 14), new Color(230, 105, 62), new Color(236, 143, 110), new Color(243, 180, 159), new Color(246, 199, 182) };
//        chart.getStyler().setSeriesColors(sliceColors);
        chart.getStyler().setToolTipsEnabled(true);
        chart.getStyler().setToolTipsAlwaysVisible(true);
        chart.getStyler().setToolTipFont(new Font(Font.SERIF, Font.PLAIN, 6));
        chart.getStyler().setPlotContentSize(.9);
        chart.getStyler().setDefaultSeriesRenderStyle(PieSeriesRenderStyle.Donut);
        chart.getStyler().setLegendVisible(false);
        chart.getStyler().setSumVisible(false);

        String imageLink = "https://i.imgur.com/otLb7Vfm.png";
        try {
            File temporario = File.createTempFile("tmp_", ".png");
            BitmapEncoder.saveBitmapWithDPI(chart, temporario.getAbsolutePath(), BitmapFormat.PNG, 300);

            Imgur imgur = new Imgur("e8377860067cbd6", "b1f4296d031d923a3bc2fe5e6221e9d8142683af");
            ImgurResponse<UploadResponseData> response = imgur.uploadImage(temporario);
            Optional<UploadResponseData> responseOpt = response.getData();
            if (response.isSuccess() && responseOpt.isPresent()) {
                log.info("imgur response received={}", responseOpt.get());
                imageLink = responseOpt.get().getLink();
            } else {
                log.warn("Imgur upload failed. resp={}", response);
            }
        } catch (IOException e1) {
            // TODO Auto-generated catch block
            e1.printStackTrace();
        }

        EmailScheduleDto schedule = new EmailScheduleDto();
        schedule.setImageLink(imageLink);
        return schedule;
    }
}
