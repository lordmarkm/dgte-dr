package com.dgte.shared.imgur.dto;

import java.util.Optional;

import lombok.Data;

@Data
public class ImgurResponse<T extends ImgurResponseData> {

    private T data;
    private boolean success;
    private String status;

    public Optional<T> getData() {
        return Optional.ofNullable(data);
    }
}
