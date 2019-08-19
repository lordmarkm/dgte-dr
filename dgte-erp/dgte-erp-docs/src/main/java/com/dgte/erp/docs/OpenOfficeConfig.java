package com.dgte.erp.docs;

import javax.annotation.PreDestroy;

import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeException;
import org.jodconverter.office.OfficeUtils;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenOfficeConfig {

    @Bean
    public LocalOfficeManager officeManager() throws OfficeException {
        LocalOfficeManager officeManager = LocalOfficeManager.builder().officeHome("/opt/openoffice4").install().build();
        officeManager.start();
        return officeManager;
    }

    @PreDestroy
    public void preDestroy() throws OfficeException {
        OfficeUtils.stopQuietly(officeManager());
    }

}
