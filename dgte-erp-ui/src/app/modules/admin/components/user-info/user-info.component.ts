import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

import { AuthService, StoreService } from "@los/core/services";
import { AdminUserDetails } from "@los/shared/models";

@Component({
  selector: 'los-comaker-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public userInfo: AdminUserDetails = { username: '' };

  constructor(private storeService: StoreService, private authService: AuthService) {}

  ngOnInit() {
    this.getUserInfo();
  }

  getUserInfo() {
    this.storeService.get('adminUserInfo')
      .subscribe((result) => {
        if (result) {
          this.userInfo.username = result.username;
        }
    });
  }

  logout(): void {
    this.authService.logout();
  }
}
