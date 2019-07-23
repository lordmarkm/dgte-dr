package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.dto.NotificationSubscriptionDto;

public interface NotificationSubscriptionServiceCustom {

    Optional<NotificationSubscriptionDto> findDtoByProjectCode(String projectCode);

}
