package com.dgtedr.dto;

import java.util.Optional;

import org.springframework.http.HttpStatus;

import lombok.Data;

@Data
public class StatusedResponse<T extends BaseDto> {

    private HttpStatus status;
    Optional<T> data;

}
