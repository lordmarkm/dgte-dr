package com.dgtedr.dto;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class NotificationSubscriptionDto extends BaseDto {

    private List<NotificationEmailDto> emails;
    private ProjectDto project;
    private LocalDateTime lastNotification;
    private LocalDateTime nextNotification;

}
