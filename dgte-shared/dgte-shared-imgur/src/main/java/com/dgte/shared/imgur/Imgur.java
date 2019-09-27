package com.dgte.shared.imgur;

import java.io.File;

import com.dgte.shared.imgur.dto.ImgurResponse;
import com.dgte.shared.imgur.dto.UploadResponseData;

import feign.Feign;
import feign.form.FormEncoder;
import feign.jackson.JacksonDecoder;
import feign.jackson.JacksonEncoder;

public class Imgur {

    private static final String IMGUR_URL = "https://api.imgur.com/3";
    private String clientId;
    //private String clientSecret;
    private ImgurClient client;

    public Imgur(String clientId, String clientSecret) {
        this.clientId = clientId;
        //this.clientSecret = clientSecret;
        this.client = Feign.builder()
                        .encoder(new FormEncoder(new JacksonEncoder()))
                        .decoder(new JacksonDecoder())
                        .target(ImgurClient.class, IMGUR_URL);
    }

    public ImgurResponse<UploadResponseData> uploadImage(File image) {
        return client.uploadImage(this.clientId, image);
    }

}
