package com.dgte.erp.docs.service;

import io.minio.errors.MinioException;
import org.xmlpull.v1.XmlPullParserException;

import java.io.IOException;
import java.io.InputStream;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;

public interface FileRepository {

    void putObject(String objectName, InputStream inputStream, Long size) throws MinioException, XmlPullParserException, NoSuchAlgorithmException, InvalidKeyException, IOException;

    InputStream getObject(String objectName) throws MinioException, XmlPullParserException, NoSuchAlgorithmException, InvalidKeyException, IOException;
}
