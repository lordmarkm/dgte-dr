package com.dgte.erp.games;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

import com.dgte.shared.firebase.FirebaseConfig;

/**
 *
 *
 * @author mbmartinez on 26 Sep 2019
 *
 */
@SpringBootApplication
@Import({ FirebaseConfig.class })
public class Application {

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

}
