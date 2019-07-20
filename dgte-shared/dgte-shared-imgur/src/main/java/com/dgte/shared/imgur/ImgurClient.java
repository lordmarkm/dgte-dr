package com.dgte.shared.imgur;

import java.io.File;

import com.dgte.shared.imgur.dto.ImgurResponse;
import com.dgte.shared.imgur.dto.UploadResponseData;

import feign.Headers;
import feign.Param;
import feign.RequestLine;

public interface ImgurClient {

    @Headers({
        "Authorization: Client-ID {client_id}",
        "Content-Type: multipart/form-data"
    })
    @RequestLine("POST /upload")
    ImgurResponse<UploadResponseData> uploadImage(@Param("client_id") String clientId, @Param("image") File image);

}
