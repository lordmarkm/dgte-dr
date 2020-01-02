package com.dgte.erp.rent.shared.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BaseDto {

    private long id;
    private boolean deleted;
    private String code;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}
