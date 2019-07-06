import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';

import { validateAllFormFields } from '@los/shared/utils';
import { AppState, UploadDocumentAttachmentsDetails } from '@los/shared/models';
import {StoreService} from "@los/core/services";


@Component({
  selector: 'los-upload-document-attachments-form',
  templateUrl: './upload-document-attachments-form.component.html',
  styleUrls: ['./upload-document-attachments-form.component.scss']
})
export class UploadDocumentAttachmentsFormComponent implements OnInit {
  @Input() public formGroup: FormGroup;
  @Input() public readonly = false;
  @Input() public type = '';
  @Output() private handleSubmitSuccess: EventEmitter<any> = new EventEmitter();
  @Output() private handleSubmitFailed: EventEmitter<any> = new EventEmitter();
  @Output() private isValid: EventEmitter<boolean> = new EventEmitter();

  public requiredAttachments: any[] = [];
  public attachmentsForm: FormGroup;
  private $isFormBuilt: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private formBuilder: FormBuilder, private storeService: StoreService) {}

  ngOnInit() {
    this.attachmentsForm = this.formBuilder.group({});

    this.storeService.get('companyLoanSettings').subscribe(response => {
      response.requiredDocumentation.forEach(attachment => {
        this.requiredAttachments.push({
          label: attachment,
          type: this.formatAttachmentType(attachment)
        });
      });

      // add required attachments
      this.requiredAttachments.forEach(attachment => {
        this.attachmentsForm.addControl(attachment.type, new FormControl(null, Validators.required));
        if (attachment.type === "GOVERNMENT_ID") {
          this.attachmentsForm.addControl('govtId', new FormControl(null, Validators.required));
        }
      });

      this.attachmentsForm.valueChanges.subscribe(value => {
        this.isValid.emit(this.attachmentsForm.valid);
      });

      this.$isFormBuilt.next(true);
    });
  }

  private setFormValue(uploadDocumentAttachmentDetails: UploadDocumentAttachmentsDetails): void {
    if (uploadDocumentAttachmentDetails.attachments) {
      uploadDocumentAttachmentDetails.attachments.forEach(attachment => {
        if (this.attachmentsForm.get(attachment.fileType)) {
          this.attachmentsForm.get(attachment.fileType).setValue(attachment);
        } else {
          this.attachmentsForm.get('GOVERNMENT_ID').setValue(attachment);
          this.attachmentsForm.get('govtId').setValue(attachment.fileType);
        }
      });
    }
  }

  public submit(redirect): void {
    validateAllFormFields(this.attachmentsForm);
    if (this.attachmentsForm.valid) {
      const documents = [];
      Object.keys(this.attachmentsForm.controls).forEach(controlName => {
        const control = this.attachmentsForm.get(controlName);
        // optional controls may be added but doesn't have any value
        // so we filter them here
        if (control.value && (typeof control.value === 'object')) {
          if (control.value.fileType === 'GOVERNMENT_ID') {
            control.value.fileType = this.govtId.value;
          }
          documents.push(control.value);
        }
      });

      const uploadDocumentAttachmentsDetails: UploadDocumentAttachmentsDetails = {
        attachments: documents
      };

      this.handleSubmitSuccess.emit({redirect, uploadDocumentAttachmentsDetails});
    } else {
      this.handleSubmitFailed.emit();
    }
  }

  public getControl(controlName: string): FormControl {
    return <FormControl>this.attachmentsForm.get(controlName);
  }

  formatAttachmentType(attachment): string {
    let attachmentType = attachment.toUpperCase();
    attachmentType =  attachmentType.replace(/ /g,"_");
    attachmentType = attachmentType.split('.').join("");

    return attachmentType;
  }

  @Input() set initialValue(uploadDocumentAttachmentDetails: UploadDocumentAttachmentsDetails) {
    this.$isFormBuilt.subscribe(isBuilt => {
      if (isBuilt) {
        this.setFormValue(uploadDocumentAttachmentDetails);
      }
    });
  }

  get initialValue(): UploadDocumentAttachmentsDetails { return this.initialValue; }
  get govtId() { return this.attachmentsForm.get('govtId'); }
}
