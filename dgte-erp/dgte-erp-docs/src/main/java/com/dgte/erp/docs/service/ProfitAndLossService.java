package com.dgte.erp.docs.service;

import java.io.File;

import org.jodconverter.JodConverter;
import org.jodconverter.LocalConverter;
import org.jodconverter.filter.text.PageSelectorFilter;
import org.jodconverter.office.LocalOfficeManager;
import org.jodconverter.office.OfficeException;
import org.jodconverter.office.OfficeManager;
import org.jodconverter.office.OfficeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfitAndLossService {

    @Autowired
    private OfficeManager officeManager;
    public File test() throws OfficeException {
        File inputFile = new File("document.docx");
        File outputFile = new File("document.pdf");

        // Create an office manager using the default configuration.
        // The default port is 2002. Note that when an office manager
        // is installed, it will be the one used by default when
        // a converter is created.
//        final LocalOfficeManager officeManager = LocalOfficeManager.builder().officeHome("/opt/openoffice4").install().build();
        try {

            // Start an office process and connect to the started instance (on port 2002).
//            officeManager.start();

            // Convert
//            JodConverter
//                     .convert(inputFile)
//                     .to(outputFile)
//                     .execute();
            final PageSelectorFilter selectorFilter = new PageSelectorFilter(1);
            LocalConverter
                .builder()
                .filterChain(selectorFilter)
                .build()
                .convert(inputFile)
                .to(outputFile)
                .execute();

            return outputFile;
        } finally {
            // Stop the office process
//            OfficeUtils.stopQuietly(officeManager);
        }
    }
}
