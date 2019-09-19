package com.dgte.erp.rent.service;

import com.dgte.erp.rent.domain.Room;
import com.dgte.shared.jpa.service.BaseJpaRepository;

public interface RoomService extends RoomServiceCustom, BaseJpaRepository<Room, Long> {

}
