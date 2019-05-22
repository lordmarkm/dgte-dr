import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { StoreService, AuthService } from '@los/core/services';
import { MockUserInfo } from '@los/shared/constants';
import { AdminUserInfo } from '@los/shared/models';


@Component({
  selector: 'los-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(private authService: AuthService,
              private storeService: StoreService,
              private router: Router) { }

  ngOnInit() {
    if (this.authService.getToken()) {
      this.authService.getUserInfo().subscribe(result => {
        this.storeService.set('adminUserInfo', result);
      });
    } else {
      this.router.navigate(['/admin/login']);
    }
  }

}
