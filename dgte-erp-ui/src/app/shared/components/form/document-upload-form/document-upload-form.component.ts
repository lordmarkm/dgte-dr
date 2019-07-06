import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LoansService } from '@los/core/services';

@Component({
  selector: 'los-document-upload-form',
  templateUrl: './document-upload-form.component.html',
  styleUrls: ['./document-upload-form.component.scss']
})
export class DocumentUploadFormComponent implements OnInit {
  @Input() public readonly = false;
  @Input() public label: string;
  @Input() private type: string;

  public fileName: string;
  public fileSizeExceed = false;
  public imagePreview: any;
  public isLoading = false;
  private pControl: FormControl;

  constructor(private loansService: LoansService) {}

  ngOnInit() {
    this.fileSizeExceed = false;
    this.control.valueChanges.subscribe(value => {
      // null is considered as value
      if (value) {
        this.loansService.getAttachmentImage(value.originalFileName, value.systemGeneratedFileName)
          .subscribe(imageAsBlob => this.createImageFromBlob(imageAsBlob));
      }
    });
  }

  public fileChange(event) {
    let file = event.target.files[0];
    let fileSizeInMb = file.size / 1024 / 1024;

    if (fileSizeInMb > 5) {
      this.fileSizeExceed = true;
    } else {
      this.fileName = file.name;
      this.fileSizeExceed = false;
      this.isLoading = true;
      this.loansService.uploadAttachment(this.type, file)
        .subscribe(resp => {
          this.control.setValue(resp);
          this.isLoading = false;
        }, err => {
          console.log(err);
          this.isLoading = false;
          if (err.status === 413) {
            this.fileSizeExceed = true;
          }
        });
    }
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

  @Input() set control(control: FormControl) {
    this.pControl = control;

    // if control has value then retrieve initial image
    if (control.value) {
      this.isLoading = true;
      this.loansService.getAttachmentImage(this.control.value.originalFileName, this.control.value.systemGeneratedFileName)
        .subscribe(imageAsBlob => {
          this.createImageFromBlob(imageAsBlob);
          this.isLoading = false;
        }, err => {
          this.isLoading = false;
        });
    }
  }

  get control(): FormControl { return this.pControl; }
}
