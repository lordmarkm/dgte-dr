package com.dgte.erp.rent.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;

import lombok.Data;

@Data
public class BaseCosmosEntity {

    @Id
    private String id;
    private boolean deleted;
    private LocalDateTime createdDate;
    private LocalDateTime updatedDate;

}
