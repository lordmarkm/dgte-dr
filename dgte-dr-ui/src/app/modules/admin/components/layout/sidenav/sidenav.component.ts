import { Component, OnInit } from '@angular/core';
import {AdminUserInfo} from "@los/shared/models";
import {StoreService} from "@los/core/services";

@Component({
  selector: 'los-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  public userInfo: AdminUserInfo;
  public isAo: boolean = false;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
    this.storeService.get('adminUserInfo').subscribe(userInfo => {
      if (userInfo) {
        this.userInfo = userInfo;

        // check if user is AO
        this.userInfo.roles.forEach(role => {
          if (role === 'ROLE_CHASSIS_AO') {
            this.isAo = true;
            return;
          }
        });
      }
    })
  }

}
