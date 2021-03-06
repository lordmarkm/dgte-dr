package com.dgte.erp.games.service;

import java.util.Optional;

import com.dgte.erp.games.domain.Order;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface OrderService extends OrderServiceCustom, BaseJpaRepository<Order, Long> {
    Optional<Order> findByCode(String orderCode);
}
