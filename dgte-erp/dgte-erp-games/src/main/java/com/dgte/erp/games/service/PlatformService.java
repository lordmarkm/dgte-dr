package com.dgte.erp.games.service;

import java.util.Optional;

import com.dgte.erp.games.domain.Platform;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface PlatformService extends BaseJpaRepository<Platform, Long> {

    Optional<Platform> findByRefCode(String code);

}
