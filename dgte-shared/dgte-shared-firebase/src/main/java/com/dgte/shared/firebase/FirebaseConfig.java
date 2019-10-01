package com.dgte.shared.firebase;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.auth.FirebaseAuth;

/**
 * Mostly copied from https://github.com/awaters1/spring-security-firebase
 * except the database URL is not set
 * @author mbmartinez on 14 Sep 2018
 */
@Configuration
@ComponentScan
public class FirebaseConfig {

    @Value("${firebase.config-file}")
    private String firebaseConfigFile;

    @Bean
    public FirebaseAuth firebaseAuth() throws IOException {
        Resource r = new ClassPathResource(firebaseConfigFile);
        FirebaseOptions options = new FirebaseOptions.Builder()
                .setCredentials(GoogleCredentials.fromStream(r.getInputStream()))
                .build();

        FirebaseApp.initializeApp(options);
        return FirebaseAuth.getInstance();
    }

}
