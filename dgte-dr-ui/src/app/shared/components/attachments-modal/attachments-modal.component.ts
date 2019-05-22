import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { saveAs } from 'file-saver';
import { LoansService } from '@los/core/services';

@Component({
  selector: 'los-attachments-modal',
  templateUrl: './attachments-modal.component.html',
  styleUrls: ['./attachments-modal.component.scss']
})
export class AttachmentsModalComponent implements OnInit {
  @Input() loanDetails;
  public imagePreview: any;
  public imageAsBlob: any;
  public selectedAttachment;
  public borrowerAttachments = [];
  public coMakers = [];
  public isViewing = false;

  constructor(public activeModal: NgbActiveModal,
              private loansService: LoansService) {}

  ngOnInit() {
    const borrower = [];
    this.loanDetails.attachments.forEach(attachment => {
      borrower.push(attachment);
    });

    this.borrowerAttachments = borrower;

    const coMakersAsObj = {}
    // we need to use objects so that it could be easily track
    this.loanDetails.comakerAttachments.forEach(attachment => {
      const coMaker = this.getComakerFullName(attachment.comakerApplicationCode);
      if (!coMakersAsObj[attachment.comakerApplicationCode]) {
        coMakersAsObj[attachment.comakerApplicationCode] = {
          label: coMaker.fullName,
          attachments: []
        };
      }
      coMakersAsObj[attachment.comakerApplicationCode].attachments.push(attachment);
    });

    // convert object to array
    const coMakers = [];
    Object.keys(coMakersAsObj).forEach(key => {
      coMakers.push(coMakersAsObj[key]);
    });
    this.coMakers = coMakers;

    this.selectedAttachment = this.loanDetails.attachments[0];
    this.viewImage(this.loanDetails.attachments[0]);
  }

  viewImage(attachment) {
    this.isViewing = true;
    this.loansService.getAttachmentImage(attachment.originalFileName, attachment.systemGeneratedFileName)
      .subscribe(imageAsBlob => {
        this.isViewing = false;
        const originalFilenameAsArray = attachment.originalFileName.split('.');
        const type = originalFilenameAsArray.slice(-1).pop();

        this.imageAsBlob = imageAsBlob;
        this.selectedAttachment = attachment;
        this.selectedAttachment.type = type;

        this.createImageFromBlob(imageAsBlob);
      }, err => {
        this.isViewing = false;
      });
  }

  private createImageFromBlob(image: Blob) {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.imagePreview = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  public downloadAttachment() {
    const fileName = this.convertToReadableFiletype(this.selectedAttachment.fileType);
    const type = this.selectedAttachment.type;

    saveAs(this.imageAsBlob, `${fileName}.${type}`);
  }

  public getComakerFullName(applicationCode) {
    return this.loanDetails.comakers.find(coMaker => coMaker.applicationCode === applicationCode);
  }

  convertToReadableFiletype(fileType) {
    switch (fileType) {
      case 'PAYSLIP':
        return 'Payslip';
        break;
      case 'COMPANY_ID_FRONT':
        return 'Company I.D. (Front)';
        break;
      case 'COMPANY_ID_BACK':
        return 'Company I.D. (Back)';
        break;
      case 'INCOME_TAX_RETURN':
        return 'Income Tax Return';
        break;
    }

    return fileType;
  }

  isImage() {
    if (this.selectedAttachment.type) {
      const type  = this.selectedAttachment.type.toLowerCase();
      if (type === 'png' || type === 'jpeg' || type === 'jpg' || type === 'tif' || type === 'gif' || type === 'bmp') {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
