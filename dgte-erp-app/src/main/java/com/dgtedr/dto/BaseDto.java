package com.dgtedr.dto;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BaseDto {

    private long id;
    private boolean deleted;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}
