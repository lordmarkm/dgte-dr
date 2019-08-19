package com.dgte.erp.docs.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;

import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.jodconverter.LocalConverter;
import org.jodconverter.filter.text.PageSelectorFilter;
import org.jodconverter.office.OfficeException;
import org.jodconverter.office.OfficeManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProfitAndLossService {

    @Autowired
    private OfficeManager officeManager;
    public File test() throws OfficeException, InvalidPasswordException, IOException {
        String docxFilename = "document.docx";
        String pdfFilename = "document.pdf";
        this.docxToPdf(docxFilename, pdfFilename);
        this.pdfToImage(pdfFilename);
        return null;
    }

    private void docxToPdf(String docxFilename, String pdfFilename) throws OfficeException {
        File inputFile = new File(docxFilename);
        File outputFile = new File(pdfFilename);

        // Create an office manager using the default configuration.
        // The default port is 2002. Note that when an office manager
        // is installed, it will be the one used by default when
        // a converter is created.
//        final LocalOfficeManager officeManager = LocalOfficeManager.builder().officeHome("/opt/openoffice4").install().build();
        final PageSelectorFilter selectorFilter = new PageSelectorFilter(1);
        LocalConverter
            .builder()
            .filterChain(selectorFilter)
            .build()
            .convert(inputFile)
            .to(outputFile)
            .execute();
    }

    public void pdfToImage(String pdfFilename) throws InvalidPasswordException, IOException {
        PDDocument document = PDDocument.load(new File(pdfFilename));
        PDFRenderer pdfRenderer = new PDFRenderer(document);
        for (int page = 0; page < document.getNumberOfPages(); ++page) {
            BufferedImage bim = pdfRenderer.renderImageWithDPI(page, 300, ImageType.RGB);

            // suffix in filename will be used as the file format
            ImageIOUtil.writeImage(bim, pdfFilename + "-" + (page+1) + ".png", 300);
        }
        document.close();
    }
}
