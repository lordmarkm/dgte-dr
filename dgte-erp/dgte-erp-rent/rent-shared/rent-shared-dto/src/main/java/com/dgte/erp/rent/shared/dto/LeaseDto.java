package com.dgte.erp.rent.shared.dto;

import java.time.LocalDate;
import java.util.List;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class LeaseDto extends BaseDto {

    private String projectId;
    private String apartmentId;
    private String roomId;
    private List<String> leseeNames;
    private LocalDate startOfLease;
    private LocalDate endOfLease;
    private boolean active;

}
