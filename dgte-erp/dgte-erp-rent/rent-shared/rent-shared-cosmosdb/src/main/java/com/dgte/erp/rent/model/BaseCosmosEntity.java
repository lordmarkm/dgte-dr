package com.dgte.erp.rent.model;

import java.time.LocalDateTime;

import lombok.Data;

@Data
public class BaseCosmosEntity {

    private long id;
    private boolean deleted;
    private String code;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}
