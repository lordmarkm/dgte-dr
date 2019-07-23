package com.dgtedr.service;

import java.util.Optional;

import com.dgtedr.domain.NotificationSubscription;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface NotificationSubscriptionService extends NotificationSubscriptionServiceCustom,
    BaseJpaRepository<NotificationSubscription, Long> {

    Optional<NotificationSubscription> findByProjectCode(String projectCode);

}
