package com.dgte.erp.docs.service;

import java.awt.image.BufferedImage;
import java.io.File;
import java.io.IOException;
import java.util.HashMap;

import org.apache.pdfbox.multipdf.Overlay;
import org.apache.pdfbox.pdmodel.PDDocument;
import org.apache.pdfbox.pdmodel.encryption.InvalidPasswordException;
import org.apache.pdfbox.rendering.ImageType;
import org.apache.pdfbox.rendering.PDFRenderer;
import org.apache.pdfbox.tools.imageio.ImageIOUtil;
import org.jodconverter.LocalConverter;
import org.jodconverter.office.OfficeException;
import org.springframework.stereotype.Service;

@Service
public class ProfitAndLossService {

    public File test() throws OfficeException, InvalidPasswordException, IOException {
        String docxFilename = "document.docx";
        String pdfFilename = "document.pdf";
        this.docxToPdf(docxFilename, pdfFilename);
        this.pdfToImage(pdfFilename);
        return null;
    }

    private void docxToPdf(String docxFilename, String pdfFilename) throws OfficeException, InvalidPasswordException, IOException {
        File inputFile = new File(docxFilename);
        File noWatermarkOutputfile = new File(pdfFilename + "-no-watermark.pdf");

        // Create an office manager using the default configuration.
        // The default port is 2002. Note that when an office manager
        // is installed, it will be the one used by default when
        // a converter is created.
//        final LocalOfficeManager officeManager = LocalOfficeManager.builder().officeHome("/opt/openoffice4").install().build();
        //final PageSelectorFilter selectorFilter = new PageSelectorFilter(1);
        LocalConverter
            .builder()
            //.filterChain(selectorFilter)
            .build()
            .convert(inputFile)
            .to(noWatermarkOutputfile)
            .execute();

        //Add the DRAFT watermark
        PDDocument realDoc = PDDocument.load(noWatermarkOutputfile);
        //the above is the document you want to watermark
        //for all the pages, you can add overlay guide, indicating watermark the original pages with the watermark document.

        HashMap<Integer, String> overlayGuide = new HashMap<Integer, String>();
            for(int i=0; i<realDoc.getNumberOfPages(); i++){
                overlayGuide.put(i+1, "draft.pdf");
                //watermark.pdf is the document which is a one page PDF with your watermark image in it. 
                //Notice here, you can skip pages from being watermarked.
            }
        Overlay overlay = new Overlay();
        overlay.setInputPDF(realDoc);
        overlay.overlay(overlayGuide).save(pdfFilename);
        overlay.close();
        realDoc.close();
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
