package com.dgte.shared.imgur;

import java.io.File;
import java.net.URISyntaxException;

import org.junit.Test;

import com.dgte.shared.imgur.dto.ImgurResponse;
import com.dgte.shared.imgur.dto.UploadResponseData;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class UploadTest {

    @Test
    public void testUpload() throws URISyntaxException {
        Imgur imgur = new Imgur("e8377860067cbd6", "b1f4296d031d923a3bc2fe5e6221e9d8142683af");
        File image = new File(this.getClass().getClassLoader().getResource("test.jpg").getFile());
        ImgurResponse<UploadResponseData> response = imgur.uploadImage(image);
        log.info("resp={}", response);
    }

}

