package com.dgtedr.service;

import java.util.List;
import java.util.Optional;

import com.dgtedr.domain.NotificationSubscription;
import com.rbank.los.commons.data.repository.BaseJpaRepository;

public interface NotificationSubscriptionService extends BaseJpaRepository<NotificationSubscription, Long> {

    Optional<NotificationSubscription> findByProjectCodeAndEmail(String projectCode, String email);
    List<NotificationSubscription> findByProjectCodeAndNotify(String projectCode, boolean notify);

}
