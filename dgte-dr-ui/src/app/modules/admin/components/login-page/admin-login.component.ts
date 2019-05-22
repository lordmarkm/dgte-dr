import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { validateAllFormFields } from '@los/shared/utils';
import { AuthService } from "@los/core/services";

@Component({
  selector: 'los-comaker-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showInvalidLoginMessage: boolean;
  public isSubmitting = false;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: AuthService) {}

  ngOnInit() {
    this.showInvalidLoginMessage = false;
    localStorage.clear();
    this.loginForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  public login(): void {
    validateAllFormFields(this.loginForm);
    this.showInvalidLoginMessage = false;
    if (this.loginForm.valid) {
      this.isSubmitting = true;
      this.authService.login(this.email.value, this.password.value).subscribe(response => {
        this.authService.saveToken(response.access_token);
        this.router.navigate(['/admin/loans']);
        this.isSubmitting = false;
      }, err => {
        if (err.status === 401) {
          this.showInvalidLoginMessage = true;
        }
        this.isSubmitting = false;
      });
    }
  }

  public logout(): void {
    localStorage.clear();
    this.router.navigate(['/admin/login']);
  }

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }
}
