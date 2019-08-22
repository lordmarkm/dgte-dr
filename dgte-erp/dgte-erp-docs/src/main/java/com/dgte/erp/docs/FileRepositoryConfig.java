package com.dgte.erp.docs;

import io.minio.MinioClient;
import io.minio.errors.InvalidEndpointException;
import io.minio.errors.InvalidPortException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Slf4j
public class FileRepositoryConfig {

    @Value("${minio.domain}")
    private String domain;

    @Value("${minio.accessKey}")
    private String accessKey;

    @Value("${minio.secretKey}")
    private String secretKey;

    @Bean
    public MinioClient minioClient() throws InvalidPortException, InvalidEndpointException {
        log.info("Initializing connection to FS with domain={}, accessKey={} and secretKey={}", domain, accessKey, secretKey);
        return new MinioClient(domain, accessKey, secretKey);
    }
}
