package com.dgtedr.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.support.CronSequenceGenerator;
import org.springframework.transaction.annotation.Transactional;

import com.dgtedr.config.DgteErpMapper;
import com.dgtedr.dto.NotificationSubscriptionDto;
import com.dgtedr.service.NotificationSubscriptionService;
import com.dgtedr.service.NotificationSubscriptionServiceCustom;

@Transactional(readOnly = true)
public class NotificationSubscriptionServiceImpl implements NotificationSubscriptionServiceCustom {

    @Autowired
    private DgteErpMapper mapper;

    @Autowired
    private NotificationSubscriptionService notificationSubscriptionService;

    @Value("${app.notif.eod-schedule}")
    private String notificationSchedule;

    @Override
    public Optional<NotificationSubscriptionDto> findDtoByProjectCode(String projectCode) {
        return notificationSubscriptionService.findByProjectCode(projectCode)
                    .map(notif -> {
                        NotificationSubscriptionDto notifDto = mapper.toDto(notif);
                        notifDto.setNextNotification(this.getNextNotification());
                        return notifDto;
                    });
    }

    private LocalDateTime getNextNotification() {
        CronSequenceGenerator cronTrigger = new CronSequenceGenerator(notificationSchedule);
        Date next = cronTrigger.next(new Date());
        return next.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    }

}
