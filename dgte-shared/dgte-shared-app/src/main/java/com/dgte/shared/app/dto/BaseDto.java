package com.dgte.shared.app.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BaseDto {

    private long id;
    private boolean deleted;
    private String code;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

    protected BigDecimal zeroIfNull(BigDecimal value) {
        if (null == value) {
            return BigDecimal.ZERO;
        } else {
            return value;
        }
    }

}
