package com.dgte.erp.rent.service.impl;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;

import com.dgte.erp.rent.domain.Lease;
import com.dgte.erp.rent.domain.Room;
import com.dgte.erp.rent.dto.LeaseDto;
import com.dgte.erp.rent.mapper.DgteErpRentMapper;
import com.dgte.erp.rent.service.LeaseService;
import com.dgte.erp.rent.service.LeaseServiceCustom;
import com.dgte.erp.rent.service.RoomService;
import com.dgte.shared.app.exception.ConflictException;
import com.dgte.shared.app.exception.InvalidCodeException;
import com.querydsl.core.types.dsl.BooleanExpression;
import static com.dgte.erp.rent.domain.QLease.lease;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Transactional(readOnly = true)
public class LeaseServiceImpl implements LeaseServiceCustom {

    @Autowired
    private DgteErpRentMapper mapper;

    @Autowired
    private RoomService roomService;

    @Autowired
    private LeaseService leaseService;

    @Override
    @Transactional
    public LeaseDto save(LeaseDto leaseDto) {
        String roomCode = leaseDto.getRoomCode();
        Optional<Room> roomOpt = roomService.findByCode(roomCode);
        if (!roomOpt.isPresent()) {
            throw new InvalidCodeException("There is no room with code=" + roomCode);
        }

        boolean newLease = null == leaseDto.getCode();

        Optional<Lease> currentActiveLeaseOpt = leaseService.findActiveLeaseByRoomCode(roomCode);
        if (currentActiveLeaseOpt.isPresent()) {
            Lease currectActiveLease = currentActiveLeaseOpt.get();
            boolean sameLease = currectActiveLease.getCode().equals(leaseDto.getCode());
            boolean isToSaveLeaseActive = leaseDto.isActive();
            if (newLease || (!sameLease && isToSaveLeaseActive)) {
                throw new ConflictException("There is a different active lease for this room");
            }
        }

        if (newLease) {
            handleNewLease(leaseDto);
        }

        if (leaseDto.isActive()) {
            roomOpt.get().setAvailable(false);
        }

        Lease lease = mapper.toEntity(leaseDto);

        return mapper.toDto(leaseService.save(lease));
    }

    private void handleNewLease(LeaseDto lease) {
        BigDecimal advancePayment = lease.getAdvancePayment();
        lease.setLastPaymentAmount(advancePayment);
        lease.setLastPaymentDate(LocalDate.now());

        //The initial next due date is the next due date after the lease start date
        int dueDateOfMonth = lease.getDueDateDayOfMonth();
        LocalDate leaseStartDate = lease.getLeaseStartDate();
        LocalDate nextDueDate = leaseStartDate.withDayOfMonth(dueDateOfMonth);

        //Handle case where the lease start date would occur after the next due date, in which case the next due date would be the following month
        if (leaseStartDate.isAfter(nextDueDate)) {
            nextDueDate = leaseStartDate.plusMonths(1L).withDayOfMonth(dueDateOfMonth);
        }

        //If the remaining balance can cover the rent, subtract the rent amount and move the due date forward one month
        //Repeat until the balance can no longer cover the monthly rent
        BigDecimal monthlyRent = lease.getMonthlyRent();
        BigDecimal balance = BigDecimal.ZERO.add(advancePayment);
        LocalDate lastPaymentCoverageEndDate = leaseStartDate;
        while (balance.compareTo(monthlyRent) >= 0) {
            balance = balance.subtract(monthlyRent);
            nextDueDate = nextDueDate.plusMonths(1);
            lastPaymentCoverageEndDate = lastPaymentCoverageEndDate.plusMonths(1);
        }
        lastPaymentCoverageEndDate = lastPaymentCoverageEndDate.minusDays(1);

        //Set the values for last payment info
        lease.setLastPaymentCoverageStartDate(leaseStartDate);
        lease.setLastPaymentCoverageEndDate(lastPaymentCoverageEndDate);

        //The next due amount is equal to the monthly rent minus the remaining balance
        lease.setNextAmountDue(monthlyRent.subtract(balance));
        lease.setNextDueDate(nextDueDate);

        //Because the balance is used in the next due amount, the remaining balance is 0
        lease.setBalanceAfterLastPayment(BigDecimal.ZERO);
        lease.setActive(true);
    }

    @Override
    public Optional<Lease> findActiveLeaseByRoomCode(String roomCode) {
        BooleanExpression activeLeaseQuery =
                lease.deleted.isFalse()
                    .and(lease.roomCode.eq(roomCode))
                    .and(lease.active.isTrue());
        return leaseService.findOne(activeLeaseQuery);
    }

    @Override
    public Optional<LeaseDto> findActiveLeaseDtoByRoomCode(String roomCode) {
        return leaseService.findActiveLeaseByRoomCode(roomCode).map(mapper::toDto);
    }

}
