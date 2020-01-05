package com.dgte.erp.rent.shared.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BaseDto {

    private String id;
    private boolean deleted;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String remarks;

}
