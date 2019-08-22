package com.dgte.erp.docs.service.impl;

import io.minio.MinioClient;
import io.minio.errors.ErrorResponseException;
import io.minio.errors.InsufficientDataException;
import io.minio.errors.InternalException;
import io.minio.errors.InvalidBucketNameException;
import io.minio.errors.MinioException;
import io.minio.errors.NoResponseException;
import io.minio.errors.RegionConflictException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.xmlpull.v1.XmlPullParserException;

import com.dgte.erp.docs.service.FileRepository;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

@Service
@Slf4j
public class FileRepositoryImpl implements FileRepository {

    @Value("${minio.bucketName}")
    private String bucketName;

    @Autowired
    private MinioClient minioClient;

    @PostConstruct
    public void fileRepositoryImpl() throws IOException, InvalidKeyException, NoSuchAlgorithmException, InsufficientDataException, InternalException, NoResponseException, InvalidBucketNameException, XmlPullParserException, ErrorResponseException, RegionConflictException {

        if (!minioClient.bucketExists(bucketName)) {
            log.info("Creating bucket={}", bucketName);
            minioClient.makeBucket(bucketName);
        }
    }

    public void putObject(String objectName, InputStream inputStream, Long size)
            throws MinioException, XmlPullParserException, NoSuchAlgorithmException, InvalidKeyException, IOException {
        minioClient.putObject(bucketName, objectName, inputStream, size, (String) null);
    }

    public InputStream getObject(String objectName)
            throws MinioException, XmlPullParserException, NoSuchAlgorithmException, InvalidKeyException, IOException {
        return minioClient.getObject(bucketName, objectName);
    }
}
