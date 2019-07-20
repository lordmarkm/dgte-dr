package com.dgte.shared.imgur.dto;

import lombok.Data;

@Data
public class ImgurResponse<T extends ImgurResponseData> {

    private T data;
    private boolean success;
    private String status;

}
