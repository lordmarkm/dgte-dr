package com.dgtedr.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class AuditableDto {

    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;
    private String createdBy;
    private String updatedBy;

}
