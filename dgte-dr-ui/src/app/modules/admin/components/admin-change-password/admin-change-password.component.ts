import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { validateAllFormFields } from '@los/shared/utils';

import { AuthService } from "@los/core/services";

import { ONE_UPPERCASE, ONE_SPECIAL_CHARACTER } from "@los/shared/constants";

@Component({
  selector: 'los-comaker-change-password',
  templateUrl: './admin-change-password.component.html',
  styleUrls: ['./admin-change-password.component.scss']
})
export class AdminChangePasswordComponent implements OnInit {

  public changePasswordForm: FormGroup;
  public passwordChangeSuccess: boolean;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.passwordChangeSuccess = false;
    this.changePasswordForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      currentPassword: [null, [Validators.required]],
      newPassword: [null, [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(20),
        Validators.pattern(ONE_UPPERCASE),
        Validators.pattern(ONE_SPECIAL_CHARACTER)
      ]]
    })
  }

  public showPassword() {
    let passwordElement = (document.getElementById('newPassword') as HTMLInputElement);
    if (passwordElement && passwordElement.type === 'password') {
      passwordElement.type = "text";
    } else {
      passwordElement.type = "password";
    }
  }

  public changePassword(): void {
    validateAllFormFields(this.changePasswordForm);

    if (this.changePasswordForm.valid) {
      this.authService.changePassword(this.email.value, this.currentPassword.value, this.newPassword.value)
        .subscribe(response => {
          this.passwordChangeSuccess = true;
          window.scroll(0,0);
      });
    }
  }

  public continueLogin() {
    this.authService.login(this.email.value, this.newPassword.value).subscribe(response => {
      this.authService.saveToken(response.access_token);
      this.router.navigate(['/admin/loans']);
    });
  }

  get email() { return this.changePasswordForm.get('email'); }
  get currentPassword() { return this.changePasswordForm.get('currentPassword'); }
  get newPassword() { return this.changePasswordForm.get('newPassword'); }
}
