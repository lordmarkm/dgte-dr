package com.dgte.erp.docs;

import javax.annotation.PreDestroy;

import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeException;
import org.jodconverter.office.OfficeUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.util.Assert;

@Configuration
public class OpenOfficeConfig {

    private LocalOfficeManager officeManager;

    @Value("${office.home}")
    private String officeHome = "C:/Program Files (x86)/OpenOffice 4";

    @Bean
    public LocalOfficeManager officeManager() throws OfficeException {
        System.setProperty("sun.java2d.cmm", "sun.java2d.cmm.kcms.KcmsServiceProvider");
        LocalOfficeManager officeManager = LocalOfficeManager.builder().officeHome(officeHome).install().build();
        officeManager.start();
        this.officeManager = officeManager;
        return officeManager;
    }

    @PreDestroy
    public void preDestroy() throws OfficeException {
        Assert.notNull(officeManager, "Office Manager can't be null if you expect to stop it preDestroy.");
        OfficeUtils.stopQuietly(this.officeManager);
    }

}
