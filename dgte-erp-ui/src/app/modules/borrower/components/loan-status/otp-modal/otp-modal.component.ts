import { Component, Input, OnInit} from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { LoansService } from '@los/core/services';

@Component({
  selector: 'los-otp-modal',
  templateUrl: './otp-modal.component.html',
  styleUrls: ['./otp-modal.component.scss']
})
export class OtpModalComponent implements OnInit {
  public parsedMobileNumber = '';
  public loanReferenceNumber: number;
  public otpCode: string = '';
  public isLoading = false;
  public invalidOtp = false;

  constructor(public activeModal: NgbActiveModal,
              private loanService: LoansService) {}

  ngOnInit() {
  }

  public confirmOtp(): void {
    this.isLoading = true;
    this.loanService.verifyOtp(this.loanReferenceNumber, this.otpCode)
      .subscribe(() => {
        this.isLoading = false;
        this.activeModal.close(true);
      }, err => {
        this.invalidOtp = true;
        this.isLoading = false;
      });
  }

  public reset(): void {
    this.invalidOtp = false;
  }

  public isConfirmDisabled(): boolean {
    return this.otpCode.length < 6;
  }
}
