package com.dgte.shared.imgur.dto;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
public class UploadResponseData extends ImgurResponseData {

    private String id;
    private String type;
    private String deletehash;
    private String link;

}
