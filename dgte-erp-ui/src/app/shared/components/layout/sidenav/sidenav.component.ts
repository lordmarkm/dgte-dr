import { Component, OnInit } from '@angular/core';
import {AdminUserInfo} from "@los/shared/models";
import {StoreService} from "@los/core/services";

@Component({
  selector: 'erp-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class ErpSidenavComponent implements OnInit {
  public userInfo: AdminUserInfo;
  public isAo: boolean = false;

  constructor(private storeService: StoreService) { }

  ngOnInit() {
  }

}
